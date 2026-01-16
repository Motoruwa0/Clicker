function addXPFromClicks() {
 
  const gainedXP = Math.floor(state.clicks / 1.5) - state._xpFromClicks;

  if (gainedXP > 0) {
    state._xpFromClicks += gainedXP;
    addXP(gainedXP);
  }
}

function addXP(amount) {
  if (amount <= 0) return;

  state.xp += amount;

  while (state.xp >= state.xpToNextLevel) {
    state.xp -= state.xpToNextLevel;
    levelUp();
  }
}

function levelUp() {
  state.level++;


  state.xpToNextLevel = Math.floor(
    state.xpToNextLevel * 1.25
  );
}
