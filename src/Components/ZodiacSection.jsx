import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import Aries from '../assets/images/zodiac/Aries.png';
import Taurus from '../assets/images/zodiac/Taurus.png';
import Gemini from '../assets/images/zodiac/Gemini.png';
import Cancer from '../assets/images/zodiac/Cancer.png';
import Leo from '../assets/images/zodiac/Leo.png';
import Virgo from '../assets/images/zodiac/Virgo.png';
import Libra from '../assets/images/zodiac/Libra.png';
import Scorpio from '../assets/images/zodiac/Scorpio.png';
import Sagittarius from '../assets/images/zodiac/Sagittarius.png';
import Capricorn from '../assets/images/zodiac/Capricorn.png';
import Aquarius from '../assets/images/zodiac/Aquarius.png';
import Pisces from '../assets/images/zodiac/Pisces.png';
import Placeholder from '../assets/images/zodiac/Aquarius.png';

const ZodiacSection = () => {
  const zodiacs = [
    { name: 'Aries', image: Aries, path: '/zodiac/aries' },
    { name: 'Taurus', image: Taurus, path: '/zodiac/taurus' },
    { name: 'Gemini', image: Gemini, path: '/zodiac/gemini' },
    { name: 'Cancer', image: Cancer, path: '/zodiac/cancer' },
    { name: 'Leo', image: Leo, path: '/zodiac/leo' },
    { name: 'Virgo', image: Virgo, path: '/zodiac/virgo' },
    { name: 'Libra', image: Libra, path: '/zodiac/libra' },
    { name: 'Scorpio', image: Scorpio, path: '/zodiac/scorpio' },
    { name: 'Sagittarius', image: Sagittarius, path: '/zodiac/sagittarius' },
    { name: 'Capricorn', image: Capricorn, path: '/zodiac/capricorn' },
    { name: 'Aquarius', image: Aquarius, path: '/zodiac/aquarius' },
    { name: 'Pisces', image: Pisces, path: '/zodiac/pisces' },
  ];

  return (
    <section className="py-4" style={{backgroundColor:"#fefaea"}}>
      <div className="container ">
        <div className=" justify-content-between align-items-center mb-3 ">
          <h2 className="highlight text-center ">Zodiac Signs</h2>
         
        </div>
        <div className="row g-3 mt-4 mb-4 container justify-content-center ">
          {zodiacs.map((zodiac, index) => ( 
            <div className="col-4 col-sm-4 col-lg-2 ps-5" key={index}>
              <NavLink to={zodiac.path} className="card-link">
                <div className="zodiac-card card-hover p-3">
                  <div className="zodiac-icon">
                    <img src={zodiac.image || Placeholder} alt={zodiac.name} />
                  </div>
                  <h6 className="zodiac-title">{zodiac.name}</h6>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZodiacSection;