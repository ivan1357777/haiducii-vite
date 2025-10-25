import React, { useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const HamburgerMenu = ({ isOpen, onClose, handleNavClick }) => {
  useEffect(() => {
    if (isOpen) document.body.classList.add("menu-open");
    else document.body.classList.remove("menu-open");
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="mobile-menu-overlay active" onClick={onClose} />
      <div className="mobile-nav active">
        <div className="mobile-nav-header">
          <div className="brand">
            <div className="logo" aria-hidden="true"></div>
            <strong className="gold">Haiducii Metaverse</strong>
          </div>
          <button className="mobile-close-btn" onClick={onClose} aria-label="Close menu">
            ✕
          </button>
        </div>

        <div className="mobile-nav-content">
          <button className="nav-link" onClick={() => handleNavClick("home")}>Home</button>
          <button className="nav-link" onClick={() => handleNavClick("haiducii-content")}>About</button>
          <button className="nav-link" onClick={() => handleNavClick("map")}>Map</button>
          <button className="nav-link" onClick={() => handleNavClick("features")}>Features</button>
          <button className="nav-link" onClick={() => handleNavClick("tokenomics")}>Tokenomics</button>
          <button className="nav-link" onClick={() => handleNavClick("roadmap")}>Roadmap</button>
          <button className="nav-link" onClick={() => handleNavClick("team")}>Our Team</button>
          <button className="nav-link" onClick={() => handleNavClick("faq")}>FAQ</button>
          <button className="nav-link" onClick={() => handleNavClick("account")}>Sign in</button>

          {/* ✅ WalletMultiButton with built-in dropdown */}
          <div style={{ marginTop: "20px" }}>
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </>
  );
};

const Header = ({ windowWidth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = windowWidth < 992;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (section) => {
    setIsMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      setTimeout(() => {
        const headerHeight = document.querySelector("header")?.offsetHeight || 0;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && setIsMenuOpen(false);
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <header className={isScrolled ? "scrolled" : ""}>
      <div className="container nav">
        <div className="brand">
          <div className="logo" aria-hidden="true"></div>
          <strong className="gold">Haiducii Metaverse</strong>
        </div>

        {isMobile ? (
          <>
            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "1.5rem",
                cursor: "pointer",
                padding: "1.5rem",
                marginLeft: "auto",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                transition: "all 0.3s",
                zIndex: 101,
              }}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>

            <HamburgerMenu
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              handleNavClick={handleNavClick}
            />
          </>
        ) : (
          <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button className="nav-link" onClick={() => handleNavClick("home")}>Home</button>
            <button className="nav-link" onClick={() => handleNavClick("haiducii-content")}>About</button>
            <button className="nav-link" onClick={() => handleNavClick("map")}>Map</button>
            <button className="nav-link" onClick={() => handleNavClick("features")}>Features</button>
            <button className="nav-link" onClick={() => handleNavClick("tokenomics")}>Tokenomics</button>
            <button className="nav-link" onClick={() => handleNavClick("roadmap")}>Roadmap</button>
            <button className="nav-link" onClick={() => handleNavClick("team")}>Our Team</button>
            <button className="nav-link" onClick={() => handleNavClick("faq")}>FAQ</button>
            <button className="nav-link" onClick={() => handleNavClick("account")}>Sign in</button>
            
            <WalletMultiButton />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
