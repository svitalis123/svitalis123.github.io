/**
 * Awards Section - Accordion Component
 * Handles mobile accordion behavior for awards cards
 * Mobile First Approach
 */

class AwardsAccordion {
  constructor() {
    this.cards = document.querySelectorAll('.awards-card');
    this.buttons = document.querySelectorAll('.awards-card-btn');
    this.mobileBreakpoint = 992; // Desktop breakpoint where accordion is disabled
    
    this.init();
  }

  init() {
    // Only enable accordion on mobile
    if (window.innerWidth < this.mobileBreakpoint) {
      this.enableAccordion();
    }

    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  enableAccordion() {
    this.buttons.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleCard(index);
      });
    });
  }

  disableAccordion() {
    // Remove all expanded states
    this.cards.forEach(card => {
      card.classList.remove('is-expanded');
    });
  }

  toggleCard(index) {
    const card = this.cards[index];
    const isExpanded = card.classList.contains('is-expanded');

    // Close all cards first (optional - remove if you want multiple cards open)
    // this.cards.forEach(c => c.classList.remove('is-expanded'));

    // Toggle the clicked card
    if (isExpanded) {
      card.classList.remove('is-expanded');
    } else {
      card.classList.add('is-expanded');
    }
  }

  handleResize() {
    const currentWidth = window.innerWidth;

    if (currentWidth >= this.mobileBreakpoint) {
      // Desktop: Disable accordion
      this.disableAccordion();
    } else {
      // Mobile: Ensure accordion is enabled
      // Note: Listeners are already attached, just ensure states are correct
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AwardsAccordion();
});

// Also initialize if script loads after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AwardsAccordion();
  });
} else {
  new AwardsAccordion();
}
