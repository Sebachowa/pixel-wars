"use strict";

function createHtml(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
};

function main() {
  var mainContentElement = document.getElementById("main-content");


  // ------------------------- TITLE SCREEN -------------------------


  var titleScreenElement;
  var startButtonElement;

  function handleStartClick() {
    destroyTitleScreen();
    buildGameScreen();
  };

  function buildTitleScreen() {
    titleScreenElement = createHtml(`<div class="title-screen">
      <h1>Up or Down</h1>
      <button>start game</button>
      <div class="instructions">
        <p>guess if the next number is higher or lower</p>
        <p>3 seconds per turn</p>
        <p>if you don't guess you suck</p>
      </div>
    </div>`);
    mainContentElement.appendChild(titleScreenElement);
    startButtonElement = titleScreenElement.querySelector("button");
    startButtonElement.addEventListener("click", handleStartClick);
  };

  function destroyTitleScreen() {
    titleScreenElement.remove();
    startButtonElement.removeEventListener("click", handleStartClick);
  };


  // ------------------------- GAME SCREEN -------------------------


  var game;

  function gameEnded() {
    destroyGameScreen();
    buildGameOverScreen();
  };

  function buildGameScreen() {
    game = new Game(mainContentElement);
    game.build();
    game.start();
    game.onEnded(function() {
      gameEnded();
    });
  };

  function destroyGameScreen() {
    game.destroy();
  };



  // ------------------------- GAME OVER SCREEN -------------------------


  var gameOverScreenElement;
  var restartGameButtonElement;

  function handleRestartClick() {
    destroyGameOverScreen();
    buildGameScreen();
  };

  function buildGameOverScreen() {
    gameOverScreenElement = createHtml(`<div class="game-over-screen">
      <h1>Score: `+game.score`</h1>
      <button>restart game</button>
    </div>`);
    mainContentElement.appendChild(gameOverScreenElement);
    restartGameButtonElement = gameOverScreenElement.querySelector("button");
    restartGameButtonElement.addEventListener("click", handleRestartClick);
  };

  function destroyGameOverScreen() {
    gameOverScreenElement.remove();
    restartGameButtonElement.removeEventListener("click", handleRestartClick);
  };


  // ------------------------- START APP -------------------------


  buildTitleScreen();
};

window.addEventListener("load", main);
