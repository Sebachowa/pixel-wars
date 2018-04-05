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
  var InstructionsButtonElement;

  function handleStartClick() {
    destroySplashScreen();
    buildGameScreen();
  }

  function handleInstructionsClick() {
    destroySplashScreen();
    buildInstructionsScreen();
  }

  function buildSplashScreen() {
    splashScreenElement = createHtml(`<div id="splash-screen">
      <img id="logo" src="images/logo.png">
      <div class="btn-holder">
        <button class="btn-start">Start Game</button>
        <button class="btn-instructions">Instructions</button>
      </div>
      <audio src="sounds/main.ogg" autoplay></audio>
    </div>`);
    mainContentElement.appendChild(splashScreenElement);
    startButtonElement = splashScreenElement.getElementsByClassName("btn-start")[0];
    startButtonElement.addEventListener("click", handleStartClick);

    InstructionsButtonElement = splashScreenElement.getElementsByClassName("btn-instructions")[0];
    InstructionsButtonElement.addEventListener("click", handleInstructionsClick);
  }

  function destroySplashScreen() {
    splashScreenElement.remove();
    startButtonElement.removeEventListener("click", handleStartClick);
  }

  // ------------------------- INSTRUCTIONS SCREEN -------------------------

  var backButtonElement;
  var instructionsScreenElement;

  function handleBackClick() {
    destroyInstructionsScreen();
    buildSplashScreen();
  };

  function buildInstructionsScreen() {
    instructionsScreenElement = createHtml(`<div id="instructions-screen">
      <img class="logo-controls" src="images/logo.png">
      <div id="controls-holder">
        <img class="controls" src="images/controls-one.png">
        <img class="controls" src="images/controls-two.png">
      </div>
      <div class="btn-holder">
        <button class="btn-back">Back!</button>
      </div>
      <audio src="sounds/main.ogg" autoplay></audio>
    </div>`);
    mainContentElement.appendChild(instructionsScreenElement);
    backButtonElement = instructionsScreenElement.getElementsByClassName("btn-back")[0];
    backButtonElement.addEventListener("click", handleBackClick);
  };

  function destroyInstructionsScreen() {
    instructionsScreenElement.remove();
    backButtonElement.removeEventListener("click", handleBackClick);
  };

  // ------------------------- GAME SCREEN -------------------------

  var gameScreenElement;
  var winnerElement

  function gameEnded(f) {
    buildWinnerScreen(f);
    setTimeout(function() {
      destroyWinnerScreen();
      destroyGameScreen(f);
      buildGameOverScreen();
    }, 3000);
  };

  function buildGameScreen() {
    gameScreenElement = createHtml(
      `<canvas id="canvas" width="1000" height="800"></canvas>`
    );
    mainContentElement.appendChild(gameScreenElement);
    startGame();
  };

  function buildWinnerScreen(fight) {
    winnerElement = createHtml(`<div id="winner-screen">
      <h1 id="winner">Player ${fight.winner} Wins</h1>
    </div>`);
    console.log(winnerElement)
    mainContentElement.appendChild(winnerElement);
  };

  function startGame() {
    function handleKeyDown(event) {
      fight.handleKeyDown(event);
    };

    function handleKeyUp(event) {
      fight.handleKeyUp(event);
    };

    var ctx = document.getElementById("canvas").getContext("2d");
    var fight = new Fight(ctx, gameEnded, handleKeyDown);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  }

  function destroyWinnerScreen(fight) {
    winnerElement.remove();
  }
  function destroyGameScreen(fight) {
    gameScreenElement.remove();
    window.removeEventListener("keydown", fight.handleKeyDown);
    window.removeEventListener("keyup", fight.handleKeyUp);
  }

  // ------------------------- GAME OVER SCREEN -------------------------

  var gameOverScreenElement;
  var restartGameButtonElement;
  var creditsButtonElement;

  function handleRestartClick() {
    destroyGameOverScreen();
    buildGameScreen();
  }

  function handleCreditsClick() {
    destroyGameOverScreen();
    buildCreditsScreen();
  }

  function buildGameOverScreen() {
    gameOverScreenElement = createHtml(`<div id="splash-screen">
      <img id="logo" src="images/logo.png">
      <button class="btn-start">Restart Game</button>
      <button class="btn-credits">Credits</button>
      <audio src="sounds/game-over.wav" autoplay></audio>
    </div>`);
    mainContentElement.appendChild(gameOverScreenElement);
    restartGameButtonElement = gameOverScreenElement.getElementsByClassName("btn-start")[0];
    restartGameButtonElement.addEventListener("click", handleRestartClick);
    creditsButtonElement = gameOverScreenElement.getElementsByClassName("btn-credits")[0];
    creditsButtonElement.addEventListener("click", handleCreditsClick);
  }

  function destroyGameOverScreen() {
    gameOverScreenElement.remove();
    restartGameButtonElement.removeEventListener("click", handleRestartClick);
    creditsButtonElement.removeEventListener("click", handleCreditsClick);
  }

  // ------------------------- CREDITS SCREEN -------------------------

  var creditsScreenElement;
  var backToMainButtonElement;
  var gitHubButtonElement;

  function handleBackToMainClick() {
    destroyCreditsScreen();
    buildSplashScreen();
  }

  function buildCreditsScreen() {
    creditsScreenElement = createHtml(`<div id="credits-screen">
      <a href="https://github.com/Sebachowa/fencing-game" target="_blank" class="gh-link">-> GITHUB REPOSITORY <-</a>
      <button class="btn-back-to-main">Back to Main</button>
    </div>`);
    mainContentElement.appendChild(creditsScreenElement);
    backToMainButtonElement = creditsScreenElement.querySelector("button");
    backToMainButtonElement.addEventListener("click", handleBackToMainClick);
  }

  function destroyCreditsScreen() {
    creditsScreenElement.remove();
    backToMainButtonElement.removeEventListener("click", handleBackToMainClick);
  }
  // ------------------------- START APP -------------------------

  buildSplashScreen();
};

window.addEventListener("load", main);