const buttons = document.querySelectorAll(".nav__btn");
const tabs = document.querySelectorAll(".tab");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const tabId = button.dataset.tab;


    tabs.forEach(tab => {
      tab.classList.toggle("tab--active", tab.id === tabId);
    });

    
    buttons.forEach(btn => {
      btn.classList.toggle("nav__btn--active", btn === button);
    });

   
    document.body.classList.toggle(
      "show-upgrades-hud",
      tabId === "upgrades"
    );
  });
});

