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
  this.checkCollision();
  // requestAnimationFrame(this.draw);
};

Fight.prototype.checkCollision = function() {
  var swordTip1 = this.player1.x + this.player1.width + this.player1.sword.height;
  var swordTip2 = this.player2.x - this.player2.sword.height;
  var player1Body = this.player1.x + this.player1.width;
  var player2Body = this.player2.x;

  if (swordTip1 >= swordTip2 && this.player1.sword.y === this.player2.sword.y) {
    this.player1.x -= 20;
    this.player1.sword.x -= 20;
    this.player2.x += 20;
    this.player2.sword.x += 20;
  };
};

Fight.prototype.handleKeyDown = function(e) {
  switch (e.keyCode) {
    case 75:
    this.player2.moveLeft();
    break;
    case 186:
    this.player2.moveRight();
    break;
    case 74:
    this.player2.attack();
    break;
    case 76:
    if (this.player2.sword.y < this.player2.sword.minPositionY) {
      this.player2.sword.moveDown();
    };
    break;
    case 79:
    if (this.player2.sword.y > this.player2.sword.maxPositionY) {
      this.player2.sword.moveUp();
    };
    break;

    case 65:
    this.player1.moveLeft();
    break;
    case 68:
    this.player1.moveRight();
    break;
    case 70:
    this.player1.attack();
    break;
    case 83:
    if (this.player1.sword.y < this.player1.sword.minPositionY) {
      this.player1.sword.moveDown();
    };
    break;
    case 87:
    if (this.player1.sword.y > this.player1.sword.maxPositionY) {
      this.player1.sword.moveUp();
    };
    break;
  };
  this.updateCanvas();
};

Fight.prototype.updateCanvas = function() {
    this.ctx.clearRect(0, 0, 1000, 800);
    this.draw();
  };