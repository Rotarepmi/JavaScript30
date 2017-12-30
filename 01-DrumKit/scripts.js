function playOnKey(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if(!audio) return; // stop function from running all keys

  audio.currentTime = 0; // rewind audio to start
  audio.play();

  key.classList.add('playing');
}

function playOnPointer(e) {
  const keyCode = this.dataset.key;
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);

  audio.currentTime = 0; // rewind audio to start
  audio.play();

  this.classList.add('playing');
}

function removeTransition(e) {
    if(e.propertyName !== 'transform') return; //skip it if its not transform
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(function(key) {
  key.addEventListener('transitionend', removeTransition);
  key.addEventListener('mouseenter', playOnPointer);
  key.addEventListener('touchstart', playOnPointer);
});

window.addEventListener('keydown', playOnKey);
