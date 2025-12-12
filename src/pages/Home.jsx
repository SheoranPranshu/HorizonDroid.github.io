import React, { useState, useEffect, useRef, useMemo } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../components/css/Home.css';

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [changelogHtml, setChangelogHtml] = useState('<p>Loading changelog...</p>');
    const [isChangelogExpanded, setIsChangelogExpanded] = useState(false);
    const carouselRef = useRef(null);

    const screenshots = useMemo(() => [
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
    ], []);

    useEffect(() => {
        AOS.init({
            duration: 600,
            once: true,
            offset: 50
        });
    }, []);

    useEffect(() => {
        const autoPlay = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(autoPlay);
    }, [currentIndex]);

    const updateCarouselPositions = () => {
        if (!carouselRef.current) return;

        const carousel = carouselRef.current;
        const slides = carousel.querySelectorAll('.carousel-slide');

        slides.forEach((slide, index) => {
            const offset = index - currentIndex;
            const absOffset = Math.abs(offset);

            const transform = offset === 0
                ? 'translateX(0) translateZ(0) rotateY(0deg)'
                : offset > 0
                    ? `translateX(${Math.min(offset * 60, 200)}px) translateZ(-${absOffset * 100}px) rotateY(-${Math.min(offset * 15, 45)}deg)`
                    : `translateX(${Math.max(offset * 60, -200)}px) translateZ(-${absOffset * 100}px) rotateY(-${Math.max(offset * 15, -45)}deg)`;

            const opacity = absOffset > 3 ? 0 : Math.max(0.3, 1 - absOffset * 0.3);
            const zIndex = screenshots.length - absOffset;
            const visibility = absOffset > 3 ? 'hidden' : 'visible';

            slide.style.transform = transform;
            slide.style.opacity = opacity;
            slide.style.zIndex = zIndex;
            slide.style.visibility = visibility;
        });
    };
    
    useEffect(() => {
        requestAnimationFrame(updateCarouselPositions);
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

    const goToSlide = (index) => {
        if (index !== currentIndex) {
            setCurrentIndex(index);
        }
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

                <section className="section" id="screenshots">
                    <div className="showcase-header" data-aos="fade-up">
                        <div className="showcase-title">
                            <div className="showcase-icon">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                            Interface Showcase
                        </div>
                        <p className="showcase-subtitle">
                            Discover the elegant and intuitive interface that makes Horizon Droid a joy to use every day.
                        </p>
                    </div>

                    <div className="carousel" ref={carouselRef} data-aos="fade-up">
                        {screenshots.map((screenshot, index) => (
                            <div
                                key={index}
                                className="carousel-slide"
                                onClick={() => goToSlide(index)}
                                style={{ cursor: index !== currentIndex ? 'pointer' : 'default' }}
                            >
                                <img
                                    src={screenshot.src}
                                    alt={screenshot.alt}
                                    loading="lazy"
                                />
                            </div>
                        ))}

                        <div className="nav">
                            <button
                                onClick={handlePrev}
                                aria-label="Previous Screenshot"
                            >
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button
                                onClick={handleNext}
                                aria-label="Next Screenshot"
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>

                        <div className="pagination">
                            {screenshots.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to screenshot ${index + 1}`}
                                />
                            ))}
                        </div>
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
