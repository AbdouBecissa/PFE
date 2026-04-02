import React from 'react';
import { FaMapMarkerAlt, FaChartLine, FaBolt } from 'react-icons/fa';
import logoMobilis from '../assets/mobilis_logo_.png';
import carteFaded from '../assets/faded_map_.png';
import { useLang } from '../LanguageContext';
import './LeftPanel.css';

const LeftPanel = () => {
  const { t } = useLang();
  return (
    <div className="left-panel">
      <div className="top-section">
        <img src={logoMobilis} alt="Mobilis" className="mobilis-logo" />
        <h1 className="main-title">
          {t.left_title_1} <span className="green-text">{t.left_title_2}</span> {t.left_title_3}<span className="green-text">{t.left_title_4}</span> {t.left_title_5}
        </h1>
        <p className="description">{t.left_desc}</p>
        <div className="features">
          <div className="feature-item">
            <FaMapMarkerAlt className="icon" />
            <span>{t.left_feature_1}</span>
          </div>
          <div className="feature-item">
            <FaChartLine className="icon" />
            <span>{t.left_feature_2}</span>
          </div>
          <div className="feature-item">
            <FaBolt className="icon" />
            <span>{t.left_feature_3}</span>
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