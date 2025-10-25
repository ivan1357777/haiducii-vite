import React from 'react';

const Economy = ({ windowWidth }) => {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="title gold">NFT Economy</h1>
        <div className="panel">
          <p>Economy page content will be implemented here.</p>
          <button className="btn" onClick={() => window.history.back()}>
            Back to Homepage
          </button>
        </div>
      </section>
    </div>
  );
};

export default Economy;