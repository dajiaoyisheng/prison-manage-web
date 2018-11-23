import UUID from 'node-uuid';
import Konva from 'konva';
import Layer from './layer';

let self = {};
export default class Action {
    constructor(canvasId, width, height, clickCallback, mouseoverCallback, mouseupCallback) {
        this.uuid = UUID.v4();
        this.stage = new Konva.Stage({
            container: canvasId,
            width: width,
            height: height
        });
        this.canvasId = canvasId;
        this.width = width;
        this.height = height;
        this.layer = new Layer(this.width, this.height);
        this.stage.add(this.layer);

        this.clickCallback = clickCallback;
        this.mouseupCallback = mouseupCallback;
        this.mouseoverCallback = mouseoverCallback;

        this.mouseStart = this.mouseEnd = {
            x: 0,
            y: 0
        };
        this.drawing = false;
        this.shape = {
            "control": true,
            "grid": true,
            "lineWidth": "1",
            "strokeStyle": "#00BFF3", //线颜色
            "fillStyle": "#FFFFFF", //填充颜色
            "type": "rect",
            "isFill": true
        };
        //撤销重做相关
        this.cPushArray = [];
        this.cStep = -1;
        self = this;
    };

    setShape(lineWidth, strokeStyle, type, fillStyle) {
        self.shape.lineWidth = lineWidth || self.shape.lineWidth;
        self.shape.strokeStyle = strokeStyle || self.shape.strokeStyle;
        self.shape.fillStyle = fillStyle || self.shape.fillStyle;
        self.shape.type = type || self.shape.type;
        self.layer.disableShapeDrap();
    };

    setImage(image) {
        self.shape.image = image;
    }

    //设置当前绘制状态
    setDrawState(state) {
        self.drawing = state;
    };

    //显示蒙层
    showMask() {
        self.layer.showMask();
    };

    //鼠标放下
    mouseDown() {
        if (self.drawing) {
            self.mouseStart = self.stage.getPointerPosition();
            self.shape.x = self.mouseStart.x;
            self.shape.y = self.mouseStart.y;
            self.uuid = self.shape.uuid = UUID.v4();
            //绘制图形，并绑定事件
            self.layer.renderShape(self.shape.type, self.shape).on('click', self.clickCallback).on('mouseover', self.mouseoverCallback);

            self.stage.on('contentMousemove', self.mouseMove);
            self.stage.on('contentMouseup', self.mouseUp);
        }
    };

    mouseMove() {
        if (self.drawing) {
            self.mouseEnd = self.stage.getPointerPosition();
            self.layer.updateShapeByUUID(self.uuid, self.shape.type, self.mouseStart, self.mouseEnd);
        }
    };

    mouseUp() {
        self.setDrawState(false);
        self.layer.hideMask();
        self.layer.finished(self.uuid, self.shape.type); //禁止调整大小和移动
        self.stage.off('contentMousedown');
        self.stage.off('contentMousemove');
        self.stage.off('contentMouseup');
        self.mouseupCallback && self.mouseupCallback(self.uuid);
        self.cPush();
    };

    addText(text, uuid, x, y, stageTop, stageLeft) {
        self.layer.addText({
            x: x,
            y: y,
            text: text,
            uuid: uuid,
            stageTop: stageTop,
            stageLeft: stageLeft
        });
        self.layer.draw();
    };

    //撤销重做相关操作
    cPush() {
        self.cStep++;
        if (self.cStep < self.cPushArray.length) {
            self.cPushArray.length = self.cStep;
        }
        self.cPushArray.push(self.stage.toJSON());
    };

    //重做
    cUndo() {
        if (self.cStep > 0) {
            let json = self.cPushArray[--self.cStep];
            self.loadFromJson(json);
        }
    };

    //撤销
    cRedo() {
        if (self.cStep < self.cPushArray.length - 1) {
            let json = self.cPushArray[++self.cStep];
            self.loadFromJson(json);
        }
    };

    //将舞台保存为 JSON 字符串
    toJSON() {
        return self.stage.toJSON();
    };

    //从导出的序列化json中加载
    loadFromJson(json) {
        try {
            let stageObj = JSON.parse(json);
            let stageChildren = stageObj.children;
            if (stageObj.className == 'Stage' && stageChildren) {
                let layer = stageChildren[0];
                if (layer) {
                    // self.stage.destroyChildren();
                    self.layer = new Layer(self.width, self.height);
                    //self.stage.add(self.layer);
                    console.log(self.stage.getLayers());
                    self.layer.draw();
                    self.stage.draw();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    init() {
        self.stage.on('contentMousedown', self.mouseDown);
        self.cPush();
    }
};