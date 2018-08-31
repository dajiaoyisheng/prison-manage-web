import Graph from './graph';
/**
 * 圆形
 */
class Round extends Graph {
    constructor(pos, shape) {
        super(pos, shape);
        shape = shape || {};
        this.points = shape.points || [];
        this.radius = shape.radius || 10;
        this.type = 'round';
        this.name = '圆形';
    }
    update(i, pos) {
        if (i == 9999) {
            var x1 = pos.x - this.x,
                y1 = pos.y - this.y;
            this.points[0].x += x1;
            this.points[0].y += y1;
            this.x = pos.x;
            this.y = pos.y;
        } else {
            this.points[0] = pos;
            this.radius = Math.round(Math.sqrt(Math.pow(pos.x - this.x, 2) + Math.pow(pos.y - this.y, 2)));
        }
    }
    initUpdate(start, end) {
        this.points[0] = end;
        this.radius = Math.round(Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)));
    }
    createPath(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    }
    toData() {
        return {
            pos: {
                x: this.x,
                y: this.y,
            },
            type: this.type,
            points: this.points,
            sides: this.sides,
            stars: this.stars,
            lineWidth: this.lineWidth,
            strokeStyle: this.strokeStyle,
            fillStyle: this.fillStyle,
            isFill: this.isFill,
            radius: this.radius
        }
    }
}

export default Round;