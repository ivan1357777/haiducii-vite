import React from 'react';

const Dashboard = ({ windowWidth }) => {
  return (
    <div className="container">
      <section className="hero">
        <h1 className="title gold">Dashboard</h1>
        <div className="panel">
          <p>Dashboard content will be implemented here.</p>
          <button className="btn" onClick={() => window.history.back()}>
            Back to Homepage
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;