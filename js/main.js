// Données des produits
const products = [
    {
        id: 1,
        name: "Monstera Deliciosa",
        category: "interior",
        price: 45.00,
        image: "images/Monstera_Deliciosa.png",
        description: "Plante d'intérieur populaire avec des feuilles caractéristiques en forme de cœur avec des perforations naturelles.",
        popular: true
    },
    {
        id: 2,
        name: "Ficus Lyrata",
        category: "interior",
        price: 65.00,
        image: "images/Ficus_Lyrata.png",
        description: "Aussi connue sous le nom de 'figuier à feuilles de violon', cette plante ajoute une touche d'élégance à votre intérieur.",
        popular: true
    },
    {
        id: 3,
        name: "Lavande",
        category: "medicinal",
        price: 12.00,
        image: "images/Lavande.png",
        description: "Plante aromatique et médicinale, parfaite pour le jardin ou en pot sur le balcon.",
        popular: true
    },
    {
        id: 4,
        name: "Rosier",
        category: "exterior",
        price: 25.00,
        image: "images/placeholder.jpg",
        description: "Classique du jardin, le rosier offre de magnifiques fleurs parfumées tout l'été.",
        popular: false
    },
    {
        id: 5,
        name: "Aloe Vera",
        category: "medicinal",
        price: 18.00,
        image: "images/Aloe_Vera.png",
        description: "Plante succulente aux propriétés médicinales reconnues, facile d'entretien.",
        popular: true
    },
    {
        id: 6,
        name: "Palmier d'intérieur",
        category: "interior",
        price: 35.00,
        image: "images/placeholder.jpg",
        description: "Apporte une touche tropicale à votre intérieur avec ses feuilles élégantes.",
        popular: false
    },
    {
        id: 7,
        name: "Hortensia",
        category: "exterior",
        price: 22.00,
        image: "images/placeholder.jpg",
        description: "Arbuste à fleurs magnifiques, parfait pour les jardins ombragés.",
        popular: false
    },
    {
        id: 8,
        name: "Basilic",
        category: "medicinal",
        price: 8.00,
        image: "images/Basilic.png",
        description: "Herbe aromatique indispensable en cuisine, facile à cultiver en pot.",
        popular: true
    }
];

// Éléments DOM
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const loadingOverlay = document.getElementById('loading-overlay');
const popularProductsContainer = document.getElementById('popular-products');

// Navigation mobile
function initMobileNav() {
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu en cliquant sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Slider hero
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    const autoPlayInterval = setInterval(nextSlide, 5000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            clearInterval(autoPlayInterval);
        });
    });
}

// Affichage des produits populaires
function displayPopularProducts() {
    if (!popularProductsContainer) return;

    const popularProducts = products.filter(product => product.popular);
    
    popularProductsContainer.innerHTML = popularProducts.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
                ${product.popular ? '<span class="popular-badge">Populaire</span>' : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-category">${getCategoryName(product.category)}</p>
                <p class="product-price">${product.price.toFixed(2)} €</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Ajouter au panier
                </button>
            </div>
        </div>
    `).join('');
}

// Fonction utilitaire pour obtenir le nom de la catégorie
function getCategoryName(category) {
    const categories = {
        'interior': 'Plante d\'intérieur',
        'exterior': 'Plante d\'extérieur',
        'medicinal': 'Plante médicinale',
        'succulents': 'Succulente'
    };
    return categories[category] || category;
}

// Animation de chargement
function showLoading() {
    if (loadingOverlay) {
        loadingOverlay.classList.add('show');
    }
}

function hideLoading() {
    if (loadingOverlay) {
        loadingOverlay.classList.remove('show');
    }
}

// Smooth scroll pour les ancres
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .value-card, .team-member');
    animatedElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });
}

// Gestion des erreurs d'images
function handleImageErrors() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'images/placeholder.jpg';
        });
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    showLoading();
    
    // Simuler un temps de chargement
    setTimeout(() => {
        initMobileNav();
        initHeroSlider();
        displayPopularProducts();
        initSmoothScroll();
        initScrollAnimations();
        handleImageErrors();
        hideLoading();
    }, 1000);
});

// Gestion du scroll pour le header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--white)';
        header.style.backdropFilter = 'none';
    }
});

// Fonction pour ajouter au panier (sera définie dans cart.js)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        showNotification(`${product.name} ajouté au panier`);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `<i class="fas fa-check"></i> ${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Export pour utilisation dans d'autres fichiers
window.products = products;
window.getCategoryName = getCategoryName; 