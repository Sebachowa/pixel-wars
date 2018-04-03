'use strict';

function Fight(ctx) {
  this.ctx = ctx;
  this.background = new Background(this.ctx, 0, 600, 1000, 200);
  this.player1 = new Player(this.ctx, 100, 520, 80, 40, 'left');
  this.player2 = new Player(this.ctx, 860, 520, 80, 40, 'right');
  this.draw();
};

Fight.prototype.draw = function() {
  var self = this;
  this.updateCanvas();
  this.background.drawFloor();
  this.background.drawScores();
  this.player1.draw();
  this.player2.draw();
  // Reset position of the player, after a timeout y
  requestAnimationFrame(function () {
    self.draw();
  });
};

Fight.prototype.handleKeyDown = function(e) {
  switch (e.keyCode) {

    // Player 1 movement - Key binding
    case 65:
    this.player1.moveLeft(this.player1, this.player2);
    break;
    case 68:
    this.player1.moveRight(this.player1, this.player2);
    break;
    case 70:
    this.player1.attack(this.player1, this.player2);
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

    // Player 2 movement - Key binding
    case 75:
    this.player2.moveLeft(this.player1, this.player2);
    break;
    case 186:
    this.player2.moveRight(this.player1, this.player2);
    break;
    case 74:
    this.player2.attack(this.player1, this.player2);
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
  };
};

Fight.prototype.updateCanvas = function() {
    this.ctx.clearRect(0, 0, 1000, 800);
  };