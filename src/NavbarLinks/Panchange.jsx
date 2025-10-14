import React from 'react'
import img from "../assets/images/FreeKundli/panchang.jpeg";
import { Link } from 'react-router-dom'

const Panchange = () => {
  return (
    <>
    <section>
      <div>
        <img src={img} alt="" style={{ objectFit: "cover", height: "auto", width: "100%" }} />
      </div>
      <div className='container shadow-sm mt-4 border rounded'>
        <div className='ms-3'>
          <h2 style={{ color: "rgba(238,128,0,1)", paddingTop: "20px" }}>Auspicious & Inauspicious Timings</h2>
          <div className='pt-2'>
            <h6>• Today's Dushta Muhurtas: Loading... </h6>
            <h6>• Today's Kulika: Loading...</h6>
            <h6>• Today's Rahu Kaal: Loading...</h6>
            <h6>• Today's Abhijit Muhurat: Loading...</h6>
            <h6>• Today's Disha: Loading...</h6>
          </div>
        </div>
        <div className='ms-3'>
          <h2 style={{ color: "rgba(238,128,0,1)", paddingTop: "20px" }}>Sunrise & Sunset</h2>
          <div className='pt-2'>
            <h6>• Today's Sun Rise Time: Loading... </h6>
            <h6>• Today's Sun Set Time: Loading...</h6>
            <h6>• Today's Weekday: Loading...</h6>
            <h6>• Today's Moon Rise: Loading...</h6>
            <h6>• Today's Moon Set: Loading...</h6>
          </div>
        </div>
        <div className='ms-3'>
          <h2 style={{ color: "rgba(238,128,0,1)", paddingTop: "20px" }}>Panchang Details</h2>
          <div className='pt-2 mb-5' >
            <h6>• Today's Tithi: Loading... </h6>
            <h6>• Today's Nakshatra: Loading...</h6>
            <h6>• Today's Karana: Loading...</h6>
            <h6>• Today's Paksha: Loading...</h6>
            <h6>• Today's Yoga: Loading...</h6>
            <h6>• Today's Ritu: Loading...</h6>
            <h6>• Vikram Samvat: Loading...</h6>
            <h6>• Shaka Samvat: Loading...</h6>
          </div>
        </div>

      </div>
    </section>
      <section className='p-5'>
        <div className="accordion accordion-flush container mt-4 pt-5" id="accordionFlushExample">
          {/* Item 1 */}
          <div className="accordion-item shadow-sm border rounded">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button collapsed fw-bolder"
                style={{ color: "#ff6600" }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                What is panchang ?
              </button>

            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <p>Panchang is a traditional Hindu calendar that provides important details such as tithi, nakshatra,
                  yoga, and planetary positions. It is widely used to determine auspicious times.</p>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="accordion-item mt-3 shadow-sm border rounded">
            <h2 className="accordion-header" id="flush-headingTwo">
              <button
                className="accordion-button collapsed fw-bolder"
                style={{ color: "#ff6600" }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                The Five Elements of panchang
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingTwo"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <p>
                  <ul>
                    <li>Tithi (Lunar day)</li>
                    <li>Nakshatra (Star/Constellation)</li>
                    <li>Yoga (Luni-solar day)</li>
                    <li>Karana (Half lunar day)</li>
                    <li>Var (Weekday)</li>
                  </ul>

                </p>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="accordion-item mt-3 shadow-sm border rounded">
            <h2 className="accordion-header" id="flush-headingThree">
              <button
                className="accordion-button collapsed fw-bolder"
                type="button"
                style={{ color: "#ff6600" }}
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                How to read and Use a Panchang
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingThree"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <p>To read a Panchang, one must understand its five elements and their influence on daily activities.
                  It is often consulted before religious or important events.</p>
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div className="accordion-item mt-3 shadow-sm border rounded">
            <h2 className="accordion-header" id="flush-headingFour">
              <button
                className="accordion-button collapsed fw-bolder"
                style={{ color: "#ff6600" }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFour"
                aria-expanded="false"
                aria-controls="flush-collapseFour"
              >
               importance of hindu panchang in Hindu Life
              </button>
            </h2>
            <div
              id="flush-collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingFour"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
              <p>Panchang plays a crucial role in determining auspicious timings (Muhurta),
                 planning festivals, and performing rituals according to Vedic traditions.</p>
              </div>
            </div>
          </div>

          {/* Item 5 */}
          <div className="accordion-item mt-3 shadow-sm border rounded">
            <h2 className="accordion-header" id="flush-headingFive">
              <button
                className="accordion-button collapsed fw-bolder"
                style={{ color: "#ff6600" }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseFive"
                aria-expanded="false"
                aria-controls="flush-collapseFive"
              >
                Mordern use of Panchang
              </button>
            </h2>
            <div
              id="flush-collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingFive"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
              <p>Today, Panchang is available in digital formats, making it easier for people to check timings 
                and astrological details online or via apps.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

   <div className="d-flex justify-content-end">
  <Link to="/" style={{ textDecoration: "none" }}>
    <h5 className="text-dark p-4">← Back to home</h5>
  </Link>
</div>

    </>
  )
}

export default Panchange