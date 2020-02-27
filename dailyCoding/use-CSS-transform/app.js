let target = document.querySelector('.ordered');
let buttons = document.querySelectorAll('.menu-item');
let id;

function clicked(clicked_id)
  {
      id = clicked_id;
  };

function order () {
  document.querySelector('#container').classList.remove('page1');
  target.textContent = id;
  document.querySelector('#container').classList.add('page2');
}

for (const button of buttons) {
  button.addEventListener('click', order)
}

document.querySelector('.back').onclick = function() {
  document.querySelector('#container').classList.remove('page2');
  document.querySelector('#container').classList.add('page1');
}
