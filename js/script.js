// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Preloader functionality
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1000);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-links a");

    // Update active nav link based on current page
    const currentPagePath = window.location.pathname.split('/').pop();
    navLinks.forEach((link) => {
        link.classList.remove("active");
        const linkPage = link.getAttribute("href").split('/').pop();

        if (currentPagePath === linkPage || (currentPagePath === '' && linkPage === 'index.html')) {
            link.classList.add("active");
        }
    });

    // Handle body light-theme for specific pages (Downloads)
    // This is now handled directly in the HTML file's <body> tag for downloads.html
    // So, no JS needed for initial theme application based on page content.

    // Enhanced Carousel functionality (only on home page)
    const carousel = document.querySelector(".carousel");
    if (carousel) { // Check if carousel exists on this page
        const items = document.querySelectorAll(".carousel-item");
        const controlsContainer = document.querySelector(".carousel-controls");
        const prevBtn = document.querySelector(".carousel-nav-left");
        const nextBtn = document.querySelector(".carousel-nav-right");

        let currentIndex = 0;
        let itemsPerSlide = 1; // Default for mobile
        let totalSlides = 0;
        let interval;

        // Responsive items per slide
        function updateItemsPerSlide() {
            itemsPerSlide = window.innerWidth >= 768 ? 2 : 1;
            totalSlides = Math.ceil(items.length / itemsPerSlide);

            // Update carousel items width
            items.forEach(item => {
                item.style.minWidth = `${100 / itemsPerSlide}%`;
            });

            // Recreate controls
            createControls();
        }

        function createControls() {
            // Clear existing controls
            controlsContainer.innerHTML = '';

            for (let i = 0; i < totalSlides; i++) {
                const control = document.createElement('div');
                control.classList.add('carousel-control');
                control.dataset.slideIndex = i;
                controlsContainer.appendChild(control);
            }

            // Update active control
            updateControls();
        }

        function updateControls() {
            const controls = document.querySelectorAll(".carousel-control");
            controls.forEach((control, index) => {
                if (index === currentIndex) {
                    control.classList.add("active");
                } else {
                    control.classList.remove("active");
                }
            });
        }

        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            currentIndex = index;
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateControls();
            resetInterval();
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function startInterval() {
            interval = setInterval(nextSlide, 7000);
        }

        function resetInterval() {
            clearInterval(interval);
            startInterval();
        }

        // Initialize carousel
        updateItemsPerSlide();
        goToSlide(0);
        startInterval();

        // Navigation buttons
        prevBtn.addEventListener("click", () => {
            prevSlide();
        });

        nextBtn.addEventListener("click", () => {
            nextSlide();
        });

        // Controls click
        controlsContainer.addEventListener("click", (e) => {
            if (e.target.classList.contains("carousel-control")) {
                const slideIndex = parseInt(e.target.dataset.slideIndex);
                goToSlide(slideIndex);
            }
        });

        // Pause on hover
        carousel.parentElement.addEventListener("mouseenter", () => {
            clearInterval(interval);
        });

        carousel.parentElement.addEventListener("mouseleave", () => {
            startInterval();
        });

        // Handle window resize
        window.addEventListener("resize", () => {
            updateItemsPerSlide();
            goToSlide(currentIndex);
        });
    }

    // Changelog functionality (only on home page)
    const changelogContentDiv = document.getElementById('changelog-content');
    if (changelogContentDiv) { // Check if changelog exists on this page
        const changelogUrl = 'https://raw.githubusercontent.com/HorizonV2/horizon_changelogs/refs/heads/lineage-22.2/README.md';
        const githubChangelogPageUrl = 'https://github.com/HorizonV2/horizon_changelogs/tree/lineage-22.2';

        const changelogParentContainer = document.getElementById('changelog-container');
        const githubLink = document.getElementById('github-changelog-link');
        const changelogToggle = document.getElementById('changelog-toggle');
        const toggleIcon = document.getElementById('toggle-icon');

        // Update the GitHub link
        if (githubLink) {
            githubLink.href = githubChangelogPageUrl;
        }

        // Fetch the Markdown content
        fetch(changelogUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text(); // Get the raw text content
            })
            .then(markdownText => {
                // Convert markdown to HTML using marked.js
                const htmlContent = marked.parse(markdownText);
                changelogContentDiv.innerHTML = htmlContent;

                // Optional: If you want to replicate the original <li> spacing
                changelogContentDiv.querySelectorAll('ul li').forEach(li => {
                    li.style.marginBottom = '10px';
                });
                changelogContentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
                    heading.style.marginTop = '15px';
                    heading.style.marginBottom = '10px';
                });
            })
            .catch(error => {
                console.error('Error fetching changelog:', error);
                changelogContentDiv.innerHTML = '<p>Could not load changelog. Please check our <a href="' + githubChangelogPageUrl + '" style="color: var(--accent)">GitHub repository</a>.</p>';
            });

        // Toggle functionality
        if (changelogToggle && changelogParentContainer) {
            changelogToggle.addEventListener('click', function() {
                changelogParentContainer.classList.toggle('expanded');
                changelogToggle.classList.toggle('expanded');
            });
        }
    }

    // Close hamburger menu when clicking links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                document.getElementById('menu-toggle').checked = false;
            }
        });
    });
});