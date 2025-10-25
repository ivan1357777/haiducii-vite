import React from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="hamburger-menu" style={{
      position: 'fixed',
      top: '60px',
      left: 0,
      width: '280px', // Fixed width instead of 100%
      height: '100%',
      background: 'linear-gradient(180deg, var(--wood-900), var(--wood-700))',
      zIndex: 40,
      padding: '20px',
      overflowY: 'auto',
      boxShadow: '4px 0 15px rgba(0, 0, 0, 0.3)' // Add shadow for depth
    }}>
      <button 
        className="close-btn" 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '15px',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer'
        }}
      >
        ✕
      </button>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <a href="#home" onClick={onClose}>Home</a>
        <a href="#map" onClick={onClose}>Map</a>
        <a href="#features" onClick={onClose}>Features</a>
        <a href="#roadmap" onClick={onClose}>Roadmap</a>
        <a href="#account" onClick={onClose}>Sign in</a>
        <Link to="/become-farmer" onClick={onClose}>Become a Farmer</Link>
        <Link to="/become-haiduc" onClick={onClose}>Become a Haiduc</Link>
        <Link to="/economy" onClick={onClose}>NFT Economy</Link>
        <a className="cta" title="Solana wallet - coming soon">Connect Wallet</a>
      </nav>
    </div>
  );
};

export default HamburgerMenu;