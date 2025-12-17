// Opportunities section reveal animation
const opportunitiesSection = document.querySelector('.opportunities-section');
const opportunityCards = document.querySelectorAll('.opportunity-card');

if (opportunitiesSection && opportunityCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                opportunityCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('reveal-opp');
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(opportunitiesSection);
}

