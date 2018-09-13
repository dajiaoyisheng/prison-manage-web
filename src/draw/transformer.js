import Konva from 'konva';
/**
 * 图形外面可调整大小的点
 */
class Transformer {
    constructor(shape) {
        let fillStyle = '#00BFF3';
        let uuid = shape.uuid;
        return new Konva.Transformer({
            name: "PerfectTransformer" + uuid,
            rotateEnabled: false,
            borderStroke: fillStyle,
            anchorStroke: fillStyle,
            anchorFill: fillStyle,
            anchorSize: 4,
            uuid: uuid //标识
        });
    };

}

export default Transformer;