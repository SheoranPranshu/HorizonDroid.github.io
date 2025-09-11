import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="great-day">Have a Great Day!</div>
        <div className="credit">
          Made with ❤️ by
          <a href="https://glitchwraith.vercel.app/" target="_blank" rel="noopener noreferrer">
            Glitch Wraith
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
