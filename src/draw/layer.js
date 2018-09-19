import Konva from 'konva';
import Rect from './rect';
import Mask from './mask';
import Text from './Text';
import Wedge from './wedge';

class Layer {
    constructor(width, height) {
        //蒙层
        let mask = new Mask(width, height);
        let layer = new Konva.Layer();
        layer.add(mask);

        // 生成对应图形的对象工厂
        let factory = function(type, shape) {
            switch (type) {
                case 'text':
                    return new Text(shape);
                case 'camera':
                    return new Wedge(shape);
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
                this.draw();
            },
            hideMask() {
                mask.hide();
                this.draw();
            },
            renderShape(type, shape) {
                let renderedShape = factory(type, shape);
                if (type == 'rect') {
                    let tr = renderedShape.getTransformer();
                    this.add(renderedShape, tr);
                } else if (type == 'camera') {
                    let camera = renderedShape.getCamera();
                    this.add(renderedShape, camera);
                }
                return renderedShape;
            },
            updateShapeByUUID(uuid, type, mouseStart, mouseEnd) {
                if (type == 'rect') {
                    this.getShapeByUUID(uuid, 'Transformer')
                        .attachTo(this.getShapeByUUID(uuid, 'Rect')
                            .getUpdatePoints(mouseStart, mouseEnd));
                }
                this.draw();
            },
            deleteShapeByUUID(uuid) {
                this.getShapeByUUID(uuid, 'Transformer').remove();
                this.getShapeByUUID(uuid, 'Rect').remove();
                this.draw();
            },
            disableShapeDrap() {
                this.getChildren().forEach(function(node) {
                    node.draggable(false);
                });
            },
            finished(uuid, type) {
                if (type == 'rect') {
                    this.getShapeByUUID(uuid, 'Transformer').resizeEnabled(false);
                    this.getShapeByUUID(uuid, 'Rect').draggable(false);
                }
            }
        });

        return layer;
    }
}

export default Layer;