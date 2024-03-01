// Navbar
let counter = 0;
const cartBtn = document.querySelector('#cartBtn');
cartBtn.addEventListener('click', () => {
  if (counter > 0) {
    alert('Thank you for your purchase!');
    counter = 0;
    productCounter.textContent = counter;
  }
});

// Products
const productCounter = document.querySelector('#productCounter');
const productBtns = document.querySelectorAll('.product-btn');

productBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    counter++;
    productCounter.textContent = counter;
  });
});

// Contact form
const contactformElem = document.querySelector('#contactForm');
const nameInputElem = document.querySelector('#name');
const emailInputElem = document.querySelector('#email');
const messageInputElem = document.querySelector('#message');
const contactBtnElem = document.querySelector('#contactBtn');

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