import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import esoteric from '../assets/images/esoteric.png';
import galaxy from '../assets/images/galaxy.png';
import magicBook from '../assets/images/magic-book.png';
import book from '../assets/images/book.png';
import diamond from '../assets/images/diamond.png';
import friendship from '../assets/images/friendship.png';
import parchment from '../assets/images/parchment.png';
import sun from '../assets/images/sun.png';
import horoscopecharts from '../assets/images/horoscopecharts.png';
import mangal from '../assets/images/mangal.png';
import king from '../assets/images/king.png';
import sadhesati from '../assets/images/sadhesati.png';
import houses from '../assets/images/houses.png';
import Navbar from './CommanNavbar';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { path: '/FreeKundli/BasicAstrology', label: 'Basic Astrology', icon: esoteric },
    { path: '/FreeKundli_Controller/PlanetaryPosition', label: 'Planetary Positions', icon: galaxy },
    { path: '/FreeKundli_Controller/VimshottariDasha', label: 'Vimshottari Dasha', icon: magicBook },
    { path: '/FreeKundli_Controller/AscendantReport', label: 'Ascendant Report', icon: book },
    { path: '/FreeKundli_Controller/GemstoneRecommendation', label: 'Gemstone Recommendation', icon: diamond },
    { path: '/FreeKundli_Controller/CompositeFriendship', label: 'Composite Friendship', icon: friendship },
    { path: '/FreeKundli_Controller/Shadbala', label: 'Shadbala', icon: parchment },
    { path: '/FreeKundli_Controller/YoginiDasha', label: 'Yogini Dasha', icon: sun },
    { path: '/FreeKundli_Controller/HoroscopeCharts', label: 'Horoscope Charts', icon: horoscopecharts },
    { path: '/FreeKundli_Controller/ManglikDosha', label: 'Manglik Dosha', icon: mangal },
    { path: '/FreeKundli_Controller/KaalSarpaDosha', label: 'Kaal Sarpa Dosha', icon: king },
    { path: '/FreeKundli_Controller/SadheSati', label: 'Sadhe Sati', icon: sadhesati },
    { path: '/FreeKundli_Controller/BhavaKundli', label: 'Bhava Kundli', icon: houses },
  ];

  const handleClose = (e) => {
    e.stopPropagation();
    toggleSidebar();
  };

  return (
    <>
    <aside id="user-sidebar" className={isOpen ? 'open' : ''} style={{marginLeft:"30px" ,backgroundColor:"#f0eeeeff"}}>
      <button
        id="sidebarCloseBtn"
        onClick={handleClose}
        className="bi bi-x"
        style={{
          display: isOpen ? 'block' : 'none'
        }}
      ></button>
      <div className="user-sidebar-section user-sidebar-scroll m-2" style={{borderRadius:"1.rem"}}>
        <ul className="user-sidebar-nav">
          <li>
            <NavLink
              to="/FreeKundli/BasicAstrology"
              className="user-sidebar-link"
              activeClassName="active-link"
            >
              <img src={esoteric} alt="Kundli" />
              Free Kundli
            </NavLink>
            <div className="user-sidebar-submenu">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="user-sidebar-link sub"
                  activeClassName="active-link"
                >
                  <img src={item.icon} alt={item.label} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </aside></>
  );
};

export default Sidebar;