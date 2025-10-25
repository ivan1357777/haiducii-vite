import React from 'react';

const BecomeFarmer = ({ windowWidth }) => {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="title gold">Become a Farmer</h1>
        <p className="subtitle">Batch I • Farmer Features</p>
        <div className="panel">
          <p>Farmer page content will be implemented here.</p>
          <button className="btn" onClick={() => window.history.back()}>
            Back to Homepage
          </button>
        </div>
      </section>
    </div>
  );
};

export default BecomeFarmer;