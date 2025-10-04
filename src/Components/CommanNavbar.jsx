import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
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
    // Simulate session data (replace with actual API call or context)
    const userId = localStorage.getItem('user_id'); // Example: Replace with your auth logic
    const userName = localStorage.getItem('user_name');
    const userImage = localStorage.getItem('user_image');
    setUser(userId ? { id: userId, name: userName || 'Guest User', image: userImage || userProfile } : null);

    // Fetch wallet balance
    if (userId) {
      fetchWalletBalance(userId);
      fetchNotificationCount(userId);
    }

    // Simulate cart count (replace with actual API call)
    const storedCartCount = localStorage.getItem('cart_count') || '0';
    setCartCount(parseInt(storedCartCount, 10));

    // Simulate language (replace with actual session logic)
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
      if (data.status === 'success') {
        setWalletAmount(`₹ ${data.data.amount}`);
      } else {
        console.error('Error fetching wallet balance:', data.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const fetchNotificationCount = async (userId) => {
    try {
      const response = await fetch('http://localhost:8080/User_Api_Controller/show_notification_number', {
        method: 'POST',
        body: new FormData().append('user_id', userId)
      });
      const data = await response.json();
      if (data.status === 'success') {
        setNotificationCount(parseInt(data.data, 10) || 0);
      } else {
        console.error('Error fetching notification count:', data.message);
      }
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
      if (result.isConfirmed) {
        window.location.href = '/Login';
      }
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
    <nav className="navbar navbar-expand-lg  sticky-top" style={{ backgroundColor: '#FEFAEA', height: '90px', justifyContent: 'center', alignItems: 'center' }}>
      <div className="container-fluid px-0 mx-3">
        <NavLink className="navbar-brand" to="/">
          <div style={{ position: 'absolute', top: 0, left: 0, width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', zIndex: 1 }}>
            <img src={JYotisika} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} alt="Logo" />
          </div>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse w-100" id="navbarSupportedContent" style={{ backgroundColor: '#FEFAEA' }}>
          <div className="navbar-nav-container">
            <ul className="navbar-nav ms-3 mb-2 mb-lg-0 fw-normal">
              {navItems.map((item) => (
                <li className="nav-item" key={item.path}>
                  <NavLink
                    className="nav-link text-black "
                    to={item.path}
                    target={item.external ? '_blank' : '_self'}
                    style={{ fontSize: '18px' ,fontWeight:"normal",padding:"10px"}}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="navbar-controls">
              <NavLink
                to={user ? '/wallet' : '#'}
                className="btn border-1 btn-sm rounded-1 d-flex align-items-center gap-2 mb-2 mb-xl-0"
                style={{ whiteSpace: 'nowrap' }}
                onClick={(e) => !user && (e.preventDefault(), handleLoginAlert())}
              >
                <i className="bi bi-wallet2"></i>
                <span id="wallet-amount">{walletAmount}</span>
              </NavLink>
              <div className="dropdown ms-2">
                <button
                  className="btn border-0 d-flex align-items-center justify-content-center"
                  id="languageDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  title={currentLang}
                  style={{ backgroundColor: 'rgba(219, 135, 18, 0.96)', width: '40px', height: '36px', borderRadius: '6px' }}
                >
                  <i className="bi bi-translate text-white" style={{ fontSize: '1.2rem' }}></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end custom-lang-dropdown" aria-labelledby="languageDropdown">
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <NavLink
                        className="dropdown-item d-flex justify-content-between align-items-center"
                        to={`/User/change_language/${lang.code}`}
                      >
                        {lang.label}
                        {currentLang === lang.code && <span className="badge bg-light text-dark rounded-pill">✓</span>}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="nav-item ms-2 d-flex align-items-center">
                <NavLink
                  to={user ? `https://jyotisikamall.netlify.app/cart/${user.id}` : '#'}
                  className="cart-btn d-flex align-items-center justify-content-center"
                  title={user ? 'View Cart' : 'Login'}
                  aria-label={user ? 'View Cart' : 'Login'}
                  onClick={(e) => !user && (e.preventDefault(), handleLoginAlert())}
                >
                  <svg className="cart-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" role="img" aria-hidden="true">
                    <path fill="currentColor" d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45C8.89 16.37 9.5 17 10.25 17h7.45v-2h-7.1c-.12 0-.25-.06-.31-.17L15.1 13h3.45c.75 0 1.4-.41 1.75-1.03l1.9-3.98A1 1 0 0 0 20.2 6H6.21l-.94-2H2V2h3l1 2h.02zM10 20a2 2 0 1 0 .001 3.999A2 2 0 0 0 10 20zm8 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 18 20z"/>
                  </svg>
                  <span id="cartCountBadge" className="cart-badge">{cartCount}</span>
                </NavLink>
              </div>
              <div className="dropdown ms-2">
                <NavLink
                  to="#"
                  className="nav-link p-0"
                  role="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    id="dropdown-profile-image"
                    src={user ? user.image : accountCircle}
                    alt="User Profile"
                    style={{ width: '25px', height: '25px', borderRadius: '50%' }}
                  />
                </NavLink>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown" style={{ borderRadius: '15px', boxShadow: '0 8px 16px rgba(0,0,0,0.15)', border: 'none', minWidth: '250px' }}>
                  {user ? (
                    <>
                      <li className="text-center p-4">
                        <NavLink to="/UserProfile" className="text-decoration-none">
                          <div className="profile-image-container">
                            <img
                              className="profile-image"
                              src={user.image}
                              alt="Profile Image"
                            />
                            <div className="online-indicator"></div>
                          </div>
                          <p className="mt-3 mb-0 text-dark" style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                            {user.name}
                          </p>
                        </NavLink>
                      </li>
                      <li><hr className="dropdown-divider mx-3" /></li>
                      <li>
                        <NavLink className="dropdown-item py-2 ps-4" to="/Notification">
                          <i className="bi bi-bell me-2"></i> Notifications
                          <span id="notificationCount" className="badge bg-danger rounded-pill float-end me-2" style={{ display: notificationCount > 0 ? 'inline-block' : 'none' }}>
                            {notificationCount}
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item py-2 ps-4" to="/Orders">
                          <i className="bi bi-bag me-2"></i> My Orders
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item py-2 ps-4" to="/Cart">
                          <i className="bi bi-cart me-2"></i> Your Cart
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item py-2 ps-4" to="/Following">
                          <i className="bi bi-heart me-2"></i> Following
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item py-2 ps-4" to="/CustomerSupport">
                          <i className="bi bi-gear me-2"></i> Customer Support
                        </NavLink>
                      </li>
                      <li>
                        <a className="dropdown-item py-2 ps-4" href="https://api.whatsapp.com/send?text=Check%20out%20this%20awesome%20website!%20https%3A%2F%2Fexample.com" target="_blank">
                          <i className="bi bi-share me-2"></i> Refer to Friends
                        </a>
                      </li>
                      <li><hr className="dropdown-divider mx-1" /></li>
                      <li>
                        <NavLink className="dropdown-item py-2 ps-4 text-danger" to="/Logout">
                          <i className="bi bi-box-arrow-right me-1"></i> Logout
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="text-center p-4" id="myprofilelink">
                        <div className="profile-image-container">
                          <img
                            src={userProfile}
                            alt="Profile Image"
                            className="profile-image"
                          />
                          <div className="online-indicator"></div>
                        </div>
                        <p className="mt-3 mb-0 text-dark" style={{ fontWeight: 600, fontSize: '1.1rem' }}>
                          Hello User
                        </p>
                        <p id="myparaLink" className="mt-1 mb-0 text-dark" style={{ fontWeight: 400, fontSize: '1rem' }} onClick={handleLoginAlert}>
                          To access your Jyotishika account, please log in.
                        </p>
                      </li>
                      <li><hr className="dropdown-divider mx-1" /></li>
                      <li>
                        <NavLink className="dropdown-item py-2 ps-4" to="#" id="myOrdersLink" onClick={handleLoginAlert}>
                          <i className="bi bi-bag me-2"></i> My Orders
                        </NavLink>
                      </li>
                      <li><hr className="dropdown-divider mx-3" /></li>
                      <li>
                        <NavLink className="dropdown-item py-2 ps-4 text-danger" to="/Login">
                          <i className="bi bi-box-arrow-right me-2"></i> Log in
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;