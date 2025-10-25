import React from 'react';

const Hero = ({ windowWidth }) => {
  const isMobile = windowWidth < 768;

  const scrollToSection = (event, sectionId) => {
    event.preventDefault();

    const target = document.getElementById(sectionId);
    if (!target) return;

    const headerHeight = document.querySelector("header")?.offsetHeight || 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <section id="home" className="hero">
      <div>
        <h1 className="gold">Choose your path: <br/>Haiduc or Farmer</h1>
        <div className="kpis">
          <div className="kpi">
            Batch I • <strong>2,000</strong> Haiduci
            <span className="tooltip">First batch</span>
          </div>
          <div className="kpi">
            Batch I • <strong>1,000</strong> Fermieri
            <span className="tooltip">First batch</span>
          </div>
          <div className="kpi">Mint • <em>coming soon</em></div>
        </div>
        <div className="btns">
          <a
            href="#features"
            className="cta"
            onClick={(event) => scrollToSection(event, "features")}
          >
            Become a Haiduc
          </a>
          <a
            href="#features"
            className="cta secondary"
            onClick={(event) => scrollToSection(event, "features")}
          >
            Become a Farmer
          </a>
          <a
            href="#map"
            className={isMobile ? "cta secondary" : ""}
            onClick={(event) => scrollToSection(event, "map")}
          >
            Explore the Map
          </a>
        </div>
      </div>
      <div className="panel goldEdge" style={{padding: '18px'}}>
        <h3 className="gold" style={{margin: '4px 0 8px'}}>What is Haiducii Metaverse?</h3>
        <p className="subtitle">In the heart of Walachia — a stylized survival-fantasy RPG where Romanian folklore meets a living, player-driven economy. Choose between the outlaw Haiduc and the industrious Farmer; hunt, craft, trade, and shape a world where every choice carries weight. From crystal grottoes and gold mines to village markets and PvP arenas, the realm is alive with danger and opportunity. Batch I mint is planned — minting remains locked until launch.</p>
        <div className="divider"></div>
        <p className="muted">Tip: create an account to get notified when mint opens.</p>
      </div>
    </section>
  );
};

export default Hero;
