
/* ════════════════ Home Word Animation ════════════════ */

window.addEventListener("load", () => {
  const homeContent = document.querySelector(".home-content");
  setTimeout(() => {
    homeContent.classList.add("loaded");
    startTypewriter(); // start typing AFTER fade-in
  }, 1600); // delay to match your fade-in time
});

const words = [
  { text: "Developer", class: "word-purple" },
  { text: "Designer", class: "word-blue" },
  { text: "Creator", class: "word-green" },
];

const element = document.getElementById("typed-word");
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function startTypewriter() {
  const typewriter = document.querySelector(".typewriter");

  function type() {
    const current = words[wordIndex];
    const visibleText = current.text.substring(0, charIndex);
    element.innerHTML = `<span class="${current.class}">${visibleText}</span>`;

    const cursorColor = getComputedStyle(document.querySelector(`.${current.class}`)).color;
    typewriter.style.setProperty("--cursor-color", cursorColor);

    if (!isDeleting && charIndex < current.text.length) {
      charIndex++;
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(type, 1000);
        return;
      } else {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    const speed = isDeleting ? 80 : 150;
    setTimeout(type, speed);
  }

  type();
}


/* ════════════════ HammerBerg ════════════════ */

const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const navLinks = mobileNav.querySelectorAll("a");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileNav.classList.toggle("active");
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("active");
  });
});


/* ════════════════ Progress Bar Animation ════════════════ */




/* ════════════════ Fixed Navbar ════════════════ */

window.addEventListener('scroll', () => {
  let el = document.querySelector('.navbar');
  while (el.parentElement) {
    el = el.parentElement;
    const style = window.getComputedStyle(el);
    if (style.transform !== 'none') {
      console.log('Parent with transform:', el, style.transform);
      break;
    }
  }
}, { passive: true });


/* ════════════════ Rocket Scroll Animation ════════════════ */

const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ════════════════ BTN Color Animation ════════════════ */

  document.querySelectorAll('.blob-btn').forEach(btn => {
    if (!btn.querySelector('.blob-inner')) {
      const blobInner = document.createElement('span');
      blobInner.className = 'blob-inner';
      blobInner.setAttribute('aria-hidden', 'true');
      blobInner.innerHTML = `
        <span class="blob-blobs">
          <span class="blob"></span>
          <span class="blob"></span>
          <span class="blob"></span>
          <span class="blob"></span>
        </span>`;
      btn.appendChild(blobInner);
    }
  });


/* ════════════════ About Section Count Animation ════════════════ */

// count.js
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.count');
  let intervals = [];

  function resetCounters() {
    counters.forEach(counter => {
      counter.innerText = '0';
    });
  }

  function animateCount(counter) {
    const target = +counter.getAttribute('data-count');
    let count = 0;
    const duration = 2000;
    const frameRate = 25;
    const totalFrames = duration / frameRate;
    const increment = target / totalFrames;

    const intervalId = setInterval(() => {
      count += increment;
      if (count >= target) {
        counter.innerText = target + (target === 100 ? "+" : "");
        clearInterval(intervalId);
      } else {
        counter.innerText = Math.floor(count) + (target === 100 ? "+" : "");
      }
    }, frameRate);

    return intervalId;
  }

  const aboutSection = document.querySelector("#about .overallabout-content");

  const aboutObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        resetCounters();
        intervals.forEach(id => clearInterval(id));
        intervals = [];

        counters.forEach(counter => {
          const id = animateCount(counter);
          intervals.push(id);
        });
      } else {
        intervals.forEach(id => clearInterval(id));
        intervals = [];
      }
    });
  }, { threshold: 0.6 });

  if (aboutSection) {
    aboutObserver.observe(aboutSection);
  }
});









  