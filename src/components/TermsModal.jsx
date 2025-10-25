import React from 'react';

const TermsModal = ({ isOpen, onAccept, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal open" role="dialog" aria-modal="true" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div className="panel goldEdge" style={{
        background: 'linear-gradient(180deg, #3b2015, #2f1a11 60%, #2a170f)',
        border: '2px solid #140b06',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.35), 0 10px 24px rgba(0, 0, 0, 0.35)',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Close button */}
        <button 
          className="btn" 
          onClick={onClose} 
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: '#f0c059',
            fontSize: '24px',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
          }}
        >
          ×
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 className="gold" style={{
            color: '#f0c059',
            textShadow: '0 1px 0 #6b4a1f, 0 2px 0 #4a3016',
            margin: 0,
            fontSize: '2rem'
          }}>
            Terms & Conditions
          </h3>
        </div>
        
        <div className="divider" style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #f0c059, transparent)',
          margin: '20px 0'
        }}></div>
        
        <div style={{
          maxHeight: '60vh',
          overflowY: 'auto',
          paddingRight: '10px',
          marginBottom: '30px',
          color: '#f3e7cf',
          lineHeight: '1.6'
        }}>
          <p style={{ marginBottom: '20px', opacity: 0.9 }}>
            <strong>Last updated: November 28, 2023</strong>
          </p>

          <h4 style={{ color: '#f0c059', margin: '25px 0 15px' }}>1. Agreement to Terms</h4>
          <p style={{ marginBottom: '20px' }}>
            By accessing or using Haiducii Metaverse ("we," "us," "our"), you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our platform.
          </p>

          <h4 style={{ color: '#f0c059', margin: '25px 0 15px' }}>2. Definitions</h4>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '10px' }}>"Platform" refers to Haiducii Metaverse website, games, and related services.</li>
            <li style={{ marginBottom: '10px' }}>"User" refers to any individual accessing our platform.</li>
            <li style={{ marginBottom: '10px' }}>"Content" includes text, graphics, images, music, software, and other materials.</li>
            <li style={{ marginBottom: '10px' }}>"NFTs" means non-fungible tokens representing in-game assets.</li>
          </ul>

          <h4 style={{ color: '#f0c059', margin: '25px 0 15px' }}>3. User Accounts</h4>
          <p style={{ marginBottom: '15px' }}>
            When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password.
          </p>
          <p style={{ marginBottom: '20px' }}>
            You agree to accept responsibility for all activities that occur under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>

          <h4 style={{ color: '#f0c059', margin: '25px 0 15px' }}>4. Intellectual Property Rights</h4>
          <p style={{ marginBottom: '15px' }}>
            Unless otherwise indicated, the Platform is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Platform are owned or controlled by us.
          </p>
          <p style={{ marginBottom: '20px' }}>
            You are granted a limited license to access and use the Platform for personal, non-commercial use only.
          </p>

          <h4 style={{ color: '#f0c059', margin: '25px 0 15px' }}>5. User Representations</h4>
          <p style={{ marginBottom: '15px' }}>
            By using the Platform, you represent and warrant that:
          </p>
          <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '10px' }}>You have the legal capacity and agree to comply with these Terms</li>
            <li style={{ marginBottom: '10px' }}>You are not a minor in the jurisdiction in which you reside</li>
            <li style={{ marginBottom: '10px' }}>You will not use the Platform for any illegal or unauthorized purpose</li>
            <li style={{ marginBottom: '10px' }}>Your use of the Platform will not violate any applicable law or regulation</li>
          </ul>

          <h4 style={{ color: '#f0c059', margin: '25px 0 15px' }}>6. Prohibited Activities</h4>
          <p style={{ marginBottom: '15px' }}>
            You may not access or use the Platform for any purpose other than that for which we make the Platform available. The Platform may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </p>

          <h4 style={{ color: '#f0c059', margin: '25px 0 15px' }}>7. NFT Ownership and Usage</h4>
          <p style={{ marginBottom: '15px' }}>
            NFTs purchased or acquired through our Platform are digital collectibles that represent ownership of a unique digital asset. Ownership of the NFT is governed by the smart contract and blockchain network on which the NFT resides.
          </p>

          <h4 style={{ color: '#f0c059', margin: '25px 0 15px' }}>8. Disclaimer of Warranties</h4>
          <p style={{ marginBottom: '15px' }}>
            The Platform is provided on an as-is and as-available basis. You agree that your use of the Platform will be at your sole risk. We disclaim all warranties of any kind, whether express or implied.
          </p>

          <h4 style={{ color: '#f0c059', margin: '25px 0 15px' }}>9. Limitation of Liability</h4>
          <p style={{ marginBottom: '15px' }}>
            In no event will we, our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages.
          </p>

          <h4 style={{ color: '#f0c059', margin: '25px 0 15px' }}>10. Contact Us</h4>
          <p style={{ marginBottom: '20px' }}>
            In order to resolve a complaint regarding the Platform or to receive further information regarding use of the Platform, please contact us at:
          </p>
          <p style={{ 
            background: 'linear-gradient(180deg, #4a2b1a, #3a2115)', 
            padding: '15px', 
            borderRadius: '8px',
            border: '1px solid #2a170f',
            fontSize: '0.9rem'
          }}>
            <strong>Haiducii Metaverse</strong><br />
            Email: support@haiduciimetaverse.io<br />
            Website: https://haiduciimetaverse.io
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          justifyContent: 'flex-end', 
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(240, 192, 89, 0.3)'
        }}>
          <button className="btn secondary" onClick={onClose} style={{
            background: 'linear-gradient(180deg, #60381a, #4a2b1a)',
            color: '#f0c059',
            border: '1px solid #130a06',
            borderRadius: '12px',
            padding: '12px 24px',
            cursor: 'pointer',
            minWidth: '100px'
          }}>
            Cancel
          </button>
          <button className="btn" onClick={onAccept} style={{
            background: 'linear-gradient(180deg, #7a4b22, #60381a)',
            color: '#f0c059',
            border: '1px solid #130a06',
            borderRadius: '12px',
            padding: '12px 24px',
            cursor: 'pointer',
            minWidth: '100px'
          }}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;