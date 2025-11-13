export function setupPlayer(scene) {
  // Simple cube as player
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x0099ff, metalness: .5, roughness: .2 });
  const player = new THREE.Mesh(geometry, material);
  player.position.set(0, 0.5, 0);
  player.speed = 0;
  player.smash = false;
  scene.add(player);
  return player;
}

export function updatePlayer(player, delta) {
  // Simple forward movement
  player.position.z -= 8 * delta;

  // Lateral movement
  if (player.moveLeft) player.position.x -= 7 * delta;
  if (player.moveRight) player.position.x += 7 * delta;

  // Clamp boundaries
  player.position.x = Math.max(-4, Math.min(4, player.position.x));

  // Smash animation event, e.g. scaling up for a brief moment
  if (player.smash) {
    player.scale.set(1.2, 0.7, 1.2);
    setTimeout(() => player.scale.set(1, 1, 1), 180);
    player.smash = false;
  }
}
