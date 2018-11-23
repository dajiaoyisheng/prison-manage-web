import Konva from 'konva';
import Rect from './rect';
import Mask from './mask';
import Text from './text';
import Wedge from './wedge';
import Transformer from './transformer';

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
                case 'transformer':
                    return new Transformer(shape);
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
            addText(shape) {
                let textNode = new Text(shape, this);
                this.add(textNode);
                textNode.setZIndex(this.children.length - 1);
            },
            renderShape(type, shape, renderTransformer) {
                let renderedShape = factory(type, shape);
                if (type == 'rect') {
                    if (renderTransformer == undefined) {
                        let tr = renderedShape.getTransformer();
                        this.add(renderedShape, tr);
                    } else {
                        this.add(renderedShape);
                    }
                } else if (type == 'camera') {
                    let camera = renderedShape.getCamera();
                    this.add(renderedShape, camera);
                } else if (type == 'transformer') {
                    this.add(renderedShape);
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
            },
            //从导出的序列化json中加载
            loadFromJson(layerJson) {
                let that = this;
                let layerChildren = layerJson.children;
                layerChildren.forEach(element => {
                    try {
                        let shape = element.attrs;
                        let type = shape.type.toLowerCase();
                        that.renderShape(type, shape, false).draw();
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        });

        return layer;
    }
}

export default Layer;