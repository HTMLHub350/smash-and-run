import { setupScene, animate, startGame, updateScore } from './game.js';
import { setupPlayer } from './player.js';
import { setupObstacles, resetObstacles } from './obstacles.js';
import { setupControls } from './controls.js';
import { playSmashEffect } from './utils.js';

const container = document.getElementById('game-container');
let score = 0;

// Setup Three.js scene and game objects
export let scene, camera, renderer, player;

function init() {
  ({ scene, camera, renderer } = setupScene(container));
  player = setupPlayer(scene);
  setupObstacles(scene);
  setupControls(player);

  document.getElementById('start-btn').addEventListener('click', startBtnHandler);
}

function startBtnHandler() {
  score = 0;
  document.getElementById('score-display').textContent = "Score: 0";
  resetObstacles(scene);
  startGame(gameLoop, handleSmash);
}

function gameLoop(delta) {
  // Game logic and rendering per frame
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

window.onload = init;
