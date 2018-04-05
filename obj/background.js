'use strict';

function Background(ctx, x, y, height, width) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.drawScores();
}

Background.prototype.drawFloor = function() {
  var img = new Image();
  img.src = "images/floor.png";
  this.ctx.drawImage(img, -2, 595);
};

Background.prototype.drawBack = function() {
  var img = new Image();
  img.src = "images/back-new.png";
  this.ctx.drawImage(img, -1, 0);
}

Background.prototype.drawScores = function() {
  this.lightTurnedOff(this.ctx, 76, 100);
  this.lightTurnedOff(this.ctx, 188, 100);
  this.lightTurnedOff(this.ctx, 300, 100);
  this.lightTurnedOff(this.ctx, 650, 100);
  this.lightTurnedOff(this.ctx, 762, 100);
  this.lightTurnedOff(this.ctx, 874, 100);
};

Background.prototype.updateScores = function(player1, player2) {
  if (player1.score === 1) {
    this.lightTurnedOn(this.ctx, 300, 100);
  } else if (player1.score === 2) {
    this.lightTurnedOn(this.ctx, 300, 100);
    this.lightTurnedOn(this.ctx, 188, 100);
  } else if (player1.score === 3) {
    this.lightTurnedOn(this.ctx, 300, 100);
    this.lightTurnedOn(this.ctx, 188, 100);
    this.lightTurnedOn(this.ctx, 76, 100);
  };
  if (player2.score === 1) {
    this.lightTurnedOn(this.ctx, 650, 100);
  } else if (player2.score === 2) {
    this.lightTurnedOn(this.ctx, 650, 100);
    this.lightTurnedOn(this.ctx, 762, 100);
  } else if (player2.score === 3) {
    this.lightTurnedOn(this.ctx, 650, 100);
    this.lightTurnedOn(this.ctx, 762, 100);
    this.lightTurnedOn(this.ctx, 874, 100);
  };
};

Background.prototype.lightTurnedOn = function(ctx, x, y) {
  var img = new Image();
  img.src = "images/light-turn-on.png";
  this.ctx.drawImage(img, x, y);
};

Background.prototype.lightTurnedOff = function(ctx, x, y) {
  var img = new Image();
  img.src = "images/light-turn-off.png";
  this.ctx.drawImage(img, x, y);
};
