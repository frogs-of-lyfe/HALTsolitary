function init() {
  initNextPrevButtons();
  initLinkButtons();
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
        idx = parseInt(button.parentElement.id);

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
  const linkButtons = document.querySelectorAll('button.link');

  function attachHandlers(buttons) {
    let i = 0;
    for (i; i < buttons.length; i++) {
      const button = buttons[i],
        { href } = button.dataset;

      button.addEventListener('click', () => {
        window.open(href, '_self');
      });
    }
  }

  attachHandlers(linkButtons);
}

const headerElm = document.querySelector('header'),
  sections = document.querySelectorAll('section');

// remove current class from current section
// add to next section
function displaySection(nextIdx) {
  // toggle header opacity
  if (nextIdx < 1) {
    headerElm.classList.remove('fade');
    isActive = false;
  } else if (nextIdx > 0 && !isActive) {
    headerElm.classList.add('fade');
    isActive = true;
  }

  sections[currentIdx].classList.remove('current');
  sections[nextIdx].classList.add('current');
  currentIdx = nextIdx;
}