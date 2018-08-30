import Graph from './graph';
/**
 * 矩形
 */
class Rect extends Graph {
    constructor(pos, shape) {
        super(pos, shape);
        shape = shape || {};
        this.points = shape.points || [pos, pos, pos, pos, pos, pos, pos, pos];
        this.type = 'rect';
        this.name = '矩形';
    }
    initUpdate(start, end) {
        var x1 = Math.round(start.x),
            y1 = Math.round(start.y),
            x2 = Math.round(end.x),
            y2 = Math.round(end.y);
        // this.points[0] = { x: x1, y: y1 };
        // this.points[1] = { x: x2, y: y1 };
        // this.points[2] = { x: x2, y: y2 };
        // this.points[3] = { x: x1, y: y2 };

        this.x = Math.round((x1 + x2) / 2);
        this.y = Math.round((y1 + y2) / 2);

        this.points[0] = { x: x1, y: y1 };
        this.points[1] = { x: x1 + (x2 - x1) / 2, y: y1 };
        this.points[2] = { x: x2, y: y1 };
        this.points[3] = { x: x2, y: y2 - (y2 - y1) / 2 };
        this.points[4] = { x: x2, y: y2 };
        this.points[5] = { x: x2 - (x2 - x1) / 2, y: y2 };
        this.points[6] = { x: x1, y: y2 };
        this.points[7] = { x: x1, y: y2 - (y2 - y1) / 2 };
    }
}

export default Rect;