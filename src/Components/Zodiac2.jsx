import React from 'react';
import { Link } from 'react-router-dom';
import '../cssFiles/KundliSection.css';
import esoteric from "../assets/images/esoteric.png"
import galaxy from "../assets/images/galaxy.png"
import magicBook from "../assets/images/magic-book.png"
import book from "../assets/images/book.png"
import diamond from "../assets/images/diamond.png"
import friendship from "../assets/images/friendship.png"
import parchment from "../assets/images/parchment.png"
import sun from "../assets/images/Horoscopecharts.png"
import horoscopecharts from '../assets/images/horoscopecharts.png';
import mangal from '../assets/images/mangal.png';
import king from '../assets/images/king.png';
import sadhesati from '../assets/images/sadhesati.png';
import houses from '../assets/images/houses.png';

const kundliServices = [
  { link: '/freekundli', img: esoteric, title: 'Astrology' },
  { link: '/PlanetaryPosition', img: galaxy, title: 'Planetary Positions' },
  { link: '/VimshottariDasha', img: magicBook, title: 'Vimshottari Dasha' },
  { link: '/AscendantReport', img: book, title: 'Ascendant' },
  { link: '/GemstoneRecommendation', img: diamond, title: 'Gemstone Recommendation' },
  { link: '/CompositeFriendship', img: friendship, title: 'Composite Friendship' },
  { link: '/Shadbala', img: parchment, title: 'Shadbala' },
  { link: '/YoginiDasha', img: sun, title: 'Yogini Dasha' },
  { link: '/HoroscopeCharts', img: horoscopecharts, title: 'Horoscope Charts' },
  { link: '/ManglikDosha', img: mangal, title: 'Manglik Dosha' },
  { link: '/KaalSarpaDosha', img: king, title: 'Kaal Sarpa Dosha' },
  { link: '/SadheSati', img: sadhesati, title: 'Sadhe Sati' },
  { link: '/BhavaKundli', img: houses, title: 'Bhava Kundli' },
];

function KundliSection() {
  return (
    <section className=" "  style={{ backgroundColor: "#fefaea", padding: "100px" }}>
      <div className="container">
        <h2 className="text-center highlight m-5 fw-bold fs-1">Free Kundli Generation</h2>
        <div className="grid-wrapper d-flex">
          {kundliServices.map((service, index) => (
            <Link key={index} to={service.link} className="text-decoration-none">
              <div className="kundli-box shadow-sm">
                <img
                  src={service.img}
                  alt={service.title}
                  style={service.img === 'friendship.png' ? { width: '50px'} : {}}
                />
                <span>{service.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default KundliSection;