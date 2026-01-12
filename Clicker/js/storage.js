function saveGame() {
  const saveData = {
    state,
    upgrades: upgrades.map(u => ({
      count: u.count
    }))
  };

  localStorage.setItem("clickerSave", JSON.stringify(saveData));
}
function loadGame() {
  const save = JSON.parse(localStorage.getItem("clickerSave"));
  if (!save) return;

  Object.assign(state, save.state);

  state.perSecond = 0;
  save.upgrades.forEach((u, i) => {
    upgrades[i].count = u.count;
    state.perSecond += upgrades[i].cps * u.count;
  });
}
