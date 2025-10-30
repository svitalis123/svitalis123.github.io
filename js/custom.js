// Custom JavaScript for local version
$(document).ready(function() {
    // Simple mobile navigation toggle
    $('.w-nav-button, .menu-button').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const $navMenu = $('.nav-menu');
        const $button = $(this);
        const $icon = $button.find('.w-icon-nav-menu');
        
        // Simple toggle
        $navMenu.toggleClass('mobile-open');
        $button.toggleClass('open');
        $icon.toggleClass('active');
    });
    
    // Close menu when clicking nav links
    $('.nav-link').on('click', function() {
        $('.nav-menu').removeClass('mobile-open');
        $('.w-nav-button, .menu-button').removeClass('open');
        $('.w-icon-nav-menu').removeClass('active');
    });
    
    // Close menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar').length) {
            $('.nav-menu').removeClass('mobile-open');
            $('.w-nav-button, .menu-button').removeClass('open');
            $('.w-icon-nav-menu').removeClass('active');
        }
    });
    
    // Handle window resize
    $(window).on('resize', function() {
        if ($(window).width() > 991) {
            $('.nav-menu').removeClass('mobile-open');
            $('.w-nav-button, .menu-button').removeClass('open');
            $('.w-icon-nav-menu').removeClass('active');
        }
    });

    // Immediate hero animation
    setTimeout(function() {
        $('.hero-content-wrap').css('opacity', '1').css('transform', 'translateY(0)');
    }, 300);

    // Scroll animations
    function animateOnScroll() {
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        
        $('.about-content-wrap, .service-content-wrap, .industries-content-wrap, [data-w-id]').each(function() {
            var $el = $(this);
            var elementTop = $el.offset().top;
            var triggerPoint = scrollTop + windowHeight * 0.8;
            
            if (elementTop < triggerPoint) {
                $el.css('opacity', '1').css('transform', 'translateY(0)');
            }
        });
    }

    // Contact page animations
    if (window.location.pathname.includes('contact.html') || window.location.pathname.includes('team')) {
        setTimeout(function() {
            $('.contact-hero-wrap').css('opacity', '1').css('transform', 'translateY(0)');
            setTimeout(function() {
                $('.contact-info-wrap, .contact-form-wrap').css('opacity', '1').css('transform', 'translateY(0)');
            }, 200);
        }, 300);
    }

    // Bind scroll event
    $(window).scroll(animateOnScroll);
    animateOnScroll(); // Run once on load

    // Button hover animations
    $('.button-link-arrow-1, .button-link-arrow-2').hover(
        function() {
            $(this).find('.button-arrow-icon').css('transform', 'translateX(5px)');
        },
        function() {
            $(this).find('.button-arrow-icon').css('transform', 'translateX(0)');
        }
    );

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    // 3D Perspective Carousel
    let currentSlide = 2; // Start with middle card (index 2) active
    const slides = $('.service-slide');
    const totalSlides = slides.length;
    
    function updateCarousel() {
        slides.each(function(index) {
            const $slide = $(this);
            const position = index - currentSlide;
            
            // Reset classes
            $slide.removeClass('active');
            
            // Position cards in 3D space with better spacing
            if (position === 0) {
                // Center card - main focus
                $slide.css({
                    'transform': 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
                    'z-index': 10,
                    'opacity': 1
                }).addClass('active');
            } else if (position === -1) {
                // Left card
                $slide.css({
                    'transform': 'translateX(-180px) translateZ(-100px) rotateY(-15deg) scale(0.85)',
                    'z-index': 5,
                    'opacity': 0.8
                });
            } else if (position === 1) {
                // Right card
                $slide.css({
                    'transform': 'translateX(180px) translateZ(-100px) rotateY(15deg) scale(0.85)',
                    'z-index': 5,
                    'opacity': 0.8
                });
            } else if (position === -2) {
                // Far left card
                $slide.css({
                    'transform': 'translateX(-320px) translateZ(-200px) rotateY(-25deg) scale(0.7)',
                    'z-index': 2,
                    'opacity': 0.6
                });
            } else if (position === 2) {
                // Far right card
                $slide.css({
                    'transform': 'translateX(320px) translateZ(-200px) rotateY(25deg) scale(0.7)',
                    'z-index': 2,
                    'opacity': 0.6
                });
            } else {
                // Hidden cards
                $slide.css({
                    'transform': 'translateX(' + (position > 0 ? 400 : -400) + 'px) translateZ(-300px) rotateY(' + (position > 0 ? 35 : -35) + 'deg) scale(0.5)',
                    'z-index': 1,
                    'opacity': 0.3
                });
            }
        });
    }
    
    $('.service-right-arrow').click(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
    
    $('.service-left-arrow').click(function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    if (totalSlides > 0) {
        updateCarousel();
    }
});
    // Ensure all contact elements trigger Tally popup
    function initContactPopups() {
        // Find all contact-related elements
        const contactSelectors = [
            '[data-tally-open]',
            '.footer-contact-link',
            '.floating-contact',
            '.button-small-primary-1',
            '.button-secondary',
            '.button-primary-1',
            'a[href*="contact"]',
            'a[href*="mailto"]',
            'a[href*="tel"]'
        ];
        
        contactSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                // Skip the Join the Movement button
                if (element.classList.contains('join-movement-btn')) {
                    return;
                }
                
                // Add Tally attributes if they don't exist
                if (!element.hasAttribute('data-tally-open')) {
                    element.setAttribute('data-tally-open', 'mDgQRp');
                    element.setAttribute('data-tally-emoji-text', '👋');
                    element.setAttribute('data-tally-emoji-animation', 'wave');
                }
                
                // Add click event listener as backup (skip Join the Movement button)
                if (!element.classList.contains('join-movement-btn')) {
                    element.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        // Try to open Tally popup
                        if (window.Tally && window.Tally.openPopup) {
                            window.Tally.openPopup('mDgQRp', {
                                emoji: {
                                    text: '👋',
                                    animation: 'wave'
                                }
                            });
                        } else {
                            // Fallback: try to trigger Tally via data attributes
                            const tallyEvent = new CustomEvent('tally:open', {
                                detail: { formId: 'mDgQRp' }
                            });
                            document.dispatchEvent(tallyEvent);
                        }
                    });
                }
            });
        });
    }
    
    // Initialize contact popups when DOM is ready
    initContactPopups();
    
    // Re-initialize if Tally script loads later
    window.addEventListener('load', function() {
        setTimeout(initContactPopups, 1000);
    });
    
    // Tally popup initialization with retry mechanism
    function initTallyPopup() {
        // Check if Tally is available
        if (window.Tally) {
            console.log('Tally is available');
            return;
        }
        
        // Wait for Tally to load
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds max wait
        
        const checkTally = setInterval(function() {
            attempts++;
            
            if (window.Tally || attempts >= maxAttempts) {
                clearInterval(checkTally);
                
                if (window.Tally) {
                    console.log('Tally loaded successfully');
                    // Re-initialize contact popups now that Tally is available
                    initContactPopups();
                } else {
                    console.warn('Tally failed to load, using fallback');
                    // Add manual popup trigger as fallback
                    addFallbackContactHandler();
                }
            }
        }, 100);
    }
    
    // Fallback contact handler if Tally doesn't load
    function addFallbackContactHandler() {
        const contactElements = document.querySelectorAll('[data-tally-open], .footer-contact-link, .floating-contact');
        contactElements.forEach(element => {
            element.addEventListener('click', function(e) {
                e.preventDefault();
                // Open a simple contact form or redirect
                alert('Contact form will open here. Please call us on +254746272662');
            });
        });
    }
    
    // Initialize Tally popup system
    initTallyPopup();