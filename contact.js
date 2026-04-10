document.addEventListener('DOMContentLoaded', function() {
  // Burger menu functionality
  const burgerMenu = document.querySelector('.burger-menu');
  const navigation = document.querySelector('.navigation');
  let lastScrollTop = 0;

  burgerMenu.addEventListener('click', function() {
    burgerMenu.classList.toggle('active');
    navigation.classList.toggle('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!burgerMenu.contains(event.target) && !navigation.contains(event.target)) {
      burgerMenu.classList.remove('active');
      navigation.classList.remove('active');
    }
  });

  // Close menu when scrolling down
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && navigation.classList.contains('active')) {
      // Scrolling down and menu is open
      burgerMenu.classList.remove('active');
      navigation.classList.remove('active');
    }
    
    lastScrollTop = scrollTop;
  });

  const viewAllLink = document.getElementById('view-all-link');
  const viewLessLink = document.getElementById('view-less-link');
  const regionalOfficesBox = document.getElementById('regional-offices-box');
  const contactMainContent = document.querySelector('.contact-main-content');
  const contactLeft = document.querySelector('.contact-left');
  const contactRight = document.querySelector('.contact-right');
  const contactBoxes = document.querySelectorAll('.contact-box');
  const regionalList = document.getElementById('regional-list');
  const originalNextSibling = regionalOfficesBox.nextElementSibling;
  const originalParent = regionalOfficesBox.parentNode;

  // Data for all 18 offices (first 4 are already in HTML)
  const allOffices = [
    {name: 'Police Regional Office 1 (Ilocos Region)', phone: '(072) 242-5132', email: 'pro1@pnp.gov.ph'},
    {name: 'Police Regional Office 2 (Cagayan Valley)', phone: '(078) 304-1914', email: 'pro2@pnp.gov.ph'},
    {name: 'Police Regional Office 3 (Central Luzon)', phone: '(045) 455-1125', email: 'pro3@pnp.gov.ph'},
    {name: 'Police Regional Office 4A (CALABARZON)', phone: '(049) 531-2293', email: 'pro4a@pnp.gov.ph'},
    {name: 'Police Regional Office 4B (MIMAROPA)', phone: '(043) 288-1730', email: 'pro4b@pnp.gov.ph'},
    {name: 'Police Regional Office 5 (Bicol Region)', phone: '(052) 495-0278', email: 'pro5@pnp.gov.ph'},
    {name: 'Police Regional Office 6 (Western Visayas)', phone: '(033) 333-3906', email: 'pro6@pnp.gov.ph'},
    {name: 'Police Regional Office 7 (Central Visayas)', phone: '(032) 253-7674', email: 'pro7@pnp.gov.ph'},
    {name: 'Police Regional Office 8 (Eastern Visayas)', phone: '(053) 323-3036', email: 'pro8@pnp.gov.ph'},
    {name: 'Police Regional Office 9 (Zamboanga Peninsula)', phone: '0917-506-2000', email: 'pro9@pnp.gov.ph'},
    {name: 'Police Regional Office 10 (Northern Mindanao)', phone: '(088) 856-3183', email: 'pro10@pnp.gov.ph'},
    {name: 'Police Regional Office 11 (Davao Region)', phone: '(082) 226-4521', email: 'pro11@pnp.gov.ph'},
    {name: 'Police Regional Office 12 (SOCCSKSARGEN)', phone: '(083) 877-6814', email: 'pro12@pnp.gov.ph'},
    {name: 'Police Regional Office 13 (Caraga Region)', phone: '(085) 300-6034', email: 'pro13@pnp.gov.ph'},
    {name: 'Police Regional Office 14 (ARMM - now Bangsamoro)', phone: '(064) 425-0079', email: 'pro14@pnp.gov.ph'},
    {name: 'Police Regional Office 15 (Region X - Northern Mindanao)', phone: '(088) 856-3183', email: 'pro15@pnp.gov.ph'},
    {name: 'Police Regional Office 16 (NCR - National Capital Region)', phone: 'Not listed', email: 'pro16@pnp.gov.ph'},
    {name: 'Police Regional Office 17 (Autonomous Region in Muslim Mindanao)', phone: '(064) 425-0079', email: 'pro17@pnp.gov.ph'}
  ];

  viewAllLink.addEventListener('click', function(e) {
    e.preventDefault();
    // Hide all contact-boxes except regional-offices
    contactBoxes.forEach(box => {
      if (box !== regionalOfficesBox) {
        box.style.display = 'none';
      }
    });
    // Move regional-offices-box to the top of contact-left
    contactLeft.insertBefore(regionalOfficesBox, contactLeft.firstChild);
    // Adjust height to fit all offices
    regionalOfficesBox.style.height = 'auto';
    regionalOfficesBox.style.maxHeight = 'none';
    regionalOfficesBox.classList.add('expanded');
    // Hide the view-all-link and show the view-less-link
    viewAllLink.style.display = 'none';
    viewLessLink.style.display = '';

    // Build two columns
    regionalList.innerHTML = '';
    regionalList.classList.add('two-columns');
    const col1 = document.createElement('div');
    col1.className = 'column';
    const col2 = document.createElement('div');
    col2.className = 'column';
    allOffices.forEach((office, i) => {
      const p = document.createElement('p');
      p.innerHTML = `<strong>${office.name}</strong><br>Phone: ${office.phone}<br>Email: ${office.email}`;
      if (i < 9) {
        col1.appendChild(p);
      } else {
        col2.appendChild(p);
      }
    });
    regionalList.appendChild(col1);
    regionalList.appendChild(col2);
  });

  viewLessLink.addEventListener('click', function(e) {
    e.preventDefault();
    // Show all contact-boxes
    contactBoxes.forEach(box => {
      box.style.display = '';
    });
    // Move regional-offices-box back to its original parent and position
    if (originalNextSibling) {
      originalParent.insertBefore(regionalOfficesBox, originalNextSibling);
    } else {
      originalParent.appendChild(regionalOfficesBox);
    }
    // Reset height and expanded class
    regionalOfficesBox.style.height = '';
    regionalOfficesBox.style.maxHeight = '';
    regionalOfficesBox.classList.remove('expanded');
    // Show the view-all-link and hide the view-less-link
    viewAllLink.style.display = '';
    viewLessLink.style.display = 'none';

    // Restore the original 4 offices, single column
    regionalList.classList.remove('two-columns');
    regionalList.innerHTML = `
      <p><strong>Police Regional Office 1 (Ilocos Region)</strong><br>
      Phone: (072) 242-5132<br>
      Email: pro1@pnp.gov.ph</p>
      <p><strong>Police Regional Office 2 (Cagayan Valley)</strong><br>
      Phone: (078) 304-1914<br>
      Email: pro2@pnp.gov.ph</p>
      <p><strong>Police Regional Office 3 (Central Luzon)</strong><br>
      Phone: (045) 455-1125<br>
      Email: pro3@pnp.gov.ph</p>
      <p><strong>Police Regional Office 4A (CALABARZON)</strong><br>
      Phone: (049) 531-2293<br>
      Email: pro4a@pnp.gov.ph</p>
    `;
  });
});
