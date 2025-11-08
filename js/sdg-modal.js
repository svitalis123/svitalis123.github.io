/**
 * SDG Modal
 * Handles the modal functionality for SDG information
 */

(function() {
  'use strict';

  // Get DOM elements
  const modalTrigger = document.getElementById('sdg-modal-trigger');
  const modal = document.getElementById('sdg-modal');
  const modalClose = document.querySelector('.sdg-modal-close');
  const modalOverlay = document.querySelector('.sdg-modal-overlay');
  const body = document.body;

  // Check if elements exist
  if (!modalTrigger || !modal || !modalClose || !modalOverlay) {
    console.warn('SDG Modal: Required elements not found');
    return;
  }

  /**
   * Open modal
   */
  function openModal() {
    modal.classList.add('is-open');
    body.style.overflow = 'hidden'; // Prevent body scroll
    modalTrigger.setAttribute('aria-expanded', 'true');
    
    // Focus on close button for accessibility
    setTimeout(() => {
      modalClose.focus();
    }, 100);
  }

  /**
   * Close modal
   */
  function closeModal() {
    modal.classList.remove('is-open');
    body.style.overflow = ''; // Restore body scroll
    modalTrigger.setAttribute('aria-expanded', 'false');
    
    // Return focus to trigger button
    modalTrigger.focus();
  }

  // Event Listeners
  modalTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  // Close modal on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Trap focus within modal when open
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && modal.classList.contains('is-open')) {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });

  // Set initial aria attributes
  modalTrigger.setAttribute('aria-expanded', 'false');
  modalTrigger.setAttribute('aria-controls', 'sdg-modal');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'sdg-modal-title');

})();
