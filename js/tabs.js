const buttons = document.querySelectorAll(".nav__btn");
const tabs = document.querySelectorAll(".tab");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const tabId = button.dataset.tab;

    // aktywna zakładka
    tabs.forEach(tab => {
      tab.classList.toggle("tab--active", tab.id === tabId);
    });

    // aktywny przycisk
    buttons.forEach(btn => {
      btn.classList.toggle("nav__btn--active", btn === button);
    });

    // HUD tylko w Ulepszeniach
    document.body.classList.toggle(
      "show-upgrades-hud",
      tabId === "upgrades"
    );
  });
});
