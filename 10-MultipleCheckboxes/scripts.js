const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let lastChecked;

function handleCheck(e) {
  // Check wether shift key is down
  // And check if this is checked
  let inBetween = false;

  if(e.shiftKey && this.checked) {
    // check what we want
    // loop over every boxes
    checkboxes.forEach(checkbox => {
      if(checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }

      if(inBetween) checkbox.checked = true;
    });
  }

  lastChecked = this;
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));
