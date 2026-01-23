let coinflipInitialized = false;

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
    let currentOutcome = null;

 
    choiceBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        choiceBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedChoice = btn.dataset.choice;
      });
    });

   
    playBtn.addEventListener("click", () => {
      const bet = Number(betInput.value);

  
      resultEl.classList.remove("show");
      resultEl.innerHTML = "";

      if (!selectedChoice) return;
      if (!bet || bet <= 0) return;
      if (state.points < bet) return;

      state.points -= bet;
      render();

      currentOutcome = Math.random() < 0.5 ? "orzel" : "reszka";

     coin.classList.remove("spin-orzel", "spin-reszka");
coin.style.transform = "rotateY(0deg)";
void coin.offsetWidth;

coin.classList.add(
  currentOutcome === "orzel" ? "spin-orzel" : "spin-reszka"
);


      setTimeout(() => {
        let message = "";
        let className = "";

        if (currentOutcome === selectedChoice) {
          const win = bet * 2;
          state.points += win;
          message = `🎉 WYGRAŁEŚ ${win} PUNKTÓW`;
          className = "win";
        } else {
          message = "❌ PRZEGRAŁEŚ";
          className = "lose";
        }

        resultEl.innerHTML = `
          <div class="coinflip__message ${className}">
            ${message}
          </div>
        `;

        resultEl.classList.add("show");
        render();
      }, 900);
    });
  }, 350);
};
