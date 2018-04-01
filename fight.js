'use strict';

function Fight(ctx) {
  this.ctx = ctx;
  this.background = new Background(this.ctx, 0, 600, 1000, 200);
  this.player1 = new Player(this.ctx, 100, 520, 80, 40, 'left');
  this.player2 = new Player(this.ctx, 860, 520, 80, 40, 'right');
  this.draw();
};

Fight.prototype.draw = function() {
  this.background.drawFloor();
  this.player1.draw();
  this.player2.draw();
};

Fight.prototype.handleKeyDown = function(e) {
  switch (e.keyCode) {
    case 37:
    this.player2.moveLeft();
    break;
    case 39:
    this.player2.moveRight();
    break;
    case 40:
    if (this.player2.sword.y < this.player2.sword.minPositionY) {
      this.player2.sword.moveDown();
    } else {
    }
    break;
    case 38:
    if (this.player2.sword.y > this.player2.sword.maxPositionY) {
      this.player2.sword.moveUp();
    } else {
    }
    break;
    case 65:
    this.player1.moveLeft();
    break;
    case 68:
    this.player1.moveRight();
    break;
    case 83:
    if (this.player1.sword.y < this.player1.sword.minPositionY) {
      this.player1.sword.moveDown();
    } else {
    }
    break;
    case 87:
    if (this.player1.sword.y > this.player1.sword.maxPositionY) {
      this.player1.sword.moveUp();
    } else {
    }
    break;
  };
  this.updateCanvas();
};

Fight.prototype.updateCanvas = function() {
    this.ctx.clearRect(0, 0, 1000, 800);
    this.draw();
  };