import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../components/css/Home.css';

const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });

        const carousel = document.querySelector(".carousel");
        if (!carousel) return;

        const items = document.querySelectorAll(".carousel-item");
        const controlsContainer = document.querySelector(".carousel-controls");
        const prevBtn = document.querySelector(".carousel-nav-left");
        const nextBtn = document.querySelector(".carousel-nav-right");

        let currentIndex = 0;
        let itemsPerSlide = window.innerWidth >= 768 ? 2 : 1;
        let totalSlides = Math.ceil(items.length / itemsPerSlide);
        let interval;

        const updateItemsPerSlide = () => {
            itemsPerSlide = window.innerWidth >= 768 ? 2 : 1;
            totalSlides = Math.ceil(items.length / itemsPerSlide);
            items.forEach(item => {
                item.style.minWidth = `${100 / itemsPerSlide}%`;
            });
            createControls();
        };

        const createControls = () => {
            controlsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const control = document.createElement('div');
                control.classList.add('carousel-control');
                control.dataset.slideIndex = i;
                controlsContainer.appendChild(control);
            }
            updateControls();
        };

        const updateControls = () => {
            const controls = document.querySelectorAll(".carousel-control");
            controls.forEach((control, index) => {
                control.classList.toggle("active", index === currentIndex);
            });
        };

        const goToSlide = (index) => {
            currentIndex = (index + totalSlides) % totalSlides;
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateControls();
            resetInterval();
        };

        const nextSlide = () => goToSlide(currentIndex + 1);
        const prevSlide = () => goToSlide(currentIndex - 1);

        const startInterval = () => {
            interval = setInterval(nextSlide, 7000);
        };

        const resetInterval = () => {
            clearInterval(interval);
            startInterval();
        };
        
        updateItemsPerSlide();
        goToSlide(0);
        startInterval();

        prevBtn?.addEventListener("click", prevSlide);
        nextBtn?.addEventListener("click", nextSlide);
        controlsContainer?.addEventListener("click", (e) => {
            if (e.target.classList.contains("carousel-control")) {
                goToSlide(parseInt(e.target.dataset.slideIndex));
            }
        });

        const carouselContainer = carousel.parentElement;
        carouselContainer?.addEventListener("mouseenter", () => clearInterval(interval));
        carouselContainer?.addEventListener("mouseleave", startInterval);

        const handleResize = () => {
            updateItemsPerSlide();
            goToSlide(currentIndex);
        };

        window.addEventListener("resize", handleResize);

        const changelogContentDiv = document.getElementById('changelog-content');
        if (changelogContentDiv) {
            const changelogUrl = 'https://raw.githubusercontent.com/HorizonV2/horizon_changelogs/refs/heads/lineage-22.2/README.md';
            fetch(changelogUrl)
                .then(response => response.text())
                .then(markdownText => {
                    if (typeof marked !== 'undefined') {
                        changelogContentDiv.innerHTML = marked.parse(markdownText);
                    } else {
                        changelogContentDiv.innerHTML = `<pre>${markdownText}</pre>`;
                    }
                })
                .catch(error => {
                    changelogContentDiv.innerHTML = '<p>Failed to load changelog. Please check our GitHub repository.</p>';
                    console.error('Error loading changelog:', error);
                });
        }
        
        const changelogToggle = document.getElementById('changelog-toggle');
        const changelogContainer = document.getElementById('changelog-container');
        if(changelogToggle && changelogContainer) {
            const handleToggleClick = () => {
                changelogContainer.classList.toggle('expanded');
                changelogToggle.classList.toggle('expanded');
            };
            
            changelogToggle.addEventListener('click', handleToggleClick);
            
            return () => {
                changelogToggle.removeEventListener('click', handleToggleClick);
            };
        }

        return () => {
            clearInterval(interval);
            prevBtn?.removeEventListener("click", prevSlide);
            nextBtn?.removeEventListener("click", nextSlide);
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    return (
        <div className="page-content" id="home">
            <div className="container">
                <div className="hero">
                    <div className="hero-text" data-aos="fade-right" data-aos-duration="800">
                        <h1>Horizon Droid</h1>
                        <p>Hey Guys, Here's another custom ROM based on LineageOS.</p>
                        <p>You would probably be thinking, what's new?</p>
                        <p>The straight answer is maybe some features that you couldn't get on LOS.</p>
                    </div>
                    <div className="hero-image" data-aos="fade-left" data-aos-duration="800">
                        <img src="/img/logo.png" alt="Horizon Droid Logo" className="logo-large" />
                    </div>
                </div>

                <div className="section full-screen-section" id="welcome-section" data-aos="fade-up" data-aos-duration="1000">
                    <p style={{ fontSize: '2.5rem' }}>
                        <big>Once again, welcome to my <a href="https://t.me/superxorn" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>(superxorn)</a> droid world.</big>
                        <br />
                        <big>I hope you would like, love it.</big>
                    </p>
                </div>

                <div className="section">
                    <h2 className="section-title" data-aos="fade-up">Better than stock ROM?</h2>
                    <div className="features">
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="feature-icon"><i className="fas fa-check-circle"></i></div>
                            <h3>Bloatware Free</h3>
                            <p>Pure Android experience without unnecessary apps</p>
                        </div>
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="feature-icon"><i className="fas fa-bolt"></i></div>
                            <h3>Lightning Fast</h3>
                            <p>Less Loading<span className="loading-dots"><span></span><span></span><span></span></span></p>
                        </div>
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="feature-icon"><i className="fas fa-tachometer-alt"></i></div>
                            <h3>Optimized Performance</h3>
                            <p>Better speed for all your daily tasks</p>
                        </div>
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="feature-icon"><i className="fas fa-magic"></i></div>
                            <h3>Beautiful Animations</h3>
                            <p>Smooth transitions and visual effects</p>
                        </div>
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="500">
                            <div className="feature-icon"><i className="fas fa-star"></i></div>
                            <h3>Enhanced Features</h3>
                            <p>Customizations you won't find elsewhere</p>
                        </div>
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="600">
                            <div className="feature-icon"><i className="fas fa-plus"></i></div>
                            <h3>And Many More</h3>
                            <p>Discover the Horizon difference<span className="wink-emoji">😉</span></p>
                        </div>
                    </div>
                </div>

                <div className="full-screen-section" id="labs-image-section" data-aos="zoom-in" data-aos-duration="800">
                    <img src="/img/labs.png" alt="HorizonLabs UI" />
                </div>

                <div className="section">
                    <h2 className="section-title" data-aos="fade-up">What about UI?</h2>
                    <p style={{ textAlign: 'center', fontSize: '1.4rem', marginBottom: '30px' }} data-aos="fade-up">
                        <big>Beautiful Interface</big>
                    </p>
                    <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }} data-aos="fade-up">
                        You can take a look at the UI by the pictures shown below.
                    </p>

                    <div className="carousel-container" data-aos="zoom-in">
                        <div className="carousel">
                            <div className="carousel-item"><img src="/img/UI (1).png" alt="UI Screenshot 1" /></div>
                            <div className="carousel-item"><img src="/img/UI (2).png" alt="UI Screenshot 2" /></div>
                            <div className="carousel-item"><img src="/img/UI (3).png" alt="UI Screenshot 3" /></div>
                            <div className="carousel-item"><img src="/img/UI (4).png" alt="UI Screenshot 4" /></div>
                            <div className="carousel-item"><img src="/img/UI (5).png" alt="UI Screenshot 5" /></div>
                            <div className="carousel-item"><img src="/img/UI (6).png" alt="UI Screenshot 6" /></div>
                            <div className="carousel-item"><img src="/img/UI (7).png" alt="UI Screenshot 7" /></div>
                            <div className="carousel-item"><img src="/img/UI (8).png" alt="UI Screenshot 8" /></div>
                            <div className="carousel-item"><img src="/img/UI (9).png" alt="UI Screenshot 9" /></div>
                            <div className="carousel-item"><img src="/img/UI (10).png" alt="UI Screenshot 10" /></div>
                            <div className="carousel-item"><img src="/img/UI (11).png" alt="UI Screenshot 11" /></div>
                            <div className="carousel-item"><img src="/img/UI (12).png" alt="UI Screenshot 12" /></div>
                            <div className="carousel-item"><img src="/img/UI (13).png" alt="UI Screenshot 13" /></div>
                            <div className="carousel-item"><img src="/img/UI (14).png" alt="UI Screenshot 14" /></div>
                        </div>
                        <div className="carousel-nav carousel-nav-left"><i className="fas fa-chevron-left"></i></div>
                        <div className="carousel-nav carousel-nav-right"><i className="fas fa-chevron-right"></i></div>
                        <div className="carousel-controls"></div>
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '1.2rem' }} data-aos="fade-up">
                        I hope you liked them.
                    </p>
                </div>

                <div className="section">
                    <h2 className="section-title" data-aos="fade-up">Where can I get changelogs?</h2>
                    <div style={{ 
                        maxWidth: '800px', 
                        margin: '0 auto', 
                        background: 'var(--card-bg)', 
                        borderRadius: '15px', 
                        padding: '30px', 
                        backdropFilter: 'blur(10px)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)' 
                    }} data-aos="fade-up">
                        <p>We have listed the changelogs on our source and we also share them on our build support and community groups after every new update.</p>
                        <p style={{ marginTop: '15px' }}>Don't worry you can check them here too ;)</p>

                        <div style={{ 
                            marginTop: '30px', 
                            background: 'rgba(0, 0, 0, 0.3)', 
                            padding: '20px', 
                            borderRadius: '10px' 
                        }}>
                            <h3 id="changelog-toggle" style={{ 
                                marginBottom: '15px', 
                                color: 'var(--accent)', 
                                cursor: 'pointer' 
                            }}>
                                Latest Changelog <span id="toggle-icon">▼</span>
                            </h3>
                            <div id="changelog-container">
                                <div id="changelog-content" style={{ paddingLeft: '0px' }}>
                                    <p>Loading changelog...</p>
                                </div>
                                <p style={{ marginTop: '15px', fontStyle: 'italic' }}>
                                    Full changelog available on our{' '}
                                    <a 
                                        id="github-changelog-link" 
                                        href="https://github.com/HorizonV2/horizon_changelogs/tree/lineage-22.2" 
                                        style={{ color: 'var(--accent)' }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        GitHub repository
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
