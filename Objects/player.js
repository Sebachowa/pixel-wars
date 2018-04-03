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

Player.prototype.moveRight = function(p1, p2) {
  this.checkCollision(p1, p2);
  if (this.x + this.width + 10 < this.ctx.canvas.width) {
    this.x += 10;
    this.sword.x += 10;
  };
};

Player.prototype.moveLeft = function(p1, p2) {
  this.checkCollision(p1, p2);
  if (this.x > 10) {
    this.x -= 10;
    this.sword.x -= 10;
  };
};

Player.prototype.attack = function(p1, p2) {
  if (this.side === 'left') {
    this.x += 20
    this.sword.x += 70
    this.checkCollision(p1, p2);
    this.checkHit(p1, p2);
    this.actionDelay();
  } else if (this.side = 'right') {
    this.x -= 20;
    this.sword.x -= 70;
    this.checkCollision(p1, p2);
    this.checkHit(p1, p2);
    this.actionDelay();
  };
};

Player.prototype.checkCollision = function(p1, p2) {
  var swordTip1 = p1.sword.x + p1.width + p1.sword.height;
  var swordTip2 = p2.sword.x - p2.sword.height;
  var player2Body = p2.x;
  var player1Body = p1.x + p1.width;
  if (swordTip1 >= swordTip2 && p1.sword.y === p2.sword.y) {
    p1.x -= 20;
    p1.sword.x -= 20;
    p2.x += 20;
    p2.sword.x += 20;
  };
};

Player.prototype.checkHit = function(p1, p2) {
  var swordTip1 = p1.sword.x + p1.width + p1.sword.height;
  var swordTip2 = p2.sword.x - p2.sword.height;
  var player2Body = p2.x;
  var player1Body = p1.x + p1.width;
  
  if (swordTip1 >= player2Body) {
    p1.score++;
    p2.alive = false;

  };
  if (swordTip2 <= player1Body) {
    p2.score++;
    p1.alive = false;
  };
  console.log(p1.alive, p2.alive);
  console.log(p1.score, p2.score);
};

Player.prototype.draw = function() {
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
  this.sword.draw();
};

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

