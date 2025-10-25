import React, { useState } from 'react';
import FeatureModal from './FeatureModal';

const FeaturesGrid = ({ openModal, windowWidth }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const features = [
    {
      id: 'pve',
      title: 'PvE Area',
      description: 'Wolves and roaming threats test the brave. Hunt, gather, survive.',
      lore: 'Wolves prowl, spirits whisper. Hunt, protect travelers, and earn reputation for Valachia. Rare drops appear at night.',
      imgLarge: 'img/cinematic/pve-area.jpg',
      thumb: 'img/thumbs/pve.jpg'
    },
    {
      id: 'farm',
      title: 'The Farm',
      description: 'Plant & harvest, raise ducks/chickens/pigs, cook meals. Food spoils after 24h (real-time).',
      lore: 'Plant, water, and harvest. Fresh meals keep haiducs alive; neglect invites decay. Only hands that care will prosper.',
      imgLarge: 'img/cinematic/farm.jpg',
      thumb: 'img/thumbs/farm.jpg'
    },
    {
      id: 'caves',
      title: 'Caves',
      description: 'Cave of Silence (iron), Golden Gallery (gold), Bloodgem Cavern (red crystals).',
      lore: 'Explore the depths of Valachia\'s mountains. Each cave offers unique resources and challenges for the brave.',
      imgLarge: 'img/cinematic/caves.jpg',
      thumb: 'img/thumbs/caves.jpg'
    },
    {
      id: 'quests',
      title: 'Daily Quests & Reputation',
      description: 'Complete tasks for tokens & favor. Be kind and the realm remembers; exploit and your name darkens.',
      lore: 'Help villagers, solve problems, and build your reputation. Your actions shape how Valachia sees you.',
      imgLarge: 'img/cinematic/quests.jpg',
      thumb: 'img/thumbs/quests.jpg'
    },
    {
      id: 'raid',
      title: 'PvE Raid (Coming Soon)',
      description: 'Team up against powerful foes. Coming in Batch II.',
      lore: 'Band together against lairs of terror. Only the united return. Coming soon.',
      imgLarge: 'img/cinematic/raid.jpg',
      thumb: 'img/thumbs/raid.jpg',
      locked: true
    }
  ];

  const handleFeatureClick = (feature) => {
    if (feature.locked) return;
    setSelectedFeature(feature);
    setModalOpen(true);
  };

  const closeFeatureModal = () => {
    setModalOpen(false);
    setSelectedFeature(null);
  };

  return (
    <section id="features">
      <h2 className="title gold">Batch I • Key Features</h2>
      <div className="grid">
        {features.map((feature) => (
          <div 
            key={feature.id}
            className={`panel card ${feature.locked ? 'locked' : ''}`}
            onClick={() => handleFeatureClick(feature)}
            style={{ cursor: feature.locked ? 'not-allowed' : 'pointer' }}
          >
            {feature.locked && <div className="locked-badge">LOCKED</div>}
            <div 
              className="card-img" 
              style={{ backgroundImage: `url('${feature.thumb}')` }}
            ></div>
            <h3 className="gold">{feature.title}</h3>
            <p>{feature.description}</p>
            {!feature.locked && (
              <button className="btn">View</button>
            )}
          </div>
        ))}
      </div>

      <FeatureModal 
        isOpen={modalOpen}
        feature={selectedFeature}
        onClose={closeFeatureModal}
      />
    </section>
  );
};

export default FeaturesGrid;