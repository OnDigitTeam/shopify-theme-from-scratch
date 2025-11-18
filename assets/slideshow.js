if (!window.__sliderInitialized) {
  window.__sliderInitialized = true;

  const initializeSliders = () => {
    const sliders = document.querySelectorAll(".js-slider-carousel");
    const splideInstances = [];

    sliders.forEach((element, index) => {
      const uniqueClass = `js-slider-carousel-${String(index + 1).padStart(2, "0")}`;
      element.classList.add(uniqueClass);

      const splide = new Splide(element, {
        type: "fade",
        rewind: true,
      });

      splideInstances.push(splide);

      const updateHeaderClass = () => {
        setTimeout(() => {
          const activeSlide = element.querySelector(".splide__slide.is-active .js-slideshow-item");
          const header = document.querySelector(".js-header");

          if (header) {
            header.classList.remove("header--invert-design");
            element.classList.remove("slider--invert-design");

            if (activeSlide) {
              const isDesktop = window.innerWidth > 991;
              const isMobile = window.innerWidth < 992;

              if (isDesktop && activeSlide.hasAttribute("data-desktop-invert-design")) {
                header.classList.add("header--invert-design");
                element.classList.add("slider--invert-design");
              }

              if (isMobile && activeSlide.hasAttribute("data-mobile-invert-design")) {
                header.classList.add("header--invert-design");
                element.classList.add("slider--invert-design");
              }
            }
          }
        }, 50);
      };

      const updateActiveClass = () => {
        const activeIndex = splide.index + 1;
        document.querySelectorAll(".js-go-slider").forEach(trigger => {
          trigger.classList.remove("active");
          if (parseInt(trigger.getAttribute("data-index"), 10) === activeIndex) {
            trigger.classList.add("active");
          }
        });

        document.querySelectorAll(".js-slideshow-progress-bar").forEach((progressBar, idx) => {
          progressBar.classList.toggle("active", idx === splide.index);
          if (idx === splide.index) {
            startProgressBar(progressBar, splide);
          } else {
            resetProgressBar(progressBar);
          }
        });
      };

      const startProgressBar = (progressBar, splideInstance) => {
        if (window.innerWidth < 992) {
          const progressSpan = progressBar.querySelector("span");
          progressSpan.style.transition = "width 5s linear";
          progressSpan.style.width = "100%";

          progressSpan.addEventListener('transitionend', function onTransitionEnd() {
            progressSpan.removeEventListener('transitionend', onTransitionEnd);
            splideInstance.go('>');
          });
        }
      };

      const resetProgressBar = (progressBar) => {
        const progressSpan = progressBar.querySelector("span");
        progressSpan.style.transition = "none";
        progressSpan.style.width = "0%";
      };

      splide.on('mounted moved', () => {
        updateHeaderClass();
        updateActiveClass();
      });

      splide.mount();
    });

    document.querySelectorAll(".js-go-slider").forEach((trigger) => {
      trigger.addEventListener("mouseenter", function () {
        const targetIndex = parseInt(this.getAttribute("data-index"), 10) - 1;
        const sectionId = parseInt(this.getAttribute("data-section-id"), 10) - 1;

        if (!isNaN(targetIndex) && !isNaN(sectionId) && splideInstances[sectionId]) {
          splideInstances[sectionId].go(targetIndex);
        }
      });
    });

    document.addEventListener("shopify:block:select", (event) => {
      const blockId = event.detail.blockId;
      const selectedSlide = document.querySelector(`[data-block-id="${blockId}"]`);
      if (selectedSlide) {
        const sliderElement = selectedSlide.closest(".js-slider-carousel");
        const sliderIndex = Array.from(sliders).indexOf(sliderElement);

        if (splideInstances[sliderIndex]) {
          const slideIndex = Array.from(sliderElement.querySelectorAll(".splide__slide")).indexOf(selectedSlide);
          if (slideIndex >= 0) {
            splideInstances[sliderIndex].go(slideIndex);
          }
        }
      }
    });
  };

  document.addEventListener("DOMContentLoaded", initializeSliders);

  document.addEventListener("shopify:section:load", initializeSliders);
  document.addEventListener("shopify:section:select", initializeSliders);
}