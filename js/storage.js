function saveGame() {
  localStorage.setItem("clickerSave", JSON.stringify({
    gameState,
    upgrades
  }));
}

function loadGame() {
  const save = JSON.parse(localStorage.getItem("clickerSave"));
  if (!save) return;

  Object.assign(gameState, save.gameState);
  save.upgrades.forEach((u, i) => {
    upgrades[i].count = u.count;
  });
}
