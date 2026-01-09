function renderUpgrades() {
  const container = document.getElementById('upgradesContainer');
  container.innerHTML = '';

  upgrades.forEach((u, i) => {
    const canBuy = gameState.cookies >= u.cost;

    const div = document.createElement('div');
    div.className = `upgrade ${!canBuy ? 'upgrade--disabled' : ''}`;

    div.innerHTML = `
      <span class="upgrade__emoji">${u.emoji}</span>
      <span>${u.name}</span>
      <span>${u.cost}</span>
    `;

    if (canBuy) {
      div.onclick = () => buyUpgrade(i);
    }

    container.appendChild(div);
  });
}
