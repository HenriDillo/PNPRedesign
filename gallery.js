document.addEventListener('DOMContentLoaded', function() {
  // Burger menu functionality
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

  // Gallery filter functionality
  const filterButtons = document.querySelectorAll('.latest-updates-nav');
  const galleryCards = document.querySelectorAll('.update-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filter = button.textContent.trim();

      galleryCards.forEach(card => {
        if (filter === 'All' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
