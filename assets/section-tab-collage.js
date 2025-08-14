  document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const tabImages = document.querySelectorAll('.tab-image');

    let lastActiveImageIndex = 0;

    accordionItems.forEach((item, index) => {
      const tab = item.querySelector('.accordion-tab');

      tab.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        accordionItems.forEach((i) => i.classList.remove('active'));
        tabImages.forEach((img) => img.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
          tabImages[index].classList.add('active');
          lastActiveImageIndex = index;
        } else {
          tabImages[lastActiveImageIndex].classList.add('active');
        }
      });
    });

    tabImages[0].classList.add('active');
    lastActiveImageIndex = 0;
  });