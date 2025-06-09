document.addEventListener("DOMContentLoaded", () => {
  const homeSection = document.querySelector("#home");
  const homeContent = homeSection?.querySelector(".home-content");

  const aboutSection = document.querySelector("#about .overallabout-content");
  const aboutContainer = document.querySelector("#about");

  const skillsSection = document.querySelector("#skills");

  const projectSection = document.querySelector(".portfolio");

  const contactSection = document.querySelector(".contact-section"); // ✅ New contact section

  function animateHorizontalBars() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
      const span = bar.querySelector('span');
      const percentageText = bar.previousElementSibling?.querySelector('.percentage');
      const targetWidth = parseInt(bar.getAttribute('data-width'), 10);

      let currentWidth = 0;

      function animate() {
        if (currentWidth <= targetWidth) {
          span.style.width = currentWidth + "%";
          if (percentageText) percentageText.textContent = currentWidth + "%";
          currentWidth++;
          requestAnimationFrame(animate);
        }
      }

      span.style.width = "0%";
      if (percentageText) percentageText.textContent = "0%";

      animate();
    });
  }

  function resetHorizontalBars() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
      const span = bar.querySelector('span');
      const percentageText = bar.previousElementSibling?.querySelector('.percentage');
      span.style.width = "0%";
      if (percentageText) percentageText.textContent = "0%";
    });
  }

  function animateCircularBars() {
    document.querySelectorAll('[role="progressbar"]').forEach(circle => {
      const value = parseInt(circle.style.getPropertyValue('--value'), 10);

      if (!isNaN(value)) {
        circle.setAttribute('data-label', value + '%');
        circle.style.animation = "none";
        void circle.offsetWidth;
        circle.style.animation = "progress 2s 0.5s forwards";
      }
    });
  }

  if (homeSection && homeContent) {
    const homeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        homeContent.classList.toggle("loaded", entry.isIntersecting);
      });
    }, { threshold: 0.5 });
    homeObserver.observe(homeSection);
  }

  if (aboutContainer && aboutSection) {
    const aboutObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        aboutSection.classList.toggle("loaded", entry.isIntersecting);
      });
    }, { threshold: 0.5 });
    aboutObserver.observe(aboutContainer);
  }

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillsSection.classList.add("loaded");
          resetHorizontalBars();
          animateHorizontalBars();
          animateCircularBars();
        } else {
          skillsSection.classList.remove("loaded");
          resetHorizontalBars();
        }
      });
    }, { threshold: 0.3 });
    skillsObserver.observe(skillsSection);
  }

  if (projectSection) {
    const projectObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("loaded", entry.isIntersecting);
      });
    }, { threshold: 0.3 });
    projectObserver.observe(projectSection);
  }

  // ✅ CONTACT SECTION ANIMATION
  if (contactSection) {
    const contactObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        contactSection.classList.toggle("loaded", entry.isIntersecting);
      });
    }, { threshold: 0.4 });
    contactObserver.observe(contactSection);
  }

  // ✅ Initial load check
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (skillsSection && isInViewport(skillsSection)) {
        skillsSection.classList.add("loaded");
        resetHorizontalBars();
        animateHorizontalBars();
        animateCircularBars();
      }
      if (projectSection && isInViewport(projectSection)) {
        projectSection.classList.add("loaded");
      }
      if (contactSection && isInViewport(contactSection)) {
        contactSection.classList.add("loaded");
      }
    }, 100);
  });

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
  }
});

