(() => {
  const slider = document.querySelector(".testimonial-slider");
  const dotsContainer = document.querySelector(".dots");
  const testimonials = document.querySelectorAll(".testimonial");

  const slidesToShow = 3;
  const totalSlides = testimonials.length;
  let currentIndex = 0;
  let autoSlideInterval;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;

  // Calculate width including gap dynamically
  const style = window.getComputedStyle(slider);
  const gap = parseInt(style.getPropertyValue('gap')) || 0;
  const slideWidth = testimonials[0].offsetWidth + gap;
  const maxIndex = totalSlides - slidesToShow;

  function createDots() {
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateSliderPosition();
        resetAutoSlide();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function updateSliderPosition() {
    slider.scrollTo({
      left: slideWidth * currentIndex,
      behavior: "smooth",
    });
    updateDots();
  }

  function autoSlide() {
    currentIndex = (currentIndex + 1) > maxIndex ? 0 : currentIndex + 1;
    updateSliderPosition();
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 3000);
  }

  function getPositionX(event) {
    return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
  }

  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }

  function setSliderPosition() {
    slider.style.transform = `translateX(${currentTranslate}px)`;
  }

  function touchStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    slider.classList.add("grabbing");
    resetAutoSlide();
  }

  function touchMove(event) {
    if (!isDragging) return;
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }

  function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;
    slider.classList.remove("grabbing");

    // Snap to nearest slide
    currentIndex = Math.round(-currentTranslate / slideWidth);
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    updateSliderPosition();
    prevTranslate = -currentIndex * slideWidth;
    slider.style.transform = ""; // reset transform for smooth scroll
  }

  slider.addEventListener("mousedown", touchStart);
  slider.addEventListener("mouseup", touchEnd);
  slider.addEventListener("mouseleave", () => { if (isDragging) touchEnd(); });
  slider.addEventListener("mousemove", touchMove);
  slider.addEventListener("touchstart", touchStart);
  slider.addEventListener("touchend", touchEnd);
  slider.addEventListener("touchmove", touchMove);

  createDots();
  resetAutoSlide();
})();
