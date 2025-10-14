import React from 'react'
import { Link } from 'react-router-dom'
import kundli from '../assets/images/FreeKundli/kundli.png'

const Kp = () => {
  return (
    <>
      <Link to="/" className='' style={{ textDecoration: "None" }}>
        <h5 className='text-dark ' > ← Back to home</h5></Link>
      <div className='container'>
        <div className='row'>
          <div className=' p-4 col-12'>
            <h1 className='text-center' style={{ color: "rgba(238,128,0,1)" }}>KP Astrology - Krishnamurti Paddhati (KP System)</h1>
            <p className='mt-4 fw-normal fs-6'>KP Astrology is a refined approach to Stellar Astrology that focuses on the study of Nakshatras (Stars) to predict
              life events with precision. Explore a comprehensive collection of tools, utilities, and insightful articles dedicated
              to the KP system, all in one place.</p>

            <p className='mt-4 fw-normal fs-6'>The KP System is a modern and scientific approach to astrology, developed by the renowned
              Indian astrologer Prof. K.S. Krishnamurti in the mid-20th century. It refines traditional Vedic astrology to offer more precise
              predictions. KP Astrology focuses on the Nakshatras (stars) and their sub-lords, enabling detailed analysis and accurate timing
              of events in one's life.</p>
          </div>
          <div className="col-6 border rounded p-3 mb-3">
            <h4>Quick Links</h4>
            <ol>
              <li>What is KP System?</li>
              <li>Create KP Chart Online</li>
              <li>Current Ruling Planets</li>
              <li>KP Panchang</li>
              <li>KP Horary Chart Generator</li>
              <li>KP Astrology Guide</li>
            </ol>
          </div>
        </div>
      </div>
      <section className='container pb-4'>
        <div className="row" style={{ backgroundColor: "#fefaea" }}>
          <h3 className="text-center mb-3 mt-3">KP Astrology</h3>
          <hr />
          <div className="col-6 pb-4">
            <form action="">
              <div className="container mt-4">
                <div className="card p-4" >
                  <form>
                    {/* Name */}
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" placeholder="Enter name" />
                    </div>

                    {/* Gender */}
                    <div className="mb-3">
                      <label className="form-label">Gender</label>
                      <input type="text" className="form-control" placeholder="Enter gender" />
                    </div>

                    {/* Date of Birth */}
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label className="form-label">Day</label>
                        <input type="number" className="form-control" placeholder="DD" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Month</label>
                        <input type="text" className="form-control" placeholder="Month" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Year</label>
                        <input type="number" className="form-control" placeholder="YYYY" />
                      </div>
                    </div>

                    {/* Time of Birth */}
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <label className="form-label">Hour</label>
                        <input type="number" className="form-control" placeholder="HH" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Minute</label>
                        <input type="number" className="form-control" placeholder="MM" />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label">Second</label>
                        <input type="number" className="form-control" placeholder="SS" />
                      </div>
                    </div>

                    {/* Language */}
                    <div className="mb-3">
                      <label className="form-label">Select Language</label>
                      <input type="text" className="form-control" placeholder="Enter language" />
                    </div>

                    {/* Birth Place */}
                    <div className="mb-3">
                      <label className="form-label">Birth Place</label>
                      <input type="text" className="form-control" placeholder="Enter birth place" />
                    </div>

                    {/* Submit */}
                    <div className="text-center">
                      <button type="submit" className="btn btn-warning">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </form>
          </div>
          <div className="col-6 mt-4">
            <div className='text-center mb-4'>
              <img src={kundli} alt="" style={{ height: "150px", objectFit: "cover" }} />
            </div>
            <p>Your KP Chart, or Cuspal Chart, is a highly refined astrological map based on the Krishnamurti Paddhati
              system. Unlike traditional birth charts, the KP system divides the zodiac into precise sub-divisions using
              Nakshatras and their sub-lords, allowing for extremely accurate timing of life events. Each KP chart is unique and
              reveals critical insights about your life path, relationships, career, and destiny through the lens of stellar
              astrology. By focusing on the ruling planets and sub-lords at the moment of birth, KP Astrology serves as a practical
              and scientific tool for deep self-discovery, decision-making, and future planning.</p>
          </div>
        </div>
      </section >

      <section>
        <div className='container'>
          <div className="row">
            <div className="col-10">
              <h6 className='fw-bold fs-5 mb-3'>Zodiac Divisions in KP Astrology</h6>
              <p>In KP Astrology, the Zodiac Belt, a 360-degree circle, is divided into 12 equal parts (30 degrees each)
                called Zodiac Signs or Rashis. Each sign is further divided into 27 Nakshatras (13°20' each), and each Nakshatra
                is subdivided into 9 parts called "Subs." These Sub divisions, ruled by "Sub Lords," form the core of KP Astrology,
                enabling precise predictions. The division of Subs is based on the Vimshottari Dasha system, where planets with
                shorter Dashas occupy smaller portions of a Nakshatra, while longer Dashas occupy larger portions. This method
                modernizes Vedic Astrology, simplifying predictions while maintaining accuracy. KP Astrology uses the Placidus House system,
                with houses measured cusp-to-cusp rather than fixed degrees. This approach, combined with a focus on Sub Lords, offers a streamlined
                and highly effective way to predict events with clarity and precision.</p>
            </div>
            <div className="col-10">
              <h6 className='fw-bold fs-5 mb-3'>Origin and Essence of KP Astrology</h6>
              <p>The Krishnamurti Paddhati (KP) system, developed by Late Astrologer Krishnamurti, revolutionized Vedic
                Astrology by introducing a simplified yet highly accurate method for event prediction. By focusing on
                Nakshatras (stars) and their "Sub Lords," KP Astrology offers precise insights into life events. KP Astrology divides
                the Zodiac Belt (360°) into 12 signs, 27 Nakshatras, and 9 unequal Sub-divisions within each Nakshatra. These divisions
                are based on the Vimshottari Dasha system, with planets occupying segments proportional to their Dasha periods.
                The technique emphasizes the Sub Lords, using them to evaluate events with clarity. Unlike traditional Vedic Astrology,
                KP utilizes the Placidus House System, measuring houses cusp-to-cusp. This streamlined approach enables astrologers to
                predict events more accurately, making it a modern and practical evolution of ancient astrology.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Kp