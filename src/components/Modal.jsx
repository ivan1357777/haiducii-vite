import React from 'react';

const Modal = ({ isOpen, content, onClose, windowWidth }) => {
  const isMobile = windowWidth < 768;

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="m-title">
      <div className="panel goldEdge">
        <div style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '10px' : '0'
        }}>
          <h3 id="m-title" className="gold">{content.title || 'Title'}</h3>
          <button className="btn" onClick={onClose} aria-label="Close" style={{
            alignSelf: isMobile ? 'flex-end' : 'center'
          }}>Close</button>
        </div>
        <div className="divider"></div>
        <p id="m-text">{content.text || 'Content'}</p>
      </div>
    </div>
  );
};

export default Modal;