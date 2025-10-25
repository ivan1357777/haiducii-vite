import React from 'react';

const Footer = ({ windowWidth, onOpenTerms }) => {
  const handleLinkClick = (linkName) => {
    if (linkName === 'Terms' && onOpenTerms) {
      onOpenTerms(); // Open the Terms modal
    } else {
      alert(`${linkName} page will be implemented`);
    }
  };

  return (
    <footer>
      <div className="container footer-content">
        <small>© Haiducii Metaverse</small>
        <nav className="footer-nav">
          <button 
            className="footer-link" 
            onClick={() => handleLinkClick('Terms')}
            style={{background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer'}}
          >
            Terms
          </button>
          <button 
            className="footer-link" 
            onClick={() => handleLinkClick('Privacy')}
            style={{background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer'}}
          >
            Privacy
          </button>
          <button 
            className="footer-link" 
            onClick={() => handleLinkClick('Whitepaper')}
            style={{background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer'}}
          >
            Whitepaper
          </button>
          <button 
            className="footer-link" 
            onClick={() => handleLinkClick('Discord')}
            style={{background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer'}}
          >
            Discord
          </button>
          <button 
            className="footer-link" 
            onClick={() => handleLinkClick('Twitter')}
            style={{background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer'}}
          >
            Twitter
          </button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;