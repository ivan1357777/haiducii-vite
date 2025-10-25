// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import MapSection from "./components/MapSection";
import FeaturesGrid from "./components/FeaturesGrid";
import Roadmap from "./components/Roadmap";
import Tokenomics from "./components/Tokenomics";
import Team from "./components/Team";
import FAQ from "./components/FAQ";
import Account from "./components/Account";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

// Pages
import SecretMintPage from "./pages/r7P4xG2L_M1nt";
import BecomeFarmer from "./pages/BecomeFarmer/BecomeFarmer";
import BecomeHaiduc from "./pages/BecomeHaiduc/BecomeHaiduc";
import Dashboard from "./pages/Dashboard/Dashboard";
import Economy from "./pages/Economy/Economy";

import "./App.css";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  return (
    <Router>
      <div className="App">
        <Header windowWidth={windowWidth} />

        {/* Removed global WalletMultiButton and extra "Go to Mint" link.
            The header now owns the only wallet control. */}

        <Routes>
          <Route
            path="/"
            element={
              <main className="container">
                <Hero windowWidth={windowWidth} />
                <MapSection openModal={openModal} windowWidth={windowWidth} />
                <FeaturesGrid openModal={openModal} windowWidth={windowWidth} />
                <Roadmap windowWidth={windowWidth} />
                <Tokenomics windowWidth={windowWidth} />
                <Team windowWidth={windowWidth} />
                <FAQ windowWidth={windowWidth} />
                <Account windowWidth={windowWidth} />
                {/* Removed the extra WalletMultiButton here as well */}
              </main>
            }
          />
          <Route path="/r7P4xG2L_M1nt" element={<SecretMintPage />} />
          <Route path="/farmer" element={<BecomeFarmer />} />
          <Route path="/haiduc" element={<BecomeHaiduc />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/economy" element={<Economy />} />
        </Routes>

        <Footer windowWidth={windowWidth} />
        {modalOpen && <Modal content={modalContent} onClose={() => setModalOpen(false)} />}
      </div>
    </Router>
  );
}
