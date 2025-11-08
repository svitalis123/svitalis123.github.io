/**
 * Tally Loading Indicator
 * Shows a loading state when Tally form is being opened
 */

(function() {
  'use strict';

  // Get DOM elements
  const loadingIndicator = document.getElementById('tally-loading');
  
  // Check if element exists
  if (!loadingIndicator) {
    console.warn('Tally Loading: Required element not found');
    return;
  }

  /**
   * Show loading indicator
   */
  function showLoading() {
    loadingIndicator.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Hide loading indicator
   */
  function hideLoading() {
    loadingIndicator.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  /**
   * Initialize Tally event listeners
   */
  function initTallyListeners() {
    // Find all elements that trigger Tally
    const tallyTriggers = document.querySelectorAll('[data-tally-open]');
    
    tallyTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        // Show loading immediately when clicked
        showLoading();
        
        // Hide loading after a short delay (Tally should be loaded by then)
        // or when Tally popup actually opens
        setTimeout(() => {
          hideLoading();
        }, 1500);
      });
    });

    // Listen for Tally events if available
    if (window.Tally) {
      // Tally popup opened
      window.addEventListener('TallyPopupOpened', () => {
        hideLoading();
      });

      // Tally popup closed
      window.addEventListener('TallyPopupClosed', () => {
        hideLoading();
      });
    }
  }

  /**
   * Wait for Tally to be loaded
   */
  function waitForTally() {
    if (window.Tally) {
      initTallyListeners();
    } else {
      // Check again after a short delay
      setTimeout(waitForTally, 100);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTallyListeners();
      waitForTally();
    });
  } else {
    initTallyListeners();
    waitForTally();
  }

  // Also listen for clicks on the loading overlay to hide it
  const overlay = loadingIndicator.querySelector('.tally-loading-overlay');
  if (overlay) {
    overlay.addEventListener('click', hideLoading);
  }

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loadingIndicator.classList.contains('is-visible')) {
      hideLoading();
    }
  });

})();
