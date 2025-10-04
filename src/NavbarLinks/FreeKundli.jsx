import React from 'react'
import { Link } from 'react-router-dom'
import freekundli from '../assets/images/FreeKundli/freekundali.png'
import asteric from "../assets/images/img/asterisk.png"
import kidstar from "../assets/images/img/kid-star.png"
import shield from "../assets/images/img/shield-locked.png"
import planet from "../assets/images/img/planet.png";
const BasicAstrology = () => {
  return (
    <div style={{ backgroundColor: "#fefaea" }}>
      <Link to="/" style={{ textDecoration: "None" }}>
        <h5 className='text-dark p-4' > ← Back to home</h5></Link>
      <div style={{ position: "relative", textAlign: "center", color: "white" }}>
        <img
          src={freekundli}
          alt=""
          style={{ objectFit: "cover", height: "360px", width: "100%" }}
        />

        {/* Overlay text */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "60%",
          transform: "translate(-50%, -50%)"
        }}>
          <h1 style={{ margin: 0, color: "#f99202ff" }}>Free Kundli Online</h1>
          <p style={{ margin: 0 }}>
            Discover your cosmic blueprint with our comprehensive Vedic astrology analysis.
            Get insights into your personality, career, relationships, and life path.
          </p>
        </div>
      </div>
      <div className="frame-5 row " style={{ color: "#f99202ff" }}>
        <div className="frame-6 col-4 p-5 ">
          <img className="frame6img1 pe-3" src={asteric} /> 100% Free
        </div>
        <div className="frame-6 col-4 p-5 ">
          <img className="frame6img2 pe-3" src={kidstar} />Accurate Prediction
        </div>
        <div className="frame-6 col-4 p-5">
          <img className="frame6img3 pe-3" src={shield} />Private &amp; Secure
        </div>
      </div>
      <div className='shadow-sm' style={{ backgroundColor: "white", margin: "30px" }}>
        <form id="kundliForm" method="POST" className="kundli-form">
          <div className="frame-wrapper">
            <div className="frame-7">
              <div className="frame-8 text-center">
                <div className="text-center">
                  <div className="planetbox me-2 ">
                    <img
                      className="planet"
                      src={planet}
                      alt="planet"
                      style={{ width: "70px", height: "70px" }}
                    />
                  </div>
                  <p className="text-wrapper-5 fw-bold fs-5">
                    Get Your Kundli by Date of Birth
                  </p>
                </div>
                <p className="text-wrapper-6 text-muted">
                  Accurate birth information is essential for precise astrological
                  analysis
                </p>
              </div>

              <div className="form-grid p-5">
                {/* Full Name */}
                <div className="form-row mb-3">
                  <div className="col-12">
                    <label htmlFor="fullname" className="formlo-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      name="fullname"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="form-row mb-3">
                  <label className="form-label">Gender</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        type="radio"
                        id="gender-male"
                        name="gender"
                        value="male"
                        className="form-check-input"
                        required
                      />
                      <label htmlFor="gender-male" className="form-check-label">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="gender-female"
                        name="gender"
                        value="female"
                        className="form-check-input"
                      />
                      <label htmlFor="gender-female" className="form-check-label">
                        Female
                      </label>
                    </div>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="form-row mb-3">
                  <label className="form-label">Date of Birth</label>
                  <div className="d-flex gap-2">
                    <select id="boy_day" name="boy_day" className="form-control" required></select>
                    <select id="boy_month" name="boy_month" className="form-control" required></select>
                    <select id="boy_year" name="boy_year" className="form-control" required></select>
                  </div>
                </div>

                {/* Time of Birth */}
                <div className="form-row mb-3">
                  <label className="form-label">Time of Birth</label>
                  <div className="d-flex gap-2">
                    <input
                      type="number"
                      className="form-control"
                      id="boy_hour"
                      name="boy_hour"
                      placeholder="HH"
                      min="0"
                      max="23"
                      required
                    />
                    <input
                      type="number"
                      className="form-control"
                      id="boy_minute"
                      name="boy_minute"
                      placeholder="MM"
                      min="0"
                      max="59"
                      required
                    />
                    <input
                      type="number"
                      className="form-control"
                      id="boy_second"
                      name="boy_second"
                      placeholder="SS"
                      min="0"
                      max="59"
                    />
                  </div>
                </div>

                {/* Place of Birth */}
                <div className="form-row mb-3 position-relative">
                  <label htmlFor="boy_birthPlace" className="form-label">
                    Place of Birth
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="boy_birthPlace"
                    name="boy_birthPlace"
                    placeholder="City, State, Country"
                    required
                  />
                  <input type="hidden" id="boy_lat" name="boy_lat" />
                  <input type="hidden" id="boy_lon" name="boy_lon" />
                  <div
                    id="suggestions"
                    className="border rounded bg-white shadow-sm"
                    style={{ position: "absolute", zIndex: "1000" }}
                  ></div>
                </div>

                {/* Language */}
                <div className="form-row mb-3">
                  <label htmlFor="language" className="form-label">
                    Language
                  </label>
                  <select id="language" name="language" className="form-select" required>
                    <option value="">Select Language</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                    <option value="marathi">Marathi</option>
                    <option value="gujarati">Gujarati</option>
                    <option value="tamil">Tamil</option>
                  </select>
                </div>

                {/* Astrological Feature */}
                <div className="form-row mb-3">
                  <label htmlFor="astro_feature" className="form-label">
                    Select Feature
                  </label>
                  <select
                    id="astro_feature"
                    name="astro_feature"
                    className="form-control shadow-none my-2 p-2 rounded-1"
                    required
                  >
                    <option value="" disabled>
                      Select Astrological Feature
                    </option>
                    <option value="basicastrology">Basic Astrology</option>
                    <option value="planetary_positions">Planetary Positions</option>
                    <option value="vimshottari_dasha">Vimshottari Dasha</option>
                    <option value="ascendant_report">Ascendant Report</option>
                    <option value="gemstone_suggestions">Gemstone Suggestions</option>
                    <option value="composite_friendship">Composite Friendship</option>
                    <option value="shadbala">Shadbala</option>
                    <option value="yogini_dasha">Yogini Dasha</option>
                    <option value="bhava_kundli">Bhava Kundli</option>
                    <option value="manglik">Manglik Dosha</option>
                    <option value="kaal_sarpa">Kaal Sarpa Dosha</option>
                    <option value="sadhe_sati">Sadhe Sati</option>
                    <option value="horoscope">Horoscope Charts</option>
                  </select>
                </div>

                {/* Submit */}
                <div className="form-row mb-3">
                  <button type="submit" className="btn  btn-warning">
                    Generate Free Kundli
                  </button>
                  <div id="loader" className="text-center my-3 d-none">
                    <div className="spinner-border text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Fetching your data, please wait...</p>
                  </div>
                  <div id="kundliResult"></div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BasicAstrology