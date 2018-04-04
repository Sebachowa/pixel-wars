'use strict';

function Player(ctx, initialX, initialY, height, width, side, callback) {
  this.ctx = ctx;
  this.x = initialX;
  this.y = initialY;
  this.initialX = initialX;
  this.initialY = initialY;
  this.height = height;
  this.width = width;
  this.alive = true;
  this.side = side;
  this.sword = new Sword(this.ctx, this.x, this.y, this.side);
  this.score = 0
  this.callback = callback;
  this.attacked = false;
  this.speed = 0;
  this.direction = null;
};

Player.prototype.update = function(opponent) {
  switch (this.direction) {
    case "right":
      this.moveRight(opponent);
      break;
    case "left":
      this.moveLeft(opponent);
      break;
  };
};

Player.prototype.setSpeed = function(speed) {
  this.speed = speed;
  this.sword.speed = speed;
};

Player.prototype.setDirection = function(direction) {
  this.direction = direction;
};

Player.prototype.moveRight = function(opponent) {
  if (this.side === "left") {
    this.checkCollisionPlayer1(opponent);
    if (this.x + this.width + 60 < this.ctx.canvas.width) {
      this.x += this.speed;
      this.sword.x += this.sword.speed;
    };
  } else if (this.side === "right") {
    this.checkCollisionPlayer2(opponent);
    if (this.x + this.width + 10 < this.ctx.canvas.width) {
      this.x += this.speed;
      this.sword.x += this.sword.speed;
    };
  };
};

Player.prototype.moveLeft = function(opponent) {
  if (this.side === "left") {
    this.checkCollisionPlayer1(opponent);
    if (this.x > 10) {
      this.x -= this.speed;
      this.sword.x -= this.sword.speed;
    };
  } else if (this.side === "right") {
    this.checkCollisionPlayer2(opponent);
    if (this.x > 10) {
      this.x -= this.speed;
      this.sword.x -= this.sword.speed;
    };
  };
};

Player.prototype.attack = function(opponent) {
  if (this.side === 'left') {
    this.x += 20;
    this.sword.x += 70;
    this.checkCollisionPlayer1(opponent);
    this.checkHitPlayer1(opponent);
    this.actionDelay();
  } else if (this.side === 'right') {
    this.x -= 20;
    this.sword.x -= 70;
    this.checkCollisionPlayer2(opponent);
    this.checkHitPlayer2(opponent);
    this.actionDelay();
  };
};

Player.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
  this.sword.draw();
};



// PRIVATE METHODS
Player.prototype.checkCollisionPlayer1 = function(opponent) {
  var swordTip = this.sword.x + this.width + this.sword.height;
  var swordTipOpponent = opponent.sword.x - opponent.sword.height;
  if (swordTip >= swordTipOpponent && this.sword.y === opponent.sword.y) {
    this.x -= 20;
    this.sword.x -= 20;
    opponent.x += 20;
    opponent.sword.x += 20;
  };
};

Player.prototype.checkCollisionPlayer2 = function(opponent) {
  var swordTip = this.sword.x - this.sword.height;
  var swordTipOpponent = opponent.sword.x + opponent.width + opponent.sword.height;
  if (swordTip <= swordTipOpponent && this.sword.y === opponent.sword.y) {
    this.x += 20;
    this.sword.x += 20;
    opponent.x -= 20;
    opponent.sword.x -= 20;
  };
};

Player.prototype.checkHitPlayer1 = function(opponent) {
  var swordTip = this.sword.x + this.width + this.sword.height;
  var BodyOpponent = opponent.x;
  if (swordTip >= BodyOpponent) {
    this.score++;
    opponent.alive = false;
    window.removeEventListener("keydown", this.callback);
  };
}; 

Player.prototype.checkHitPlayer2 = function(opponent) {
  var swordTip = this.sword.x - this.sword.height;
  var BodyOpponent = opponent.x + opponent.width;
  if (swordTip <= BodyOpponent) {
    this.score++;
    opponent.alive = false;
    window.removeEventListener("keydown", this.callback);  
  };
};

//HELPER FUNCTION (otra archivo utilities.js OOP armar object utilities)

Player.prototype.actionDelay = function() {
  var self = this;
  setTimeout(function() {
    if (self.side === "left") {
      self.sword.x -= 50;
    } else if (self.side === "right") {
      self.sword.x += 50;
    };
  }, 150);
};
