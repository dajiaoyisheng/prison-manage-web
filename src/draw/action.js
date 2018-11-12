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
        this.layer.disableShapeDrap();
    };

    setImage(image) {
        this.shape.image = image;
    }

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
        self.layer.finished(self.uuid, self.shape.type);//禁止调整大小和移动
        self.stage.off('contentMousedown');
        self.stage.off('contentMousemove');
        self.stage.off('contentMouseup');
        self.mouseupCallback && self.mouseupCallback(self.uuid);
    };

    init() {
        this.stage.on('contentMousedown', self.mouseDown);
    }
};