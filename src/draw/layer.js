import Konva from 'konva';
import Rect from './rect';
import Mask from './mask';
import Text from './Text';

class Layer {
    constructor(width, height) {
        //蒙层
        let mask = new Mask(width, height);
        let layer = new Konva.Layer();
        layer.add(mask);

        // 生成对应图形的对象工厂
        let factory = function(type, shape) {
            console.log(type);
            switch (type) {
                case 'text':
                    return new Text(shape);
                    break;
                case 'rect':
                default:
                    return new Rect(shape);
            }
        };

        Konva.Util.addMethods(Konva.Layer, {
            getShapeByUUID(uuid, type) {
                let name = '.Perfect' + type + uuid;
                let filtered = this.find(name);
                return filtered[0];
            },
            showMask() {
                mask.show();
                layer.draw();
            },
            hideMask() {
                mask.hide();
                layer.draw();
            },
            renderShape(type, shape) {
                let renderedShape = factory(type, shape);
                let tr = renderedShape.getTransformer();
                this.add(renderedShape, tr);
                return renderedShape;
            },
            updateShapeByUUID(uuid, mouseStart, mouseEnd) {
                this.getShapeByUUID(uuid, 'Transformer')
                    .attachTo(this.getShapeByUUID(uuid, 'Rect')
                        .getUpdatePoints(mouseStart, mouseEnd));
                this.draw();
            },
            deleteShapeByUUID(uuid) {
                this.getShapeByUUID(uuid, 'Transformer').remove();
                this.getShapeByUUID(uuid, 'Rect').remove();
                this.draw();
            }
        });

        return layer;
    }
}

export default Layer;