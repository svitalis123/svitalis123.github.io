/**
 * Header Mobile Menu Toggle
 * Handles the hamburger menu functionality for mobile devices
 */

(function() {
  'use strict';

  // Get DOM elements
  const mobileToggle = document.querySelector('.header-mobile-toggle');
  const mobileMenu = document.querySelector('.header-mobile-menu');
  const mobileClose = document.querySelector('.header-mobile-close');
  const mobileLinks = document.querySelectorAll('.header-mobile-link');
  const body = document.body;

  // Check if elements exist
  if (!mobileToggle || !mobileMenu || !mobileClose) {
    console.warn('Header: Required elements not found');
    return;
  }

  /**
   * Open mobile menu
   */
  function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileToggle.classList.add('is-active');
    body.style.overflow = 'hidden'; // Prevent body scroll
    mobileToggle.setAttribute('aria-expanded', 'true');
  }

  /**
   * Close mobile menu
   */
  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileToggle.classList.remove('is-active');
    body.style.overflow = ''; // Restore body scroll
    mobileToggle.setAttribute('aria-expanded', 'false');
  }

  /**
   * Toggle mobile menu
   */
  function toggleMenu() {
    if (mobileMenu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Event Listeners
  mobileToggle.addEventListener('click', toggleMenu);
  mobileClose.addEventListener('click', closeMenu);

  // Close menu when clicking on a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Close menu when clicking outside
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });

  // Handle window resize - close menu if resized to desktop
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 768 && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    }, 250);
  });

  // Set initial aria attributes
  mobileToggle.setAttribute('aria-expanded', 'false');
  mobileToggle.setAttribute('aria-controls', 'header-mobile-menu');
  mobileMenu.setAttribute('id', 'header-mobile-menu');

})();
