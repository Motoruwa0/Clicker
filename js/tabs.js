const buttons = document.querySelectorAll(".nav__btn, .casino-btn");
const tabs = document.querySelectorAll(".tab");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const tabId = button.dataset.tab;
    if (!tabId) return;

    tabs.forEach(tab => {
      tab.classList.toggle("tab--active", tab.id === tabId);
    });

    const navButtons = document.querySelectorAll(".nav__btn");
    navButtons.forEach(btn => {
      btn.classList.toggle(
        "nav__btn--active",
        btn.dataset.tab === tabId
      );
    });

    if (tabId === "casino-coinflip") {
      initCoinflip();
    }
  });
});
