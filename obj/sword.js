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
};

Sword.prototype.moveUp = function() {
  this.y -= 15;
  var audio = new Audio("sounds/swing.wav");
  audio.play();
  if (this.y === 500) {
    this.position = "top";
  } else if (this.y === 515) {
    this.position = "mid";
  } else if (this.y === 530) {
    this.position = "bot";
  };
};

Sword.prototype.moveDown = function() {
  this.y += 15;
  var audio = new Audio("sounds/swing.wav");
  audio.play();
  if (this.y === 500) {
    this.position = "top";
  } else if (this.y === 515) {
    this.position = "mid";
  } else if (this.y === 530) {
    this.position = "bot";
  };
};

Sword.prototype.draw = function() {
  var x = this.x;
  var y = this.y;
  if (this.side === "left") {
    var img = new Image();
    img.src = "images/sword-one.png";
    this.ctx.drawImage(img, this.x + 60, this.y + 20, 50, 5);
  } else if (this.side === "right") {
    var img = new Image();
    img.src = "images/sword-two.png";
    this.ctx.drawImage(img, this.x - 70, this.y + 20, 50, 5);
  };
};