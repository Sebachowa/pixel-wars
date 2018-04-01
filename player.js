'use strict';

function Player(ctx, x, y, height, width, side) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.alive = true;
  this.side = side;
  this.sword = new Sword(this.ctx, this.x, this.y, this.side)
};

Player.prototype.moveRight = function() {
  this.x += 20;
  this.sword.x += 20;
};

Player.prototype.moveLeft = function() {
  this.x -= 20;
  this.sword.x -=20;
};

Player.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
  this.sword.draw();
};

Player.prototype.updateCanvas = function() {

};