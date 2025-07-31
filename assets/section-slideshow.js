document.addEventListener('DOMContentLoaded', function () {
  const slideshows = document.querySelectorAll('.js-slideshow');

  slideshows.forEach((slideshow) => {
    const slides = slideshow.querySelectorAll('.slideshow__slide');
    let current = 0;
    const delay = parseInt(slideshow.dataset.delay || 5000);

    function showNextSlide() {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }

    slides[current].classList.add('is-active');

    if (slideshow.dataset.autoplay === 'true') {
      setInterval(showNextSlide, delay);
    }
    slideshow.querySelector('.slideshow__arrow--next').addEventListener('click', () => {
  showNextSlide();
});

slideshow.querySelector('.slideshow__arrow--prev').addEventListener('click', () => {
  slides[current].classList.remove('is-active');
  current = (current - 1 + slides.length) % slides.length;
  slides[current].classList.add('is-active');
});

const dots = slideshow.querySelectorAll('.slideshow__dot');

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    slides[current].classList.remove('is-active');
    current = index;
    slides[current].classList.add('is-active');
  });
});


  });
});
