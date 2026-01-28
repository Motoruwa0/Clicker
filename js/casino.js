(() => {
  let coinflipInitialized = false;
  let slotsInitialized = false;

  let coinRotation = 0;
  let isFlipping = false;
  let slotIsSpinning = false;

  const coinSpinSound = new Audio("sounds/coin-spin.mp3");
  const coinWinSound = new Audio("sounds/coin-win.mp3");
  const coinLoseSound = new Audio("sounds/coin-lose.mp3");

  const slotSpinSound = new Audio("sounds/slot-spin.mp3");
  const slotWinSound = new Audio("sounds/slot-win.mp3");
  const slotLoseSound = new Audio("sounds/slot-lose.mp3");

  coinSpinSound.volume = 0.6;
  coinWinSound.volume = 0.7;
  coinLoseSound.volume = 0.7;

  slotSpinSound.volume = 0.6;
  slotWinSound.volume = 0.7;
  slotLoseSound.volume = 0.7;

  const slotSymbols = [
    "images/slots/cherry.png",
    "images/slots/lemon.png",
    "images/slots/seven.png",
    "images/slots/grapes.png",
    "images/slots/bell.png"
  ];

  window.initCoinflip = function () {
    if (coinflipInitialized) return;
    coinflipInitialized = true;

    setTimeout(() => {
      const coin = document.getElementById("coin");
      const betInput = document.getElementById("coinflipBet");
      const playBtn = document.getElementById("coinflipPlay");
      const resultEl = document.getElementById("coinflipResult");
      const choiceBtns = document.querySelectorAll(".coinflip__btn");

      if (!coin || !betInput || !playBtn || !resultEl) {
        coinflipInitialized = false;
        return;
      }

      let selectedChoice = null;

      choiceBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          if (isFlipping) return;
          choiceBtns.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          selectedChoice = btn.dataset.choice;
        });
      });

      playBtn.addEventListener("click", () => {
        if (isFlipping || !selectedChoice) return;

        const bet = Number(betInput.value);
        if (!bet || bet <= 0) return;
        if (state.points < bet) return;

        isFlipping = true;
        resultEl.classList.remove("show");
        resultEl.innerHTML = "";

        state.points -= bet;
        state.casinoMoneyLost += bet;
        render();

        const outcome = Math.random() < 0.5 ? "orzel" : "reszka";

        coinSpinSound.currentTime = 0;
        coinSpinSound.play();

        const fullSpins = 6 * 360;
        const target = outcome === "orzel" ? 0 : 180;
        coinRotation = coinRotation - (coinRotation % 360) + fullSpins + target;
        coin.style.transform = `rotateY(${coinRotation}deg)`;

        setTimeout(() => {
          let message = "";
          let className = "";

          if (outcome === selectedChoice) {
            const win = bet * 2;
            state.points += win;
            state.casinoWins += 1;
            state.casinoMoneyWon += win;
            addXP(2);
            message = `Wygrałeś ${win} Pomidorów`;
            className = "win";
            coinWinSound.currentTime = 0;
            coinWinSound.play();
          } else {
            state.casinoLosses += 1;
            addXP(1);
            message = "Idziesz do gułagu";
            className = "lose";
            coinLoseSound.currentTime = 0;
            coinLoseSound.play();
          }

          resultEl.innerHTML = `
            <div class="coinflip__message ${className}">
              ${message}
            </div>
          `;

          resultEl.classList.add("show");
          render();
          isFlipping = false;
        }, 2000);
      });
    }, 350);
  };

  window.initSlots = function () {
    if (slotsInitialized) return;
    slotsInitialized = true;

    const reel1 = document.getElementById("slotReel1");
    const reel2 = document.getElementById("slotReel2");
    const reel3 = document.getElementById("slotReel3");
    const betInput = document.getElementById("slotBet");
    const playBtn = document.getElementById("slotPlay");
    const resultEl = document.getElementById("slotResult");
    const slotEl = document.querySelector(".slot");

    if (!reel1 || !reel2 || !reel3 || !playBtn || !slotEl) {
      slotsInitialized = false;
      return;
    }

    playBtn.addEventListener("click", () => {
      if (slotIsSpinning) return;

      const bet = Number(betInput.value);
      resultEl.textContent = "";

      if (!bet || bet <= 0) return;
      if (state.points < bet) return;

      slotIsSpinning = true;
      state.points -= bet;
      state.casinoMoneyLost += bet;
      render();

      slotSpinSound.currentTime = 0;
      slotSpinSound.play();

      let spin1, spin2, spin3;

      spin1 = setInterval(() => {
        reel1.src = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
      }, 60);

      setTimeout(() => {
        spin2 = setInterval(() => {
          reel2.src = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        }, 60);
      }, 400);

      setTimeout(() => {
        spin3 = setInterval(() => {
          reel3.src = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        }, 60);
      }, 800);

      setTimeout(() => clearInterval(spin1), 2000);
      setTimeout(() => clearInterval(spin2), 2400);
      setTimeout(() => clearInterval(spin3), 2800);

      setTimeout(() => {
        const r1 = reel1.src;
        const r2 = reel2.src;
        const r3 = reel3.src;

        let win = 0;

        if (r1 === r2 && r2 === r3) {
          win = bet * 5;
          state.casinoWins += 1;
          state.casinoMoneyWon += win;
          state.slotMegaWins += 1;
          addXP(2);
          resultEl.textContent = `MEGA BIG WIN +${win}`;
          slotWinSound.currentTime = 0;
          slotWinSound.play();
        } else if (r1 === r2 || r2 === r3 || r1 === r3) {
          win = bet * 2;
          state.casinoWins += 1;
          state.casinoMoneyWon += win;
          addXP(2);
          resultEl.textContent = `Pomidorowa Wygrana +${win}`;
          slotWinSound.currentTime = 0;
          slotWinSound.play();
        } else {
          state.casinoLosses += 1;
          addXP(1);
          resultEl.textContent = "Idziesz do Gułagu";
          slotLoseSound.currentTime = 0;
          slotLoseSound.play();
        }

        if (win > 0) state.points += win;

        render();
        slotIsSpinning = false;
      }, 3000);
    });
  };
})();
