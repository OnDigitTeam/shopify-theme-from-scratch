
// Search for "global.js" in the assets directory
function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

// Mega Menu Disclosure and Dropdown 
document.addEventListener("DOMContentLoaded", function () {
    const disclosures = document.querySelectorAll(
      'mega-menu-disclosure details, dropdown-menu-disclosure details'
    );

    disclosures.forEach((details) => {
      const summary = details.querySelector("summary");

      // Remove native open state
      details.removeAttribute("open");

      // Initial accessibility setup
      details.setAttribute("aria-expanded", "false");
      summary.setAttribute("aria-haspopup", "true");

      // Prevent native toggle on click
      summary.addEventListener("click", (e) => e.preventDefault());

      // Mouse enter = show menu
      details.addEventListener("mouseenter", () => {
        details.classList.add("is-visible");
        details.setAttribute("open", true);
        details.setAttribute("aria-expanded", "true");
      });

      // Mouse leave = hide menu
      details.addEventListener("mouseleave", () => {
        details.removeAttribute("open");
        details.classList.remove("is-visible");
        details.setAttribute("aria-expanded", "false");
      });
    });
  });


  
