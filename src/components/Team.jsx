// components/Team.js
import React from 'react';

const Team = ({ windowWidth }) => {
  return (
    <section id="team" className="team">
      <div className="container">
        <h2 className="title gold">Our Team</h2>
        <div className="divider"></div>
        
        <div className="grid">
          <div className="card">
            <div className="round"></div>
            <h3>Alexandru Popescu</h3>
            <p>Project Lead & Game Director</p>
          </div>
          
          <div className="card">
            <div className="round"></div>
            <h3>Maria Ionescu</h3>
            <p>Blockchain Developer</p>
          </div>
          
          <div className="card">
            <div className="round"></div>
            <h3>Andrei Vasile</h3>
            <p>Smart Contract Engineer</p>
          </div>
          
          <div className="card">
            <div className="round"></div>
            <h3>Elena Constantin</h3>
            <p>Art Director</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;