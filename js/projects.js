// Counter animation for projects page
const counters = document.querySelectorAll('.number-value');
let hasAnimated = false;

const animateCounters = () => {
    if (hasAnimated) return;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = target / 100;

        const updateCount = () => {
            if (count < target) {
                count += speed;
                counter.textContent = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        };

        updateCount();
    });

    hasAnimated = true;
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, { threshold: 0.5 });

const numbersSection = document.querySelector('.numbers-section');
if (numbersSection) {
    observer.observe(numbersSection);
}

// Portfolio modal functionality
const portfolioItems = document.querySelectorAll('.visual-item:not(.visual-cta)');
const modal = document.getElementById('portfolioModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

if (portfolioItems.length > 0 && modal) {
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            modalImg.src = item.dataset.image;
            modalTitle.textContent = item.dataset.title;
            modalText.textContent = item.dataset.text;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

function closePortfolio() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Make closePortfolio available globally
window.closePortfolio = closePortfolio;

