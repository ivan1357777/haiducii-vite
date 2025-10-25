// components/Tokenomics.js
import React from 'react';

const Tokenomics = ({ windowWidth }) => {
  const isMobile = windowWidth < 768;
  
  // Data for token distribution (for chart)
  const distributionData = [
    { percentage: 40, label: 'Play to Earn Rewards', color: '#f0c059' },
    { percentage: 20, label: 'Ecosystem Fund', color: '#4ECDC4' },
    { percentage: 15, label: 'Team & Advisors', color: '#FF6B6B' },
    { percentage: 15, label: 'Public Sale', color: '#45B7D1' },
    { percentage: 10, label: 'Liquidity', color: '#96CEB4' }
  ];

  return (
    <section id="tokenomics" className="tokenomics" style={{
      padding: '80px 20px',
      position: 'relative',
      width: '100%'
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 70% 20%, rgba(240, 192, 89, 0.05) 0%, transparent 30%)',
        pointerEvents: 'none'
      }}></div>
      
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <h2 className="title gold" style={{
          textAlign: 'center',
          fontSize: '2.8rem',
          marginBottom: '15px',
          color: '#f0c059',
          textShadow: '0 1px 0 #6b4a1f, 0 2px 0 #4a3016, 0 0 12px rgba(240, 192, 89, 0.25)'
        }}>
          Tokenomics
        </h2>
        
        <div className="divider" style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #f0c059, transparent)',
          width: '100px',
          margin: '0 auto 40px'
        }}></div>
        
        <div className="panel" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Token Details Card */}
          <div className="card panel" style={{
            background: 'linear-gradient(180deg, #3b2015, #2f1a11 60%, #2a170f)',
            border: '2px solid #140b06',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.35), 0 10px 24px rgba(0, 0, 0, 0.35)',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
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
            
            <h3 className="gold" style={{
              fontSize: '1.8rem',
              marginBottom: '20px',
              color: '#f0c059',
              textAlign: 'center',
              textShadow: '0 1px 0 #6b4a1f, 0 2px 0 #4a3016'
            }}>
              $HAIDUC Token
            </h3>
            
            <p style={{
              textAlign: 'center',
              marginBottom: '30px',
              color: '#f3e7cf',
              lineHeight: '1.6',
              opacity: 0.9
            }}>
              The native utility token powering the Haiducii Metaverse ecosystem
            </p>
            
            <div className="grid" style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '20px'
            }}>
              {[
                { title: 'Token Name', value: 'Haiducii Metaverse Token' },
                { title: 'Token Symbol', value: '$HAIDUC' },
                { title: 'Blockchain', value: 'Binance Smart Chain' },
                { title: 'Total Supply', value: '1,000,000,000' }
              ].map((item, index) => (
                <div key={index} className="info-card panel" style={{
                  background: 'linear-gradient(180deg, #4a2b1a, #3a2115)',
                  border: '1px solid #2a170f',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
                }}>
                  <h4 style={{
                    fontSize: '1rem',
                    marginBottom: '10px',
                    color: '#f0c059',
                    textShadow: '0 1px 0 #4a3016'
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    color: '#f3e7cf',
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    margin: 0
                  }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Distribution Card */}
          <div className="card panel" style={{
            background: 'linear-gradient(180deg, #3b2015, #2f1a11 60%, #2a170f)',
            border: '2px solid #140b06',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.35), 0 10px 24px rgba(0, 0, 0, 0.35)',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
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
            
            <h3 className="gold" style={{
              fontSize: '1.8rem',
              marginBottom: '30px',
              color: '#f0c059',
              textAlign: 'center',
              textShadow: '0 1px 0 #6b4a1f, 0 2px 0 #4a3016'
            }}>
              Token Distribution
            </h3>
            
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              gap: '30px',
              marginBottom: '30px'
            }}>
              {/* Pie Chart Visualization */}
              <div style={{
                position: 'relative',
                width: isMobile ? '180px' : '200px',
                height: isMobile ? '180px' : '200px',
                margin: isMobile ? '0 auto 20px' : '0'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'conic-gradient(' +
                    '#f0c059 0% 40%, ' +
                    '#4ECDC4 40% 60%, ' +
                    '#FF6B6B 60% 75%, ' +
                    '#45B7D1 75% 90%, ' +
                    '#96CEB4 90% 100%)',
                  boxShadow: '0 0 20px rgba(240, 192, 89, 0.3)',
                  border: '2px solid #2a170f'
                }}></div>
                
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '60%',
                  height: '60%',
                  borderRadius: '50%',
                  background: 'linear-gradient(180deg, #3b2015, #2f1a11)',
                  border: '2px solid #2a170f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)'
                }}>
                  <span style={{
                    color: '#f0c059',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    textShadow: '0 1px 0 #4a3016'
                  }}>
                    Total
                  </span>
                </div>
              </div>
              
              {/* Distribution Legend */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                flex: 1
              }}>
                {distributionData.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '4px',
                      background: item.color,
                      border: '1px solid #2a170f',
                      boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)'
                    }}></div>
                    <span style={{
                      color: '#f3e7cf',
                      fontSize: '0.95rem'
                    }}>
                      <strong style={{ color: '#f0c059', textShadow: '0 1px 0 #4a3016' }}>{item.percentage}%</strong> - {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Detailed List */}
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              background: 'linear-gradient(180deg, #4a2b1a, #3a2115)',
              borderRadius: '12px',
              border: '1px solid #2a170f',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}>
              {distributionData.map((item, index) => (
                <li key={index} style={{
                  padding: '12px 20px',
                  borderBottom: index < distributionData.length - 1 ? '1px solid rgba(243, 231, 207, 0.1)' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: '#f3e7cf' }}>{item.label}</span>
                  <span style={{ 
                    color: '#f0c059', 
                    fontWeight: 'bold',
                    background: 'rgba(240, 192, 89, 0.1)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    border: '1px solid rgba(240, 192, 89, 0.3)',
                    textShadow: '0 1px 0 #4a3016'
                  }}>
                    {item.percentage}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;