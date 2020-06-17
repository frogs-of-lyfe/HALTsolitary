function init() {
  initNextPrevButtons();
  initLinkButtons();
  initSectionToggles();
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

const headerElm = document.querySelector('header'),
  sections = document.querySelectorAll('section');

// remove current class from current section
// add to next section
function displaySection(nextIdx) {
  window.scroll(0, 0);

  console.log(nextIdx)

  // toggle header/footer opacity
  if (nextIdx < 1) {
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

  // not adding a toggle for the "Take Action" title slide
  // so here is some brute force logic:
  if (currentIdx === 17 && nextIdx !== 18) sectionToggles[18].classList.remove('current');
  if (nextIdx === 17) sectionToggles[18].classList.add('current');

  currentIdx = nextIdx;
}