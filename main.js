'use strict';

function startGame() {
  var ctx = document.getElementById("canvas").getContext("2d");;
  var fight = new Fight(ctx);
  function handleKeyDown(event) {
    fight.handleKeyDown(event);
  };
  window.addEventListener("keydown", handleKeyDown);
};

document.addEventListener('DOMContentLoaded', startGame);