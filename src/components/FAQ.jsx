// components/FAQ.js
import React, { useState, useEffect } from 'react';

const FAQ = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // FAQ list
  const faqList = [
    {
      q: 'What is Haiducii Metaverse?',
      a: 'It is the first Romanian third-person metaverse, blending survival, farming, raids, and folklore. Your NFT acts as your entry and progression key.',
      quote: '“Step into Valachia—where haiducs and farmers weave their legends in a living world.”',
    },
    {
      q: 'What happens if I sell my NFT?',
      a: 'All account access, XP, roles, farm progress, and reputation transfer to the new owner.',
      quote: '“Like passing down land, blade, and name—your legacy becomes another traveler’s.”',
    },
    {
      q: 'Can I sell items from my inventory separately?',
      a: 'Only if they are tokenized. Otherwise, all inventory moves with the main NFT.',
      quote: '“Bound items remain tied to your soul until the NFT itself changes hands.”',
    },
    {
      q: 'Do I need an NFT to play?',
      a: 'Yes. An entry NFT is required to access the game. Creating an account is needed to mint the NFT.',
      quote: '“The NFT is your key, unlocking the gates of Valachia.”',
    },
    {
      q: 'Will there be a token?',
      a: 'Yes. A token will be introduced in the future to fuel in-game economy—crafting, trading, and progression.',
      quote: '“Gold of the digital age, a coin that fuels the lifeblood of the metaverse.”',
    },
    {
      q: 'What roles exist in the game?',
      a: 'Two main roles: Haiduc (combat, raids) and Farmer (crops, livestock, potions).',
      quote: '“Warriors carve paths with steel, while farmers sustain the land with toil and harvest.”',
    },
    {
      q: 'Do I earn XP?',
      a: 'Yes. NFTs unlock XP, progression, and ownership. XP is bound to the NFT and transfers with it.',
      quote: '“Every battle fought, every crop harvested—XP becomes etched into your NFT’s story.”',
    },
    {
      q: 'What happens to my farm and animals if I sell my NFT?',
      a: 'All farm progress, animals, and resources are transferred to the new owner.',
      quote: '“The fields, herds, and barns—all pass to the next keeper of your land.”',
    },
    {
      q: 'Can I lose reputation?',
      a: 'Yes. Reckless or cruel actions lower reputation and may affect your role in Valachia.',
      quote: '“Mercy earns honor, cruelty breeds fear—and both leave their mark upon your name.”',
    },
    {
      q: 'Is profit guaranteed?',
      a: 'No. NFTs carry risk. There is no financial guarantee of profit.',
      quote: '“The metaverse offers legend and adventure, not promises of gold.”',
    },
  ];

  return (
    <>
      {/* Front-end preview */}
      <section
        id="faq"
        style={{
          padding: '80px 0',
          color: '#f5f5f5',
          textAlign: 'center',
          width: '100%',
          display: 'flex',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
            width: '100%',
          }}
        >
          <h2
            style={{
              fontSize: '2.2rem',
              marginBottom: '15px',
              color: '#f0c059',
              textShadow: '0 1px 0 #6b4a1f, 0 2px 0 #4a3016',
            }}
          >
            Frequently Asked Questions
          </h2>

          <p style={{ color: '#f3e7cf', opacity: 0.9, marginBottom: '20px' }}>
            Here you’ll find answers to the most common questions about Haiducii Metaverse.
          </p>

          <div
            style={{
              height: '2px',
              width: '80px',
              background: 'linear-gradient(90deg, transparent, #f0c059, transparent)',
              margin: '0 auto 30px',
            }}
          ></div>

          {/* Show first 3 questions */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '30px',
            }}
          >
            {faqList.slice(0, 3).map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(180deg, #4a2b1a, #3a2115)',
                  borderRadius: '10px',
                  padding: '20px',
                  textAlign: 'left',
                  border: '2px solid #140b06',
                }}
              >
                <h3 style={{ color: '#f0c059', marginBottom: '15px' }}>{item.q}</h3>
                <p style={{ color: '#f3e7cf', lineHeight: '1.6', opacity: 0.9 }}>{item.a}</p>
                <p style={{ color: '#f0c059', fontStyle: 'italic', marginTop: '10px' }}>{item.quote}</p>
              </div>
            ))}
          </div>

          {/* Open Modal Button */}
          <button
            style={{
              background: 'linear-gradient(180deg, #7a4b22, #60381a)',
              color: '#f0c059',
              border: '1px solid #130a06',
              borderRadius: '12px',
              padding: '12px 40px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={openModal}
          >
            View All Questions
          </button>
        </div>
      </section>

      {/* Modal with full FAQ */}
      {isModalOpen && (
        <div
          style={{
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
            padding: '20px',
          }}
          onClick={handleOverlayClick}
        >
          <div
            style={{
              background: 'linear-gradient(180deg, #3b2015, #2f1a11 60%, #2a170f)',
              border: '2px solid #140b06',
              borderRadius: '16px',
              padding: '30px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
            }}
          >
            <div
              style={{
                padding: '0 0 20px 0',
                borderBottom: '1px solid rgba(240, 192, 89, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2 style={{ color: '#f0c059', fontSize: '1.8rem', margin: 0 }}>
                Frequently Asked Questions
              </h2>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#f0c059',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            {/* All FAQ */}
            <div
              style={{
                padding: '30px 0',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
              }}
            >
              {faqList.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: 'linear-gradient(180deg, #4a2b1a, #3a2115)',
                    borderRadius: '10px',
                    padding: '20px',
                    textAlign: 'left',
                    border: '2px solid #140b06',
                  }}
                >
                  <h3 style={{ color: '#f0c059', marginBottom: '15px' }}>{item.q}</h3>
                  <p style={{ color: '#f3e7cf', lineHeight: '1.6', opacity: 0.9 }}>{item.a}</p>
                  <p style={{ color: '#f0c059', fontStyle: 'italic', marginTop: '10px' }}>{item.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FAQ;
