import { setupScene, animate, startGame, updateScore, stopGame } from './game.js';
import { setupPlayer } from './player.js';
import { setupObstacles, resetObstacles } from './obstacles.js';
import { setupControls } from './controls.js';
import { playSmashEffect } from './utils.js';

const container = document.getElementById('game-container');
let score = 0;
let scene, camera, renderer, player;

function init() {
  // Only initialize once
  if (scene) return;

  // Set up Three.js scene and game objects
  ({ scene, camera, renderer } = setupScene(container));
  player = setupPlayer(scene);
  setupObstacles(scene);
  setupControls(player);

  document.getElementById('start-btn').addEventListener('click', startBtnHandler);
}

function startBtnHandler() {
  score = 0;
  document.getElementById('score-display').textContent = "Score: 0";
  document.getElementById('start-btn').disabled = true;
  document.getElementById('ui-overlay').style.opacity = '0.4';

  resetObstacles(scene);
  startGame(gameLoop, handleSmash);
}

function gameLoop(delta) {
  animate(delta, scene, camera, renderer, player, handleCollision);
}

function handleCollision(object) {
  if (object.isObstacle) {
    playSmashEffect(container);
    score += 1;
    updateScore(score);
  }
}

function handleSmash() {
  playSmashEffect(container);
}

// Optional: stop the game when the browser tab is hidden/leaves
window.addEventListener('beforeunload', stopGame);
window.onload = init;
