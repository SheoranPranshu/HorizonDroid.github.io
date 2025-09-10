import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../components/css/Home.css';

const screenshots = [
    { src: "/img/UI (1).png", alt: "UI Screenshot 1" },
    { src: "/img/UI (2).png", alt: "UI Screenshot 2" },
    { src: "/img/UI (3).png", alt: "UI Screenshot 3" },
    { src: "/img/UI (4).png", alt: "UI Screenshot 4" },
    { src: "/img/UI (5).png", alt: "UI Screenshot 5" },
    { src: "/img/UI (6).png", alt: "UI Screenshot 6" },
    { src: "/img/UI (7).png", alt: "UI Screenshot 7" },
    { src: "/img/UI (8).png", alt: "UI Screenshot 8" },
    { src: "/img/UI (9).png", alt: "UI Screenshot 9" },
    { src: "/img/UI (10).png", alt: "UI Screenshot 10" },
    { src: "/img/UI (11).png", alt: "UI Screenshot 11" },
    { src: "/img/UI (12).png", alt: "UI Screenshot 12" },
    { src: "/img/UI (13).png", alt: "UI Screenshot 13" },
    { src: "/img/UI (14).png", alt: "UI Screenshot 14" },
];

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [changelogHtml, setChangelogHtml] = useState('<p>Loading changelog...</p>');
    const [isChangelogExpanded, setIsChangelogExpanded] = useState(false);
    const carouselTrackRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }, []);

    useEffect(() => {
        const autoPlay = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1));
        }, 5000);
        return () => clearInterval(autoPlay);
    }, []);

    useEffect(() => {
        if (carouselTrackRef.current) {
            const itemWidth = carouselTrackRef.current.children[0].offsetWidth;
            const gap = 32;
            const scrollAmount = (itemWidth + gap) * currentIndex;
            carouselTrackRef.current.style.transform = `translateX(-${scrollAmount}px)`;
        }
    }, [currentIndex]);

    useEffect(() => {
        const fetchChangelog = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/HorizonV2/horizon_changelogs/refs/heads/lineage-22.2/README.md');
                const markdownText = await response.text();
                if (window.marked) {
                    setChangelogHtml(window.marked.parse(markdownText));
                } else {
                    setChangelogHtml(`<pre>${markdownText}</pre>`);
                }
            } catch (error) {
                console.error('Error loading changelog:', error);
                setChangelogHtml('<p>Failed to load changelog. Please check our GitHub repository.</p>');
            }
        };
        fetchChangelog();
    }, []);

    const handlePrev = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="page-content" id="home">
            <div className="container">
                <section className="hero">
                    <div className="hero-text" data-aos="fade-right">
                        <h1>Horizon Droid</h1>
                        <p className="subtitle">Welcome to a custom ROM experience, rebuilt on LineageOS with features you'll love.</p>
                        <p>Clean, fast, and optimized for your daily life. Discover the Horizon difference.</p>
                    </div>
                    <div className="hero-image" data-aos="fade-left">
                        <img src="/img/logo.png" alt="Horizon Droid Logo" className="logo-large" />
                    </div>
                </section>

                <section className="section">
                    <h2 className="section-title" data-aos="fade-up">Why Horizon?</h2>
                    <div className="features">
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="feature-icon"><i className="fas fa-check-circle"></i></div>
                            <h3>Bloatware Free</h3>
                            <p>A pure, uncluttered Android experience without unnecessary apps.</p>
                        </div>
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="feature-icon"><i className="fas fa-bolt"></i></div>
                            <h3>Lightning Fast</h3>
                            <p>Optimized for speed, giving you less loading and more doing.</p>
                        </div>
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="feature-icon"><i className="fas fa-magic"></i></div>
                            <h3>Beautifully Fluid</h3>
                            <p>Enjoy smooth transitions and delightful animations across the UI.</p>
                        </div>
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="feature-icon"><i className="fas fa-star"></i></div>
                            <h3>Enhanced Features</h3>
                            <p>Thoughtful customizations and features you won't find elsewhere.</p>
                        </div>
                    </div>
                </section>
                
                <section className="full-screen-section" id="labs-image-section" data-aos="zoom-in">
                    <img src="/img/labs.png" alt="HorizonLabs UI" />
                </section>

                <section className="section">
                    <h2 className="section-title" data-aos="fade-up">A Glimpse of the UI</h2>
                     <p className="section-subtitle" data-aos="fade-up">
                        Explore the clean and intuitive interface of Horizon Droid.
                    </p>
                    <div className="carousel-wrapper" data-aos="fade-up">
                        <div className="carousel-track-container">
                            <div className="carousel-track" ref={carouselTrackRef}>
                                {screenshots.map((screenshot, index) => (
                                    <div className="phone-mockup" key={index}>
                                        <div className="phone-screen">
                                            <img src={screenshot.src} alt={screenshot.alt} loading="lazy" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="carousel-nav carousel-nav-left" onClick={handlePrev} aria-label="Previous Screenshot"><i className="fas fa-chevron-left"></i></button>
                        <button className="carousel-nav carousel-nav-right" onClick={handleNext} aria-label="Next Screenshot"><i className="fas fa-chevron-right"></i></button>
                    </div>
                </section>

                <section className="section">
                    <h2 className="section-title" data-aos="fade-up">Changelogs</h2>
                    <div className="changelog-wrapper" data-aos="fade-up">
                        <p>We post changelogs on our source and in our community groups with every update. You can also view the latest one right here.</p>
                        <div className="changelog-box">
                            <h3 id="changelog-toggle" onClick={() => setIsChangelogExpanded(!isChangelogExpanded)} className={isChangelogExpanded ? 'expanded' : ''}>
                                Latest Changelog <span id="toggle-icon">▼</span>
                            </h3>
                            <div id="changelog-container" className={isChangelogExpanded ? 'expanded' : ''}>
                                <div id="changelog-content" dangerouslySetInnerHTML={{ __html: changelogHtml }} />
                                <p className="changelog-link">
                                    Full changelog available on our{' '}
                                    <a 
                                        href="https://github.com/HorizonV2/horizon_changelogs/tree/lineage-22.2" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        GitHub repository
                                    </a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
