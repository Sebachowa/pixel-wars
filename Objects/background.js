function Background(ctx, x, y, height, width) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.drawScores();
}

Background.prototype.drawFloor = function() {
  this.ctx.fillRect(this.x, this.y, this.height, this.width); 
};

Background.prototype.drawScores = function() {
  this.ctx.fillRect(50, 50, 50, 50);
  this.ctx.fillRect(150, 50, 50, 50);
  this.ctx.fillRect(250, 50, 50, 50);
  this.ctx.fillRect(900, 50, 50, 50);
  this.ctx.fillRect(800, 50, 50, 50);
  this.ctx.fillRect(700, 50, 50, 50);
};