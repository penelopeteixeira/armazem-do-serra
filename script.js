const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector("#main-navigation");
const navigationLinks = document.querySelectorAll(".main-navigation a");

const ageGate = document.querySelector("#age-gate");
const ageGateConfirm = document.querySelector("#age-gate-confirm");
const ageGateDeny = document.querySelector("#age-gate-deny");
const ageGateContent = document.querySelector("#age-gate-content");
const ageGateDenied = document.querySelector("#age-gate-denied");

if (ageGate && ageGateConfirm && ageGateDeny && ageGateContent && ageGateDenied) {
  document.body.classList.add("age-gate-open");
  ageGateConfirm.focus();

  ageGateConfirm.addEventListener("click", () => {
    ageGate.hidden = true;
    document.body.classList.remove("age-gate-open");
  });

  ageGateDeny.addEventListener("click", () => {
    ageGateContent.hidden = true;
    ageGateDenied.hidden = false;

    const deniedTitle = ageGateDenied.querySelector("h2");

    if (deniedTitle) {
      deniedTitle.setAttribute("tabindex", "-1");
      deniedTitle.focus();
    }
  });

  ageGate.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = ageGate.querySelectorAll(
      'button:not([hidden]), a[href], [tabindex]:not([tabindex="-1"])'
    );

    const visibleFocusableElements = Array.from(focusableElements).filter(
      (element) => !element.closest("[hidden]")
    );

    if (!visibleFocusableElements.length) {
      event.preventDefault();
      return;
    }

    const firstElement = visibleFocusableElements[0];
    const lastElement = visibleFocusableElements[visibleFocusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });
}

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
