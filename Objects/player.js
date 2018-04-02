'use strict';

function Player(ctx, x, y, height, width, side) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.alive = true;
  this.side = side;
  this.sword = new Sword(this.ctx, this.x, this.y, this.side);
  this.score = 0
};

Player.prototype.moveRight = function() {
  if (this.x + this.width + 20 < this.ctx.canvas.width) {
    this.x += 20;
    this.sword.x += 20;
  };
};

Player.prototype.moveLeft = function() {
  if (this.x > 20) {
    this.x -= 20;
    this.sword.x -=20;
  };
};

Player.prototype.attack = function() {
  if (this.side === 'left') {
    this.x += 20
    this.sword.x += 50
    // i should add a delay in here...
    this.sword.x -= 30;
  } else if (this.side = 'right') {
    this.x -= 20;
    this.sword.x -= 50;
    // i should add a delay in here...
    this.sword.x += 30;
  }
};

Player.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
  this.sword.draw();
};

Player.prototype.updateCanvas = function() {

};
