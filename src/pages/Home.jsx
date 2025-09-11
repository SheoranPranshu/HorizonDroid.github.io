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
                        <p className="subtitle">Experience the future of custom ROMs with unmatched performance and elegance.</p>
                        <p>Built on LineageOS foundation with carefully crafted features that enhance your daily Android experience. Clean, powerful, and designed for enthusiasts who demand the best.</p>
                    </div>
                    <div className="hero-image" data-aos="fade-left">
                        <img src="/img/logo.png" alt="Horizon Droid Logo" className="logo-large" />
                    </div>
                </section>

                <section className="section">
                    <h2 className="section-title" data-aos="fade-up">Why Choose Horizon?</h2>
                    <div className="features">
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="feature-icon"><i className="fas fa-shield-check"></i></div>
                            <h3>Pure & Clean</h3>
                            <p>Experience Android without the bloat. Every component is carefully selected to deliver a pristine, fast, and reliable system that respects your device's potential.</p>
                        </div>
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="feature-icon"><i className="fas fa-rocket"></i></div>
                            <h3>Performance First</h3>
                            <p>Optimized kernel, refined memory management, and intelligent resource allocation ensure your device runs smoother and faster than ever before.</p>
                        </div>
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="feature-icon"><i className="fas fa-palette"></i></div>
                            <h3>Beautiful Design</h3>
                            <p>Thoughtfully designed interface with smooth animations, consistent theming, and attention to detail that makes every interaction delightful.</p>
                        </div>
                        <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="feature-icon"><i className="fas fa-cogs"></i></div>
                            <h3>Smart Features</h3>
                            <p>Innovative customizations and productivity enhancements that you won't find anywhere else, all designed to make your device truly yours.</p>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <h2 className="section-title" data-aos="fade-up">Interface Showcase</h2>
                    <p className="section-subtitle" data-aos="fade-up">
                        Discover the elegant and intuitive interface that makes Horizon Droid a joy to use every day.
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
                        <button className="carousel-nav carousel-nav-left" onClick={handlePrev} aria-label="Previous Screenshot">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button className="carousel-nav carousel-nav-right" onClick={handleNext} aria-label="Next Screenshot">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </section>

                <section className="section">
                    <h2 className="section-title" data-aos="fade-up">Latest Updates</h2>
                    <div className="changelog-wrapper" data-aos="fade-up">
                        <p>Stay up to date with the latest improvements, features, and bug fixes. We're constantly evolving to bring you the best custom ROM experience possible.</p>
                        <div className="changelog-box">
                            <h3 
                                id="changelog-toggle" 
                                onClick={() => setIsChangelogExpanded(!isChangelogExpanded)} 
                                className={isChangelogExpanded ? 'expanded' : ''}
                            >
                                <span>📋 Latest Changelog</span>
                                <span id="toggle-icon">▼</span>
                            </h3>
                            <div id="changelog-container" className={isChangelogExpanded ? 'expanded' : ''}>
                                <div id="changelog-content" dangerouslySetInnerHTML={{ __html: changelogHtml }} />
                                <div className="changelog-link">
                                    <a 
                                        href="https://github.com/HorizonV2/horizon_changelogs/tree/lineage-22.2" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        🔗 View full changelog history on GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
