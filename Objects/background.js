function Background(ctx, x, y, height, width) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
}

Background.prototype.drawFloor = function() {
  this.ctx.fillRect(this.x, this.y, this.height, this.width); 
};
