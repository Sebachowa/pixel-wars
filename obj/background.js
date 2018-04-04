function Background(ctx, x, y, height, width) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.drawScores();
}

Background.prototype.drawFloor = function() {
  // this.ctx.fillRect(this.x, this.y, this.height, this.width); 
  var img = new Image();
  img.src = "images/floor.png";
  this.ctx.drawImage(img, 0, 600);
};

Background.prototype.drawBack = function() {
  var img = new Image();
  img.src = "images/back.png";
  this.ctx.drawImage(img, -1, 0);
}

Background.prototype.drawScores = function() {
  _drawCircle(this.ctx, 100, 100);
  _drawCircle(this.ctx, 200, 100);
  _drawCircle(this.ctx, 300, 100);
  _drawCircle(this.ctx, 700, 100);
  _drawCircle(this.ctx, 800, 100);
  _drawCircle(this.ctx, 900, 100);
};

Background.prototype.updateScores = function(player1, player2) {
  if (player1.score === 1) {
    _drawColorCircle(this.ctx, 300, 100);
  } else if (player1.score === 2) {
    _drawColorCircle(this.ctx, 300, 100);
    _drawColorCircle(this.ctx, 200, 100);
  } else if (player1.score === 3) {
    _drawColorCircle(this.ctx, 300, 100);
    _drawColorCircle(this.ctx, 200, 100);
    _drawColorCircle(this.ctx, 100, 100);
  }
  if (player2.score === 1) {
    _drawColorCircle(this.ctx, 700, 100);
  } else if (player2.score === 2) {
    _drawColorCircle(this.ctx, 700, 100);
    _drawColorCircle(this.ctx, 800, 100);
  } else if (player2.score === 3) {
    _drawColorCircle(this.ctx, 700, 100);
    _drawColorCircle(this.ctx, 800, 100);
    _drawColorCircle(this.ctx, 900, 100);
  }
};

// PRIVATE FUNCTIONS

function _drawCircle(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, 2 * Math.PI, false);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#003300";
  ctx.stroke();
};

function _drawColorCircle(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, 2 * Math.PI, false);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#003300";
  ctx.stroke();
  ctx.fillStyle = "black";
};