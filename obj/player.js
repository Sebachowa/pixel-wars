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
  this.levitationAnimationFrame = 0;
  this.swordEnergyAnimationFrame = 0;
  this.floorSmokeAnimationFrame = 0;
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
    this.sword.x += 80;
    _playAudio("sounds/attack.wav");
    this.checkCollisionPlayer1(opponent);
    this.checkHitPlayer1(opponent);
    this.actionDelay();
  } else if (this.side === 'right') {
    this.x -= 20;
    this.sword.x -= 80;
    _playAudio("sounds/attack.wav");
    this.checkCollisionPlayer2(opponent);
    this.checkHitPlayer2(opponent);
    this.actionDelay();
  };
};

Player.prototype.draw = function() {
  this.drawCharacterEnergy();
  this.drawSwordEnergy();
  this.sword.draw();
  this.drawCharacter(this.x, this.y, this.width, this.height);
  this.drawFloorSmoke();
};

Player.prototype.drawCharacter = function(x, y, width, height) {
  var frameWidth = 66;
  var frameHeight = 106;
  var playerX = (this.side === "left" ? x-15 : x-10);
  var playerY = y - 20;
  var playerWidth = 66;
  var playerHeight = 106; 
  if (this.side === "left") {
    this.ctx.drawImage(_loadImage("images/player-one.png"), 0, 0, frameWidth, frameHeight, playerX, playerY, playerWidth, playerHeight);
  } else if (this.side === "right") {
    this.ctx.drawImage(_loadImage("images/player-two.png"), 0, 0, frameWidth, frameHeight, playerX, playerY, playerWidth, playerHeight);
  };
};

Player.prototype.drawCharacterEnergy = function () {
  if (this.side === "left") {
    var img = _loadImage("images/energy-one.png");
  } else if (this.side === "right") {
    var img = _loadImage("images/energy-two.png");
  };
  var cutPosition = this.levitationAnimationFrame * 90;
  if (this.levitationAnimationFrame === 10) {
    this.levitationAnimationFrame = 0;
  };
  this.ctx.drawImage(img, cutPosition, 0, 90, 145, this.x-25, this.y-40, 90, 145);
  this.levitationAnimationFrame++;
};

Player.prototype.drawSwordEnergy = function() {
  if (this.side === "left") {
    var img = _loadImage("images/sword-energy-one.png");
    var x = this.sword.x + 55;
    var y = this.sword.y + 18;
  } else if (this.side === "right") {
    var img = _loadImage("images/sword-energy-two.png");
    var x = this.sword.x - 85;
    var y = this.sword.y + 18;
  };
  var cutPosition = this.swordEnergyAnimationFrame * 300;
  if (this.swordEnergyAnimationFrame === 20) {
    this.swordEnergyAnimationFrame = 0;
  };
  this.ctx.drawImage(img, cutPosition, 0, 300, 30, x, y, 55, 8);
  this.swordEnergyAnimationFrame++;
};

Player.prototype.drawFloorSmoke = function () {
  var playerX = this.x - 30;
  var playerY = this.y + 65;
  var cutPosition = this.floorSmokeAnimationFrame * 100;
  if (this.floorSmokeAnimationFrame === 11) {
    this.floorSmokeAnimationFrame = 0;
  };
  this.ctx.drawImage(_loadImage("images/floor-smoke.png"), cutPosition, 0, 100, 50, playerX, playerY, 100, 50);
  this.floorSmokeAnimationFrame++;
};


// ---------- PRIVATE METHODS ----------

Player.prototype.checkCollisionPlayer1 = function(opponent) {

  var swordTip = this.sword.x + this.width + this.sword.height - 25;
  var swordTipOpponent = opponent.sword.x - opponent.sword.height;
  if (swordTip >= swordTipOpponent && this.sword.y === opponent.sword.y) {
    var audio = new Audio("sounds/sword-hit.wav");
    audio.play();
    this.x -= 20;
    this.sword.x -= 20;
    opponent.x += 20;
    opponent.sword.x += 20;
  };
};

Player.prototype.checkCollisionPlayer2 = function(opponent) {
  var swordTip = this.sword.x - this.sword.height + 25;
  var swordTipOpponent = opponent.sword.x + opponent.width + opponent.sword.height;
  if (swordTip <= swordTipOpponent && this.sword.y === opponent.sword.y) {
    var audio = new Audio("sounds/sword-hit.wav");
    audio.play();
    this.x += 20;
    this.sword.x += 20;
    opponent.x -= 20;
    opponent.sword.x -= 20;
  };
};

Player.prototype.checkHitPlayer1 = function(opponent) {
  var swordTip = this.sword.x + this.width + this.sword.height;
  var BodyOpponent = opponent.x - 10;
  if (swordTip >= BodyOpponent) {
    this.score++;
    var audio = new Audio("sounds/death.wav");
    audio.play();
    opponent.alive = false;
    window.removeEventListener("keydown", this.callback);
  };
}; 

Player.prototype.checkHitPlayer2 = function(opponent) {
  var swordTip = this.sword.x - this.sword.height;
  var BodyOpponent = opponent.x + opponent.width + 10;
  if (swordTip <= BodyOpponent) {
    this.score++;
    var audio = new Audio("sounds/death.wav");
    audio.play();
    opponent.alive = false;
    window.removeEventListener("keydown", this.callback);  
  };
};

Player.prototype.actionDelay = function() {
  var self = this;
  setTimeout(function() {
    if (self.side === "left") {
      self.sword.x -= 60;
    } else if (self.side === "right") {
      self.sword.x += 60;
    };
  }, 200);
};
