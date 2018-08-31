import Graph from './graph';
/**
 * 椭圆
 */
class Ellipse extends Graph {
    constructor(pos, shape) {
        super(pos, shape);
        shape = shape || {};
        this.angle = shape.angle || 0;
        this.a = shape.a || 0;
        this.b = shape.b || 0;
        this.type = 'ellipse';
        this.name = '椭圆形';
    }
    rotateA() {
        var x1 = this.a * Math.cos(Math.PI / 2),
            y1 = this.b * Math.sin(Math.PI / 2),
            cos = Math.cos(this.angle),
            sin = Math.sin(this.angle),
            x2 = x1 * cos - y1 * sin,
            y2 = y1 * cos - x1 * sin;
        this.points[1] = { x: this.x - x2, y: this.y - y2 };
    }
    rotateB() {
        var x1 = this.a * Math.cos(0),
            y1 = this.b * Math.sin(0),
            cos = Math.cos(this.angle),
            sin = Math.sin(this.angle),
            x2 = x1 * cos - y1 * sin,
            y2 = y1 * cos - x1 * sin;
        this.points[0] = { x: this.x + x2, y: this.y - y2 };
    }
    initUpdate(start, end) {
        this.points[0] = end;
        this.a = Math.round(Math.sqrt(Math.pow(this.points[0].x - start.x, 2) + Math.pow(this.points[0].y - start.y, 2)));
        this.b = this.a / 2;
        this.angle = Math.atan2(this.points[0].y - this.y, this.points[0].x - this.x);
        this.rotateA();
    }
    update(i, pos) {
        if (i == 9999) {
            var that = this,
                x1 = pos.x - this.x,
                y1 = pos.y - this.y;
            this.points.forEach((p, i) => {
                that.points[i] = { x: p.x + x1, y: p.y + y1 };
            });
            this.x = pos.x;
            this.y = pos.y;
        } else {
            this.points[i] = pos;
            if (i == 0) {
                this.a = Math.round(Math.sqrt(Math.pow(this.points[0].x - this.x, 2) + Math.pow(this.points[0].y - this.y, 2)));
                this.angle = Math.atan2(this.points[0].y - this.y, this.points[0].x - this.x);
                this.rotateA();
            } else if (i == 1) {
                this.b = Math.round(Math.sqrt(Math.pow(this.points[1].x - this.x, 2) + Math.pow(this.points[1].y - this.y, 2)));
                this.angle = Math.PI / 2 + Math.atan2(this.points[1].y - this.y, this.points[1].x - this.x);
                this.rotateB();
            }
        }
    }
    createPath(ctx) {
        var k = .5522848,
            x = 0,
            y = 0,
            a = this.a,
            b = this.b,
            ox = a * k, // 水平控制点偏移量
            oy = b * k; // 垂直控制点偏移量
        ctx.beginPath();
        //从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
        ctx.moveTo(x - a, y);
        ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
        ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
        ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
        ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
        ctx.closePath();
    }
    isInPath(ctx, pos) {
        for (var i = 0, point, len = this.points.length; i < len; i++) {
            point = this.points[i];
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, Math.PI * 2, false);
            if (ctx.isPointInPath(pos.x, pos.y)) {
                return i;
            }
        }
        this.createPath(ctx);
        if (ctx.isPointInPath(pos.x - this.x, pos.y - this.y)) {
            return 9999;
        }
        return -1
    }
    draw(ctx) {
        ctx.save();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        this.createPath(ctx);
        ctx.stroke();
        if (this.isFill) {
            ctx.fill();
        }
        ctx.restore();
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
            angle: this.angle,
            a: this.a,
            b: this.b,
        }
    }
}

export default Ellipse;