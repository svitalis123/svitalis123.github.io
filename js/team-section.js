/**
 * Team Section - LinkedIn Link Handler
 * Handles LinkedIn profile links and analytics tracking
 * Mobile First Approach
 */

class TeamSection {
  constructor() {
    this.linkedinLinks = document.querySelectorAll('.team-linkedin-link');
    this.init();
  }

  init() {
    this.setupLinkedInLinks();
  }

  setupLinkedInLinks() {
    this.linkedinLinks.forEach((link, index) => {
      // Add click event for analytics tracking (optional)
      link.addEventListener('click', (e) => {
        this.handleLinkedInClick(e, index);
      });

      // Add keyboard accessibility
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    });
  }

  handleLinkedInClick(event, index) {
    // Optional: Add analytics tracking here
    const teamMember = index === 0 ? 'Ian Nyongesa' : 'Vitalis Mutwiri';
    
    // Log for debugging (remove in production or replace with actual analytics)
    console.log(`LinkedIn link clicked for: ${teamMember}`);
    
    // You can add Google Analytics, Mixpanel, or other tracking here
    // Example: gtag('event', 'linkedin_click', { team_member: teamMember });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new TeamSection();
});

// Also initialize if script loads after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new TeamSection();
  });
} else {
  new TeamSection();
}
