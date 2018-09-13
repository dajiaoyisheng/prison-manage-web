import Konva from 'konva';
import Transformer from './transformer';
/**
 * 矩形
 */
class Rect {
    constructor(shape) {
        let lineWidth = shape.lineWidth || 1;
        let strokeStyle = shape.strokeStyle || '#f00';
        let fillStyle = shape.fillStyle || '#f00';
        let uuid = shape.uuid;

        let rect = new Konva.Line({
            name: "PerfectRect" + uuid,
            points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fill: fillStyle,
            stroke: strokeStyle,
            strokeWidth: parseInt(lineWidth),
            opacity: 0.4,
            draggable: true,
            closed: true,
            uuid: uuid, //标识
            globalCompositeOperation: 'destination-out'
        });

        Konva.Util.addMethods(Konva.Line, {
            getUpdatePoints(start, end) {
                let x1 = Math.round(start.x),
                    y1 = Math.round(start.y),
                    x2 = Math.round(end.x),
                    y2 = Math.round(end.y);
                this.setPoints([x1, y1, x1 + (x2 - x1) / 2, y1, x2, y1, x2, y2 - (y2 - y1) / 2, x2, y2, x2 - (x2 - x1) / 2, y2, x1, y2, x1, y2 - (y2 - y1) / 2]);
                return this;
            },
            getTransformer() {
                return new Transformer(shape);
            }
        });

        return rect;
    };

}

export default Rect;