import { updatePlayer } from './player.js';
import { updateObstacles, checkCollisions } from './obstacles.js';
import { updateScoreDisplay } from './utils.js';

let animationId;
let running = false;
let lastTime = performance.now();
let smashListener = null;

export function setupScene(container) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x181e26);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 5, 14);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  const directional = new THREE.DirectionalLight(0xffffff, 1);
  directional.position.set(8, 14, 0);
  scene.add(ambient, directional);

  return { scene, camera, renderer };
}

export function animate(delta, scene, camera, renderer, player, onCollision) {
  updatePlayer(player, delta);
  updateObstacles(scene, delta);

  // Check collisions
  const collided = checkCollisions(player, scene);
  if (collided) {
    onCollision(collided);
  }

  renderer.render(scene, camera);
}

export function startGame(loop, onSmash) {
  if (running) return;
  running = true;
  lastTime = performance.now();

  function tick(now) {
    if (!running) return;
    const delta = (now - lastTime) / 1000;
    lastTime = now;
    loop(delta);
    animationId = requestAnimationFrame(tick);
  }

  animationId = requestAnimationFrame(tick);

  if (smashListener) {
    document.removeEventListener('keydown', smashListener);
    smashListener = null;
  }
  smashListener = e => { if (e.code === 'Space') onSmash(); };
  document.addEventListener('keydown', smashListener);
}

export function stopGame() {
  running = false;
  cancelAnimationFrame(animationId);
  if (smashListener) {
    document.removeEventListener('keydown', smashListener);
    smashListener = null;
  }
}

export function updateScore(score) {
  updateScoreDisplay(score);
}
