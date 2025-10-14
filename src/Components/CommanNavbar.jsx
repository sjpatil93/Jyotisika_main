import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../App.css';
import JYotisika from '../assets/images/JYotisika.gif';
import accountCircle from '../assets/images/account_circle.png';
import userProfile from '../assets/images/userProfile.png';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [walletAmount, setWalletAmount] = useState('₹ 0');
  const [cartCount, setCartCount] = useState(0);
  const [currentLang, setCurrentLang] = useState('english');
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const userName = localStorage.getItem('user_name');
    const userImage = localStorage.getItem('user_image');
    setUser(userId ? { id: userId, name: userName || 'Guest User', image: userImage || userProfile } : null);

    if (userId) {
      fetchWalletBalance(userId);
      fetchNotificationCount(userId);
    }

    const storedCartCount = localStorage.getItem('cart_count') || '0';
    setCartCount(parseInt(storedCartCount, 10));

    const storedLang = localStorage.getItem('site_language') || 'english';
    setCurrentLang(storedLang);
  }, []);

  const fetchWalletBalance = async (userId) => {
    try {
      const response = await fetch('http://localhost:8080/User_Api_Controller/getuser_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ session_id: userId })
      });
      const data = await response.json();
      if (data.status === 'success') setWalletAmount(`₹ ${data.data.amount}`);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const fetchNotificationCount = async (userId) => {
    try {
      const form = new FormData();
      form.append('user_id', userId);
      const response = await fetch('http://localhost:8080/User_Api_Controller/show_notification_number', {
        method: 'POST',
        body: form
      });
      const data = await response.json();
      if (data.status === 'success') setNotificationCount(parseInt(data.data, 10) || 0);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleLoginAlert = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Kindly Login',
      text: user ? 'Please login to access this service' : 'You must login to view your cart.',
      confirmButtonText: 'Go to Login'
    }).then((result) => {
      if (result.isConfirmed) window.location.href = '/Login';
    });
  };

  const navItems = [
    { path: '/freekundli', label: 'Free Kundali' },
    { path: '/kundlimatching', label: 'Kundli Matching' },
    { path: 'https://jyotisikamall.netlify.app', label: 'Jyotisika Mall', external: true },
    { path: '/panchang', label: 'Panchang' },
    { path: '/kp', label: 'KP' },
    { path: '/festival', label: 'Festival' },
    { path: '/bookpooja', label: 'Book Puja' },
    { path: '/MobPooja', label: 'Mob Pooja' },
  ];

  const languages = [
    { code: 'english', label: 'English' },
    { code: 'marathi', label: 'मराठी' },
    { code: 'hindi', label: 'हिन्दी' },
  ];

  return (
    <nav className="sticky top-0 flex justify-center items-center" style={{ backgroundColor: '#FEFAEA', height: '90px' }}>
      <div className="w-full flex justify-between items-center mx-3 px-0">
        {/* Logo */}
        <NavLink to="/" className="relative mr-3">
          <div style={{ position: 'relative', width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', zIndex: 1 }}>
            <img src={JYotisika} alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
        </NavLink>

        {/* Navbar Toggler (optional, can keep button hidden if not using collapse) */}
        <button className="md:hidden" type="button" aria-label="Toggle navigation">
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </button>

        {/* Navigation Links */}
        <div className="flex items-center w-full">
          <ul className="flex items-center gap-3 ml-3">
            {navItems.map((item) => (
              <li key={item.path}>
                {item.external ? (
                  <a
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black"
                    style={{ fontSize: '18px', fontWeight: 'normal', padding: '10px' }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <NavLink
                    to={item.path}
                    className="text-black"
                    style={{ fontSize: '18px', fontWeight: 'normal', padding: '10px' }}
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center ml-2 gap-2">
            {/* Wallet */}
            <NavLink
              to={user ? '/wallet' : '#'}
              onClick={(e) => !user && (e.preventDefault(), handleLoginAlert())}
              className="flex items-center gap-2 border rounded px-2 py-1 text-sm"
              style={{ whiteSpace: 'nowrap' }}
            >
              <i className="bi bi-wallet2"></i>
              <span>{walletAmount}</span>
            </NavLink>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                title={currentLang}
                className="w-[40px] h-[36px] bg-[#DB8712] rounded flex items-center justify-center text-white"
              >
                <i className="bi bi-translate text-[1.2rem]"></i>
              </button>
              <ul className="absolute right-0 mt-1 hidden">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <NavLink
                      to={`/User/change_language/${lang.code}`}
                      className="flex justify-between items-center px-4 py-2"
                    >
                      {lang.label}
                      {currentLang === lang.code && <span className="bg-gray-200 text-black px-2 rounded-full">✓</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cart */}
            <NavLink
              to={user ? `https://jyotisikamall.netlify.app/cart/${user.id}` : '#'}
              onClick={(e) => !user && (e.preventDefault(), handleLoginAlert())}
              className="relative flex items-center justify-center"
            >
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45C8.89 16.37 9.5 17 10.25 17h7.45v-2h-7.1c-.12 0-.25-.06-.31-.17L15.1 13h3.45c.75 0 1.4-.41 1.75-1.03l1.9-3.98A1 1 0 0 0 20.2 6H6.21l-.94-2H2V2h3l1 2h.02zM10 20a2 2 0 1 0 .001 3.999A2 2 0 0 0 10 20zm8 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 18 20z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* User Dropdown */}
            <div className="relative">
              <NavLink to="#" className="p-0">
                <img src={user ? user.image : accountCircle} alt="User Profile" className="w-6 h-6 rounded-full" />
              </NavLink>
              <ul className="absolute right-0 mt-1 hidden w-64" style={{ borderRadius: '15px', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', border: 'none', minWidth: '250px' }}>
                {/* Keep all dropdown content as-is */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
