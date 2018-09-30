var canvas = document.getElementById('canvas')
var ctx= canvas.getContext('2d')
antoInitCanvas(canvas)
listenMouse(canvas)

var lastPoint = {'x':undefined,'y':undefined}

/********/ 
var eraserEnabled = false;
eraser.onclick = function(){
  eraserEnabled = true;
  actions.className = 'actions x'
}
brush.onclick = function(){
  eraserEnabled = false;
  actions.className = 'actions'
}



/********监听鼠标*********/ 
function listenMouse(canvas){

  var using = false
  canvas.onmousedown = function(e){
    var x = e.clientX
    var y = e.clientY
    using = true
    if(eraserEnabled){
      ctx.clearRect(x-5,y-5,10,10)
    }else{
    lastPoint = {'x':x,'y':y}      
    }
}
canvas.onmousemove = function(e){
    var x = e.clientX
    var y = e.clientY
    if(!using){return}
  if(eraserEnabled){
      ctx.clearRect(x-5,y-5,10,10)
  }else{
    var newPoint = {'x':x,'y':y}
    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
    lastPoint = newPoint
  }
 }
  canvas.onmouseup = function(e){
    using = false;
  }
}

/*********监听canvas事件*********/
function drawCircle(x,y){
  ctx.beginPath(x,y);
  ctx.fillStyle = 'black'
  ctx.arc(x, y, 1, 0, 2 * Math.PI);
  ctx.fill();
}
function drawLine(x1,y1,x2,y2){
  ctx.beginPath();
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 5;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();//问题
}
// 设置canvas并监听大小
function antoInitCanvas(canvas){
  initCanvas(canvas)
  window.onresize = function(){
  initCanvas(canvas)
  }
  function initCanvas(canvas){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

  canvas.width = pageWidth
  canvas.height = pageHeight
}
}
 
