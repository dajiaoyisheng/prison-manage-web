import Konva from 'konva';

class Text {
    constructor(shape, layer) {
        let x = shape.x;
        let y = shape.y;
        let text = shape.text;
        let stageTop = shape.stageTop;
        let stageLeft = shape.stageLeft;
        let fill = shape.fill || '#555';
        let padding = shape.padding || 20;
        let align = shape.align || 'center';
        let fontSize = shape.fontSize || 18;
        let uuid = shape.uuid;
        let name = shape.name || "PerfectText" + uuid;

        let textNode = new Konva.Text({
            x: x,
            y: y,
            name: name,
            type: "Text",
            text: text,
            fill: fill,
            align: align,
            padding: padding,
            fontSize: fontSize,
            uuid: uuid, //标识
        });

        textNode.on('dblclick', () => {
            var textPosition = textNode.getAbsolutePosition();

            var areaPosition = {
                x: textPosition.x + stageLeft,
                y: textPosition.y + stageTop
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