import React, { useState } from 'react';

// New Modal Component
const RoleModal = ({ isOpen, onClose, role }) => {
  if (!isOpen) return null;

  // Detailed content for each role
  const roleContent = {
    haiduc: {
      title: "Haiduc",
      content: `
        The Haiduc are the legendary outlaws of Romanian folklore, skilled warriors who live by their own code.
        In the Haiducii Metaverse, Haiduci are masters of combat, survival, and stealth.

        KEY FEATURES:
        
        COMBAT & HUNTING
        - Hunt monsters and creatures across Wallachia
        - Specialize in various weapons and combat styles
        - Engage in PvP battles with other players
        - Track and hunt rare mythical creatures
        
        SURVIVAL SKILLS
        - Master wilderness survival techniques
        - Navigate dangerous territories
        - Set traps and ambushes
        - Forage for resources in hostile environments
        
        STEALTH & STRATEGY
        - Move undetected through enemy territories
        - Plan and execute raids on caravans
        - Infiltrate fortified locations
        - Gather intelligence for future operations
        
        ECONOMIC ACTIVITIES
        - Collect bounties on dangerous targets
        - Protect villages from threats for rewards
        - Sell rare monster parts and loot
        - Trade with Farmers for essential supplies
        
        SOCIAL STRUCTURE
        - Form outlaw bands with other Haiduci
        - Establish hidden camps throughout Wallachia
        - Develop reputation systems based on achievements
        - Operate outside conventional law but with honor code
        
        UNIQUE ABILITIES
        - Enhanced combat proficiency
        - Wilderness navigation bonuses
        - Stealth and detection avoidance
        - Monster hunting specialization
        
        Haiduci operate outside the law but often serve as protectors of the common people against tyranny.
        Their path is one of danger, freedom, and honor earned through strength and skill.
        
        The Haiduc's journey begins with choosing your combat specialization and establishing your reputation
        in the wild lands of Wallachia. As you progress, you'll unlock advanced skills, better equipment,
        and gain access to more dangerous hunting grounds and lucrative contracts.
        
        Whether you choose to be a noble protector of villages or a feared raider of trade routes,
        your actions will shape the world around you and determine your place in the legends of Wallachia.
      `
    },
    farmer: {
      title: "Farmer",
      content: `
        The Farmers are the backbone of Wallachian society, cultivating the land and sustaining the economy.
        In the Haiducii Metaverse, Farmers excel in crafting, trading, and building.

        KEY FEATURES:
        
        AGRICULTURE & LIVESTOCK
        - Cultivate various crops with different growth cycles
        - Raise livestock including chickens, sheep, and cattle
        - Develop specialized farming techniques
        - Manage seasonal planting and harvesting
        
        CRAFTING & PRODUCTION
        - Craft weapons, armor, and tools for all players
        - Process raw materials into valuable goods
        - Brew potions and create consumables
        - Develop unique recipes through experimentation
        
        TRADE & ECONOMY
        - Establish trade routes between settlements
        - Set up market stalls and shops
        - Manage supply and demand economics
        - Become a vital hub in the player-driven economy
        
        CONSTRUCTION & DEVELOPMENT
        - Build and upgrade homesteads and farms
        - Develop villages into thriving communities
        - Create infrastructure to support other players
        - Design and decorate personal living spaces
        
        RESOURCE MANAGEMENT
        - Manage limited resources efficiently
        - Balance production across different goods
        - Store and preserve crops and products
        - Optimize workflows for maximum productivity
        
        SOCIAL INTERACTIONS
        - Hire Haiduci for protection against threats
        - Form trade alliances with other Farmers
        - Supply warriors with essential provisions
        - Build reputation as a reliable producer
        
        UNIQUE ABILITIES
        - Enhanced crafting proficiency
        - Agricultural yield bonuses
        - Trading and negotiation advantages
        - Resource gathering efficiency
        
        Farmers play a crucial role in the ecosystem, providing resources that all players need.
        Their path is one of creation, commerce, and community building.
        
        As a Farmer, your journey begins with a small plot of land and basic tools. Through careful
        management, strategic decisions, and collaboration with other players, you can develop
        your homestead into a thriving agricultural enterprise that supplies the entire realm.
        
        Your success will depend on your ability to anticipate market needs, optimize production,
        and build strong relationships with both Haiduci and other Farmers throughout Wallachia.
      `
    }
  };

  const content = roleContent[role] || { title: '', content: '' };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }} onClick={onClose}>
      <div className="modal-content" style={{
        backgroundColor: '#1a1a1a',
        padding: '30px',
        borderRadius: '8px',
        border: '2px solid #d4af37',
        maxWidth: '700px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          color: '#d4af37',
          fontSize: '24px',
          cursor: 'pointer'
        }}>
          &times;
        </button>
        <h2 className="gold" style={{ marginTop: 0, textAlign: 'center' }}>{content.title}</h2>
        <div style={{ 
          color: '#ccc', 
          lineHeight: '1.6', 
          whiteSpace: 'pre-line',
          fontFamily: 'inherit'
        }}>
          {content.content}
        </div>
      </div>
    </div>
  );
};

// Updated Roles Component
const Roles = ({ isMobile }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const openModal = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRole(null);
  };

  return (
    <>
      <div className="roles-section" style={{ 
        textAlign: 'center', 
        marginTop: '40px',
        padding: '0 20px'
      }}>
        <h2 className="gold" style={{ marginBottom: '30px' }}>Roles</h2>
        
        <div className="roles-container" style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px'
        }}>
          {/* Haiduc Role */}
          <div className="panel goldEdge" style={{ 
            maxWidth: isMobile ? '100%' : '400px',
            width: isMobile ? '100%' : 'auto',
            padding: '20px',
            border: '1px',
            background: '#2a170f',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div className="role-image" style={{
              height: '200px',
              background: 'linear-gradient(45deg, #2c2c2c, #1a1a1a)',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <span style={{ color: '#d4af37', fontSize: '64px' }}>⚔️</span>
            </div>
            <h3 className="gold" style={{ margin: '10px 0' }}>Haiduc</h3>
            <p style={{ color: '#ccc', lineHeight: '1.6', flexGrow: 1 }}>
              The outlaws of the wilderness. Masters of combat and survival who live by their own rules. 
              Hunt monsters, protect villages for gold, or raid caravans - the choice is yours.
            </p>
            <button 
              className="cta" 
              style={{ marginTop: '15px' }}
              onClick={() => openModal('haiduc')}
            >
              Learn More
            </button>
          </div>
          
          {/* Farmer Role */}
          <div className="panel goldEdge" style={{ 
            maxWidth: isMobile ? '100%' : '400px',
            width: isMobile ? '100%' : 'auto',
            padding: '20px',
            border: '1px',
            borderRadius: '8px',
            background: '#2a170f',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div className="role-image" style={{
              height: '200px',
              background: 'linear-gradient(45deg, #2c2c2c, #1a1a1a)',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <span style={{ color: '#d4af37', fontSize: '64px' }}>🌾</span>
            </div>
            <h3 className="gold" style={{ margin: '10px 0' }}>Farmer</h3>
            <p style={{ color: '#ccc', lineHeight: '1.6', flexGrow: 1 }}>
              The backbone of society. Cultivate land, raise livestock, craft goods and build the economy. 
              Trade with other players or hire Haiduci for protection against threats.
            </p>
            <button 
              className="cta" 
              style={{ marginTop: '15px' }}
              onClick={() => openModal('farmer')}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <RoleModal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        role={selectedRole} 
      />
    </>
  );
};

export default Roles;