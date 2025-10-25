import React from 'react';

const MapSection = ({ openModal, windowWidth }) => {
  // Modal content data
  const copy = {
    pve: {
      title: "PvE Area",
      text: "Wolves by night, spirits by foggy dawn. Gather, hunt and survive; fortune favors the bold."
    },
    cave_silence: {
      title: "Cave of Silence",
      text: "Veins of iron echo like distant bells. Mine with care; shadows listen."
    },
    golden_gallery: {
      title: "Golden Gallery",
      text: "Old tunnels shimmer with dusted light. Gold awaits those who read the rock."
    },
    bloodgem: {
      title: "Bloodgem Cavern",
      text: "Red crystals throb with ancient heat. Only disciplined hands return with treasure."
    },
    farm: {
      title: "The Farm",
      text: "Sow and harvest daily. Ducks, chickens and pigs thrive unless neglected."
    },
    baba: {
      title: "Baba Floare",
      text: "Brews that mend bones and stir courage. Bring herbs, pay respect."
    },
    beggar: {
      title: "Moș Velea (Beggar)",
      text: "Blind, yet seeing hearts. Donate meals or coin to earn reputation in Valachia."
    },
    forge: {
      title: "Brâncuși Forge",
      text: "Tools and blades born in fire. Farmers craft their gear; haiducs temper destiny."
    }
  };

  // Adjust pin positions based on screen size
  const getPinPosition = (defaultPos, mobilePos, smallMobilePos) => {
    if (windowWidth < 400) return smallMobilePos || mobilePos;
    if (windowWidth < 768) return mobilePos;
    return defaultPos;
  };

  return (
    <section id="map">
      <h2 className="title gold">Vallea Codrilor</h2>
      <div className="mapWrap panel">
        <div className="map" aria-label="Vallea Codrilor map"></div>
        
        {/* Map pins with responsive positioning */}
        <button 
          className="pin pve" 
          onClick={() => openModal(copy.pve)}
          title="PvE Area" 
          aria-label="PvE Area"
          style={{
            left: getPinPosition('24%', '20%', '18%'),
            top: getPinPosition('28%', '25%', '22%')
          }}
        >
          <svg viewBox="0 0 24 24" fill="#2b1a0e" aria-hidden="true">
            <path d="M7.5 3l3 3L7 9.5 9.5 12 6 15.5 3.5 13 1 15.5 2.5 17 1 18.5 2.5 20 4 18.5l1.5 1.5 2.5-2.5L8 15.5 11.5 12 9 9.5 12.5 6l-3-3z"/>
          </svg>
        </button>
        
        <button 
          className="pin cave1" 
          onClick={() => openModal(copy.cave_silence)}
          title="Cave of Silence"
          style={{
            left: getPinPosition('23%', '20%', '18%'),
            top: getPinPosition('54%', '50%', '48%')
          }}
        >
          <svg viewBox="0 0 24 24" fill="#2b1a0e" aria-hidden="true">
            <path d="M12 2l9 18H3L12 2z"/>
          </svg>
        </button>
        
        <button 
          className="pin cave2" 
          onClick={() => openModal(copy.golden_gallery)}
          title="Golden Gallery"
          style={{
            left: getPinPosition('58%', '55%', '52%'),
            top: getPinPosition('62%', '60%', '58%')
          }}
        >
          <svg viewBox="0 0 24 24" fill="#2b1a0e" aria-hidden="true">
            <path d="M12 2l7 12-7 8-7-8 7-12z"/>
          </svg>
        </button>
        
        <button 
          className="pin cave3" 
          onClick={() => openModal(copy.bloodgem)}
          title="Bloodgem Cavern"
          style={{
            left: getPinPosition('77%', '75%', '72%'),
            top: getPinPosition('77%', '75%', '72%')
          }}
        >
          <svg viewBox="0 0 24 24" fill="#2b1a0e" aria-hidden="true">
            <circle cx="12" cy="12" r="4"/>
          </svg>
        </button>
        
        <button 
          className="pin farm" 
          onClick={() => openModal(copy.farm)}
          title="The Farm"
          style={{
            left: getPinPosition('36%', '35%', '32%'),
            top: getPinPosition('74%', '70%', '68%')
          }}
        >
          <svg viewBox="0 0 24 24" fill="#2b1a0e" aria-hidden="true">
            <path d="M3 10l9-7 9 7v10H3V10zm7 2H6v7h4v-7z"/>
          </svg>
        </button>
        
        <button 
          className="pin baba" 
          onClick={() => openModal(copy.baba)}
          title="Baba Floare"
          style={{
            left: getPinPosition('82%', '80%', '78%'),
            top: getPinPosition('32%', '30%', '28%')
          }}
        >
          <svg viewBox="0 0 24 24" fill="#2b1a0e" aria-hidden="true">
            <path d="M12 2a5 5 0 015 5v2H7V7a5 5 0 015-5zM6 11h12v11H6V11z"/>
          </svg>
        </button>
        
        <button 
          className="pin forge" 
          onClick={() => openModal(copy.forge)}
          title="Brâncuși Forge"
          style={{
            left: getPinPosition('60%', '55%', '52%'),
            top: getPinPosition('40%', '35%', '32%')
          }}
        >
          <svg viewBox="0 0 24 24" fill="#2b1a0e" aria-hidden="true">
            <path d="M3 17h18v2H3zM13 6l5 5-4 4-5-5 4-4z"/>
          </svg>
        </button>
        
        <button 
          className="pin beggar" 
          onClick={() => openModal(copy.beggar)}
          title="Moș Velea (Beggar)"
          style={{
            left: getPinPosition('78%', '75%', '72%'),
            top: getPinPosition('48%', '45%', '42%')
          }}
        >
          <svg viewBox="0 0 24 24" fill="#2b1a0e" aria-hidden="true">
            <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9v-1a7 7 0 0114 0v1H5z"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default MapSection;