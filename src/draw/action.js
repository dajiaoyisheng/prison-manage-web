import UUID from 'node-uuid';
import Konva from 'konva';
import Layer from './layer';

let self = {};
export default class Action {
    constructor(canvasId, width, height, mouseupCallback) {
        this.uuid = UUID.v4();
        this.stage = new Konva.Stage({
            container: canvasId,
            width: width,
            height: height
        });
        this.width = width;
        this.height = height;
        this.layer = new Layer(this.width, this.height);
        this.stage.add(this.layer);

        this.mouseupCallback = mouseupCallback;

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

    //设置当前绘制状态
    setDrawState(state) {
        this.drawing = state;
    };

    //显示蒙层
    showMask() {
        self.layer.showMask();
    };

    //鼠标放下
    mouseDown() {
        if (self.drawing) {
            self.mouseStart = self.stage.getPointerPosition();
            self.uuid = self.shape.uuid = UUID.v4();
            self.layer.renderShape(self.shape.type, self.shape).on('click', function() {
                self.uuid = this.node.getAttr('uuid');
            });

            self.stage.on('contentMousemove', self.mouseMove);
            self.stage.on('contentMouseup', self.mouseUp);
        }
    };

    mouseMove() {
        self.mouseEnd = self.stage.getPointerPosition();
        self.layer.updateShapeByUUID(self.uuid, self.mouseStart, self.mouseEnd);
    };

    mouseUp() {
        self.setDrawState(false);
        self.layer.hideMask();
        self.stage.off('contentMousedown');
        self.stage.off('contentMousemove');
        self.stage.off('contentMouseup');
        self.mouseupCallback && self.mouseupCallback(self.uuid);
    };

    init() {
        this.stage.on('contentMousedown', self.mouseDown);
    }
};