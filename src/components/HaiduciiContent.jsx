// components/HaiduciiContent.js
import React from 'react';

const HaiduciiContent = ({ windowWidth }) => {
  const isMobile = windowWidth < 768;

  return (
    <section id="haiducii-content" className="" style={{
      padding: '60px 20px',
      width: '100%'
    }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h2 className="gold" style={{
          fontSize: '2.5rem',
          marginBottom: '20px',
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
        }}>
          HAIDUCII METAVERSE
        </h2>
        
        <p className="subtitle" style={{
          fontSize: '1.4rem',
          marginBottom: '30px',
          textAlign: 'center',
          opacity: 0.9
        }}>
          The First Romanian Metaverse & Play to Earn Game
        </p>
        
        <p style={{
          marginBottom: '40px',
          textAlign: 'center',
          lineHeight: '1.6',
          fontSize: '1.1rem',
          maxWidth: '800px',
          margin: '0 auto 40px',
          opacity: 0.85
        }}>
          Inspired by the legendary Romanian outlaws who fought for justice, Haiducii Metaverse brings you an immersive blockchain-based gaming experience set in the historical region of Valachia.
        </p>
        
        <div className="panel goldEdge" style={{
          padding: '30px',
          margin: '0 auto',
          maxWidth: '900px'
        }}>
          <h3 className="gold" style={{
            marginBottom: '25px',
            textAlign: 'center',
            fontSize: '1.6rem'
          }}>
            Key Features
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: '20px',
            justifyItems: 'center'
          }}>
            {[
              'Open World Exploration',
              'Play to Earn Mechanics',
              'NFT Collectibles',
              'Player vs Environment',
              'Player vs Player',
              'Crafting System',
              'Governance'
            ].map((feature, index) => (
              <div
                key={index}
                className="kpi"
                style={{
                  textAlign: 'center',
                  width: isMobile ? '100%' : '90%',
                  minHeight: '70px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '15px 20px',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(180deg, #4a2b1a, #3a2115)',
                  border: '2px solid #2a170f',
                  borderRadius: '12px'
                }}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HaiduciiContent;