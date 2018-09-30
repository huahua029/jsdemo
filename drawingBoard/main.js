var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
antoInitCanvas(canvas)
listenToUser(canvas)

var lastPoint = {
  'x': undefined,
  'y': undefined
}

/********/
var eraserEnabled = false;
pen.onclick = function() {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function() {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
}

/*****更换画笔粗细*******/
var lineWidth = 4;
thin.onclick = function() {
  lineWidth = 4;
  thin.classList.add('active')
  wide.classList.remove('active')
}
wide.onclick = function() {
  lineWidth = 8;
  wide.classList.add('active')
  thin.classList.remove('active')
}

/**********更换颜色**********/
black.onclick = function() {
  ctx.fillStyle = 'black'
  ctx.strokeStyle = 'black'
  black.classList.add('active')
  blue.classList.remove('active')
  green.classList.remove('active')
  red.classList.remove('active')
}
red.onclick = function() {
  ctx.fillStyle = 'red'
  ctx.strokeStyle = 'red'
  red.classList.add('active')
  black.classList.remove('active')
  blue.classList.remove('active')
  green.classList.remove('active')
}
green.onclick = function() {
  ctx.fillStyle = 'green'
  ctx.strokeStyle = 'green'
  green.classList.add('active')
  blue.classList.remove('active')
  red.classList.remove('active')
  black.classList.remove('active')
}
blue.onclick = function() {
  ctx.fillStyle = 'blue'
  ctx.strokeStyle = 'blue'
  blue.classList.add('active')
  red.classList.remove('active')
  black.classList.remove('active')
  green.classList.remove('active')
}
/*******删除*******/
clear.onclick = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}
/*******保存*******/
down.onclick = function() {
  down.href = canvas.toDataURL()
  down.download = "mypainting.png"
}

/********监听鼠标*********/
/*********特性检测********/

function listenToUser(canvas) {
  var using = false
  if (document.body.ontouchstart !== undefined) { //判断设备
    //触屏设备
    canvas.ontouchstart = function(e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      using = true
      if (eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          'x': x,
          'y': y
        }
      }
    }
    canvas.ontouchmove = function(e) {
      var x = e.touches[0].clientX
      var y = e.touches[0].clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          'x': x,
          'y': y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function() {
      using = false;
    }
  } else {
    //非触屏
    canvas.onmousedown = function(e) {
      var x = e.clientX
      var y = e.clientY
      using = true
      if (eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          'x': x,
          'y': y
        }
      }
    }
    canvas.onmousemove = function(e) {
      var x = e.clientX
      var y = e.clientY
      if (!using) {
        return
      }
      if (eraserEnabled) {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = {
          'x': x,
          'y': y
        }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function(e) {
      using = false;
    }
  }
}

/*********监听canvas事件*********/
function drawCircle(x, y) {
  ctx.beginPath(x, y);
  ctx.arc(x, y, 1, 0, 2 * Math.PI);
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke(); //问题
}
// 设置canvas并监听大小
function antoInitCanvas(canvas) {
  initCanvas(canvas)
  window.onresize = function() {
    initCanvas(canvas)
  }

  function initCanvas(canvas) {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}