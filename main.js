function init() {
  initNextPrevButtons();
  initLinkButtons();
  initSectionToggles();
  initMenuToggle();
}

let currentIdx = 0,
  isActive = false;

// attach displaySection call to next/prev buttons
function initNextPrevButtons() {
  const nextButtons = document.querySelectorAll('button.next'),
    prevButtons = document.querySelectorAll('button.prev');

  function attachHandlers(buttons, isPrev) {
    let i = 0;
    for (i; i < buttons.length; i++) {
      const button = buttons[i],
        parentElm = button.parentElement,
        idx = parseInt(parentElm.id || parentElm.dataset.idx);

      button.addEventListener('click', () => {
        if (isPrev) {
          displaySection(idx - 1);
        } else {
          displaySection(idx + 1);
        }
      });
    }
  }

  attachHandlers(nextButtons);
  attachHandlers(prevButtons, true);
}

// attach displaySection call to link buttons
function initLinkButtons() {
  const buttons = document.querySelectorAll('button.link');
  let i = 0;
  for (i; i < buttons.length; i++) {
    const button = buttons[i],
      { href } = button.dataset;

    button.addEventListener('click', () => {
      window.open(href, '_self');
    });
  }
}

const sectionToggles = {};
function initSectionToggles() {
  const toggles = document.querySelectorAll('button.section-toggle');
  let i = 0;
  for (i; i < toggles.length; i++) {
    const toggle = toggles[i],
      { idx } = toggle.dataset;

    sectionToggles[idx] = toggle;

    toggle.addEventListener('click', () => {
      displaySection(idx);
    });
  }
}

const menuElm = document.querySelector('menu'),
  menuToggle = document.querySelector('button.menu-toggle');
let menuIsActive = false;
function initMenuToggle() {
  menuToggle.addEventListener('click', () => {
    if (!menuIsActive) {
      menuToggle.innerHTML = 'Close Menu';
    } else {
      menuToggle.innerHTML = 'Menu';
    }

    menuElm.classList.toggle('active');
    menuIsActive = !menuIsActive;
  });
}

const headerElm = document.querySelector('header'),
  sections = document.querySelectorAll('section');

// remove current class from current section
// add to next section
function displaySection(nextIdx) {
  window.scroll(0, 0);

  // toggle header opacity
  if ((nextIdx < 1) || (nextIdx > 17)) {
    headerElm.classList.remove('fade');
    isActive = false;
  } else if (nextIdx > 0 && !isActive) {
    headerElm.classList.add('fade');
    isActive = true;
  }

  // toggle section display
  sections[currentIdx].classList.remove('current');
  sections[nextIdx].classList.add('current');

  // toggle section toggles
  sectionToggles[currentIdx] && sectionToggles[currentIdx].classList.remove('current');
  sectionToggles[nextIdx] && sectionToggles[nextIdx].classList.add('current');

  // toggle menu
  if (menuIsActive) {
    menuToggle.innerHTML = 'Menu';
    menuElm.classList.remove('active');
    menuIsActive = false;
  }

  currentIdx = nextIdx;
}