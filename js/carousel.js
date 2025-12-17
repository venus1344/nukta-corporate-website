// Portfolio Carousel JavaScript
(function() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  const slides = document.querySelectorAll('.carousel-slide');
  
  let currentIndex = 0;
  let slidesPerView = 3;
  let slideGap = 30;
  
  // Calculate slides per view based on window width
  function getSlidesPerView() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1200) return 2;
    return 3;
  }
  
  // Calculate max index
  function getMaxIndex() {
    return Math.max(0, slides.length - slidesPerView);
  }
  
  // Update carousel position
  function updateCarousel() {
    const slideWidth = slides[0].offsetWidth;
    const offset = -(currentIndex * (slideWidth + slideGap));
    track.style.transform = `translateX(${offset}px)`;
    
    // Update dots
    updateDots();
  }
  
  // Create pagination dots
  function createDots() {
    dotsContainer.innerHTML = '';
    const maxIndex = getMaxIndex();
    
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      
      if (i === currentIndex) {
        dot.classList.add('active');
      }
      
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarousel();
      });
      
      dotsContainer.appendChild(dot);
    }
  }
  
  // Update dots active state
  function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Next slide
  function nextSlide() {
    const maxIndex = getMaxIndex();
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    } else {
      // Loop back to start
      currentIndex = 0;
      updateCarousel();
    }
  }
  
  // Previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    } else {
      // Loop to end
      currentIndex = getMaxIndex();
      updateCarousel();
    }
  }
  
  // Handle window resize
  function handleResize() {
    const newSlidesPerView = getSlidesPerView();
    
    if (newSlidesPerView !== slidesPerView) {
      slidesPerView = newSlidesPerView;
      
      // Reset to first slide if current index is out of bounds
      const maxIndex = getMaxIndex();
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }
      
      createDots();
      updateCarousel();
    } else {
      updateCarousel();
    }
  }
  
  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }
  
  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left
      nextSlide();
    }
    
    if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right
      prevSlide();
    }
  }
  
  // Keyboard navigation
  function handleKeyboard(e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  }
  
  // Auto-play functionality (optional - currently disabled)
  let autoplayInterval;
  
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  // Initialize
  function init() {
    if (!track || !slides.length) return;
    
    slidesPerView = getSlidesPerView();
    createDots();
    updateCarousel();
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Touch events
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
    
    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 150);
    });
    
    // Pause autoplay on hover (if autoplay is enabled)
    // track.addEventListener('mouseenter', stopAutoplay);
    // track.addEventListener('mouseleave', startAutoplay);
    
    // Optional: Start autoplay
    // startAutoplay();
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

