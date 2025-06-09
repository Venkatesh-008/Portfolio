const cursor = document.getElementById("cursor");
const amount = 23;
const sineDots = Math.floor(amount * 0.3);
const width = 26;
const idleTimeout = 100;

let lastFrame = 0;
let mousePosition = { x: 0, y: 0 };
let dots = [];
let timeoutID;
let idle = false;

class Dot {
   constructor(index = 0) {
    this.index = index;
    this.anglespeed = 0.02 + index * 0.0005;  // faster for later dots
    this.x = 0;
    this.y = 0;
    this.scale = 0.8 - 0.04 * index;
    this.range = width / 1.5 - width / 2 * this.scale + 4 + index; // bigger range + index
    this.element = document.createElement("span");
    gsap.set(this.element, { scale: this.scale });
    cursor.appendChild(this.element);
  }

  lock() {
    this.lockX = this.x;
    this.lockY = this.y;
    this.angleX = Math.PI * 2 * Math.random();
    this.angleY = Math.PI * 2 * Math.random();
  }

  draw(delta) {
    if (!idle || this.index <= sineDots) {
      gsap.set(this.element, { x: this.x, y: this.y });
    } else {
      this.angleX += this.anglespeed;
      this.angleY += this.anglespeed;
      this.y = this.lockY + Math.sin(this.angleY) * this.range;
      this.x = this.lockX + Math.sin(this.angleX) * this.range;
      gsap.set(this.element, { x: this.x, y: this.y });
    }
  }
}

function buildDots() {
  for (let i = 0; i < amount; i++) {
    const dot = new Dot(i);
    dots.push(dot);
  }
}

function onMouseMove(event) {
  mousePosition.x = event.clientX - width / 2;
  mousePosition.y = event.clientY - width / 2;
  resetIdleTimer();
}

function onTouchMove(event) {
  mousePosition.x = event.touches[0].clientX - width / 2;
  mousePosition.y = event.touches[0].clientY - width / 2;
  resetIdleTimer();
}

function startIdleTimer() {
  timeoutID = setTimeout(() => {
    idle = true;
    dots.forEach(dot => dot.lock());
  }, idleTimeout);
  idle = false;
}

function resetIdleTimer() {
  clearTimeout(timeoutID);
  startIdleTimer();
}

function render(timestamp) {
  const delta = timestamp - lastFrame;
  let x = mousePosition.x;
  let y = mousePosition.y;
  dots.forEach((dot, index, dots) => {
    let nextDot = dots[index + 1] || dots[0];
    dot.x = x;
    dot.y = y;
    dot.draw(delta);
    if (!idle || index <= sineDots) {
      const dx = (nextDot.x - dot.x) * 0.35;
      const dy = (nextDot.y - dot.y) * 0.35;
      x += dx;
      y += dy;
    }
  });
  lastFrame = timestamp;
  requestAnimationFrame(render);
}

function initCursor() {
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("touchmove", onTouchMove);
  lastFrame += new Date();
  buildDots();
  render();
}

initCursor();


const interactiveSelectors = [
  'a', 'button', 'input', 'textarea', 'select', '.content-icons i',
  '.counting .box', '.skills-circle-container', '[role="progressbar"]',
  '.skill-item .box h3', '.skill-item .box .progress-bar span',
  '.project-item', '.project-item img', '.project-item .view-btn',
  '.project-item .view-btn i', '.project-item .heading',
   '.testimonial-slider', '.dots',
    '.contact-map', '.contact-form-wrapper',
  '.form-row', '.input-group', '.input-group input', '.input-group textarea', '.btn-form',

  // Add footer icons here:
  '.footer-icons i',
].join(', ');

// Then your mouseover/mouseout events remain the same
document.addEventListener("mouseover", (e) => {
  const target = e.target.closest(interactiveSelectors);
  if (target) cursor.style.opacity = '0';
});

document.addEventListener("mouseout", (e) => {
  const related = e.relatedTarget;
  if (!related || !related.closest(interactiveSelectors)) {
    cursor.style.opacity = '1';
  }
});













