# 🌱 Pépinière Verte - Site Vitrine et Boutique en Ligne

Un site web moderne et responsive pour une pépinière, développé avec HTML, CSS et JavaScript vanilla.

## 🚀 Fonctionnalités

### Pages Principales
- **Page d'accueil** : Bannière attractive, slider automatique, présentation des produits populaires
- **Catalogue** : Filtres avancés, recherche, tri, vue grille/liste
- **Panier** : Gestion complète avec localStorage, modification des quantités
- **À propos** : Histoire de l'entreprise, équipe, valeurs, engagements
- **Contact** : Formulaire de contact, FAQ interactive, informations de contact

### Fonctionnalités Techniques
- ✅ **Design responsive** : Adapté mobile, tablette, desktop
- ✅ **Navigation mobile** : Menu hamburger avec animations
- ✅ **Filtres et recherche** : Par catégorie, prix, popularité
- ✅ **Panier persistant** : Sauvegarde dans localStorage
- ✅ **Animations fluides** : Transitions CSS et animations JavaScript
- ✅ **Validation de formulaires** : Temps réel avec feedback visuel
- ✅ **Slider automatique** : Page d'accueil avec navigation par points
- ✅ **FAQ interactive** : Accordéon avec animations
- ✅ **Palette de couleurs naturelles** : Vert, beige, blanc

## 🎨 Design

### Palette de Couleurs
- **Vert principal** : #4CAF50
- **Vert secondaire** : #45a049
- **Vert clair** : #8BC34A
- **Vert foncé** : #2E7D32
- **Beige** : #F5F5DC
- **Beige clair** : #FAFAF0

### Typographie
- **Police principale** : Poppins (Google Fonts)
- **Hiérarchie claire** : Tailles de 0.875rem à 2.5rem
- **Poids variés** : 300, 400, 500, 600, 700

## 📁 Structure du Projet

```
projet_pepinière/
├── index.html              # Page d'accueil
├── catalogue.html          # Catalogue des produits
├── panier.html            # Gestion du panier
├── about.html             # Page À propos
├── contact.html           # Page Contact
├── css/
│   ├── style.css          # Styles principaux
│   └── responsive.css     # Styles responsive
├── js/
│   ├── main.js            # Fonctionnalités principales
│   ├── cart.js            # Gestion du panier
│   ├── catalogue.js       # Filtres et recherche
│   └── contact.js         # Formulaire et FAQ
├── images/                # Dossier des images
└── README.md              # Documentation
```

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique et accessible
- **CSS3** : 
  - Flexbox et Grid pour la mise en page
  - Variables CSS pour la cohérence
  - Animations et transitions
  - Media queries pour le responsive
- **JavaScript ES6+** :
  - Classes pour l'organisation du code
  - localStorage pour la persistance
  - Event listeners et DOM manipulation
  - Validation de formulaires

## 🚀 Installation et Utilisation

1. **Cloner ou télécharger** le projet
2. **Ouvrir** `index.html` dans un navigateur web
3. **Naviguer** entre les pages via le menu
4. **Tester** les fonctionnalités :
   - Ajouter des produits au panier
   - Utiliser les filtres du catalogue
   - Remplir le formulaire de contact
   - Tester la responsivité

## 📱 Responsive Design

Le site s'adapte automatiquement à tous les écrans :

- **Desktop** : Layout en grille, navigation horizontale
- **Tablette** : Adaptation des colonnes, menu hamburger
- **Mobile** : Layout en colonne unique, navigation optimisée

## 🛒 Fonctionnalités du Panier

- **Ajout/Suppression** de produits
- **Modification** des quantités
- **Calcul automatique** des totaux
- **Persistance** des données (localStorage)
- **Codes promo** : VERTE10 (10% réduction), LIVRAISON (livraison gratuite)

## 🔍 Filtres du Catalogue

- **Recherche textuelle** : Nom et description des produits
- **Filtre par catégorie** : Intérieur, Extérieur, Médicinal, Succulentes
- **Filtre par prix** : 4 tranches de prix
- **Tri** : Nom A-Z/Z-A, Prix croissant/décroissant, Popularité
- **Vue** : Grille ou liste

## 📧 Formulaire de Contact

- **Validation en temps réel** des champs
- **Messages d'erreur** contextuels
- **Animation de chargement** lors de l'envoi
- **Message de confirmation** après envoi
- **FAQ interactive** avec accordéon

## 🎯 Fonctionnalités Bonus

- **Animation de chargement** au démarrage
- **Slider automatique** sur la page d'accueil
- **Animations au scroll** pour les éléments
- **Mode sombre** (préférence système)
- **Optimisations d'accessibilité**
- **Gestion des erreurs d'images**

## 🔧 Personnalisation

### Ajouter des Produits
Modifiez le tableau `products` dans `js/main.js` :

```javascript
{
    id: 9,
    name: "Nouvelle Plante",
    category: "interior",
    price: 30.00,
    image: "images/nouvelle-plante.jpg",
    description: "Description de la nouvelle plante",
    popular: false
}
```

### Modifier les Couleurs
Éditez les variables CSS dans `css/style.css` :

```css
:root {
    --primary-green: #4CAF50;
    --secondary-green: #45a049;
    /* ... autres couleurs */
}
```

### Ajouter des Images
Placez vos images dans le dossier `images/` et mettez à jour les chemins dans le code.

## 🌟 Fonctionnalités Avancées

- **Gestion d'état** avec localStorage
- **Validation robuste** des formulaires
- **Animations fluides** et performantes
- **Code modulaire** et maintenable
- **Accessibilité** respectée
- **Performance** optimisée

## 📞 Support

Pour toute question ou suggestion d'amélioration, n'hésitez pas à ouvrir une issue ou à contacter l'équipe de développement.

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

---

**Développé avec ❤️ pour les amoureux des plantes** 🌿 