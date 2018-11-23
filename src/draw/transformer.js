import Konva from 'konva';
/**
 * 图形外面可调整大小的点
 */
class Transformer {
    constructor(shape) {
        let uuid = shape.uuid;
        let anchorSize = shape.anchorSize || 4;
        let fillStyle = shape.borderStroke || '#00BFF3';
        let resizeEnabled = shape.resizeEnabled || false;
        let name = shape.name || "PerfectTransformer" + uuid;

        return new Konva.Transformer({
            name: name,
            type: "Transformer",
            rotateEnabled: false,
            resizeEnabled: resizeEnabled,
            borderStroke: fillStyle,
            anchorStroke: fillStyle,
            anchorFill: fillStyle,
            anchorSize: anchorSize,
            uuid: uuid //标识
        });
    };

}

export default Transformer;