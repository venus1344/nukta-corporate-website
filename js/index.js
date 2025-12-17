// About section reveal on scroll
const aboutSection = document.querySelector('.about-section');

function revealAboutOnScroll() {
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 120) {
        aboutSection.classList.add('show');
    }
}

window.addEventListener('scroll', revealAboutOnScroll);
revealAboutOnScroll();

// Reveal elements on scroll
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Portfolio rows intersection observer
const fullRows = document.querySelectorAll('.portfolio-full-row');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

fullRows.forEach(row => observer.observe(row));

// Journey section counter animation
const journeyCards = document.querySelectorAll('.journey-card');
let hasAnimated = false;

function animateJourneyCounters() {
    if (hasAnimated) return;
    
    journeyCards.forEach(card => {
        const numberEl = card.querySelector('.journey-card-number');
        if (!numberEl) return;
        
        const target = parseInt(numberEl.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        let current = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                numberEl.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                numberEl.textContent = target;
            }
        };
        
        updateCounter();
    });
    
    hasAnimated = true;
}

// Journey section intersection observer
const journeySection = document.querySelector(".journey-section");

const observerJourney = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      animateJourneyCounters();
    }
  });
}, { threshold: 0.25 });

if (journeySection) {
    observerJourney.observe(journeySection);
}

