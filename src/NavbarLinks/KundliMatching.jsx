import React, { useState } from 'react';
import kundli from "../assets/images/img/KundliMatch.png"

const KundliMatching = () => {
  const [boyData, setBoyData] = useState({
    fullName: '',
    gender: 'male',
    dateOfBirth: '',
    timeOfBirth: { hh: '', mm: '', ss: '' },
    placeOfBirth: '',
    language: '',
    feature: ''
  });

  const [girlData, setGirlData] = useState({
    fullName: '',
    gender: 'female',
    dateOfBirth: '',
    timeOfBirth: { hh: '', mm: '', ss: '' },
    placeOfBirth: '',
    language: '',
    feature: ''
  });

  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleBoyChange = (e) => {
    const { name, value } = e.target;
    setBoyData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBoyTimeChange = (e) => {
    const { name, value } = e.target;
    setBoyData((prev) => ({
      ...prev,
      timeOfBirth: {
        ...prev.timeOfBirth,
        [name]: value
      }
    }));
  };

  const handleGirlChange = (e) => {
    const { name, value } = e.target;
    setGirlData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGirlTimeChange = (e) => {
    const { name, value } = e.target;
    setGirlData((prev) => ({
      ...prev,
      timeOfBirth: {
        ...prev.timeOfBirth,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setApiResponse(null);

    const payload = {
      boy: boyData,
      girl: girlData
    };

    try {
      const response = await fetch('https://api.example.com/kundli-matching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Kundli matching results');
      }

      const data = await response.json();
      setApiResponse(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container shadow-sm p-4 ">
      <div className="text-center mb-4">
        <img src={kundli} alt="" style={{height:"80px"}} />
        <h4 className="fw-bold">Match your horoscope</h4>
        <p className="text-muted">Accurate birth information is essential for precise astrological analysis</p>
      </div>

      <div className="row container m-3 p-3">

        {/* Girl's Form */}
        <div className="col-md-12 ">
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="card-title fs-2 fw-normal ">Girl's Kundali</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="girlFullName" className="form-label fs-5 fw-normal">Full Name</label>
                <input
                  type="text"
                  style={{ backgroundColor: "#eaeaea" }}
                  className="form-control p-2"
                  id="girlFullName"
                  name="fullName"
                  value={girlData.fullName}
                  onChange={handleGirlChange}
                  placeholder="Enter girl's full name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="girlDateOfBirth" className="form-label fs-5 fw-normal">Date of Birth</label>
                <input
                  className="form-control p-2"
                  style={{ backgroundColor: "#eaeaea" }}
                  type="date"
                  id="girlDateOfBirth"
                  name="dateOfBirth"
                  value={girlData.dateOfBirth}
                  onChange={handleGirlChange}
                />
              </div>

              <div className="mb-3 ">
                <label className="form-label fs-5 fw-normal">Time of Birth</label>
                <div className="row g-2">
                  <div className="col-4">
                    <input
                      className="form-control p-2"
                      style={{ backgroundColor: "#eaeaea" }}
                      type="number"
                      name="hh"
                      value={girlData.timeOfBirth.hh}
                      onChange={handleGirlTimeChange}
                      placeholder="Hour"
                      min="0"
                      max="23"
                    />
                  </div>
                  <div className="col-4">
                    <input
                      className="form-control"
                      type="number"
                      name="mm"
                      style={{ backgroundColor: "#eaeaea" }}
                      value={girlData.timeOfBirth.mm}
                      onChange={handleGirlTimeChange}
                      placeholder="Minute"
                      min="0"
                      max="59"
                    />
                  </div>
                  <div className="col-4">
                    <input
                      className="form-control"
                      type="number"
                      style={{ backgroundColor: "#eaeaea" }}
                      name="ss"
                      value={girlData.timeOfBirth.ss}
                      onChange={handleGirlTimeChange}
                      placeholder="SS"
                      min="0"
                      max="59"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="girlPlaceOfBirth" className="form-label fs-5 fw-normal">Place of Birth</label>
                <input
                  className="form-control p-2"
                  style={{ backgroundColor: "#eaeaea" }}
                  type="text"
                  id="girlPlaceOfBirth"
                  name="placeOfBirth"
                  value={girlData.placeOfBirth}
                  onChange={handleGirlChange}
                  placeholder="City, State, Country"
                />
              </div>

              <div className="mb-3 ">
                <label htmlFor="girlLanguage" className="form-label fs-5 fw-normal">Language</label>
                <select
                  className="form-select p-2"
                  style={{ backgroundColor: "#eaeaea" }}
                  id="girlLanguage"
                  name="language"
                  value={girlData.language}
                  onChange={handleGirlChange}
                >
                  <option value="">Select Language</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="girlFeature" className="form-label fs-5 fw-normal">Select Feature</label>
                <select
                  className="form-select p-2"
                  style={{ backgroundColor: "#eaeaea" }}
                  id="girlFeature"
                  name="feature"
                  value={girlData.feature}
                  onChange={handleGirlChange}>
                  <option value="">Select Astrological Feature</option>
                  <option value="basic">Basic Astrology</option>
                  <option value="planetary">Planetary Positions</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        {/* Boy's Form */}
        <div className="col-md-12">
          <div className="card shadow-sm p-4 mb-4">
            <h5 className="card-title  fs-2 fw-normal">Boy's Details</h5>
            <form>
              <div className="mb-3">
                <label htmlFor="boyFullName" className="form-label fs-5 fw-normal">Full Name</label>
                <input
                  type="text"
                  className="form-control p-2"
                  style={{ backgroundColor: "#eaeaea" }}
                  id="boyFullName"
                  name="fullName"
                  value={boyData.fullName}
                  onChange={handleBoyChange}
                  placeholder="Enter boy's full name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="boyDateOfBirth" className="form-label fs-5 fw-normal">Date of Birth</label>
                <input
                  className="form-control p-2"
                  style={{ backgroundColor: "#eaeaea" }}
                  type="date"
                  id="boyDateOfBirth"
                  name="dateOfBirth"
                  value={boyData.dateOfBirth}
                  onChange={handleBoyChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fs-5 fw-normal">Time of Birth</label>
                <div className="row g-2">
                  <div className="col-4">
                    <input
                      className="form-control p-2"
                      type="number"
                      style={{ backgroundColor: "#eaeaea" }}
                      name="hh"
                      value={boyData.timeOfBirth.hh}
                      onChange={handleBoyTimeChange}
                      placeholder="HH"
                      min="0"
                      max="23"
                    />
                  </div>
                  <div className="col-4">
                    <input
                      className="form-control p-2 "
                      style={{ backgroundColor: "#eaeaea" }}
                      type="number"
                      name="mm"
                      value={boyData.timeOfBirth.mm}
                      onChange={handleBoyTimeChange}
                      placeholder="MM"
                      min="0"
                      max="59"
                    />
                  </div>
                  <div className="col-4">
                    <input
                      className="form-control p-2"
                      type="number"
                      style={{ backgroundColor: "#eaeaea" }}
                      name="ss"
                      value={boyData.timeOfBirth.ss}
                      onChange={handleBoyTimeChange}
                      placeholder="SS"
                      min="0"
                      max="59"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="boyPlaceOfBirth" className="form-label fs-5 fw-normal">Place of Birth</label>
                <input
                  className="form-control p-2"
                  style={{ backgroundColor: "#eaeaea" }}
                  type="text"
                  id="boyPlaceOfBirth"
                  name="placeOfBirth"
                  value={boyData.placeOfBirth}
                  onChange={handleBoyChange}
                  placeholder="City, State, Country"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="boyLanguage" className="form-label fs-5 fw-normal">Language</label>
                <select
                  className="form-select p-2"
                  style={{ backgroundColor: "#eaeaea" }}
                  id="boyLanguage"
                  name="language"
                  value={boyData.language}
                  onChange={handleBoyChange}
                >
                  <option value="">Select Language</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="boyFeature" className="form-label fs-5 fw-normal">Select Feature</label>
                <select
                  className="form-select p-2"
                  style={{ backgroundColor: "#eaeaea" }}
                  id="boyFeature"
                  name="feature"
                  value={boyData.feature}
                  onChange={handleBoyChange}
                >
                  <option value="">Select Astrological Feature</option>
                  <option value="basic">Basic Astrology</option>
                  <option value="planetary">Planetary Positions</option>
                </select>
              </div>
            </form>
          </div>
          <div className="text-center">
            <button
              className="btn "
              onClick={handleSubmit}
              style={{ background: "linear-gradient(to right, rgba(238,128,0,1), rgba(254,191,49,1))", height: "50px", width: "80%" }}
            >
              Match Kundli
            </button>
          </div>
        </div>

      </div>


      {apiResponse && (
        <div className="mt-4 alert alert-success">
          <h5>Kundli Matching Result</h5>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 alert alert-danger">
          <h5>Error</h5>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default KundliMatching;