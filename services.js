document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navigation = document.querySelector('.navigation');
    const body = document.body;
    const navLinks = document.querySelectorAll('.navigation a');

    // Toggle menu
    burgerMenu.addEventListener('click', function() {
        navigation.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navigation.contains(event.target) && !burgerMenu.contains(event.target)) {
            navigation.classList.remove('active');
            burgerMenu.classList.remove('active');
        }
    });

    // Close menu when scrolling
    window.addEventListener('scroll', () => {
        navigation.classList.remove('active');
        burgerMenu.classList.remove('active');
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navigation.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });

    // Service cards functionality for mobile
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link inside the card
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Toggle active class
            this.classList.toggle('active');
            
            // Close other cards
            serviceCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('active');
                }
            });
        });
    });

    // Close service cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.service-card')) {
            serviceCards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });
});