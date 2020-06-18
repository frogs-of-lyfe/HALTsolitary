// init
function init() {
  initLinkButtons();
  initNextPrevButtons();
  initMenuToggle();
  initMenuSectionToggles();
  initResetButton();
  initSectionToggles();
}

// collect elements
const header = document.querySelector('header'),
  linkButtons = document.querySelectorAll('button.link'),
  menu = document.querySelector('menu'),
  menuToggle = document.querySelector('button.menu-toggle'),
  menuSectionToggles = document.querySelectorAll('menu button.section-toggle'),
  // to store menu section toggle elements
  menuSectionToggleElms = {},
  nextButtons = document.querySelectorAll('button.next'),
  prevButtons = document.querySelectorAll('button.prev'),
  resetButton = document.querySelector('button.reset'),
  sections = document.querySelectorAll('section'),
  sectionToggles = document.querySelectorAll('button.section-toggle'),
  // to store section toggle elements
  sectionToggleElms = {};

// init flags
let currentIdx = 0,
  menuIsActive = false,
  primerIsActive = false;

// attach calls to open hrefs
function initLinkButtons() {
  let i = 0;
  for (i; i < linkButtons.length; i++) {
    const button = linkButtons[i],
      { href } = button.dataset;

    button.addEventListener('click', () => {
      window.open(href, '_self');
    });
  }
}

// attach calls to displaySection
function initNextPrevButtons() {
  function attachHandlers(buttons, isPrev) {
    let i = 0;
    for (i; i < buttons.length; i++) {
      const button = buttons[i],
        parentElm = button.parentElement,
        idx = parseInt(parentElm.id || parentElm.dataset.idx);

      button.addEventListener('click', () => {
        if (isPrev) {
          displaySection(idx - 1);
        } 
        else {
          displaySection(idx + 1);
        }
      });
    }
  }

  attachHandlers(nextButtons);
  attachHandlers(prevButtons, true);
}

// attach calls to open/close mobile menu
function initMenuToggle() {
  menuToggle.addEventListener('click', () => {
    if (!menuIsActive) {
      menuToggle.innerHTML = 'Close Menu';
    } 
    else {
      menuToggle.innerHTML = 'Menu';
    }

    menu.classList.toggle('active');
    menuIsActive = !menuIsActive;
  });
}

// collect menu section toggles
function initMenuSectionToggles() {
  let i = 0;
  for (i; i < menuSectionToggles.length; i++) {
    const toggle = menuSectionToggles[i],
      { idx } = toggle.dataset;

    menuSectionToggleElms[idx] = toggle;
  }
}

// attach call to display first section
function initResetButton() {
  resetButton.addEventListener('click', () => {
    displaySection(0);
  });
}

// attach calls to displaySection
function initSectionToggles() {
  let i = 0;
  for (i; i < sectionToggles.length; i++) {
    const toggle = sectionToggles[i],
      { idx } = toggle.dataset;

    sectionToggleElms[idx] = toggle;

    toggle.addEventListener('click', () => {
      displaySection(idx);
    });
  }
}

// remove current class from current section
// add current class to next section
// handle toggle states
function displaySection(nextIdx) {
  nextIdx = parseInt(nextIdx);

  // reset scroll depth (for mobile experience)
  window.scroll(0, 0);

  // toggle header opacity
  if ((nextIdx < 1) || (nextIdx > 17)) {
    header.classList.remove('fade');
    primerIsActive = false;
  } 
  else if (nextIdx > 0 && !primerIsActive) {
    header.classList.add('fade');
    primerIsActive = true;
  }

  // toggle section display
  sections[currentIdx].classList.remove('current');
  sections[nextIdx].classList.add('current');

  // toggle section toggle states
  sectionToggleElms[currentIdx] && sectionToggleElms[currentIdx].classList.remove('current');
  sectionToggleElms[nextIdx] && sectionToggleElms[nextIdx].classList.add('current');
  
  // toggle menu section toggle states
    // remove current class from current menu toggle
  const currentMenuSectionToggle = document.querySelector('menu button.section-toggle.current');
  currentMenuSectionToggle.classList.remove('current');
    // add current class to appropriate menu toggle
  if (nextIdx < 1) {
    // "Intro"
    menuSectionToggleElms[0].classList.add('current');
  }
  else if (nextIdx > 0 && nextIdx < 7) {
    // "Facts"
    menuSectionToggleElms[2].classList.add('current');
  }
  else if (nextIdx > 6 && nextIdx < 12) {
    // "Key Mechanisms"
    menuSectionToggleElms[8].classList.add('current');
  }
  else if (nextIdx > 11 && nextIdx < 17) {
    // "Key Protections"
    menuSectionToggleElms[13].classList.add('current');
  }
  else if (nextIdx === 17) {
    // "Take Action"
    menuSectionToggleElms[17].classList.add('current');
  }
  else if (nextIdx === 18) {
    // "About"
    menuSectionToggleElms[18].classList.add('current');
  }

  // close mobile menu, if open
  if (menuIsActive) {
    menu.classList.remove('active');
    menuToggle.innerHTML = 'Menu';
    menuIsActive = false;
  }

  // update current index
  currentIdx = nextIdx;
}