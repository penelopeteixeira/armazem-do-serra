const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector("#main-navigation");
const navigationLinks = document.querySelectorAll(".main-navigation a");

if (menuToggle && mainNavigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNavigation.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"
    );

    document.body.classList.toggle("menu-open", isOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNavigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
      document.body.classList.remove("menu-open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mainNavigation.classList.contains("is-open")) {
      mainNavigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu de navegação");
      document.body.classList.remove("menu-open");
      menuToggle.focus();
    }
  });
}
