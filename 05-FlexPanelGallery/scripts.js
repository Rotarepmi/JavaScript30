const panels = document.querySelectorAll('.panel');

function toggleOpen() {
  this.classList.toggle('open');

  // remove .open form other elements
  panels.forEach(panel => {
    if(panel != this) {
      panel.classList.remove('open');
    }
  });
}

function toggleActive(e) {
  if(e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));
