import React, { useState, useEffect } from 'react';
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8080/User_Api_Controller/showservices_limited');
        const data = await response.json();
        if (data.status === 'success') {
          setServices(data.data);
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      }
    };
    fetchServices();
  }, []);

  return (
    <footer>
      <div className="container ">
        <div className="footer-grid">
          <div className="footer-col">
            <h5>Services</h5>
            <ul id="footer-services-list">
              {services.length > 0 ? (
                services.map((service) => (
                  <li key={service.id}>
                    <a href={`/User/astrolgerservices/${service.id}`} className="footer-links">
                      {service.name}
                    </a>
                  </li>
                ))
              ) : (
                <li>No services found.</li>
              )}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/about" className="footer-links">About Us</a></li>
              <li><a href="/contact" className="footer-links">Contact</a></li>
              <li><a href="/privacy" className="footer-links">Privacy Policy</a></li>
              <li><a href="/terms" className="footer-links">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Connect With Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Jyotisika. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;