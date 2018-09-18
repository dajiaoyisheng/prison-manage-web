import Konva from 'konva';

class Text {
    constructor(x, y, text) {
        let textNode = new Konva.Text({
            x: x,
            y: y,
            text: text,
            fontSize: 18,
            fontFamily: 'Calibri',
            fill: '#555',
            padding: 20,
            align: 'center'
        });

        textNode.on('dblclick', () => {
            var textPosition = textNode.getAbsolutePosition();
            var stageBox = stage.getContainer().getBoundingClientRect();

            var areaPosition = {
                x: textPosition.x + stageBox.left,
                y: textPosition.y + stageBox.top
            };

            let textarea = document.createElement('textarea');
            document.body.appendChild(textarea);

            textarea.value = textNode.text();
            textarea.style.position = 'absolute';
            textarea.style.top = areaPosition.y + 'px';
            textarea.style.left = areaPosition.x + 'px';
            textarea.style.width = textNode.width();

            textarea.focus();


            textarea.addEventListener('keydown', function(e) {
                if (e.keyCode === 13) {
                    textNode.text(textarea.value);
                    layer.draw();
                    document.body.removeChild(textarea);
                }
            });
        })

        return textNode;
    }
}

export default Text;