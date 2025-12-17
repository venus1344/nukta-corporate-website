// Common menu toggle function
function toggleMenu() {
    document.getElementById("mobileNav").classList.toggle("show");
    document.getElementById("menuOverlay").classList.toggle("show");
    const menuToggle = document.querySelector(".menu-toggle");
    if (menuToggle) {
        menuToggle.classList.toggle("active");
    }
}

