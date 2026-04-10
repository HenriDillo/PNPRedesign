document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navigation = document.querySelector('.navigation');
    const body = document.body;
    const navLinks = document.querySelectorAll('.navigation a');

    // Toggle menu
    burgerMenu.addEventListener('click', () => {
        navigation.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navigation.contains(e.target) && !burgerMenu.contains(e.target)) {
            navigation.classList.remove('active');
            burgerMenu.classList.remove('active');
        }
    });

    // Close menu when scrolling
    window.addEventListener('scroll', () => {
        navigation.classList.remove('active');
        burgerMenu.classList.remove('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navigation.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });
});
