// Gestion du catalogue
class Catalogue {
    constructor() {
        this.products = window.products || [];
        this.filteredProducts = [...this.products];
        this.currentView = 'grid';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialFilters();
        this.displayProducts();
        this.updateResultsCount();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.filterProducts();
                }, 300);
            });
        }

        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const sortFilter = document.getElementById('sort-filter');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.filterProducts());
        }
        if (priceFilter) {
            priceFilter.addEventListener('change', () => this.filterProducts());
        }
        if (sortFilter) {
            sortFilter.addEventListener('change', () => this.filterProducts());
        }

        const clearFiltersBtn = document.getElementById('clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearAllFilters());
        }

        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changeView(e.target.closest('.view-btn').dataset.view);
            });
        });
    }

    loadInitialFilters() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            const categoryFilter = document.getElementById('category-filter');
            if (categoryFilter) {
                categoryFilter.value = category;
            }
        }
    }

    filterProducts() {
        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
        const category = document.getElementById('category-filter')?.value || '';
        const priceRange = document.getElementById('price-filter')?.value || '';
        const sortBy = document.getElementById('sort-filter')?.value || 'name';

        let filtered = this.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                                product.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !category || product.category === category;
            const matchesPrice = this.matchesPriceRange(product.price, priceRange);

            return matchesSearch && matchesCategory && matchesPrice;
        });

        filtered = this.sortProducts(filtered, sortBy);

        this.filteredProducts = filtered;
        this.displayProducts();
        this.updateResultsCount();
    }

    matchesPriceRange(price, range) {
        if (!range) return true;

        switch (range) {
            case '0-15':
                return price < 15;
            case '15-30':
                return price >= 15 && price < 30;
            case '30-50':
                return price >= 30 && price < 50;
            case '50+':
                return price >= 50;
            default:
                return true;
        }
    }

    sortProducts(products, sortBy) {
        return [...products].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'price':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'popular':
                    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
                default:
                    return 0;
            }
        });
    }

    displayProducts() {
        const container = document.getElementById('catalogue-products');
        const noResults = document.getElementById('no-results');

        if (!container) return;

        if (this.filteredProducts.length === 0) {
            container.style.display = 'none';
            if (noResults) {
                noResults.style.display = 'block';
            }
            return;
        }

        container.style.display = 'grid';
        if (noResults) {
            noResults.style.display = 'none';
        }

        container.className = this.currentView === 'list' ? 'products-list' : 'products-grid';

        container.innerHTML = this.filteredProducts.map(product => `
            <div class="product-card ${this.currentView === 'list' ? 'product-card-list' : ''}" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='images/placeholder.jpg'">
                    ${product.popular ? '<span class="popular-badge">Populaire</span>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-category">${window.getCategoryName ? window.getCategoryName(product.category) : product.category}</p>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price.toFixed(2)} €</p>
                    <div class="product-actions">
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i> Ajouter au panier
                        </button>
                        <a href="produit.html?id=${product.id}" class="btn btn-outline">
                            <i class="fas fa-eye"></i> Voir détails
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        this.animateProducts();
    }

    animateProducts() {
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    changeView(view) {
        this.currentView = view;
        
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        this.displayProducts();
    }

    updateResultsCount() {
        const countElement = document.getElementById('results-count');
        if (countElement) {
            countElement.textContent = this.filteredProducts.length;
        }
    }

    clearAllFilters() {
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const sortFilter = document.getElementById('sort-filter');

        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = '';
        if (priceFilter) priceFilter.value = '';
        if (sortFilter) sortFilter.value = 'name';

        this.filteredProducts = [...this.products];
        this.displayProducts();
        this.updateResultsCount();
    }
}

const catalogue = new Catalogue();

function clearAllFilters() {
    catalogue.clearAllFilters();
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('catalogue.html')) {
        catalogue.init();
    }
}); 