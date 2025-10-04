import React, { useState } from 'react';
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import esoteric from '../assets/images/esoteric.png';

const Header = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    toggleSidebar();
  };

  return (
    <div className="mobile-header-row" id="sidebar-header-row">
      <div className="mobile-header-title">
        <img
          src={esoteric}
          alt="Kundli"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            boxShadow: '0 2px 8px #e88712',
            background: '#fff7b8',
            border: '2px solid #fff7b8'
          }}
        />
        <span className="mobile-header-title-text">Free Kundali</span>
      </div>
      <button
        className="mobile-header-toggle"
        id="sidebarToggle"
        aria-label="Open sidebar"
        onClick={handleToggle}
        style={{
          background: '#fff7b8',
          color: '#e88712',
          border: '2px solid #e88712',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          boxShadow: '0 2px 8px #e88712',
          fontSize: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`} id="sidebarToggleIcon"></i>
      </button>
    </div>
  );
};

export default Header;