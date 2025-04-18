import { appState } from "./appVariables.js";
// toggles hamburger icon 
function toggleHamburgerIcon() {
  appState.hamburger.classList.toggle("nav__hamburger--active");
}
// show menu items with animation
function showMenuItems() {
  setTimeout(() => {
    let delayIndex = 0;
    for (let item of appState.navItems) {
      item.style.transition = `opacity ${2 + delayIndex}s, transform ${2 - delayIndex}s`;
      item.style.transitionDelay = `${delayIndex}s`;
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
      delayIndex += 0.3;
    }
  }, 300);
}
// hide menu items with animation
function hideMenuItems() {
  let delayIndex = 0;
  for (let item of [...appState.navItems].reverse()) {
    item.style.transitionDelay = `${delayIndex}s`;
    item.style.opacity = "0";
    item.style.transform = "translateY(20rem)";
    item.style.transition = `transform ${0 + delayIndex}s, opacity ${-0.3 + delayIndex}s`;
    delayIndex += 0.3;
  }
}
// open menu background
function openMenuBg() {
  appState.hamburgerBtnStatus = !appState.hamburgerBtnStatus;
  appState.navList.classList.add("nav__list--open");
  setTimeout(() => {
    toggleHamburgerIcon();
    appState.navList.style.transition = `visibility 0s, opacity .8s, transform .8s`;
    appState.navList.style.visibility = "visible";
    appState.navList.style.opacity = "1";
    appState.navList.style.transform = "scaleY(1)";
    appState.navList.style.transformOrigin = "top";
    appState.hamburgerBars[0].style.backgroundColor = "rgb(193, 18, 31, .45)";
    appState.hamburgerBars[2].style.backgroundColor = "rgb(193, 18, 31, .45)";
    showMenuItems();
  }, 50);
  setTimeout(() => {
    appState.isHamburgerBtnClicked = !appState.isHamburgerBtnClicked;
    appState.hamburgerBars[0].style.backgroundColor = "rgb(193, 18, 31)";
    appState.hamburgerBars[2].style.backgroundColor = "rgb(193, 18, 31)";
  }, 2200);
}
// close menu background
function closeMenuBg() {
  appState.hamburgerBtnStatus = !appState.hamburgerBtnStatus;
  appState.navList.style.transition = `visibility 0s, opacity .8s, transform .8s`;
  appState.hamburgerBars[0].style.backgroundColor = "rgb(242, 242, 242, .45)";
  appState.hamburgerBars[1].style.backgroundColor = "rgb(242, 242, 242, .45)";
  appState.hamburgerBars[2].style.backgroundColor = "rgb(242, 242, 242, .45)";
  toggleHamburgerIcon();
  hideMenuItems();
  setTimeout(() => {
    appState.navList.style.opacity = "0";
    appState.navList.style.transform = "scaleY(0)";
  }, 400);
  setTimeout(() => {
    appState.navList.style.visibility = "hidden";
  }, 1250);
  setTimeout(() => {
    appState.navList.classList.remove("nav__list--open");
    appState.isHamburgerBtnClicked = !appState.isHamburgerBtnClicked;
    appState.hamburgerBars[0].style.backgroundColor = "rgb(242, 242, 242)";
    appState.hamburgerBars[1].style.backgroundColor = "rgb(242, 242, 242)";
    appState.hamburgerBars[2].style.backgroundColor = "rgb(242, 242, 242)";
  }, 1270);
}
// check screen size and attach menu if needed
function checkScreenAndAttach() {
  if (window.innerWidth >= 750) {
    appState.stopMenuAttach = true;
    console.log("stopMenuAttach: ", appState.stopMenuAttach);
    console.log("navList is row in navbar");
    console.log("screen width >= 750");
    appState.navList.style.display = "flex";
    appState.navList.style.transform = "scaleY(1)";
    appState.navList.style.transition = "none";
    appState.navList.style.opacity = "1";
    appState.navList.style.visibility = "visible";
    for (let item of appState.navItems) {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
      item.style.transition = "none";
    }

  } else if (
    appState.navList.style.display === "flex" &&
    !appState.hamburger.classList.contains("nav__hamburger--active") &&
    window.innerWidth < 750 &&
    appState.stopMenuAttach === true
  ) {
    appState.stopMenuAttach = false;
    console.log("stopMenuAttach: ", appState.stopMenuAttach);
    appState.isHamburgerBtnClicked = true;
    openMenuBg();
  } else if (window.innerWidth < 750) {
    appState.stopMenuAttach = false;
  }
}
export { openMenuBg, closeMenuBg, checkScreenAndAttach };
