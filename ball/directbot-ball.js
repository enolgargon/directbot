let canvas;
let ctx;
let appWidth;
let appHeight;

phrases = ["Yes", "No", "It will pass", "Count on it", "May be", "You're hot", "Ask again", "No doubt"];
numbers = {
  "up": 0,
  "down": 2,
  "right": 4,
  "left": 6
};

let colors = ['#ff00a2','#00baff','#ff6c00']; //try three colors!

// called by NOOPBOT on window.onload
function start_app() {

  // size canvas to window
  sizeCanvas();

  //fire a draw event.
  firstDraw();

  //redraw when canvas is clicked.
  canvas.addEventListener('click', draw);
}

function sizeCanvas() {
  appWidth = window.innerWidth;
  appHeight = window.innerHeight;
  canvas = document.getElementById('canvas');
  ctx = NOOPBOT_SETUP_CANVAS( { canvas: canvas, bgColor:'#f1f1f1' });
}

function firstDraw() {
  ctx.clearRect(0, 0, appWidth, appHeight);
  ctx.fillStyle = "#ff0000";
  ctx.font = "30px Arial";
  ctx.fillText("Make a question", 10, 50);
}

function draw() {
  //get the data!
  NOOPBOT_FETCH({
    API: 'directbot'
  }, drawSet);
}

function drawSet(responseJson) {
  ctx.clearRect(0, 0, appWidth, appHeight);
  let { directions } = responseJson;
  directions.forEach(function(direction) {
    drawDirection(ctx, direction);
  })
}

function drawDirection(ctx, direction) {
  ctx.font = "30px Arial";
  ctx.fillStyle = "#ff0000";
  var index = numbers[direction.direction] + (direction.speed < 50 ? 0 : 1);
  ctx.fillText(phrases[index], 10, 50);
}

// listen if browser changes size.
window.onresize = function(event){
  sizeCanvas();
  draw();
};
