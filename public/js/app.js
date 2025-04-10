import { appState } from "./modules/appVariables.js";
import { openMenuBg, closeMenuBg, checkScreenAndAttach } from "./modules/navbarFunctions.js";

appState.hamburger.addEventListener("click", () => {
  if (appState.isHamburgerBtnClicked) {
    return;
  }
  appState.isHamburgerBtnClicked = true;

  if (appState.hamburgerBtnStatus) {
    openMenuBg();
  } else {
    closeMenuBg();
  }
});

checkScreenAndAttach();

window.addEventListener("resize", () => {
  checkScreenAndAttach();
});