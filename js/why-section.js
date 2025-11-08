/**
 * Why Section - Card Toggle Functionality
 * Handles expand/collapse for mobile cards
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const cards = document.querySelectorAll('.why-card');
    
    if (!cards.length) {
      console.warn('Why section cards not found');
      return;
    }

    // Add click event listeners to all toggle buttons
    cards.forEach(card => {
      const toggleBtn = card.querySelector('.why-card-toggle');
      
      if (!toggleBtn) return;

      toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle the expanded state
        const isExpanded = card.classList.contains('is-expanded');
        
        // Close all other cards on mobile (accordion behavior)
        if (!isExpanded && window.innerWidth < 992) {
          cards.forEach(otherCard => {
            if (otherCard !== card) {
              otherCard.classList.remove('is-expanded');
              const otherBtn = otherCard.querySelector('.why-card-toggle');
              if (otherBtn) {
                otherBtn.setAttribute('aria-expanded', 'false');
              }
            }
          });
        }
        
        // Toggle current card
        card.classList.toggle('is-expanded');
        
        // Update aria-expanded for accessibility
        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        
        // Smooth scroll to card if opening and it's off screen
        if (!isExpanded) {
          setTimeout(() => {
            const cardRect = card.getBoundingClientRect();
            const isOffScreen = cardRect.top < 0 || cardRect.bottom > window.innerHeight;
            
            if (isOffScreen) {
              card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 300); // Wait for expansion animation
        }
      });

      // Initialize aria-expanded attribute
      toggleBtn.setAttribute('aria-expanded', 'false');
    });

    // Handle window resize - auto-expand all cards on desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth >= 992) {
          // Desktop view - remove expanded class and reset aria
          cards.forEach(card => {
            card.classList.remove('is-expanded');
            const toggleBtn = card.querySelector('.why-card-toggle');
            if (toggleBtn) {
              toggleBtn.setAttribute('aria-expanded', 'false');
            }
          });
        }
      }, 250);
    });

    // Optional: Add keyboard navigation
    cards.forEach(card => {
      const toggleBtn = card.querySelector('.why-card-toggle');
      if (!toggleBtn) return;

      toggleBtn.addEventListener('keydown', function(e) {
        // Enter or Space key
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleBtn.click();
        }
      });
    });
  }

})();
