// Service tabs functionality
const menuItems = document.querySelectorAll(".service-item");
const panels = document.querySelectorAll(".service-panel");

menuItems.forEach((item) => {
    item.addEventListener("click", () => {
        const target = item.getAttribute("data-service");

        // Remove active states
        menuItems.forEach((i) => i.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));

        // Activate selected
        item.classList.add("active");
        document.getElementById(target).classList.add("active");
    });
});

