// Mobile menu toggle
document.getElementById("menu-btn").addEventListener("click", () => {
  const nav = document.getElementById("nav-menu");
  nav.classList.toggle("show");
});

// Accordion functionality for multiple accordions
function initializeAccordion(accordionId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;

    const items = accordion.querySelectorAll(".accordion-item");

    items.forEach(item => {
        const header = item.querySelector(".accordion-header");
        header.addEventListener("click", () => {
            const currentlyActive = accordion.querySelector(".accordion-item.active");
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove("active");
            }
            item.classList.toggle("active");
        });
    });
}

// Initialize all accordions on the page
document.addEventListener("DOMContentLoaded", () => {
    initializeAccordion("accordion-choose");
    initializeAccordion("accordion-faq");
});


// Captcha refresh
document.getElementById("captcha-text").addEventListener("click", () => {
  const newCap = Math.floor(1000 + Math.random() * 9000);
  document.getElementById("captcha-text").innerText = newCap;
});


// --- REUSABLE FORM VALIDATION ENGINE ---
document.addEventListener('DOMContentLoaded', () => {

    const formsToValidate = document.querySelectorAll('[data-validate="true"]');

    formsToValidate.forEach(form => {
        form.addEventListener('submit', function (event) {

            event.preventDefault(); 

            clearAllErrors(form);

            const isFormValid = validateForm(form);

            if (isFormValid) {
                alert('Thank you! Form submitted successfully.');
            }
        });
    });

    function validateForm(form) {
        let isValid = true;
        
        const nameInput = form.querySelector('input[name="name"]');
        const mobileInput = form.querySelector('input[name="mobile"]');
        const termsCheckbox = form.querySelector('input[name="terms"], input[name="consent"]'); // Checks for both possible names

        if (nameInput && nameInput.value.trim().length < 2) {
            isValid = false;
            showError(nameInput, 'Name must be at least 2 characters long.');
        }

        if (mobileInput) {
            const mobilePattern = /^[6-9]\d{9}$/;
            if (!mobilePattern.test(mobileInput.value.trim())) {
                isValid = false;
                showError(mobileInput, 'Please enter a valid 10-digit mobile number.');
            }
        }

        if (termsCheckbox && !termsCheckbox.checked) {
            isValid = false;
            showError(termsCheckbox, 'You must agree to the terms and conditions.');
        }

        return isValid;
    }

    function showError(inputElement, message) {
        inputElement.classList.add('input-error'); 

        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.textContent = message;

        if (inputElement.parentElement.classList.contains('form-group') || inputElement.parentElement.classList.contains('checkbox-group')) {
             inputElement.parentElement.appendChild(errorSpan);
        } else {
             inputElement.insertAdjacentElement('afterend', errorSpan);
        }
    }

    function clearAllErrors(form) {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(span => span.remove());

        const errorInputs = form.querySelectorAll('.input-error');
        errorInputs.forEach(input => input.classList.remove('input-error'));
    }
});