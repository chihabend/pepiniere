// Gestion du panier
class Cart {
    constructor() {
        this.items = this.loadFromStorage();
        this.updateCartCount();
    }

    // Charger le panier depuis localStorage
    loadFromStorage() {
        try {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Erreur lors du chargement du panier:', error);
            return [];
        }
    }

    // Sauvegarder le panier dans localStorage
    saveToStorage() {
        try {
            localStorage.setItem('cart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du panier:', error);
        }
    }

    // Ajouter un produit au panier
    addItem(productId, quantity = 1) {
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const product = window.products?.find(p => p.id === productId);
            if (product) {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                });
            }
        }
        
        this.saveToStorage();
        this.updateCartCount();
        this.showNotification('Produit ajouté au panier !');
    }

    // Retirer un produit du panier
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartCount();
        this.updateCartDisplay();
    }

    // Modifier la quantité d'un produit
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveToStorage();
                this.updateCartCount();
                this.updateCartDisplay();
            }
        }
    }

    // Vider le panier
    clearCart() {
        this.items = [];
        this.saveToStorage();
        this.updateCartCount();
        this.updateCartDisplay();
    }

    // Calculer le total du panier
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Obtenir le nombre total d'articles
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Mettre à jour l'affichage du compteur du panier
    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const count = this.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'block' : 'none';
        }
    }

    // Mettre à jour l'affichage du panier (pour la page panier.html)
    updateCartDisplay() {
        const cartContainer = document.getElementById('cart-items');
        if (!cartContainer) return;

        if (this.items.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Votre panier est vide</h3>
                    <p>Découvrez nos plantes et ajoutez-les à votre panier !</p>
                    <a href="catalogue.html" class="btn btn-primary">Voir le catalogue</a>
                </div>
            `;
            this.updateCartTotals();
            return;
        }

        cartContainer.innerHTML = this.items.map(item => `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${item.price.toFixed(2)} €</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-total">
                    <p>${(item.price * item.quantity).toFixed(2)} €</p>
                </div>
                <button class="remove-item" onclick="cart.removeItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        this.updateCartTotals();
    }

    updateCartTotals() {
        const subtotal = this.getTotal();
        const shipping = subtotal >= 50 ? 0 : 5;
        const total = subtotal + shipping;

        const subtotalElement = document.getElementById('cart-subtotal');
        const shippingElement = document.getElementById('shipping-cost');
        const totalElement = document.getElementById('cart-total');

        if (subtotalElement) subtotalElement.textContent = subtotal.toFixed(2) + ' €';
        if (shippingElement) shippingElement.textContent = shipping === 0 ? 'Gratuit' : shipping.toFixed(2) + ' €';
        if (totalElement) totalElement.textContent = total.toFixed(2) + ' €';
    }

    // Afficher une notification
    showNotification(message) {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;

        // Ajouter au DOM
        document.body.appendChild(notification);

        // Animation d'entrée
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialiser le panier
const cart = new Cart();

// Fonction globale pour ajouter au panier
function addToCart(productId) {
    cart.addItem(productId, 1);
}

// Fonction pour finaliser la commande
function checkout() {
    if (cart.items.length === 0) {
        alert('Votre panier est vide !');
        return;
    }
    
    // Rediriger vers la page de commande
    window.location.href = 'commande.html';
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Mettre à jour l'affichage du panier si on est sur la page panier
    if (window.location.pathname.includes('panier.html')) {
        cart.updateCartDisplay();
    }
});

// Styles CSS pour les notifications (à ajouter dans style.css)
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: var(--primary-green);
    color: var(--white);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
    box-shadow: 0 5px 15px var(--shadow);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.notification.show {
    transform: translateX(0);
}

.notification i {
    font-size: var(--font-size-large);
}
`;

// Ajouter les styles au head si ils n'existent pas déjà
if (!document.querySelector('#notification-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'notification-styles';
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
} 