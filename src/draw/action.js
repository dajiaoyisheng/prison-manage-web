import * as canvasFunc from './canvas';
import Rect from './rect';
import Round from './round';
import Ellipse from './ellipse';

let self = {};
export default class Action {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = canvas.getContext('2d');
        this.W = canvas.width;
        this.H = canvas.height;
        this.currPos = {
            x: 0,
            y: 0
        };
        this.mouseStart = {
            x: 0,
            y: 0
        };
        this.mouseEnd = {
            x: 0,
            y: 0
        };
        this.drawing = false;
        this.activeShape = null;
        this.index = -1;
        this.shapes = [];
        this.shape = {
            "control": true,
            "grid": true,
            "lineWidth": "1",
            "strokeStyle": "#ff0000", //线颜色
            "fillStyle": "#F6FCFE", //填充颜色
            "type": "rect",
            "isFill": true
        }
        this.hasInit = false;
        //撤销相关
        this.cancelList = []; //撤销列表
        this.cancelIndex = 0;
        this.isredo = false; //是否重做
        self = this;
    };

    setShape(lineWidth, strokeStyle, type, fillStyle) {
        this.shape.lineWidth = lineWidth || this.shape.lineWidth;
        this.shape.strokeStyle = strokeStyle || this.shape.strokeStyle;
        this.shape.fillStyle = fillStyle || this.shape.fillStyle;
        this.shape.type = type || this.shape.type;
    };

    //设置背景网格是否显示
    setGridShowState(state) {
        this.shape.grid = state;
    };

    //设置控制点是否显示
    setControlShowState(state) {
        this.shape.control = state;
    };

    //设置当前绘制状态
    setDrawState(state) {
        this.drawing = state;
    };
    // 生成对应图形的对象工厂
    factory(type, pos, shape) {
        switch (type) {
            case 'rect':
                console.log(shape);
                return new Rect(pos, shape);
            case 'round':
                return new Round(pos, shape);
            case 'ellipse':
                return new Ellipse(pos, shape);
            default:
                return new Rect(pos, shape);
        }
    };

    mouseMove(e) {
        self.mouseEnd = canvasFunc.WindowToCanvas(self.canvas, e.clientX, e.clientY);
        if (self.activeShape) {
            if (self.index > -1) {
                self.activeShape.update(self.index, self.mouseEnd);
            } else {
                self.activeShape.initUpdate(self.mouseStart, self.mouseEnd);
            }
            self.drawGraph();
        }
    };

    mouseUp(e) {
        self.canvas.style.cursor = 'pointer';
        if (self.activeShape) {
            self.drawGraph();
            self.setDrawState(false);
        }
        self.canvas.removeEventListener('mousemove', self.mouseMove, false);
        self.canvas.removeEventListener('mouseup', self.mouseUp, false);
    };
    //清除所有图形
    clear() {
        self.shapes.length = 0;
    };

    //绘制图形列表
    drawGraph() {
        this.ctx.clearRect(0, 0, this.W, this.H);
        var showControl = this.shape.control;
        this.shapes.forEach(shape => {
            shape.draw(this.ctx);
            if (showControl) {
                shape.drawController(this.ctx);
            }
        });
        this.ctx.stroke();
        //如果不是重做则添加到操作历史列表中
        if (!this.isredo) {
            this.cancelList.push(this.exportGraphs());
        }
    }

    //重做
    redo() {

    }

    //导出
    exportGraphs() {
        let shapes = [];
        this.shapes.forEach(shape => {
            shapes.push(shape.toData());
        });
        return shapes;
    }

    //从数据绘制图形
    loadData(shapes) {
        if (!!shapes) {
            shapes.forEach(shape => {
                self.activeShape = self.factory(shape.type, shape.pos, shape);
                self.activeShape.lineWidth = shape.lineWidth;
                self.activeShape.strokeStyle = shape.strokeStyle;
                self.shapes.push(self.activeShape);
                self.index = -1;
                self.drawGraph();
            });
            this.init();
        }
    }

    init() {
        if (!this.hasInit) {
            //鼠标放下
            this.canvas.addEventListener('mousedown', function(e) {
                self.mouseStart = canvasFunc.WindowToCanvas(self.canvas, e.clientX, e.clientY);
                self.activeShape = null;
                //新建图形
                if (self.drawing) {
                    self.activeShape = self.factory(self.shape.type, self.mouseStart, self.shape);
                    self.activeShape.lineWidth = self.shape.lineWidth;
                    self.activeShape.strokeStyle = self.shape.strokeStyle;
                    self.shapes.push(self.activeShape);
                    self.index = -1;
                    self.drawGraph();
                } else {
                    //选中控制点后拖拽修改图形
                    for (var i = 0, len = self.shapes.length; i < len; i++) {
                        if ((self.index = self.shapes[i].isInPath(self.ctx, self.mouseStart)) > -1) {
                            self.canvas.style.cursor = 'crosshair';
                            self.activeShape = self.shapes[i];
                            break;
                        }
                    }
                }
                // saveImageData();
                self.canvas.addEventListener('mousemove', self.mouseMove, false);
                self.canvas.addEventListener('mouseup', self.mouseUp, false);
            }, false);

            //鼠标移动事件
            this.canvas.addEventListener('mousemove', function(e) {
                self.currPos = canvasFunc.WindowToCanvas(self.canvas, e.clientX, e.clientY);
            }, false);

            // 删除图形
            document.body.onkeydown = function(e) {
                if (e.keyCode == 8) {
                    for (var i = 0, len = this.shapes.length; i < len; i++) {
                        if (this.shapes[i].isInPath(this.ctx, this.currPos) > -1) {
                            this.shapes.splice(i--, 1);
                            this.drawGraph();
                            break;
                        }
                    }
                }
            };
            this.hasInit = true;
        }
    }
}