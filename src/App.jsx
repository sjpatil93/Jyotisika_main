import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
import MobPooja  from './NavbarLinks/MobPooja'
const AppContent = () => {
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

  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* ✅ Navbar always on top */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div style={{ display: "flex", marginTop: "30px", flex: 1 }}>
        {/* ✅ Sidebar only if not home */}
        {!isHomePage && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        {/* ✅ Main Content */}
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
            <Route path="/freekundli" element={<FreeKundli/>} />
            <Route path="/kundlimatching" element={<KundliMatching/>} />
            <Route path="/panchang" element={<Panchange/>} />
            <Route path="/panchang" element={<Kp/>} />
            <Route path="/festival" element={<Festival/>} />
            <Route path="/bookpooja" element={<BookPuja/>} />
            <Route path="/MobPooja" element={<MobPooja/>} />
            <Route path="/FreeKundli_Controller/HoroscopeCharts" element={<div>Horoscope Charts Page</div>} />
            <Route path="/FreeKundli_Controller/ManglikDosha" element={<div>Manglik Dosha Page</div>} />
            <Route path="/FreeKundli_Controller/KaalSarpaDosha" element={<div>Kaal Sarpa Dosha Page</div>} />
            <Route path="/FreeKundli_Controller/SadheSati" element={<div>Sadhe Sati Page</div>} />
            <Route path="/FreeKundli_Controller/BhavaKundli" element={<div>Bhava Kundli Page</div>} />
            
            <Route path="/kundlimatching" element={<KundliMatching/>} />
            <Route path="/panchang" element={<div>Panchang Page</div>} />
            <Route path="/kp" element={<div>KP Page</div>} />
            <Route path="/festival" element={<div>Festival Page</div>} />
            <Route path="/bookpooja" element={<div>Book Puja Page</div>} />
            <Route path="/MobPooja" element={<div>Mob Pooja Page</div>} />
            <Route path="/UserProfile" element={<div>User Profile Page</div>} />
            <Route path="/Notification" element={<div>Notifications Page</div>} />
            <Route path="/Orders" element={<div>Orders Page</div>} />
            <Route path="/Cart" element={<div>Cart Page</div>} />
            <Route path="/Following" element={<div>Following Page</div>} />
            <Route path="/CustomerSupport" element={<div>Customer Support Page</div>} />
            <Route path="/Login" element={<div>Login Page</div>} />
            <Route path="/Logout" element={<div>Logout Page</div>} />
            <Route path="/wallet" element={<div>Wallet Page</div>} />
            <Route path="/User/change_language/:lang" element={<div>Language Change Page</div>} />
          </Routes>
        </main>
      </div>
    </>
  );
};


const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;