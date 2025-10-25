// components/Roadmap.js
import React from 'react';

const Roadmap = () => {
  return (
    <section id="roadmap" className="roadmap" style={{
      padding: '80px 20px',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      display: 'flex',
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 20%)',
        pointerEvents: 'none'
      }}></div>
      
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.8rem',
          marginBottom: '20px',
          color: '#f0c059',
          textShadow: '0 1px 0 #6b4a1f, 0 2px 0 #4a3016, 0 0 12px rgba(240, 192, 89, 0.25)'
        }}>
          Project Roadmap
        </h2>
        
        <p style={{
          textAlign: 'center',
          fontSize: '1.2rem',
          marginBottom: '60px',
          color: '#f3e7cf',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
          opacity: 0.85
        }}>
          Our strategic plan for developing and launching the Haiducii Metaverse
        </p>
        
        <div className="roadmap-content" style={{
          position: 'relative',
          padding: '40px 0'
        }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            top: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: 'calc(100% - 100px)',
            background: 'linear-gradient(to bottom, #f0c059, #cfa245)',
            borderRadius: '2px',
            boxShadow: '0 0 10px rgba(240, 192, 89, 0.5)'
          }}></div>
          
          <div className="phases-container" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '80px'
          }}>
            {[
              {
                title: 'Q4 2023 - Phase 1: Foundation',
                items: [
                  'Concept Development',
                  'Team Assembly',
                  'Whitepaper Release',
                  'Community Building'
                ],
                position: 'left'
              },
              {
                title: 'Q1 2024 - Phase 2: Development',
                items: [
                  'Smart Contract Development',
                  'Token Generation Event',
                  'Game Prototype',
                  'NFT Marketplace Development'
                ],
                position: 'right'
              },
              {
                title: 'Q2 2024 - Phase 3: Expansion',
                items: [
                  'Beta Testing',
                  'CEX Listings',
                  'Game Mechanics Finalization',
                  'Partnership Announcements'
                ],
                position: 'left'
              },
              {
                title: 'Q3 2024 - Phase 4: Launch',
                items: [
                  'Official Game Launch',
                  'NFT Character Minting',
                  'Play-to-Earn Implementation',
                  'Mobile App Development'
                ],
                position: 'right'
              }
            ].map((phase, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: phase.position === 'left' ? 'flex-start' : 'flex-end',
                position: 'relative',
                padding: '0 20px'
              }}>
                {/* Timeline dot */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: '#f0c059',
                  border: '4px solid #2a160e',
                  boxShadow: '0 0 15px rgba(240, 192, 89, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  zIndex: 3
                }}></div>
                
                <div className="phase panel" style={{
                  width: '45%',
                  background: 'linear-gradient(180deg, #3b2015, #2f1a11 60%, #2a170f)',
                  border: '2px solid #140b06',
                  borderRadius: '16px',
                  padding: '25px',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.35), 0 10px 24px rgba(0, 0, 0, 0.35)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Corner accents */}
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    width: '30px',
                    height: '30px',
                    borderTop: '2px solid #f0c059',
                    borderRight: '2px solid #f0c059',
                    borderTopRightRadius: '10px'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '30px',
                    height: '30px',
                    borderBottom: '2px solid #f0c059',
                    borderLeft: '2px solid #f0c059',
                    borderBottomLeftRadius: '10px'
                  }}></div>
                  
                  <h3 style={{
                    fontSize: '1.4rem',
                    marginBottom: '20px',
                    color: '#f0c059',
                    textShadow: '0 1px 0 #6b4a1f, 0 2px 0 #4a3016'
                  }}>
                    {phase.title}
                  </h3>
                  
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {phase.items.map((item, i) => (
                      <li key={i} style={{
                        padding: '10px 0',
                        paddingLeft: '25px',
                        position: 'relative',
                        color: '#f3e7cf',
                        borderBottom: i < phase.items.length - 1 ? '1px solid rgba(243, 231, 207, 0.1)' : 'none'
                      }}>
                        <div style={{
                          position: 'absolute',
                          left: '0',
                          top: '15px',
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: 'rgba(240, 192, 89, 0.3)',
                          border: '2px solid #f0c059',
                          boxShadow: '0 0 5px rgba(240, 192, 89, 0.3)'
                        }}></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .roadmap-content {
            padding: 20px 0 !important;
          }
          
          .phases-container {
            gap: 60px !important;
          }
          
          .phase {
            width: 90% !important;
            margin: 0 auto !important;
          }
          
          .phase h3 {
            font-size: 1.2rem !important;
          }
          
          // Hide timeline on mobile
          .roadmap-content > div:first-child {
            display: none;
          }
          
          // Reposition timeline dots
          .phases-container > div > div:first-child {
            left: 20px !important;
          }
          
          .phases-container > div {
            justify-content: flex-start !important;
            padding-left: 50px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Roadmap;