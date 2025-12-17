/**
 * Component Loader
 * Loads and injects reusable components (header, footer) into pages
 */

(function() {
    'use strict';

    // Get current page name from the URL
    function getCurrentPage() {
        const path = window.location.pathname;
        let page = path.split('/').pop() || 'index.html';
        
        // Handle index.html or root path
        if (page === 'index.html' || page === '' || page.endsWith('/')) {
            return 'index';
        }
        
        // Remove .html extension
        page = page.replace('.html', '');
        
        // Handle stories-1.html
        if (page === 'stories-1') {
            return 'stories';
        }
        
        return page;
    }

    // Set active navigation item
    function setActiveNav() {
        const currentPage = getCurrentPage();
        const navLinks = document.querySelectorAll('.nav a[data-page], .mobile-nav a[data-page]');
        
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (page === currentPage || (currentPage === '' && page === 'index')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Load and inject component
    function loadComponent(componentName, targetSelector) {
        return fetch(`components/${componentName}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load ${componentName}`);
                }
                return response.text();
            })
            .then(html => {
                const target = document.querySelector(targetSelector);
                if (target) {
                    target.innerHTML = html;
                    
                    // If loading header, check if it needs header-dark class
                    if (componentName === 'header') {
                        const header = target.querySelector('header');
                        if (header) {
                            // Check if placeholder is inside a section with class "header-only"
                            const parentSection = target.closest('.header-only');
                            if (parentSection) {
                                header.classList.add('header-dark');
                            }
                        }
                    }
                    
                    return true;
                }
                return false;
            })
            .catch(error => {
                console.error(`Error loading ${componentName}:`, error);
                return false;
            });
    }

    // Initialize components
    function initComponents() {
        const promises = [];

        // Load header if placeholder exists
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            promises.push(
                loadComponent('header', '#header-placeholder').then(() => {
                    setActiveNav();
                })
            );
        }

        // Load footer if placeholder exists
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            promises.push(loadComponent('footer', '#footer-placeholder'));
        }

        // Wait for all components to load
        Promise.all(promises).then(() => {
            // Re-initialize menu toggle if needed
            if (typeof toggleMenu !== 'undefined') {
                // Menu function should already be available from menu.js
            }
            
            // Dispatch custom event when components are loaded
            document.dispatchEvent(new CustomEvent('componentsLoaded'));
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initComponents);
    } else {
        initComponents();
    }
})();

