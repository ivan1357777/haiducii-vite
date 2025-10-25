import React from 'react';

const Features = ({ windowWidth }) => {
  const isMobile = windowWidth < 768;

  return (
    <section id="features">
      <h2 className="title gold">Batch I • Key Features</h2>
      <div className="grid">
        <div className="panel card">
          <h3 className="gold">PvE Area</h3>
          <p>Wolves and roaming threats test the brave. Hunt, gather, survive.</p>
        </div>
        <div className="panel card">
          <h3 className="gold">The Farm</h3>
          <p>Plant & harvest, raise ducks/chickens/pigs, cook meals. Food spoils after 24h (real-time).</p>
        </div>
        <div className="panel card">
          <h3 className="gold">Caves</h3>
          <p>Cave of Silence (iron), Golden Gallery (gold), Bloodgem Cavern (red crystals).</p>
        </div>
        <div className="panel card">
          <h3 className="gold">Daily Quests & Reputation</h3>
          <p>Complete tasks for tokens & favor. Be kind and the realm remembers; exploit and your name darkens.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;