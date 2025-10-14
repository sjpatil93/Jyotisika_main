import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import freekundli from '../../assets/images/FreeKundli/freekundali.png';
import asteric from '../../assets/images/img/asterisk.png';
import kidstar from '../../assets/images/img/kid-star.png';
import shield from '../../assets/images/img/shield-locked.png';
import planet from '../../assets/images/img/planet.png';
import moonStars from '../../assets/images/img/moon-stars.png';
import favorite from '../../assets/images/img/favorite.png';
import diamond from '../../assets/images/img/diamond.png';

const GemstoneRecommendation = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    boy_day: '',
    boy_month: '',
    boy_year: '',
    boy_hour: '',
    boy_minute: '',
    boy_second: '',
    boy_birthPlace: '',
    boy_lat: '',
    boy_lon: '',
    language: '',
    astro_feature: 'gemstone_recommendations',
  });
  const [suggestions, setSuggestions] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [birthPlaceQuery, setBirthPlaceQuery] = useState('');
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Base URL
  const baseUrl = 'https://jyotisika.in/jyotisika_test/';

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'bn', label: 'Bengali' },
    { value: 'ma', label: 'Marathi' },
    { value: 'tm', label: 'Tamil' },
    { value: 'tl', label: 'Telugu' },
    { value: 'ml', label: 'Malayalam' },
    { value: 'kn', label: 'Kannada' },
  ];

  // Populate dropdowns
  useEffect(() => {
    const populateSelect = (id, start, end, pad = false) => {
      const select = document.getElementById(id);
      if (select) {
        select.innerHTML = '<option value="" disabled selected>Select</option>';
        for (let i = start; i <= end; i++) {
          const val = pad ? String(i).padStart(2, '0') : i;
          select.innerHTML += `<option value="${val}">${val}</option>`;
        }
      }
    };

    const populateMonth = (id) => {
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const select = document.getElementById(id);
      if (select) {
        select.innerHTML = '<option value="" disabled selected>Select</option>';
        months.forEach((month, i) => {
          select.innerHTML += `<option value="${i + 1}">${month}</option>`;
        });
      }
    };

    populateSelect('boy_day', 1, 31, true);
    populateMonth('boy_month');
    populateSelect('boy_year', 1980, new Date().getFullYear());
    populateSelect('boy_hour', 0, 23, true);
    populateSelect('boy_minute', 0, 59, true);
    populateSelect('boy_second', 0, 59, true);
  }, []);

  // Click outside to hide suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        suggestionsRef.current &&
        !inputRef.current.contains(e.target) &&
        !suggestionsRef.current.contains(e.target)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle name change with filtering
  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '').replace(/(\..*)\./g, '$1');
    setFormData((prev) => ({ ...prev, fullname: value }));
  };

  // Handle birth place search with debounce
  const handleBirthPlaceChange = (e) => {
    setBirthPlaceQuery(e.target.value);
    setFormData((prev) => ({ ...prev, boy_birthPlace: e.target.value }));
  };

  // Debounced API call for city suggestions
  useEffect(() => {
    if (birthPlaceQuery.length < 2) {
      setSuggestions([]);
      return;
    }
    const handler = setTimeout(async () => {
      try {
        const res = await fetch(`${baseUrl}User_Api_Controller/search_city?q=${encodeURIComponent(birthPlaceQuery)}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setSuggestions(data.length ? data : [{ display_name: 'No results found' }]);
      } catch (err) {
        setSuggestions([{ display_name: 'Error fetching results' }]);
        console.error(err);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [birthPlaceQuery]);

  // Handle suggestion click
  const handleSuggestionClick = (item) => {
    if (!item.lat && !item.lon && !item.latitude && !item.longitude) return;
    setFormData((prev) => ({
      ...prev,
      boy_birthPlace: item.display_name,
      boy_lat: item.lat || item.latitude || '28.7041',
      boy_lon: item.lon || item.longitude || '77.1025',
    }));
    setSuggestions([]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      { id: 'fullname', label: 'Full Name' },
      { id: 'gender', label: 'Gender' },
      { id: 'boy_day', label: 'Day' },
      { id: 'boy_month', label: 'Month' },
      { id: 'boy_year', label: 'Year' },
      { id: 'boy_hour', label: 'Hour' },
      { id: 'boy_minute', label: 'Minute' },
      { id: 'boy_birthPlace', label: 'Place of Birth' },
      { id: 'language', label: 'Language' },
    ];

    const missingField = requiredFields.find(({ id }) => {
      let val = formData[id];
      if (id === 'fullname' || id === 'boy_birthPlace') {
        val = val.trim();
      }
      return !val;
    });
    if (missingField) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: `Please fill out the ${missingField.label} field.`,
        confirmButtonColor: '#ff9800',
      });
      return;
    }

    setLoading(true);
    const submitData = {
      boy_name: formData.fullname,
      boy_gender: formData.gender,
      boy_day: formData.boy_day,
      boy_month: formData.boy_month,
      boy_year: formData.boy_year,
      boy_hour: formData.boy_hour,
      boy_minute: formData.boy_minute,
      boy_second: formData.boy_second || "00",
      boy_birthPlace: formData.boy_birthPlace,
      boy_lat: formData.boy_lat || "28.7041",
      boy_lon: formData.boy_lon || "77.1025",
      lan: formData.language || 'en'
    };
    const apiUrl = `${baseUrl}User_Api_Controller/gemstone_suggestions`;
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
      setLoading(false);
      if (!data.success) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No gemstone recommendations were returned. Please try again.',
          confirmButtonColor: '#ff9800',
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setResult({ success: false, error: 'Data not loaded due to server problem' });
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message.includes('404')
          ? 'The gemstone recommendations API is not available. Please check the server configuration or contact support.'
          : 'An error occurred while fetching gemstone recommendations. Please try again later.',
        confirmButtonColor: '#ff9800',
      });
    }
  };

  // Render result based on API response
  const renderResult = () => {
    if (!result) return null;
    if (!result.success) {
      return <div className="alert alert-danger">No data returned from API.</div>;
    }

    const gemData = result.data.data;
    const lifeStone = gemData.lucky_stone || {};
    const dashaStone = gemData.dasha_stone || [];
    return (
      <>
        <div className="alert alert-success mb-3">Gemstone Recommendations Loaded</div>
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">💎 Life Stone Recommendation</h5>
          </div>
          <div className="card-body">
            <table className="table table-bordered align-middle">
              <tbody>
                <tr>
                  <th>Primary Gemstone</th>
                  <td>{lifeStone.gemstones?.Primary || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Secondary Gemstones</th>
                  <td>{lifeStone.gemstones?.Secondary || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Day to Wear</th>
                  <td>{lifeStone.day_to_wear || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Time to Wear</th>
                  <td>{lifeStone.time_to_wear || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Finger to Wear</th>
                  <td>{lifeStone.finger_to_wear || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Mantra</th>
                  <td><span className="fw-semibold">{lifeStone.mantra || 'N/A'}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {dashaStone.length > 0 && (
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">🔮 Dasha Stone Recommendations</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover text-center align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Primary Gemstone</th>
                      <th>Secondary Gemstones</th>
                      <th>Day to Wear</th>
                      <th>Time</th>
                      <th>Finger</th>
                      <th>Mantra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashaStone.map((stone, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{stone.gemstones?.Primary || 'N/A'}</td>
                        <td>{stone.gemstones?.Secondary || 'N/A'}</td>
                        <td>{stone.day_to_wear || 'N/A'}</td>
                        <td>{stone.time_to_wear || 'N/A'}</td>
                        <td>{stone.finger_to_wear || 'N/A'}</td>
                        <td>{stone.mantra || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-vh-100 bg-[#fefaea]">{/* font-poppins  /* TODO: convert manually */ }
      <main className="d-flex flex-column flex-lg-row gap-5 p-md-5">
        {/* Main Content */}
        <div className="free-kundli flex-grow-1">
          <div className="container px-0 pb-5" style={{ maxWidth: '80rem' }}>
            {/* Back to Home */}
            <div className="mb-4">
              <Link
                to="/"
                className="d-inline-flex align-items-center gap-2 text-dark fw-semibold text-decoration-none"
                /* TODO: hover text color to #ee7f00 */
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to home
              </Link>
            </div>

            {/* Header Image Section */}
            <div
              className="position-relative w-100 bg-white overflow-hidden mb-5 "
              /* TODO: responsive heights for h-[200/250/300] */
              style={{ height: 300 }}
            >
              <div className="position-relative w-100 h-100">
                <img
                  src={freekundli}
                  alt="Free Kundli"
                  className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
                <div
                  className="position-absolute end-0 text-end ps-sm-5 pt-sm-3"
                  /* TODO: width utilities w-[70/50/60%] & top-[15%] */
                  style={{ top: '15%', width: '60%' }}
                >
                  <div className="text-warning fw-bold fs-3 mb-2 text-start">{/* font-[Samarkan] /* TODO */ }
                    Gemstone Recommendation
                  </div>
                  <p className="text-light small lh-sm text-start" style={{ maxWidth: 483 }}>
                    Discover personalized gemstone recommendations based on your birth chart to enhance planetary influences and improve your life’s harmony.
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-4 mb-5">
              {[
                { img: asteric, text: '100% Free', className: 'frame6img1' },
                { img: kidstar, text: 'Accurate Prediction', className: 'frame6img2' },
                { img: shield, text: 'Private & Secure', className: 'frame6img3' },
              ].map((item, index) => (
                <div key={index} className="d-flex align-items-center gap-2">
                  <img
                    src={item.img}
                    alt={item.text}
                    className={item.className}
                    style={{ width: 20, height: 20 }} /* ~ w-5 h-5 */
                  />
                  <span className="text-warning fw-semibold small">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Form */}
            <form id="kundliForm" onSubmit={handleSubmit} className="card  p-4 p-md-5 mb-5 rounded-4 mx-auto" style={{ maxWidth: '56rem' }}>
              <div>
                <div className="d-flex flex-column align-items-center gap-3">
                  <div className="d-flex flex-column align-items-center gap-2" style={{ maxWidth: 669 }}>
                    <div className="d-flex flex-column align-items-center gap-2" style={{ maxWidth: 501 }}>
                      <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: 71, height: 71, background: '#FFE09B' }}>
                        <img src={planet} alt="Planet" style={{ width: 40, height: 40, objectFit: 'cover' }} />
                      </div>
                      <p className="text-dark fw-semibold fs-5 text-center">
                        Get Your Gemstone Recommendation by Date of Birth
                      </p>
                    </div>
                    <p className="text-muted text-center mb-0" style={{ maxWidth: 501 }}>
                      Accurate birth information is essential for precise astrological gemstone analysis
                    </p>
                  </div>

                  {/* Form grid */}
                  <div className="row g-3 w-100">
                    {/* Full Name */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="fullname" className="form-label text-dark">Full Name</label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleNameChange}
                        placeholder="Enter your full name"
                        className="form-control"
                        required
                      />
                    </div>

                    {/* Gender */}
                    <div className="col-12 col-md-6">
                      <label className="form-label text-dark">Gender</label>
                      <div className="d-flex flex-column flex-sm-row gap-3">
                        {['male', 'female'].map((gender) => (
                          <div key={gender} className="form-check">
                            <input
                              type="radio"
                              id={`gender-${gender}`}
                              name="gender"
                              value={gender}
                              checked={formData.gender === gender}
                              onChange={handleInputChange}
                              className="form-check-input"
                              required
                            />
                            <label htmlFor={`gender-${gender}`} className="form-check-label text-dark">
                              {gender.charAt(0).toUpperCase() + gender.slice(1)}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="col-12 col-md-6">
                      <label className="form-label text-dark">Date of Birth</label>
                      <div className="row g-2">
                        <div className="col">
                          <select
                            id="boy_day"
                            name="boy_day"
                            value={formData.boy_day}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                          />
                        </div>
                        <div className="col">
                          <select
                            id="boy_month"
                            name="boy_month"
                            value={formData.boy_month}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                          />
                        </div>
                        <div className="col">
                          <select
                            id="boy_year"
                            name="boy_year"
                            value={formData.boy_year}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Time of Birth */}
                    <div className="col-12 col-md-6">
                      <label className="form-label text-dark">Time of Birth</label>
                      <div className="row g-2">
                        <div className="col">
                          <select
                            id="boy_hour"
                            name="boy_hour"
                            value={formData.boy_hour}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                          />
                        </div>
                        <div className="col">
                          <select
                            id="boy_minute"
                            name="boy_minute"
                            value={formData.boy_minute}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                          />
                        </div>
                        <div className="col">
                          <select
                            id="boy_second"
                            name="boy_second"
                            value={formData.boy_second}
                            onChange={handleInputChange}
                            className="form-select"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Place of Birth */}
                    <div className="col-12 position-relative">
                      <label htmlFor="boy_birthPlace" className="form-label text-dark">Place of Birth</label>
                      <input
                        ref={inputRef}
                        type="text"
                        id="boy_birthPlace"
                        name="boy_birthPlace"
                        value={formData.boy_birthPlace}
                        onChange={handleBirthPlaceChange}
                        placeholder="City, State, Country"
                        className="form-control"
                        autoComplete="off"
                        required
                      />
                      <input type="hidden" id="boy_lat" name="boy_lat" value={formData.boy_lat} />
                      <input type="hidden" id="boy_lon" name="boy_lon" value={formData.boy_lon} />
                      {suggestions.length > 0 && (
                        <div
                          ref={suggestionsRef}
                          className="position-absolute z-3 bg-white border rounded shadow-sm w-100 mt-1"
                          style={{ maxHeight: 200, overflowY: 'auto' }}
                        >
                          {suggestions.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => handleSuggestionClick(item)}
                              className="p-2 border-bottom"
                              style={{ cursor: 'pointer' }} /* TODO: hover background highlight */
                            >
                              {item.display_name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Language */}
                    <div className="col-12">
                      <label htmlFor="language" className="form-label text-dark">Language</label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="">Select Language</option>
                        {languages.map((lang) => (
                          <option key={lang.value} value={lang.value}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Astrological Feature (hidden) */}
                    <input type="hidden" id="astro_feature" name="astro_feature" value="gemstone_recommendations" />

                    {/* Submit */}
                    <div className="col-12 pt-3">
                      <button
                        type="submit"
                        className="btn btn-warning bg-gradient w-100 py-3 fw-bold text-white"
                        /* TODO: replicate exact two-stop gradient */
                      >
                        Get Gemstone Recommendations
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Loader and Result */}
            {loading && (
              <div id="loader" className="text-center my-3 container">
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Fetching your data, please wait...</p>
              </div>
            )}
            <div id="kundliResult" className="container">{renderResult()}</div>

            {/* Features Grid */}
            <div className="container py-4 pb-5">
              <div className="row g-4 justify-content-center" style={{ maxWidth: '72rem', margin: '0 auto' }}>
                {[
                  {
                    img: moonStars,
                    title: 'Planetary Analysis',
                    desc: 'Detailed analysis of all 9 planets and their influences on your life',
                    link: `${baseUrl}FreeKundli_Controller/PlanetaryPosition`,
                    className: 'frame-19',
                  },
                  {
                    img: favorite,
                    title: 'Love & Marriage',
                    desc: 'Insights into your romantic life and marriage compatibility',
                    link: `${baseUrl}User/KundliMatching`,
                    className: 'frame-20',
                  },
                  {
                    img: diamond,
                    title: 'Remedies & Gems',
                    desc: 'Personalized remedies and gemstone recommendations',
                    link: `${baseUrl}FreeKundli_Controller/GemstoneRecommendation`,
                    className: 'frame-21',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="col-12 col-md-4 d-flex flex-column align-items-center gap-3"
                    onClick={() => (window.location.href = item.link)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={item.img} alt={item.title} style={{ width: 40, height: 40 }} />
                    <p className="text-center text-dark mb-0">
                      <span className="d-block fw-semibold">{item.title}</span>
                      <span className="d-block text-muted small">{item.desc}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GemstoneRecommendation;