import $ from 'jquery';
//画布
let canvas = null;
let context = null;
//蒙版
let canvas_bak = null;
let context_bak = null;
//画布宽高
let canvasWidth = 960;
let canvasHeight = 580;
//画布位置
let canvasTop = 0;
let canvasLeft = 0;
//画笔大小、颜色
let size = 1;
let color = '#000000';

//撤销相关撤销
let cancelList = [];
let cancelIndex = 0;

//画图形
let draw_graph = function(graphType, obj) {
    //把蒙版放于画板上面
    $("#canvas_bak").css("z-index", 1);
    //先画在蒙版上 再复制到画布上
    chooseImg(obj);
    let scroolTop = 0;
    let scroolLeft = 0;
    let canDraw = false;

    let startX;
    let startY;

    //鼠标按下获取 开始xy开始画图
    let mousedown = function(e) {
        scroolTop = $(window).scrollTop();
        scroolLeft = $(window).scrollLeft();
        canvasTop = $(canvas).offset().top - scroolTop;
        canvasLeft = $(canvas).offset().left - scroolLeft

        context.strokeStyle = color;
        context_bak.strokeStyle = color;
        context_bak.lineWidth = size;

        startX = e.clientX - canvasLeft;
        startY = e.clientY - canvasTop;
        context_bak.moveTo(startX, startY);
        canDraw = true;

        if (graphType == 'pencil') {
            context_bak.beginPath();
        } else if (graphType == 'circle') {
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(startX + 1, startY + 1);
            context.stroke();
        } else if (graphType == 'rubber') {
            context.clearRect(startX - size * 10, startY - size * 10, size * 20, size * 20);
        }
        // 阻止点击时的cursor的变化，draw
        e = e || window.event;
        e.preventDefault();
    };

    //鼠标离开 把蒙版canvas的图片生成到canvas中
    let mouseup = function(e) {
        e = e || window.event;
        canDraw = false;
        let image = new Image();
        if (graphType != 'rubber') {
            image.src = canvas_bak.toDataURL();
            image.onload = function() {
                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
                clearContext();
                saveImageToAry();
            };
            // 遗留的小尾巴
            // let x = e.clientX - canvasLeft;
            // let y = e.clientY - canvasTop;
            // context.beginPath();
            // context.moveTo(x, y);
            // context.lineTo(x + 2, y + 2);
            // context.stroke();
        }
    };

    //选择功能按钮 修改样式
    function chooseImg(obj) {
        let imgAry = $(".draw_controller li");
        for (let i = 0; i < imgAry.length; i++) {
            $(imgAry[i]).removeClass('active');
            $(imgAry[i]).addClass('normal');
        }
        $(obj).removeClass("normal");
        $(obj).addClass("active");
    }

    // 鼠标移动
    let mousemove = function(e) {
        scroolTop = $(window).scrollTop();
        scroolLeft = $(window).scrollLeft();
        canvasTop = $(canvas).offset().top - scroolTop;
        canvasLeft = $(canvas).offset().left - scroolLeft;
        e = e || window.event;
        let x = e.clientX - canvasLeft;
        let y = e.clientY - canvasTop;
        //方块  4条直线搞定
        if (graphType == 'square') {
            if (canDraw) {
                context_bak.beginPath();
                clearContext();
                context_bak.moveTo(startX, startY);
                context_bak.lineTo(x, startY);
                context_bak.lineTo(x, y);
                context_bak.lineTo(startX, y);
                context_bak.lineTo(startX, startY);
                context_bak.stroke();
            }
            //直线
        } else if (graphType == 'line') {
            if (canDraw) {
                context_bak.beginPath();
                clearContext();
                context_bak.moveTo(startX, startY);
                context_bak.lineTo(x, y);
                context_bak.stroke();
            }
            //画笔
        } else if (graphType == 'pencil') {
            if (canDraw) {
                context_bak.lineTo(e.clientX - canvasLeft, e.clientY - canvasTop);
                context_bak.stroke();
            }
            //圆 未画得时候 出现一个小圆
        } else if (graphType == 'circle') {
            clearContext();
            if (canDraw) {
                // 鼠标点击移动时产生的圆
                context_bak.beginPath();
                let radii = Math.sqrt((startX - x) * (startX - x) + (startY - y) * (startY - y));
                context_bak.arc(startX, startY, radii, 0, Math.PI * 2, false);
                context_bak.stroke();
            } else {
                context_bak.beginPath();
                context_bak.arc(x, y, 20, 0, Math.PI * 2, false);
                context_bak.stroke();
            }
            //涂鸦 未画得时候 出现一个小圆
        } else if (graphType == 'handwriting') {
            if (canDraw) {
                // 鼠标点击移动产生的圆圈
                context_bak.beginPath();
                context_bak.strokeStyle = color;
                context_bak.fillStyle = color;

                //计算当前点和上一个点的距离
                let tmpX = x - startX;
                let tmpY = y - startY;
                let dist = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2));
                dist = Math.round(dist);

                //定义递增点
                let ix = tmpX / dist;
                let iy = tmpY / dist;

                //定义绘制点
                let currX = startX;
                let currY = startY;
                for (let i = 0; i < dist; i++) {
                    context_bak.arc(currX, currY, size * 10, 0, Math.PI * 2, false);
                    currX += ix;
                    currY += iy;
                }

                context_bak.fill();
                context_bak.stroke();
                context_bak.restore();

                //保存上一次的点
                startX = x;
                startY = y;
            } else {
                clearContext();
                context_bak.beginPath();
                context_bak.strokeStyle = color;
                context_bak.fillStyle = color;
                context_bak.arc(x, y, size * 10, 0, Math.PI * 2, false);
                context_bak.fill();
                context_bak.stroke();
            }
            //橡皮擦 不管有没有在画都出现小方块 按下鼠标 开始清空区域
        } else if (graphType == 'rubber') {
            context_bak.lineWidth = 1;
            clearContext();
            context_bak.beginPath();
            context_bak.strokeStyle = '#000000';
            context_bak.moveTo(x - size * 10, y - size * 10);
            context_bak.lineTo(x + size * 10, y - size * 10);
            context_bak.lineTo(x + size * 10, y + size * 10);
            context_bak.lineTo(x - size * 10, y + size * 10);
            context_bak.lineTo(x - size * 10, y - size * 10);
            context_bak.stroke();
            if (canDraw) {
                context.clearRect(x - size * 10, y - size * 10, size * 20, size * 20);
            }
        }
    };

    //鼠标离开区域以外 除了涂鸦 都清空
    let mouseout = function() {
        if (graphType != 'handwriting') {
            clearContext();
        }
    }

    $(canvas_bak).unbind();
    $(canvas_bak).bind('mousedown', mousedown);
    $(canvas_bak).bind('mousemove', mousemove);
    $(canvas_bak).bind('mouseup', mouseup);
    $(canvas_bak).bind('mouseout', mouseout);
}


//清空层
let clearContext = function(type) {
    if (!type) {
        context_bak.clearRect(0, 0, canvasWidth, canvasHeight);
    } else {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context_bak.clearRect(0, 0, canvasWidth, canvasHeight);
    }
}

//展开线条大小选择器
let showLineSize = function(obj) {
    if ($("#line_size").is(":hidden")) {
        let top = $(obj).offset().top + 40;
        let left = $(obj).offset().left - 10;
        $("#line_size")[0].style.left = left + "px";
        $("#line_size")[0].style.top = top + "px";
        $("#line_size").show();
    } else {
        $("#line_size").hide();
    }
}

//保存历史 用于撤销
let saveImageToAry = function() {
    cancelIndex = 0;
    let dataUrl = canvas.toDataURL();
    cancelList.push(dataUrl);
}

// 填充前景
let fill = function() {
    context.fillStyle = color;
    context_bak.fillStyle = color;
    let $canvas = $("#canvas"),
        w = $canvas.width(),
        h = $canvas.height();
    context.fillRect(0, 0, w, h);

    let image = new Image();
    image.src = canvas_bak.toDataURL();
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
    clearContext();
    saveImageToAry();
}


//撤销上一个操作
let cancel = function() {
    cancelIndex++;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    let image = new Image();
    let index = cancelList.length - 1 - cancelIndex;
    let url = cancelList[index];
    image.src = url;
    image.onload = function() {
        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
    }
}

//重做上一个操作
let next = function() {
    cancelIndex--;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    let image = new Image();
    let index = cancelList.length - 1 - cancelIndex;
    let url = cancelList[index];
    image.src = url;
    image.onload = function() {
        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvasWidth, canvasHeight);
    }
}

let init = function() {
    // 绑定绘画板工具
    $(document).on("click", ".pencil", function() {
        draw_graph('pencil', this);
    });
    $(document).on("click", ".handwriting", function() {
        draw_graph('handwriting', this);
    });
    $(document).on("click", ".showLine", function() {
        showLineSize(this);
    });

    $(document).on("click", ".rubber", function() {
        draw_graph('rubber', this);
    });
    $(document).on("click", ".drawLine", function() {
        draw_graph('line', this);
    });
    $(document).on("click", ".square", function() {
        draw_graph('square', this);
    });
    $(document).on("click", ".circle", function() {
        draw_graph('circle', this);
    });
    $(document).on("click", ".fill", function() {
        fill(this);
    });
    $(document).on("click", ".cancel", function() {
        cancel(this);
    });
    $(document).on("click", ".next", function() {
        next(this);
    });
    $(document).on("click", ".clearContext", function() {
        clearContext('1');
    });
    $(document).on("click", ".save", function() {
        save();
        $("body,html").animate({ scrollTop: 550 }, 200);
    });
    $(document).on("click", ".downloadImage", function() {
        downloadImage();
    });

    // 初始化铅笔工具
    $(".draw_controller li:first").click();

    // 选择线条大小
    $(".line_size button").click(function() {
        $(".line_size button").removeClass('current');
        $(this).addClass('current');
        $("#line_size").hide();
        size = $(this).data("value");
    });

    // 隐藏线条宽度板
    $(".line").hover(function() {
        showLineSize($(this)[0]);
    }, function() {
        var ss = setTimeout(function() {
            $(".line_size").fadeOut(200);
        }, 100);
        $(".line_size").hover(function() {
            $(".line_size").show();
            clearTimeout(ss);
        }, function() {
            $(".line_size").fadeOut(200);
        });
    });
}

export default function() {
    canvas = document.getElementById("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    context = canvas.getContext('2d');

    canvasTop = $(canvas).offset().top;
    canvasLeft = $(canvas).offset().left;
    canvas_bak = document.getElementById("canvas_bak");
    canvas_bak.width = canvasWidth;
    canvas_bak.height = canvasHeight;
    context_bak = canvas_bak.getContext('2d');
    init();
}