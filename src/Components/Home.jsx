// src/components/HeroCarousel.jsx
import React from "react";
import img1 from "../assets/HeroBanner.png"; // replace with your image
import img2 from "../assets/HeroBanner.png";
import img3 from "../assets/HeroBanner.png";

const HeroCarousel = () => {
  return (
    <div
      id="carouselExampleSlidesOnly"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={img1} className="d-block w-100" alt="Slide 1" />
        </div>
        <div className="carousel-item">
          <img src={img2} className="d-block w-100" alt="Slide 2" />
        </div>
        <div className="carousel-item">
          <img src={img3} className="d-block w-100" alt="Slide 3" />
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
