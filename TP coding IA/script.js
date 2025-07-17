document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const scrollTopBtn = document.getElementById('scroll-top');
    const openFavoritesBtn = document.getElementById('open-favorites');
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('header');
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    
    // Add form validation
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Veuillez entrer une adresse email valide');
            return;
        }
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Merci pour votre inscription ! Vous recevrez bientôt notre newsletter.');
        newsletterForm.reset();
    });
    
    // Function to handle scroll behavior
    function handleScroll() {
        const headerHeight = header.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // Show navbar when scrolling past header
        if (scrollPosition > headerHeight) {
            navbar.classList.add('show');
        } else {
            navbar.classList.remove('show');
        }
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    // Add click event to scroll top button
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Open favorites overlay
    openFavoritesBtn.addEventListener('click', () => {
        const overlay = document.querySelector('.favorites-overlay');
        overlay.classList.add('active');
    });
    
    // Create favorites overlay
    const overlay = document.createElement('div');
    overlay.className = 'favorites-overlay';
    overlay.innerHTML = `
        <div class="favorites-content">
            <button class="close-overlay">&times;</button>
            <h2>Mes Couleurs Favorites</h2>
            <div id="overlay-favorites-list"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Function to handle color rendering
    function renderColors() {
        const colorsContainer = document.getElementById('colors');
        colorsContainer.innerHTML = '';
        
        // Group colors by category
        const categories = {};
        colors.forEach(color => {
            if (!categories[color.category]) {
                categories[color.category] = [];
            }
            categories[color.category].push(color);
        });
        
        // Create category sections
        Object.entries(categories).forEach(([category, categoryColors]) => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category';
            categoryElement.innerHTML = `
                <h2>${category}</h2>
                <div class="color-grid">
                </div>
            `;
            
            const colorGrid = categoryElement.querySelector('.color-grid');
            
            // Add colors with fade-in animation
            categoryColors.forEach((color, index) => {
                const colorElement = document.createElement('div');
                colorElement.className = 'color fade-in';
                colorElement.style.animationDelay = `${index * 0.1}s`;
                colorElement.innerHTML = `
                    <div style="background-color: ${color.hex}"></div>
                    <span>${color.name} (${color.hex})</span>
                    <button class="favorite-button" data-hex="${color.hex}">
                        ❤️
                    </button>
                `;
                colorGrid.appendChild(colorElement);
            });
            
            colorsContainer.appendChild(categoryElement);
        });
    }

    // Initial render
    document.addEventListener('DOMContentLoaded', () => {
        renderColors();
    });

    // Update colors when filters change
    function updateColorsDisplay() {
        renderColors();
    }
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    });

    // Enable smooth scrolling for all anchor links
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
    
    // Open favorites overlay
    openFavoritesBtn.addEventListener('click', () => {
        overlay.classList.add('active');
        updateFavoritesOverlay();
    });
    
    // Close overlay
    overlay.querySelector('.close-overlay').addEventListener('click', () => {
        overlay.classList.remove('active');
    });
    
    // Update favorites overlay content
    function updateFavoritesOverlay() {
        const overlayList = overlay.querySelector('#overlay-favorites-list');
        overlayList.innerHTML = '';
        
        favorites.forEach(hex => {
            const color = colors.find(color => color.hex === hex);
            if (color) {
                const favoriteElement = document.createElement('div');
                favoriteElement.className = 'color';
                favoriteElement.innerHTML = `
                    <div style="background-color: ${color.hex}"></div>
                    <span>${color.name} (${color.hex})</span>
                    <button class="delete-button" data-hex="${color.hex}">
                        Supprimer
                    </button>
                `;
                
                // Add delete functionality
                const deleteButton = favoriteElement.querySelector('.delete-button');
                deleteButton.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent click from closing overlay
                    const hexToRemove = e.target.dataset.hex;
                    
                    // Remove from favorites array
                    favorites = favorites.filter(hex => hex !== hexToRemove);
                    
                    // Update localStorage
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    
                    // Update the overlay
                    updateFavoritesOverlay();
                    
                    // Update the favorite button in the main list if it exists
                    const mainFavoriteButton = document.querySelector(`.favorite-button[data-hex="${hexToRemove}"]`);
                    if (mainFavoriteButton) {
                        mainFavoriteButton.classList.remove('favorited');
                    }
                });
                
                overlayList.appendChild(favoriteElement);
            }
        });
    }
    
    // Hide favorites overlay when clicking outside
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
    const colors = [
        { name: "Rouge", hex: "#FF0000", category: "Rouge" },
        { name: "Rouge Foncé", hex: "#8B0000", category: "Rouge" },
        { name: "Rouge Clair", hex: "#FF6347", category: "Rouge" },
        { name: "Vert", hex: "#00FF00", category: "Vert" },
        { name: "Vert Foncé", hex: "#006400", category: "Vert" },
        { name: "Vert Clair", hex: "#90EE90", category: "Vert" },
        { name: "Bleu", hex: "#0000FF", category: "Bleu" },
        { name: "Bleu Foncé", hex: "#00008B", category: "Bleu" },
        { name: "Bleu Clair", hex: "#ADD8E6", category: "Bleu" },
        { name: "Jaune", hex: "#FFFF00", category: "Jaune" },
        { name: "Jaune Foncé", hex: "#FFD700", category: "Jaune" },
        { name: "Jaune Clair", hex: "#FFFFE0", category: "Jaune" },
        { name: "Orange", hex: "#FFA500", category: "Orange" },
        { name: "Orange Foncé", hex: "#FF8C00", category: "Orange" },
        { name: "Orange Clair", hex: "#FFDAB9", category: "Orange" },
        { name: "Violet", hex: "#800080", category: "Violet" },
        { name: "Violet Foncé", hex: "#4B0082", category: "Violet" },
        { name: "Violet Clair", hex: "#E6E6FA", category: "Violet" },
        { name: "Rose", hex: "#FFC0CB", category: "Rose" },
        { name: "Rose Foncé", hex: "#FF1493", category: "Rose" },
        { name: "Rose Clair", hex: "#FFB6C1", category: "Rose" },
        { name: "Marron", hex: "#A52A2A", category: "Marron" },
        { name: "Marron Foncé", hex: "#8B4513", category: "Marron" },
        { name: "Marron Clair", hex: "#CD853F", category: "Marron" },
        { name: "Noir", hex: "#000000", category: "Noir" },
        { name: "Gris", hex: "#808080", category: "Gris" },
        { name: "Gris Foncé", hex: "#A9A9A9", category: "Gris" },
        { name: "Gris Clair", hex: "#D3D3D3", category: "Gris" },
        { name: "Blanc", hex: "#FFFFFF", category: "Blanc" },
        { name: "Cyan", hex: "#00FFFF", category: "Cyan" },
        { name: "Cyan Foncé", hex: "#008B8B", category: "Cyan" },
        { name: "Cyan Clair", hex: "#E0FFFF", category: "Cyan" },
        { name: "Magenta", hex: "#FF00FF", category: "Magenta" },
        { name: "Magenta Foncé", hex: "#8B008B", category: "Magenta" },
        { name: "Magenta Clair", hex: "#FF99FF", category: "Magenta" },
        { name: "Turquoise", hex: "#40E0D0", category: "Turquoise" },
        { name: "Turquoise Foncé", hex: "#00CED1", category: "Turquoise" },
        { name: "Turquoise Clair", hex: "#AFEEEE", category: "Turquoise" },
        { name: "Or", hex: "#FFD700", category: "Or" },
        { name: "Argent", hex: "#C0C0C0", category: "Argent" },
        { name: "Bronze", hex: "#CD7F32", category: "Bronze" },
        { name: "Cuivre", hex: "#B87333", category: "Cuivre" },
        { name: "Kaki", hex: "#F0E68C", category: "Kaki" },
        { name: "Lavande", hex: "#E6E6FA", category: "Lavande" },
        { name: "Lime", hex: "#BFFF00", category: "Lime" },
        { name: "Olive", hex: "#808000", category: "Olive" },
        { name: "Pêche", hex: "#FFDAB9", category: "Pêche" },
        { name: "Prune", hex: "#DDA0DD", category: "Prune" },
        { name: "Sable", hex: "#F4A460", category: "Sable" },
        { name: "Sapin", hex: "#228B22", category: "Sapin" },
        { name: "Thé", hex: "#D2B48C", category: "Thé" }
    ];

    const colorsContainer = document.getElementById('colors');
    const favoritesList = document.getElementById('favorites-list');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let selectedCategories = [];

    // Create category filters
    function createCategoryFilters() {
        const categories = [...new Set(colors.map(color => color.category))];
        const filtersContainer = document.getElementById('category-filters');
        filtersContainer.innerHTML = '';

        categories.forEach(category => {
            const filter = document.createElement('button');
            filter.className = 'category-filter';
            filter.textContent = category;
            filter.addEventListener('click', () => {
                filter.classList.toggle('active');
                const category = filter.textContent;
                
                if (selectedCategories.includes(category)) {
                    selectedCategories = selectedCategories.filter(c => c !== category);
                } else {
                    selectedCategories.push(category);
                }
                
                // If no category is selected, show all
                if (selectedCategories.length === 0) {
                    renderColors();
                    return;
                }

                // Filter and render colors
                const filteredColors = colors.filter(color => 
                    selectedCategories.includes(color.category)
                );
                
                renderFilteredColors(filteredColors);
            });
            filtersContainer.appendChild(filter);
        });
    }

    // Render filtered colors
    function renderFilteredColors(filteredColors) {
        colorsContainer.innerHTML = '';
        
        // Get unique categories from filtered colors
        const categories = [...new Set(filteredColors.map(color => color.category))];

        categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'category';
            categoryElement.innerHTML = `<h2>${category}</h2>`;

            filteredColors.filter(color => color.category === category).forEach(color => {
                const colorElement = document.createElement('div');
                colorElement.className = 'color';
                colorElement.innerHTML = `
                    <div style="background-color: ${color.hex}"></div>
                    <span>${color.name} (${color.hex})</span>
                    <button class="favorite-button" data-hex="${color.hex}">❤️</button>
                `;
                categoryElement.appendChild(colorElement);
            });

            colorsContainer.appendChild(categoryElement);
        });

        // Add event listeners for favorite buttons
        document.querySelectorAll('.favorite-button').forEach(button => {
            button.addEventListener('click', function() {
                const hex = this.getAttribute('data-hex');
                if (favorites.includes(hex)) {
                    favorites = favorites.filter(fav => fav !== hex);
                    this.classList.remove('favorited');
                } else {
                    favorites.push(hex);
                    this.classList.add('favorited');
                }
                localStorage.setItem('favorites', JSON.stringify(favorites));
                renderFavorites();
            });
        });
    }

    function renderColors() {
        renderFilteredColors(colors);
    }

    function renderFavorites() {
        favoritesList.innerHTML = '';
        favorites.forEach(hex => {
            const color = colors.find(color => color.hex === hex);
            if (color) {
                const favoriteElement = document.createElement('div');
                favoriteElement.className = 'color';
                favoriteElement.innerHTML = `
                    <div style="background-color: ${color.hex}"></div>
                    <span>${color.name} (${color.hex})</span>
                `;
                favoritesList.appendChild(favoriteElement);
            }
        });
    }

    createCategoryFilters();
    renderColors();
    renderFavorites();
});
