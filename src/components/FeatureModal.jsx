import React from 'react';

const FeatureModal = ({ isOpen, feature, onClose }) => {
  if (!isOpen || !feature) return null;

  return (
    <div className="modal open" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="panel goldEdge">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 id="modal-title" className="gold">{feature.title}</h3>
          <button className="btn" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="divider"></div>
        <div 
          className="cinematic" 
          style={{ 
            backgroundImage: `url('${feature.imgLarge}')`,
            height: '200px',
            borderRadius: '12px',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          role="img"
          aria-label={feature.title}
        ></div>
        <p className="lore">{feature.lore}</p>
        <span className="tag">Batch I</span>
      </div>
    </div>
  );
};

export default FeatureModal;