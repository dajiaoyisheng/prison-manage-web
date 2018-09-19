import Konva from 'konva';

class Camera {
    constructor(shape) {
        let imageObj = shape.image;
        let x = shape.x;
        let y = shape.y;
        let uuid = shape.uuid;
        let rotation = shape.rotation || 90;

        let camera = new Konva.Image({
            name: "PerfectImage" + uuid,
            image: imageObj,
            x: x,
            y: y,
            uuid: uuid, //标识
            rotation: rotation,
            width: imageObj.width,
            height: imageObj.height
        });

        return camera;
    }
}

export default Camera;