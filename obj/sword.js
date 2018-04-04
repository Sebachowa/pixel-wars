'use strict';

function Sword(ctx, initialX, initialY, side) {
  this.ctx = ctx;
  this.x = initialX;
  this.y = initialY;
  this.initialX = initialX;
  this.initialY = initialY;
  this.side = side
  this.maxPositionY = 520;
  this.minPositionY = 560;
  this.height = 50;
  this.width = 5;
  this.speed = 0;
};

Sword.prototype.moveUp = function() {
  this.y -= 20;
};

Sword.prototype.moveDown = function() {
  this.y += 20;
};

Sword.prototype.draw = function() {
  if (this.side === 'left') {
    this.ctx.fillRect(this.x + 40, this.y + 20, this.height, this.width);
  } else if (this.side === 'right') {
    this.ctx.fillRect(this.x - 50, this.y + 20, this.height, this.width);
  };
};

Sword.prototype.updateCanvas = function() {

};