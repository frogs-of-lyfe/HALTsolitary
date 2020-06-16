function init() {
  initNextPrevButtons();
}

// attach displaySection call to next/prev buttons
function initNextPrevButtons() {
  const nextButtons = document.querySelectorAll('button.next'),
    prevButtons = document.querySelectorAll('button.prev');

  function attachHandlers(buttons, isPrev) {
    let i = 0;
    for (i; i < buttons.length; i++) {
      const button = buttons[i],
        idx = parseInt(button.dataset.idx);

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

const sections = document.querySelectorAll('section');
let currentIdx = 0;

// remove current class from current section
// add to next section
function displaySection(nextIdx) {
  sections[currentIdx].classList.remove('current');
  sections[nextIdx].classList.add('current');
  currentIdx = nextIdx;
}