// Cart
let counter = 0;
const cartBtn = document.querySelector('#cartBtn');
cartBtn.addEventListener('click', () => {
  if (counter > 0) {
    alert('Thank you for your purchase!');
    counter = 0;
    productCounter.textContent = counter;
  }
});

// Toggle hamburger menu on mobile
const toggleBtn = document.querySelector('#toggleMenu');
const navbarItems = document.querySelectorAll('.navbar-item');
toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('active');
  console.log(navbarItems);
  navbarItems.forEach((item) => {
    if (!toggleBtn.classList.contains('active') && !item.classList.contains('navbar-item-mobile')) {
      item.classList.add('hide-mobile');
    } else {
      item.classList.remove('hide-mobile');
    }
  });
});

// Close navbar on link click
const navbarLinks = document.querySelectorAll('.navbar-link');
navbarLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (toggleBtn.classList.contains('active')) {
      toggleBtn.classList.remove('active');
      navbarItems.forEach((item) => {
        if (!item.classList.contains('navbar-item-mobile')) {
          item.classList.add('hide-mobile');
        }
      });
    }
  });
});


// Products
const productCounter = document.querySelector('#productCounter');
const productBtns = document.querySelectorAll('.product-btn');

// Add product to cart
productBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    counter++;
    productCounter.textContent = counter;
    alert('Product added to cart!');
  });
});

// Hide elements on mobile
function hideElements() {
  let width = window.innerWidth;
  const products = document.querySelectorAll('.product');
  
  if (width >= 300 && width <= 992) {
    // Hide products on mobile
    for (let i = 3; i < products.length; i++) {
      products[i].classList.add('hide-mobile');
    }
  } else {
    for (let i = 3; i < products.length; i++) {
      products[i].classList.remove('hide-mobile');
    }

    navbarItems.forEach((item) => {
      item.classList.remove('hide-mobile');
    });
  }
}

window.addEventListener('load', hideElements);
window.addEventListener('resize', hideElements);

// Show more products
const showMoreBtn = document.querySelector('#showMore');
showMoreBtn.addEventListener('click', () => {
  const products = document.querySelectorAll('.product');
  for (let i = 3; i < products.length; i++) {
    products[i].classList.remove('hide-mobile');
  }
  showMoreBtn.style.display = 'none';
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