document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !mobileMenuBtn.contains(event.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
    
    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        if (window.innerWidth <= 768) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Lightbox functionality for gallery images
    const galleryImages = document.querySelectorAll('.gallery-item img, .event-image img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.display = 'block';
            
            // Create image
            const lightboxImg = document.createElement('img');
            lightboxImg.className = 'lightbox-content';
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            
            // Create close button
            const closeBtn = document.createElement('span');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            
            // Add elements to lightbox
            lightbox.appendChild(lightboxImg);
            lightbox.appendChild(closeBtn);
            
            // Add lightbox to body
            document.body.appendChild(lightbox);
            
            // Close lightbox events
            closeBtn.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                }
            });
            
            // Close with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });

    // Tournament Filter Functionality
    const categoryFilter = document.getElementById('category-filter');
    const locationFilter = document.getElementById('location-filter');
    const monthFilter = document.getElementById('month-filter');
    const yearFilter = document.getElementById('year-filter');
    const tournamentCards = document.querySelectorAll('.tournament-card');

    function filterTournaments() {
        const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
        const selectedLocation = locationFilter ? locationFilter.value : 'all';
        const selectedMonth = monthFilter ? monthFilter.value : 'all';
        const selectedYear = yearFilter ? yearFilter.value : 'all';

        tournamentCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category') || '';
            const cardLocation = card.getAttribute('data-location') || '';
            const cardMonth = card.getAttribute('data-month') || '';
            const cardYear = card.getAttribute('data-year') || '';

            const categoryMatch = selectedCategory === 'all' || cardCategory.includes(selectedCategory);
            const locationMatch = selectedLocation === 'all' || cardLocation === selectedLocation;
            const monthMatch = selectedMonth === 'all' || cardMonth === selectedMonth;
            const yearMatch = selectedYear === 'all' || cardYear === selectedYear;

            if (categoryMatch && locationMatch && monthMatch && yearMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listeners for filters
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterTournaments);
    }

    if (locationFilter) {
        locationFilter.addEventListener('change', filterTournaments);
    }

    if (monthFilter) {
        monthFilter.addEventListener('change', filterTournaments);
    }

    if (yearFilter) {
        yearFilter.addEventListener('change', filterTournaments);
    }
});