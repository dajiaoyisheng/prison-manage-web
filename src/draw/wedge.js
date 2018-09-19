import Konva from 'konva';
import Camera from './camera';

class Wedge {
    constructor(shape) {
        let x = shape.x;
        let y = shape.y;
        let uuid = shape.uuid;
        let imageObj = shape.image;
        let wedge = new Konva.Wedge({
            name: "PerfectWedge" + uuid,
            x: x,
            y: y,
            radius: 20,
            angle: 90,
            stroke: '#59C4EE',
            strokeWidth: 1,
            rotation: 45,
            uuid: uuid, //标识
        });

        let camera = new Camera(shape);

        let imgW = camera.width(),
            imgH = camera.height();

        wedge.on('mousemove', function() {
            let pos = this.getStage().getPointerPosition();
            let dx = pos.x - camera.x();
            let dy = pos.y - camera.y();

            let rolation = parseInt(Math.atan2(dy, dx) / (Math.PI / 180));
            camera.sceneFunc(function(ctx) {
                ctx.rotate(rolation * Math.PI / 180 - 45);
                ctx.translate(-imgW / 2, -imgH / 2 - rolation);
                ctx.drawImage(imageObj, 0, rolation);
            });
            this.getLayer().draw();
        });

        Konva.Util.addMethods(Konva.Wedge, {
            getCamera() {
                return camera;
            }
        });

        return wedge;
    }
}

export default Wedge;