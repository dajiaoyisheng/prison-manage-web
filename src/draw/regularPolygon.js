import Konva from 'konva';
export default class {
    constructor(shape) {
        let lineWidth = shape.lineWidth || 1;
        let strokeStyle = shape.strokeStyle || '#f00';
        let fillStyle = shape.fillStyle || '#00BFF3';
        let uuid = shape.uuid;

        var hexagon = new Konva.RegularPolygon({
            x: 100,
            y: 150,
            sides: 19,
            radius: 70,
            fill: fillStyle,
            stroke: strokeStyle,
            strokeWidth: parseInt(lineWidth),
            opacity: 0.4,
            uuid: uuid, //标识
            globalCompositeOperation: 'destination-out'
        });

        return hexagon;
    }
}