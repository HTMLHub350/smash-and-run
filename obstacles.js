const OBSTACLE_COUNT = 4;
let obstacles = [];

export function setupObstacles(scene) {
  obstacles = [];
  for (let i = 0; i < OBSTACLE_COUNT; i++) {
    const geometry = new THREE.BoxGeometry(1 + Math.random(), .7, .6);
    const material = new THREE.MeshStandardMaterial({ color: 0xff3c00, metalness: 0.3 });
    const obstacle = new THREE.Mesh(geometry, material);
    obstacle.position.set(getRandomX(), 0.5, 20 + i * 8);
    obstacle.isObstacle = true;
    obstacles.push(obstacle);
    scene.add(obstacle);
  }
}

export function updateObstacles(scene, delta) {
  for (let obs of obstacles) {
    obs.position.z -= 8 * delta;
    if (obs.position.z < -2) {
      obs.position.z = 20 + Math.random() * 15;
      obs.position.x = getRandomX();
    }
  }
}

// Collision detection (AABB)
export function checkCollisions(player, scene) {
  for (let obs of obstacles) {
    const dx = Math.abs(player.position.x - obs.position.x);
    const dz = Math.abs(player.position.z - obs.position.z);
    if (dx < 1.1 && dz < 1.1) {
      return obs;
    }
  }
  return null;
}

export function resetObstacles(scene) {
  for (let obs of obstacles) {
    obs.position.z = 20 + Math.random() * 12;
    obs.position.x = getRandomX();
  }
}

function getRandomX() {
  return (Math.random() - 0.5) * 7;
}
