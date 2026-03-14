import React from 'react';
import { FaMapMarkerAlt, FaChartLine, FaBolt } from 'react-icons/fa';
import logoMobilis from '../assets/mobilis_logo_.png';
import carteFaded from '../assets/faded_map_.png';
import './LeftPanel.css';   // ← son propre CSS

const LeftPanel = () => {
  return (
    <div className="left-panel">
      <div className="top-section">
        <img src={logoMobilis} alt="Mobilis" className="mobilis-logo" />
        <h1 className="main-title">
          Application Web de <span className="green-text">Cartographie</span> et d'<span className="green-text">Analyse</span> du Reseau Mobilis
        </h1>
        <p className="description">
          Visualisez la qualité du réseau, signalez les problèmes et suivez les performances du réseau en temps réel.
        </p>
        <div className="features">
          <div className="feature-item">
            <FaMapMarkerAlt className="icon" />
            <span>Carte interactive</span>
          </div>
          <div className="feature-item">
            <FaChartLine className="icon" />
            <span>Statistiques Reseau</span>
          </div>
          <div className="feature-item">
            <FaBolt className="icon" />
            <span>Signalement rapide</span>
          </div>
        </div>
      </div>
      <div className="bottom-map-image">
        <img src={carteFaded} alt="carte réseau" className="map-img" />
      </div>
    </div>
  );
};

export default LeftPanel;