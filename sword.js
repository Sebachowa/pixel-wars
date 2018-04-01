'use strict';


// var sword = {
//     x: player.x + 40,
//     y: player.y + 20,
//     maxPositionY: player.y + 10,
//     minPositionY: player.y + 60,
//     height: 50,
//     width: 5,
//     moveSwordDown: function () {
//       this.y += 10;
//     },
//     moveSwordUp: function () {
//       this.y -= 10;
//     },
//     moveRight: function() {
//       this.x += 20;
//     },
//     moveLeft: function() {
//       this.x -= 20;
//     },
//     attack: function() {      
//       this.x += 30;
//       this.x -= 30;
//     }
//   }

function Sword(ctx, x, y, side) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.side = side
  this.maxPositionY = 520;
  this.minPositionY = 560;
  this.height = 50;
  this.width = 5;
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