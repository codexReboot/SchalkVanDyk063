document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".nav__hamburger");
  const navList = document.querySelector(".nav__list");
  const navItems = document.querySelectorAll(".nav__item");
  const hamburgerBars = document.querySelectorAll(".hamburgerBar");
  let isHamburgerBtnClicked = false; // Track if the hamburger button is clicked
  let hamburgerBtnStatus = true; // Initial state of the hamburger button
  let stopMenuAttach = false;
  console.log("stopMenuAttach: ", stopMenuAttach); // Debugging line
  // toggle hamburger icon
  function toggleHamburgerIcon() {
    hamburger.classList.toggle("nav__hamburger--active");
  }
  // show menu items on click
  function showMenuItems() {
    setTimeout(() => {
      let delayIndex = 0;
      for (let item of navItems) {
        item.style.transition = `opacity ${2 + delayIndex}s, transform ${2 - delayIndex}s`; /* Transition for opening */
        item.style.transitionDelay = `${delayIndex}s`; // Delay for each item
        item.style.opacity = "1"; // Fade in each item
        item.style.transform = "translateY(0)"; // Slide in each item
        delayIndex += 0.3; // Increase delay for each item
      }
    }, 300); // Start the item animation after a short delay
  }
  // hide menu items on click
  function hideMenuItems() {
    let delayIndex = 0;
    for (let item of [...navItems].reverse()) {
      item.style.transitionDelay = `${delayIndex}s`;
      item.style.opacity = "0";
      item.style.transform = "translateY(20rem)";
      item.style.transition = `transform ${0 + delayIndex}s, opacity ${-0.3 + delayIndex}s`; // Ensure transition is applied
      delayIndex += 0.3;
    }
  }
  // open the nav__list on click
  function openMenuBg() {
    hamburgerBtnStatus = !hamburgerBtnStatus; // Update button status
    navList.classList.add("nav__list--open"); // Show the menu
    setTimeout(() => {
      toggleHamburgerIcon(); // Toggle the hamburger icon - show close icon
      navList.style.transition = `visibility 0s, opacity .8s, transform .8s`; /* Transition for opening */
      navList.style.visibility = "visible"; // Make it visible after a short delay
      navList.style.opacity = "1"; // Fade in the menu
      navList.style.transform = "scaleY(1)"; // Scale in the menu
      navList.style.tranformOrigin = "top"; // Set transform origin to top
      hamburgerBars[0].style.backgroundColor = "rgb(193, 18, 31, .45)";
      hamburgerBars[2].style.backgroundColor = "rgb(193, 18, 31, .45)";
      showMenuItems();
    }, 50); // Matches transition duration
    setTimeout(() => {
      isHamburgerBtnClicked = !isHamburgerBtnClicked; // Reset the flag after the animation
      hamburgerBars[0].style.backgroundColor = "rgb(193, 18, 31)";
      hamburgerBars[2].style.backgroundColor = "rgb(193, 18, 31)";
    }, 2200); // This must match transition duration iro opMenuBg & showMenuItems
  }
  // close the nav__list on click
  function closeMenuBg() {
    hamburgerBtnStatus = !hamburgerBtnStatus; // Update button status
    navList.style.transition = `visibility 0s, opacity .8s, transform .8s`; /* Transition for closing*/
    hamburgerBars[0].style.backgroundColor = "rgb(242, 242, 242, .45)";
    hamburgerBars[1].style.backgroundColor = "rgb(242, 242, 242, .45)";
    hamburgerBars[2].style.backgroundColor = "rgb(242, 242, 242, .45)";
    toggleHamburgerIcon(); // Toggle the hamburger icon - show hamburger icon
    hideMenuItems(); // Hide menu items with animation
    setTimeout(() => {
      navList.style.opacity = "0"; // Fade out the menu
      navList.style.transform = "scaleY(0)"; // Scale out the menu
    }, 400); // Matches transition duration
    setTimeout(() => {
      navList.style.visibility = "hidden"; // Hide the menu after fade out
    }, 1250);
    setTimeout(() => {
      navList.classList.remove("nav__list--open"); // Remove open class
      isHamburgerBtnClicked = !isHamburgerBtnClicked; // Reset the flag after the animation
      hamburgerBars[0].style.backgroundColor = "rgb(242, 242, 242)";
      hamburgerBars[1].style.backgroundColor = "rgb(242, 242, 242)";
      hamburgerBars[2].style.backgroundColor = "rgb(242, 242, 242)";
    }, 1270); // Matches transition duration
  }
  hamburger.addEventListener("click", () => {
    if (isHamburgerBtnClicked) {
      return; // Prevent multiple clicks
    }
    isHamburgerBtnClicked = true; // Set the flag to true
    if (hamburgerBtnStatus) {
      openMenuBg(); // Open the menu
    } else if (!hamburgerBtnStatus) {
      closeMenuBg(); // Close the menu
    }
  });
  // Function to check screen width and apply listeners if needed
  function checkScreenAndAttach() {
    if (window.innerWidth >= 750) {
      stopMenuAttach = true;
      console.log("stopMenuAttach: ", stopMenuAttach); // Debugging line
      console.log("navList is row in navbar"); // Debugging line
      console.log("screen width >= 750"); // Debugging line
      navList.style.display = "flex"; // Ensure display is flex for larger screens
      navList.style.transform = "scaleY(1)"; // Ensure scale is 1
      navList.style.transition = "none"; // Remove transition for immediate effect
      navList.style.opacity = "1"; // Ensure opacity is 1
      navList.style.visibility = "visible"; // Ensure visibility
      for (let item of navItems) {
        item.style.opacity = "1"; // Reset opacity
        item.style.transform = "translateY(0)"; // Reset transform
        item.style.transition = "none"; // Remove transition for immediate effect
      }
    } else if (
      navList.style.display === "flex" &&
      !hamburger.classList.contains("nav__hamburger--active") &&
      window.innerWidth < 750 &&
      stopMenuAttach === true
    ) {
      stopMenuAttach = false;
      console.log("stopMenuAttach: ", stopMenuAttach); // Debugging line
      isHamburgerBtnClicked = true; // Set the flag to true
      openMenuBg();
    } else if (window.innerWidth < 750) {
      stopMenuAttach = false;
    }
  }
  // Initial check on page load
  checkScreenAndAttach();
  // Re-check on window resize
  window.addEventListener("resize", () => {
    checkScreenAndAttach();
  });
});
