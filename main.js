'use strict';

// HELPER FUNCTION - I will be calling it every time i need to create a div element.
function createHtml(html) {
  var div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
};


// MAIN FUNCTION (will manage the different instances of the game)
function main() {
  var mainContentElement = document.getElementById("main-content");


  // ------------------------- SPLASH SCREEN -------------------------

  var splashScreenElement;
  var startButtonElement;

  function handleStartClick() {
    destroySplashScreen();
    buildGameScreen();
  };

  function buildSplashScreen() {
    splashScreenElement = createHtml(`<div id="splash-screen">
      <h1 class="title">FENCE IT!!!!</h1>
      <img src="images/swords.png">
      <button class="btn">Start Game</button>
    </div>`);
    mainContentElement.appendChild(splashScreenElement);
    startButtonElement = splashScreenElement.querySelector("button");
    startButtonElement.addEventListener("click", handleStartClick);
  };

  function destroySplashScreen() {
    splashScreenElement.remove();
    startButtonElement.removeEventListener("click", handleStartClick);
  };


  // ------------------------- GAME SCREEN -------------------------

  var gameScreenElement;

  function gameEnded(f) {
    setTimeout(function() {
      destroyGameScreen(f);
      buildGameOverScreen();
    }, 3000);
  };

  function buildGameScreen() {
    gameScreenElement = createHtml(`<canvas id="canvas" width="1000" height="800"></canvas>`);
    mainContentElement.appendChild(gameScreenElement);
    startGame();
  };

  function startGame() {
    var ctx = document.getElementById("canvas").getContext("2d");
    var fight = new Fight(ctx);
    
    function handleKeyDown(event) {
      fight.handleKeyDown(event);
    };
    gameEnded(fight);    
    window.addEventListener("keydown", handleKeyDown);
  };
  
  function destroyGameScreen(f) {
    gameScreenElement.remove();
    window.removeEventListener("keydown", f.handleKeyDown);
  };


  // ------------------------- GAME OVER SCREEN -------------------------


  var gameOverScreenElement;
  var restartGameButtonElement;

  function handleRestartClick() {
    destroyGameOverScreen();
    buildGameScreen();
  };

  function buildGameOverScreen() {
    gameOverScreenElement = createHtml(`<div id="game-over-screen">
      <h1 class="title">Game Over</h1>
      <button class="btn">Restart game</button>
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

  buildSplashScreen();
};

window.addEventListener("load", main);