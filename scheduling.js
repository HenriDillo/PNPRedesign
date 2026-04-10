// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeBurgerMenu();
    initializeFAQ();
    initializeForm();
    initializeSchedulingButtons();
    handleMobileView();
});

function initializeBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navigation = document.querySelector('.navigation');
    const body = document.body;

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

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.navigation a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navigation.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });

    // Close menu when scrolling
    window.addEventListener('scroll', () => {
        if (navigation.classList.contains('active')) {
            navigation.classList.remove('active');
            burgerMenu.classList.remove('active');
        }
    });
}

function initializeFAQ() {
    document.querySelectorAll('.faq-item h3').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const plus = question.querySelector('.plus');
            const allAnswers = document.querySelectorAll('.faq-answer');
            const allPlus = document.querySelectorAll('.plus');
            
            // Close other answers
            allAnswers.forEach(item => {
                if (item !== answer) {
                    item.style.maxHeight = null;
                    item.classList.remove('active');
                }
            });
            
            allPlus.forEach(item => {
                if (item !== plus) {
                    item.textContent = '+';
                }
            });

            // Toggle current answer
            plus.textContent = plus.textContent === '+' ? '−' : '+';
            if (!answer.style.maxHeight) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.classList.add('active');
            } else {
                answer.style.maxHeight = null;
                answer.classList.remove('active');
            }
        });
    });
}

function initializeForm() {
    const form = document.getElementById('appointmentForm');
    const inputs = form.querySelectorAll('input, select, textarea');

    // Add focus effects
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Scheduling...';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showSuccessMessage();
            form.reset();
        } catch (error) {
            showErrorMessage();
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Schedule Appointment';
        }
    });
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div class="success-content">
            <h3>✓ Appointment Scheduled!</h3>
            <p>You will receive a confirmation email shortly.</p>
        </div>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

function showErrorMessage() {
    // Implementation for error message
    alert('Something went wrong. Please try again.');
}

function initializeSchedulingButtons() {
    document.querySelectorAll('.schedule-btn').forEach(button => {
        button.addEventListener('click', function() {
            const service = this.parentElement.querySelector('h3').textContent;
            showSchedulingForm(service);
        });
    });
}

function showSchedulingForm(service) {
    const modal = createModal(service);
    document.body.appendChild(modal);

    // Initialize modal functionality
    initializeModalHandlers(modal);
}

function createModal(service) {
    const modal = document.createElement('div');
    modal.className = 'scheduling-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Schedule ${service}</h2>
            <form id="schedulingForm">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" required>
                </div>
                <div class="form-group">
                    <label for="date">Preferred Date</label>
                    <input type="date" id="date" required min="${new Date().toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label for="time">Preferred Time</label>
                    <select id="time" required>
                        <option value="">Select Time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                    </select>
                </div>
                <button type="submit" class="submit-btn">Confirm Schedule</button>
            </form>
        </div>
    `;
    
    return modal;
}

function initializeModalHandlers(modal) {
    const closeBtn = modal.querySelector('.close-modal');
    const form = modal.querySelector('form');

    // Close button handler
    closeBtn.onclick = () => modal.remove();

    // Click outside modal to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Form submission handler
    form.onsubmit = (e) => handleFormSubmission(e, modal);
}

function handleFormSubmission(e, modal) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    // Here you would typically send the data to a server
    console.log('Appointment scheduled:', formData);
    
    // Show success message
    alert('Appointment scheduled successfully! A confirmation email will be sent shortly.');
    modal.remove();
}

function handleMobileView() {
    const isMobile = window.innerWidth <= 430;
    
    if (isMobile) {
        applyMobileStyles();
    } else {
        removeMobileStyles();
    }
}

function applyMobileStyles() {
    document.body.style.overflowX = 'hidden';
}

function removeMobileStyles() {
    document.body.style.overflowX = '';
}