export function setupControls(player) {
  window.addEventListener('keydown', function(e) {
    if (e.code === 'ArrowLeft') player.moveLeft = true;
    if (e.code === 'ArrowRight') player.moveRight = true;
    if (e.code === 'Space') player.smash = true;
  });

  window.addEventListener('keyup', function(e) {
    if (e.code === 'ArrowLeft') player.moveLeft = false;
    if (e.code === 'ArrowRight') player.moveRight = false;
    if (e.code === 'Space') player.smash = false;
  });
}
