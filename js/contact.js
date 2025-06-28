// Gestion de la page contact
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Gestion de la FAQ
    initFAQ();

    // Validation en temps réel des champs
    initFormValidation();
});

// Gestion de la soumission du formulaire
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validation côté client
    if (!validateForm(data)) {
        return;
    }
    
    // Simulation d'envoi
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        showSuccessMessage();
        e.target.reset();
    }, 2000);
}

// Validation du formulaire
function validateForm(data) {
    const errors = [];
    
    // Validation du nom
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Veuillez entrer une adresse email valide');
    }
    
    // Validation du sujet
    if (!data.subject) {
        errors.push('Veuillez sélectionner un sujet');
    }
    
    // Validation du message
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
    }
    
    if (errors.length > 0) {
        showErrors(errors);
        return false;
    }
    
    return true;
}

// Affichage des erreurs
function showErrors(errors) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-errors';
    errorContainer.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <ul>
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        </div>
    `;
    
    const form = document.getElementById('contact-form');
    form.insertBefore(errorContainer, form.firstChild);
    
    // Supprimer les erreurs après 5 secondes
    setTimeout(() => {
        if (errorContainer.parentNode) {
            errorContainer.parentNode.removeChild(errorContainer);
        }
    }, 5000);
}

// État de chargement
function showLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    }
}

function hideLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
    }
}

// Message de succès
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Message envoyé avec succès !</h3>
            <p>Nous vous répondrons dans les plus brefs délais.</p>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // Supprimer le message après 5 secondes
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
        }
    }, 5000);
}

// Initialisation de la FAQ
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Fermer tous les autres items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                }
            });
            
            // Toggle l'item actuel
            if (isOpen) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Validation en temps réel
function initFormValidation() {
    const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Supprimer les classes d'erreur précédentes
    field.classList.remove('error', 'success');
    
    // Validation selon le type de champ
    let isValid = true;
    
    switch (field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            break;
        case 'text':
            if (field.name === 'name') {
                isValid = value.length >= 2;
            }
            break;
        case 'tel':
            if (value) {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
                isValid = phoneRegex.test(value);
            }
            break;
        case 'textarea':
            if (field.name === 'message') {
                isValid = value.length >= 10;
            }
            break;
        default:
            isValid = value.length > 0;
    }
    
    // Appliquer les classes CSS
    if (isValid && value.length > 0) {
        field.classList.add('success');
    } else if (!isValid && value.length > 0) {
        field.classList.add('error');
    }
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error', 'success');
}

// Styles CSS pour les messages (à ajouter dans style.css)
const contactStyles = `
.form-errors {
    margin-bottom: var(--spacing-lg);
}

.error-message {
    background-color: #fee;
    border: 1px solid #fcc;
    color: #c33;
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-sm);
}

.error-message i {
    margin-top: 2px;
}

.error-message ul {
    margin: 0;
    padding-left: var(--spacing-md);
}

.success-message {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--primary-green);
    color: var(--white);
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    box-shadow: 0 5px 20px var(--shadow);
    z-index: 10000;
    max-width: 400px;
    animation: slideIn 0.3s ease;
}

.success-content {
    text-align: center;
}

.success-content i {
    font-size: 3rem;
    margin-bottom: var(--spacing-sm);
}

.success-content h3 {
    margin-bottom: var(--spacing-sm);
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.contact-form input.error,
.contact-form textarea.error,
.contact-form select.error {
    border-color: #e74c3c;
    box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

.contact-form input.success,
.contact-form textarea.success,
.contact-form select.success {
    border-color: var(--primary-green);
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

.faq-item {
    border: 1px solid var(--light-gray);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-sm);
    overflow: hidden;
}

.faq-question {
    padding: var(--spacing-md);
    background-color: var(--white);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition-fast);
}

.faq-question:hover {
    background-color: var(--light-beige);
}

.faq-question h3 {
    margin: 0;
    font-size: var(--font-size-large);
    color: var(--dark-green);
}

.faq-question i {
    transition: var(--transition-fast);
    color: var(--gray);
}

.faq-item.active .faq-question i {
    transform: rotate(180deg);
    color: var(--primary-green);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
    background-color: var(--light-beige);
}

.faq-answer p {
    padding: var(--spacing-md);
    margin: 0;
    color: var(--gray);
    line-height: 1.6;
}
`;

// Ajouter les styles au head si ils n'existent pas déjà
if (!document.querySelector('#contact-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'contact-styles';
    styleSheet.textContent = contactStyles;
    document.head.appendChild(styleSheet);
} 