const slideshow = document.getElementById('slider');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

function updateArrows() {
  const scrollLeft = slideshow.scrollLeft;
  const maxScroll = slideshow.scrollWidth - slideshow.clientWidth;

  leftArrow.classList.toggle('hidden', scrollLeft <= 0);
  rightArrow.classList.toggle('hidden', scrollLeft >= maxScroll - 1);
}

function getScrollAmount() {
  if (window.innerWidth <= 768) {
    // Mobile & small screens
    return 300;
  } else {
    // Tablets & big screens
    return 700;
  }
}
leftArrow.addEventListener('click', () => {
  slideshow.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
});

rightArrow.addEventListener('click', () => {
  slideshow.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
});

slideshow.addEventListener('scroll', updateArrows);
window.addEventListener('load', updateArrows);

const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

