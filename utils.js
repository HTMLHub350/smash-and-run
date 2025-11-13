export function playSmashEffect(container) {
  container.classList.add('effect-smash');
  setTimeout(() => container.classList.remove('effect-smash'), 350);

  // Score display effect
  const scoreDisplay = document.getElementById('score-display');
  scoreDisplay.classList.add('grow');
  setTimeout(() => scoreDisplay.classList.remove('grow'), 310);
}

export function updateScoreDisplay(score) {
  const scoreDisplay = document.getElementById('score-display');
  scoreDisplay.textContent = `Score: ${score}`;
  scoreDisplay.classList.add('grow');
  setTimeout(() => scoreDisplay.classList.remove('grow'), 300);
}
