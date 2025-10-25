import React from 'react';

const BecomeHaiduc = ({ windowWidth }) => {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="title gold">Become a Haiduc</h1>
        <p className="subtitle">Batch I • Haiduc Features</p>
        <div className="panel">
          <p>Haiduc page content will be implemented here.</p>
          <button className="btn" onClick={() => window.history.back()}>
            Back to Homepage
          </button>
        </div>
      </section>
    </div>
  );
};

export default BecomeHaiduc;