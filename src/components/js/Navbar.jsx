import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    if (menuActive) {
      document.body.classList.add('menu-active');
    } else {
      document.body.classList.remove('menu-active');
    }

    return () => {
      document.body.classList.remove('menu-active');
    };
  }, [menuActive]);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const closeMenu = () => {
    setMenuActive(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuActive(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && menuActive) {
        setMenuActive(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuActive]);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="desktop-navbar" role="navigation" aria-label="Main navigation">
        <div className="desktop-navbar-content">
          <NavLink 
            to="/" 
            className="desktop-logo"
            aria-label="HorizonDroid Home"
          >
            <img src="/img/logo.png" alt="HorizonDroid Logo" />
            <span>HorizonDroid</span>
          </NavLink>
          
          <div className="desktop-nav">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'active' : ''}
              aria-label="Home"
            >
              <i className="fas fa-home" aria-hidden="true"></i>
              <span>Home</span>
            </NavLink>
            <NavLink 
              to="/devices" 
              className={({ isActive }) => isActive ? 'active' : ''}
              aria-label="Devices"
            >
              <i className="fas fa-download" aria-hidden="true"></i>
              <span>Devices</span>
            </NavLink>
            <NavLink 
              to="/build" 
              className={({ isActive }) => isActive ? 'active' : ''}
              aria-label="Build"
            >
              <i className="fas fa-code" aria-hidden="true"></i>
              <span>Build</span>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="mobile-header" role="banner">
        <div className="mobile-header-content">
          <NavLink 
            to="/" 
            className="mobile-logo" 
            onClick={closeMenu}
            aria-label="HorizonDroid Home"
          >
            <img src="/img/logo.png" alt="HorizonDroid Logo" />
            HorizonDroid
          </NavLink>
          <button 
            className={`hamburger ${menuActive ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label={menuActive ? 'Close menu' : 'Open menu'}
            aria-expanded={menuActive}
            aria-controls="mobile-sidebar"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <aside 
        className="sidebar" 
        role="navigation" 
        aria-label="Mobile navigation"
        id="mobile-sidebar"
        aria-hidden={!menuActive}
      >
        <div className="sidebar-header">
          <NavLink 
            to="/" 
            className="sidebar-logo" 
            onClick={closeMenu}
            aria-label="HorizonDroid Home"
          >
            <img src="/img/logo.png" alt="HorizonDroid Logo" />
            <span>HorizonDroid</span>
          </NavLink>
        </div>

        <nav className="sidebar-nav">
          <NavLink 
            to="/" 
            onClick={closeMenu}
            className={({ isActive }) => isActive ? 'active' : ''}
            aria-label="Home"
          >
            <i className="fas fa-home" aria-hidden="true"></i>
            <span>Home</span>
          </NavLink>
          <NavLink 
            to="/devices" 
            onClick={closeMenu}
            className={({ isActive }) => isActive ? 'active' : ''}
            aria-label="Devices"
          >
            <i className="fas fa-download" aria-hidden="true"></i>
            <span>Devices</span>
          </NavLink>
          <NavLink 
            to="/build" 
            onClick={closeMenu}
            className={({ isActive }) => isActive ? 'active' : ''}
            aria-label="Build"
          >
            <i className="fas fa-code" aria-hidden="true"></i>
            <span>Build</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <p>© 2025 HorizonDroid</p>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {menuActive && (
        <div 
          className="sidebar-overlay" 
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

 
    </>
  );
};

export default Navbar;
