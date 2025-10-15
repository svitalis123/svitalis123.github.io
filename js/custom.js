// Custom JavaScript for local version
$(document).ready(function() {
    // Mobile navigation toggle
    $('.w-nav-button').click(function() {
        $('.w-nav-menu').toggleClass('mobile-open');
        $(this).toggleClass('open');
    });
    
    // Close menu when clicking nav links
    $('.w-nav-link').click(function() {
        $('.w-nav-menu').removeClass('mobile-open');
        $('.w-nav-button').removeClass('open');
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
