/**
 * 实现图形基类，这个是最重要的部分。因为不管是线条，多边形都会继承该类
 * 注意：isPointInPath非常有用，就是这个api实现鼠标是否选中的功能了，它的原理就是调用上下文context绘制路径，
 * 然后向isPointInPath传递位置(x,y)信息，该api会返回这个点是否在绘制路径上，
 * 相当于绘制的是隐形的路径进行判断点是否在该路径或图形内部，这也是我要把绘制路径和渲染的功能分离开的原因
 */
class Graph {
    //初始化图形需要用到的属性，位置，顶点列表，边的宽度，描边颜色，填充颜色，是否填充；
    constructor(pos, shape) {
        shape = shape || {};
        this.x = pos.x;
        this.y = pos.y;
        this.index = shape.index;
        this.points = shape.points || [];
        this.sides = shape.sides || 5;
        this.stars = shape.stars || 5;
        this.lineWidth = shape.lineWidth || 1;
        this.strokeStyle = shape.strokeStyle || '#f00';
        this.fillStyle = shape.fillStyle || '#f00';
        this.isFill = shape.isFill || false;
    };
    //实现绘制时的拖拽
    initUpdate(start, end) {
        this.points[1] = end;
        this.x = (start.x + end.x) / 2;
        this.y = (start.y + end.y) / 2;
    };
    //实现修改模式下的拖拽顶点和控制点
    update(i, pos) {
        if (i == 9999) {
            var that = this,
                x1 = pos.x - this.x,
                y1 = pos.y - this.y;
            this.points.forEach((p, i) => {
                that.points[i] = { x: p.x + x1, y: p.y + y1 };
            });
            this.x = Math.round(pos.x);
            this.y = Math.round(pos.y);
        } else {
            this.points[i] = pos;
            var x = 0,
                y = 0;
            this.points.forEach(p => {
                x += p.x;
                y += p.y;
            });
            this.x = Math.round(x / this.points.length);
            this.y = Math.round(y / this.points.length);
        }
    };
    //绘制路径
    createPath(ctx) {
        ctx.beginPath();
        this.points.forEach((p, i) => {
            ctx[i == 0 ? 'moveTo' : 'lineTo'](p.x, p.y);
        });
        ctx.closePath();
    };
    //判断鼠标是否选中对应的图形，选中哪个顶点，选中哪个控制点，中心点；
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
        if (ctx.isPointInPath(pos.x, pos.y)) {
            return 9999;
        }
        return -1
    };
    //绘制控制点
    drawController(ctx) {
        this.drawPoints(ctx);
        //this.drawCenter(ctx);
    };
    //绘制顶点
    drawPoints(ctx) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#00BFF3';
        this.points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1, 0, Math.PI * 2, false);
            ctx.stroke();
        });
        ctx.restore();
    };
    //绘制中心点
    drawCenter(ctx) {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'hsla(60,100%,45%,1)';
        ctx.fillStyle = 'hsla(60,100%,50%,1)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    };
    //绘制整个图形
    draw(ctx) {
        ctx.save();
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.globalCompositeOperation = "destination-out";
        ctx.globalAlpha = 1; //设置不透明
        this.createPath(ctx);
        if (this.isFill) { ctx.fill(); }
        ctx.stroke();
        ctx.restore();
    };

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
            isFill: this.isFill
        }
    }
}

export default Graph;