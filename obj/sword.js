'use strict';

function Sword(ctx, initialX, initialY, side) {
  this.ctx = ctx;
  this.x = initialX;
  this.y = initialY;
  this.initialX = initialX;
  this.initialY = initialY;
  this.side = side
  this.maxPositionY = 500;
  this.minPositionY = 530;
  this.height = 80;
  this.width = 5;
  this.speed = 0;
  this.position = null;
  this.topPosition = 500;
  this.midPosition = 515;
  this.botPosition = 530;
};

Sword.prototype.moveUp = function() {
  this.y -= 15;
  _playAudio("sounds/swing.wav");
  if (this.y === this.topPosition) {
    this.position = "top";
  } else if (this.y === this.midPosition) {
    this.position = "mid";
  } else if (this.y === this.botPosition) {
    this.position = "bot";
  };
};

Sword.prototype.moveDown = function() {
  this.y += 15;
  _playAudio("sounds/swing.wav");
  if (this.y === this.topPosition) {
    this.position = "top";
  } else if (this.y === this.midPosition) {
    this.position = "mid";
  } else if (this.y === this.botPosition) {
    this.position = "bot";
  };
};

Sword.prototype.draw = function() {
  var x = this.x;
  var y = this.y;
  if (this.side === "left") {
    this.ctx.drawImage(_loadImage("images/sword-one.png"), this.x + 60, this.y + 20, 50, 5); // MAKE THIS READABLE!!!
  } else if (this.side === "right") {
    this.ctx.drawImage(_loadImage("images/sword-two.png"), this.x - 70, this.y + 20, 50, 5); // MAKE THIS READABLE!!!
  };
};