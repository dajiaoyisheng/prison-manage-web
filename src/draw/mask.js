import Konva from 'konva';
/**
 * 绘制蒙层
 */
class Mask {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        return new Konva.Rect({
            width: this.width,
            height: this.height,
            type: "mask",
            fill: 'black',
            stroke: 'black',
            opacity: 0.6,
            visible: false, //不可见
            draggable: false, //不可拖拽
        });
    };
}

export default Mask;