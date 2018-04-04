'use strict';

function Fight(ctx, callback,keyDownCb) {
  this.ctx = ctx;
  this.background = new Background(this.ctx, 0, 600, 1000, 200);
  this.player1 = new Player(this.ctx, 100, 520, 80, 40, 'left', keyDownCb);
  this.player2 = new Player(this.ctx, 860, 520, 80, 40, 'right', keyDownCb);
  this.cb = callback;
  this.keyDownCb = keyDownCb;
  this.ended = false;
  this.doFrame();
};


Fight.prototype.doFrame = function() {
  var self = this;
  this.checkIfEnded(this.cb);
  this.player1.update(this.player2);
  this.player2.update(this.player1);
  this.clearCanvas();
  this.background.drawFloor();
  this.player1.draw();
  this.player2.draw();
  this.background.updateScores(this.player1, this.player2);
  // this.checkHit
  if (this.player1.alive === false || this.player2.alive === false) {
    setTimeout(function() {
      self.resetPlayerPosition(self.player1);
      self.resetPlayerPosition(self.player2);
      window.addEventListener("keydown", self.keyDownCb);
    }, 1000);
  };
  requestAnimationFrame(function () {
    if (!self.ended) {
      self.doFrame();
    }
  });
};

// checkhit
// tell playetrs, likre score and shit
//   disable keys


Fight.prototype.checkIfEnded = function(cb) {
  if (this.player1.score === 3 || this.player2.score === 3) {
    this.ended = true;
    cb(this);
  };
};


Fight.prototype.resetPlayerPosition = function(player) {
  player.alive = true;
  player.x = player.initialX;
  player.y = player.initialY;
  player.sword.x = player.sword.initialX;
  player.sword.y = player.sword.initialY;
};

Fight.prototype.handleKeyDown = function(e) {
  // if disabled keys
  //   return
  switch (e.keyCode) {
    
    // Player 1 movement - Key binding
    case 65:
    this.player1.setSpeed(5);
    this.player1.setDirection('left');
    break;
    case 68:
    this.player1.setSpeed(5);
    this.player1.setDirection('right');
    break;
    case 69:
    this.player1.attack(this.player2);
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
    this.player2.setSpeed(5);
    this.player2.setDirection("left");
    break;
    case 186:
    this.player2.setSpeed(5);
    this.player2.setDirection("right");
    break;
    case 73:
    this.player2.attack(this.player1);
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

Fight.prototype.handleKeyUp = function(e) {
  switch (e.keyCode) {
    
    // Player 1 movement - Key binding
    case 65:
    this.player1.setSpeed(0);
    this.player1.setDirection('left');
    break;
    case 68:
    this.player1.setSpeed(0);
    this.player1.setDirection('right');
    break;
    
    // Player 2 movement - Key binding
    case 75:
    this.player2.setSpeed(0);
    this.player2.setDirection("left");
    break;
    case 186:
    this.player2.setSpeed(0);
    this.player2.setDirection("right");
    break;
  };
};

Fight.prototype.clearCanvas = function() {
  this.ctx.clearRect(0, 0, 1000, 800);
};

// PRIVATE METHOD
  setTimeout(function() {
    if (self.side === "left") {
      self.sword.x -= 50;
    } else if (self.side === "right") {
      self.sword.x += 50;
    }
  }, 150);