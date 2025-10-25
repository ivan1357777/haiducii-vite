import React, { useState } from 'react';
import TermsModal from './TermsModal';

const Account = ({ windowWidth }) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isOver18, setIsOver18] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  
  const isSmallScreen = windowWidth < 480;

  const handleSignUp = (e) => {
    e.preventDefault();
    setTermsOpen(true);
  };

  const handleTermsAccept = () => {
    setTermsOpen(false);
    // Redirect to dashboard (placeholder for now)
    window.location.href = '/dashboard';
  };

  const handleTermsClose = () => {
    setTermsOpen(false);
  };

  return (
    <section id="account">
      <h2 className="title gold">{isSignIn ? 'Sign in' : 'Sign up'}</h2>
      <div className="grid" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'}}>
        <div className="panel card">
          <div style={{textAlign: 'center', marginBottom: '20px'}}>
            <h3 className="gold">Haiducii Metaverse</h3>
          </div>
          
          <form onSubmit={handleSignUp}>
            {!isSignIn && (
              <div className="formField" style={{marginBottom: '10px'}}>
                <input type="text" placeholder="Username" required />
              </div>
            )}
            
            <div className="formField" style={{marginBottom: '10px'}}>
              <input type="email" placeholder="Email" required />
            </div>
            
            <div className="formField" style={{marginBottom: '10px'}}>
              <input type="password" placeholder="Password" required />
            </div>
            
            {!isSignIn && (
              <div style={{display: 'flex', alignItems: 'flex-start', marginBottom: '14px'}}>
                <input 
                  type="checkbox" 
                  id="ageConfirm"
                  checked={isOver18}
                  onChange={(e) => setIsOver18(e.target.checked)}
                  style={{marginRight: '8px', marginTop: '3px'}}
                  required
                />
                <label htmlFor="ageConfirm" style={{fontSize: '0.9rem', lineHeight: '1.4', textAlign: 'left'}}>
                  I confirm that I am 18+ years old.
                </label>
              </div>
            )}
            
            <button type="submit" className="btn block" style={{marginBottom: '14px'}}>
              {isSignIn ? 'Sign in' : 'Sign up & Get Notified'}
            </button>
          </form>
          
          <div style={{textAlign: 'center', marginBottom: '14px'}}>
            <div style={{
              display: 'flex', 
              alignItems: 'center', 
              margin: '10px 0',
              justifyContent: 'center'
            }}>
              <div style={{flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)'}}></div>
              <span style={{padding: '0 10px', fontSize: '0.9rem', opacity: '0.7'}}>or continue with</span>
              <div style={{flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)'}}></div>
            </div>
          </div>
          
          <div style={{
            display: 'flex', 
            gap: '10px', 
            marginBottom: '14px',
            flexDirection: isSmallScreen ? 'column' : 'row'
          }}>
            <button className="btn ghost lock" style={{
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <span>Solana</span>
            </button>
            <button className="btn ghost" style={{
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <span>Google</span>
            </button>
          </div>
          
          <p className="muted" style={{
            textAlign: 'center', 
            marginTop: '10px', 
            fontSize: '0.8rem',
            lineHeight: '1.4'
          }}>
            By registering you automatically agree to our{' '}
            <button 
              type="button" 
              className="text-link" 
              onClick={() => alert('Privacy Policy will be implemented')}
              style={{color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer'}}
            >
              Privacy Policy
            </button>{' '}
            and{' '}
            <button 
              type="button" 
              className="text-link" 
              onClick={() => alert('Cookies Policy will be implemented')}
              style={{color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer'}}
            >
              Cookies Policy
            </button>.
          </p>
        </div>
        
        <div className="panel card" style={{
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <h3 className="gold" style={{marginBottom: '15px'}}>
            {isSignIn ? 'Need an account?' : 'Already have an account?'}
          </h3>
          <button 
            className="btn" 
            style={{marginBottom: '15px'}}
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn ? 'Sign up' : 'Sign in'}
          </button>
          <p className="muted">
            Wallet connect (Solana) - coming soon.
          </p>
        </div>
      </div>

      <TermsModal 
        isOpen={termsOpen}
        onAccept={handleTermsAccept}
        onClose={handleTermsClose}
      />
    </section>
  );
};

export default Account;