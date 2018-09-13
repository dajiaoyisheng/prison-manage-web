import Konva from 'konva';

class Text {
    constructor(x, y, text) {
        return new Konva.Text({
            x: x,
            y: y,
            text: text,
            fontSize: 18,
            fontFamily: 'Calibri',
            fill: '#555',
            padding: 20,
            align: 'center'
        });
    }
}

export default Text;