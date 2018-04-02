function Game(parentElement) {
  var self = this;
  self.parentElement = parentElement;
  self.gameScreenElement = null;
  self.turnElement = null;
  self.timeElement = null;
  self.scoreElement = null;
  self.numberElement = null;
  self.upButtonElement = null;
  self.downButtonElement = null;
  self.messageElement = null;
  self.callBack = null;
  self.numbers = [1,2,3,4,5,6,7,8,9,0];
  self.turn = 0;
  self.score = 0;
  self.userGuess = null;
  self.turnStartedAt = null; 
};

Game.prototype.onEnded = function(cb) {
  var self = this;
  self.callback = cb;
};

Game.prototype.build = function() {
  var self = this;
  self.gameScreenElement = createHtml(`<div class="game-screen">
      <div class="header">
        <p class="turn">
          <span class="label">turn:</span>
          <span class="value"></span>
        </p>
        <p class="time">
          <span class="label">time:</span>
          <span class="value"></span>
        </p>
        <p class="score">
          <span class="label">score:</span>
          <span class="value"></span>
        </p>
      </div>
      <div class="main">
        <div class="number"></div>
        <div class="actions">
          <button class="up">UP</button>
          <button class="down">DOWN</button>
        </div>
        <div class="question">?</div>
      </div>
      <div class="footer">
        <h2 class="message"></h2>
      </div>
    </div>`);
  self.turnElement = self.gameScreenElement.querySelector('.turn .value');
  self.timeElement = self.gameScreenElement.querySelector('.time .value');
  self.scoreElement = self.gameScreenElement.querySelector('.score .value');
  self.numberElement = self.gameScreenElement.querySelector('.main .number');
  self.questionElement = self.gameScreenElement.querySelector(".main .question");
  self.messageElement = self.gameScreenElement.querySelector(".footer .message");
  self.upButtonElement = self.gameScreenElement.querySelector('.actions .up');
  self.downButtonElement = self.gameScreenElement.querySelector('.actions .down');

  self.parentElement.appendChild(self.gameScreenElement);
};

Game.prototype.start = function() {
  var self = this;
  self.nextTurn();
};

Game.prototype.nextTurn = function() {
  var self = this;
  self.turnElement.innerText = (self.turn + 1) + '/' + (self.numbers.length);
  self.numberElement.innerText = self.numbers[self.turn];
  self.questionElement.innerText = "?"

  self.handleUpClick = function (event) {
    self.checkAnswer('up');
  };
  self.handleDownClick = function (event) {
    self.checkAnswer('down');
  };

  self.upButtonElement.addEventListener('click',  self.handleUpClick);
  self.downButtonElement.addEventListener('click', self.handleDownClick);
}

Game.prototype.checkAnswer = function(guess) {
  var self = this;
  self.upButtonElement.removeEventListener("click", self.handleUpClick);
  self.downButtonElement.removeEventListener("click", self.handleDownClick);

  if (!guess) {
    self.tooSlow();
  };

  if (guess === "down") {
    if (self.numbers[self.turn] > self.numbers[self.turn + 1]) {
      self.correct();
    } else {
      self.wrong();
    };
  };

  if (guess === "up") {
    if (self.numbers[self.turn] < self.numbers[self.turn + 1]) {
      self.correct();
    } else {
      self.wrong();
    };
  };

  self.scoreElement.innerText = self.score;
  self.questionElement.innerText = self.numbers[self.turn + 1];

  window.setTimeout(function() {
    self.turn++;
    if (self.turn + 1 === self.numbers.length) {
      self.callBack;
    } else {
      self.nextTurn();
      self.messageElement.innerText = " ";
      self.messageElement.innerText = "?";
    };
  }, 2000);
};

Game.prototype.tooSlow = function () {
  var self = this;
  self.score -= 2
  self.messageElement.innerText = "Too Slow!";

};

Game.prototype.correct = function() {
  var self = this;
  self.score += 1
  self.messageElement.innerText = "Yeah!";

};

Game.prototype.wrong = function() {
  var self = this;
  self.score -= 1
  self.messageElement.innerText = "Wrong!";

};

Game.prototype.destroy = function() {
  var self = this;
  self.gameScreenElement.remove();
};