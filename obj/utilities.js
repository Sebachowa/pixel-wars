'use strict';

  // ----------------- UTILITIES ---------------- //
 // Helper functions shared by different objects //
// -------------------------------------------- //

function _playAudio(filePath) {
  var audio = new Audio(filePath);
  audio.play();
}

function _loadImage(filePath) {
  var img = new Image();
  img.src = filePath;
  return img;
}
