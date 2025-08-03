// ==== Menu Toggle ====
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// ==== Active Link on Scroll ====
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// ==== ScrollReveal & Typed.js ====
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img ', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Cyber Security Specialist', 'Photographer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// ==== Form Validation ====
const form = document.getElementById('contact-form');
const fields = document.querySelectorAll('.field');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    fields.forEach(field => {
        const input = field.querySelector('.item');
        const errorText = field.querySelector('.error-text');

        // Reset error
        errorText.style.display = 'none';

        if (input.value.trim() === '') {
            errorText.style.display = 'block';
            isValid = false;
        }

        // Email validation
        if (input.id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                errorText.innerText = 'Please enter a valid email address';
                errorText.style.display = 'block';
                isValid = false;
            }
        }

        // Phone number validation (11 digits)
        if (input.id === 'phone') {
            const phoneRegex = /^\d{11}$/;
            if (!phoneRegex.test(input.value.trim())) {
                errorText.innerText = 'Phone number must be 11 digits';
                errorText.style.display = 'block';
                isValid = false;
            }
        }
    });

    if (!isValid) return;

    // Send request
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
        })
    })
        .then(response => response.text())
        .then(data => {
            const popup = document.getElementById('success-popup');
            popup.classList.remove('hidden');
            popup.classList.add('show');

            setTimeout(() => {
                popup.classList.remove('show');
                popup.classList.add('hidden');
            }, 3000);

            form.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error sending message');
        });
});
