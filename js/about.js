// Modern Accordion functionality for about page
document.querySelectorAll('.life-title').forEach(title => {
    title.addEventListener('click', () => {
        const parent = title.parentElement;
        const content = parent.querySelector('.life-content');
        const isOpen = parent.classList.contains('active');

        // Close all items first with smooth animation
        document.querySelectorAll('.life-item').forEach(item => {
            if (item !== parent) {
                item.classList.remove('active');
            }
        });

        // Toggle current item
        if (!isOpen) {
            parent.classList.add('active');
        } else {
            parent.classList.remove('active');
        }
    });
});

