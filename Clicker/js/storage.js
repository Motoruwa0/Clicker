function saveGame() {
  localStorage.setItem('clicker-save', JSON.stringify({
    gameState,
    upgrades
  }));
}

function loadGame() {
  const save = JSON.parse(localStorage.getItem('clicker-save'));
  if (!save) return;

  Object.assign(gameState, save.gameState);
  save.upgrades.forEach((u, i) => upgrades[i].count = u.count);
}
