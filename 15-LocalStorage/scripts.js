const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const actions = document.querySelector('.taps-actions');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;

  const item = {
    text,
    done: false
  };

  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
  this.reset();
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, index) => `
    <li>
      <input type="checkbox" data-index=${index} id="item${index}" ${plate.done? 'checked' : ''} />
      <label for="item${index}">${plate.text}</label>
    </li>
  `).join('');
}

function toggleDone(e) {
  if(!e.target.matches('input')) return; // skip if its not an input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function tapsAction(e) {
  if(!e.target.matches('button')) return; // skip if its not a button
  const el = e.target;
  const action = el.dataset.action;
  switch(action) {
    case 'check':
      items.map(item => item.done = true);
      break;
    case 'uncheck':
      items.map(item => item.done = false);
      break;
    case 'delete':
      items.splice(0);
      break;
    default:
      return;
  }
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
actions.addEventListener('click', tapsAction);

populateList(items, itemsList);
