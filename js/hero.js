/**
 * ===========================================
 * NEW DESIGN - HERO SECTION JAVASCRIPT
 * Component-based approach
 * ===========================================
 */

/**
 * Hero Component
 * Handles all hero section functionality
 */
class HeroComponent {
  constructor() {
    this.heroSection = document.querySelector('.hero-section');
    this.ctaButtons = document.querySelectorAll('.hero-btn');
    this.floatingImage = document.querySelector('.hero-float-image');
    
    this.init();
  }

  /**
   * Initialize hero component
   */
  init() {
    if (!this.heroSection) return;
    
    this.setupCTAHandlers();
    this.setupIntersectionObserver();
    this.setupAccessibility();
  }

  /**
   * Setup CTA button click handlers
   */
  setupCTAHandlers() {
    this.ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const isPrimary = button.classList.contains('hero-btn-primary');
        
        if (isPrimary) {
          this.handleWaitlistClick(e);
        } else {
          this.handleDemoClick(e);
        }
      });
    });
  }

  /**
   * Handle waitlist button click
   */
  handleWaitlistClick(e) {
    // Don't prevent default - let Tally handle it
    console.log('Waitlist button clicked');
    
    // Track analytics event
    this.trackEvent('hero_cta_clicked', {
      button_type: 'waitlist',
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Handle demo button click
   */
  handleDemoClick(e) {
    // Don't prevent default - let Tally handle it
    console.log('Demo button clicked');
    
    // Track analytics event
    this.trackEvent('hero_cta_clicked', {
      button_type: 'demo',
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Setup intersection observer for scroll animations
   */
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateHeroContent();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (this.heroSection) {
      observer.observe(this.heroSection);
    }
  }

  /**
   * Animate hero content on scroll into view
   */
  animateHeroContent() {
    const elements = [
      this.heroSection.querySelector('.hero-title'),
      this.heroSection.querySelector('.hero-description'),
      this.heroSection.querySelector('.hero-cta-group'),
      this.heroSection.querySelector('.hero-features'),
      this.heroSection.querySelector('.hero-image-desktop'),
      this.heroSection.querySelector('.hero-image-mobile')
    ].filter(el => el !== null);

    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  /**
   * Setup accessibility features
   */
  setupAccessibility() {
    // Ensure buttons have proper ARIA labels
    this.ctaButtons.forEach(button => {
      if (!button.getAttribute('aria-label')) {
        const text = button.textContent.trim();
        button.setAttribute('aria-label', `${text} for EDUYETU STEM platform`);
      }
    });

    // Add keyboard navigation enhancements
    this.setupKeyboardNavigation();
  }

  /**
   * Setup keyboard navigation
   */
  setupKeyboardNavigation() {
    this.ctaButtons.forEach(button => {
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });
  }

  /**
   * Track analytics events (placeholder)
   */
  trackEvent(eventName, eventData) {
    // Placeholder for analytics tracking
    console.log('Analytics Event:', eventName, eventData);
    
    // Integrate with your analytics service here
    // Example: Google Analytics, Mixpanel, etc.
    
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', eventName, eventData);
    // }
  }

  /**
   * Destroy hero component (cleanup)
   */
  destroy() {
    this.ctaButtons.forEach(button => {
      button.replaceWith(button.cloneNode(true));
    });
  }
}

/**
 * Utility Functions
 */
const HeroUtils = {
  /**
   * Debounce function for performance optimization
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Check if element is in viewport
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Get responsive breakpoint
   */
  getBreakpoint() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 992) return 'tablet';
    if (width < 1280) return 'desktop';
    return 'large-desktop';
  }
};

/**
 * Initialize when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize hero component
  const hero = new HeroComponent();
  
  // Make hero component globally accessible if needed
  window.heroComponent = hero;
  
  console.log('Hero component initialized');
});

/**
 * Handle window resize events
 */
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const breakpoint = HeroUtils.getBreakpoint();
    console.log('Current breakpoint:', breakpoint);
    
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('breakpointChange', {
      detail: { breakpoint }
    }));
  }, 250);
});

/**
 * Export for module usage (if needed)
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { HeroComponent, HeroUtils };
}
