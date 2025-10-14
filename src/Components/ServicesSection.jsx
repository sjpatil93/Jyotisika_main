import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FreeKundliImg from '../assets/images/image 27.png';
import HoroscopeImg from '../assets/images/image 26.png';
import AstrologerImg from '../assets/images/image 26.png';
import KundaliMatchingImg from '../assets/images/partner_heart.png';
import JyotisikaMallImg from '../assets/images/add_shopping_cart.png';
import BookPoojaImg from '../assets/images/image 35.png';
import KPImg from '../assets/images/image 24.png';
import PanchangImg from '../assets/images/image 25.png';

const ServicesSection = () => {
  const services = [
    { link: '/freekundli', img: FreeKundliImg, title: "Free Kundli" },
    { link: '/zodiac', img: HoroscopeImg, title: "Today's Horoscope" },
    { link: '/showallastrologer', img: AstrologerImg, title: "Talk to Astrologer" },
    { link: '/kundlimatching', img: KundaliMatchingImg, title: "Kundali Matching" },
    { link: 'https://jyotisikamall.netlify.app/shop', img: JyotisikaMallImg, title: "Jyotisika Mall", external: true },
    { link: '/bookpooja', img: BookPoojaImg, title: "Book Pooja" },
    { link: '/kp', img: KPImg, title: "KP" },
    { link: '/panchang', img: PanchangImg, title: "Today's Panchang" },
  ];

  return (
    <section className=" py-4" style={{backgroundColor:"#fefaea"}}>
      <div className="container text-center">
        <div className="row g-3 justify-content-center align-items-start">
          {services.map((service, index) => (
            <div className="col-6 col-sm-4 col-md-4 col-lg-3" key={index}>
              <NavLink
                to={service.link}
                className="card-link"
                target={service.external ? "_blank" : "_self"}
                rel={service.external ? "noopener noreferrer" : undefined}
              >
                <div className=" card-custom " style={{ boxShadow: "rgba(0, 0, 0, 0.3) 10px 12px 20px", backgroundColor:"#fee6cfff",maxHeight:"200px",width:"72%", borderColor:"2px solid #fff7b8" }}>
                  <div className="card-icon">
                    <img src={service.img} alt={service.title} />
                  </div>
                  <div className="card-title">{service.title}</div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;