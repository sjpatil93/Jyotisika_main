import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css"; 

import Navbar from './Components/CommanNavbar';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import ZodiacSection from './Components/ZodiacSection';
import ServicesSection from './Components/ServicesSection';
import Shopsection from './Components/shopSection/Shopsection';
import OnlineAstrologer from './Components/shopSection/OnlineAstrologer';
import ReelSection from './Components/shopSection/ReelSection';
import ZodiacSection2 from './Components/Zodiac2';
import BlogsSection from './Components/shopSection/BlogSection';
import FreeKundli from './NavbarLinks/FreeKundli';
import KundliMatching from './NavbarLinks/KundliMatching';
import Panchange from './NavbarLinks/Panchange';
import Kp from './NavbarLinks/Kp';
import Festival from './NavbarLinks/Festival';
import BookPuja from './NavbarLinks/BookPuja';
import MobPooja from './NavbarLinks/MobPooja';
import FestivalDetails from './NavbarLinks/FestivalsDetails';
import ShowAllastrologer from './ZodiacLinks/ShowAllastrologer';
import AscendantReport from './Components/FreeKundli/AscendantReport';
import BasicAstrology from './NavbarLinks/FreeKundli';
import PlanetaryPosition from './Components/FreeKundli/PlanetaryPosition';
import Vishmotterydash from './Components/FreeKundli/VimshottariDasha';
import GemstoneRecommendation from './Components/FreeKundli/GemstoneRecommendation';
import CompositeFriendship from './Components/FreeKundli/CompositeFriendship';
import Shadbala from './Components/FreeKundli/Shadbala';
import YoginiDasha from './Components/FreeKundli/YoginiDasha';
import HoroscopeCharts from './Components/FreeKundli/HoroscopeCharts';
import ManglikDosha  from './Components/FreeKundli/ManglikDosha';
import KaalSarpaDosha  from './Components/FreeKundli/KaalSarpaDosha';
import SadheSati  from './Components/FreeKundli/SadheSati';
import BhavaKundli from './Components/FreeKundli/BhavaKundli';
const App = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const updateSidebarDisplay = () => {
      if (window.innerWidth > 750) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", updateSidebarDisplay);
    updateSidebarDisplay();

    const handleClickOutside = (e) => {
      if (window.innerWidth <= 750 && isSidebarOpen) {
        const sidebar = document.getElementById("user-sidebar");
        const toggleBtn = document.getElementById("sidebarToggle");
        const closeBtn = document.getElementById("sidebarCloseBtn");
        if (
          sidebar &&
          !sidebar.contains(e.target) &&
          e.target !== toggleBtn &&
          e.target !== closeBtn
        ) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", updateSidebarDisplay);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // ✅ routes where sidebar should NOT appear
  const noSidebarRoutes = ["/", "/panchang", "/login", "/kp", "/festival", "/bookpooja", "/MobPooja", "/showallastrologer", location.pathname.startsWith("/festival/") && location.pathname];



  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  return (
    <>
      {/*  Navbar always on top */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div style={{ display: "flex", marginTop: "30px", flex: 1 }}>
        {/*  Sidebar hidden on selected routes */}
        {!hideSidebar && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        {/*  Main Content */}
        <main style={{ flex: 1, padding: "10px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <Home />
                  <ZodiacSection />
                  <ServicesSection />
                  <ReelSection />
                  <OnlineAstrologer />
                  <Shopsection />
                  <BlogsSection />
                  <ZodiacSection2 />
                  <Footer />
                </>
              }
            />

            {/* navbar links*/}
            <Route path="/freekundli" element={<FreeKundli />} />
            <Route path="/kundlimatching" element={<KundliMatching />} />
            <Route path="/panchang" element={<><Panchange /><Footer /></>} />  {/* 🚫 Sidebar hidden here */}
            <Route path='/kp' element={<><Kp /><Footer /></>} />
            <Route path="/festival" element={<><Festival /><Footer /></>} />
            <Route path="/festival/:id" element={<><FestivalDetails /><Footer /></>} />
            <Route path="/bookpooja" element={<><BookPuja /><Footer /></>} />
            <Route path="/MobPooja" element={<><MobPooja /><Footer /></>} />
            <Route path="/login" element={<div>Login Page</div>} /> {/* 🚫 Sidebar hidden here */}
            <Route path='/showallastrologer' element={<><ShowAllastrologer /><Footer /></>} />
            <Route path='/AscendantReport' element={<><AscendantReport /></>} />
            <Route path='/BasicAstrology' element={<><BasicAstrology /></>} />
            <Route path='/PlanetaryPosition' element={<><PlanetaryPosition /></>} />
            <Route path='/VimshottariDasha' element={<><Vishmotterydash /></>} />
            <Route path='/GemstoneRecommendation' element={<><GemstoneRecommendation /></>} />
            <Route path='/CompositeFriendship' element={<><CompositeFriendship /></>} />
            <Route path='/Shadbala' element={<><Shadbala /></>} />
            <Route path='/YoginiDasha' element={<><YoginiDasha /></>} />
            <Route path='/HoroscopeCharts' element={<><HoroscopeCharts /></>} />
            <Route path='/ManglikDosha' element={<><ManglikDosha /></>} />
            <Route path='/KaalSarpaDosha' element={<><KaalSarpaDosha /></>} />
             <Route path='/SadheSati' element={<><SadheSati /></>} />
              <Route path='/BhavaKundli' element={<><BhavaKundli /></>} />


          </Routes>
        </main>
      </div>
    </>
  );
};
export default App;
