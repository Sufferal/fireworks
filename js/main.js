const contactformElem = document.querySelector('#contactForm');
const nameInputElem = document.querySelector('#name');
const emailInputElem = document.querySelector('#email');
const messageInputElem = document.querySelector('#message');
const contactBtnElem = document.querySelector('#contactBtn');

// Contact form
contactBtnElem.addEventListener('click', (e) => {
  e.preventDefault();

  const name = nameInputElem.value;
  const email = emailInputElem.value;
  const message = messageInputElem.value;

  if (!name || !email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  if (name && email && message) {
    alert('Form was submitted!');
    contactformElem.reset();
  }
});