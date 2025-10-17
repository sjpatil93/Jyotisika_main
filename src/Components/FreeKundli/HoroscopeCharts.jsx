import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import freekundli from '../../assets/images/FreeKundli/freekundali.png';
import asteric from '../../assets/images/img/asterisk.png';
import kidstar from '../../assets/images/img/kid-star.png';
import shield from '../../assets/images/img/shield-locked.png';
import planet from '../../assets/images/img/planet.png';
import moonStars from '../../assets/images/img/moon-stars.png';
import favorite from '../../assets/images/img/favorite.png';
import diamond from '../../assets/images/img/diamond.png';

const HoroscopeCharts = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    birth_day: '',
    birth_month: '',
    birth_year: '',
    birth_hour: '',
    birth_minute: '',
    birth_second: '',
    birth_place: '',
    birth_lat: '',
    birth_lon: '',
    language: '',
    chartType: '',
    astro_feature: 'horoscope_charts',
  });
  const [suggestions, setSuggestions] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [birthPlaceQuery, setBirthPlaceQuery] = useState('');
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const baseUrl = 'https://jyotisika.in/jyotisika_test/';

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'ma', label: 'Marathi' },
    { value: 'gu', label: 'Gujarati' },
    { value: 'ta', label: 'Tamil' },
    { value: 'bn', label: 'Bengali' },
    { value: 'tl', label: 'Telugu' },
    { value: 'ml', label: 'Malayalam' },
    { value: 'kn', label: 'Kannada' },
  ];

  const chartTypes = [
    { value: 'chalit', label: 'Chalit Chart' },
    { value: 'SUN', label: 'Sun Chart' },
    { value: 'MOON', label: 'Moon Chart' },
    { value: 'D1', label: 'Birth Chart' },
    { value: 'D2', label: 'Hora Chart' },
    { value: 'D3', label: 'Dreshkan Chart' },
    { value: 'D4', label: 'Chathurthamasha Chart' },
    { value: 'D7', label: 'Saptamansha Chart' },
    { value: 'D9', label: 'Navamsha Chart' },
    { value: 'D10', label: 'Dashamansha Chart' },
    { value: 'D12', label: 'Dwadashamsha Chart' },
    { value: 'D16', label: 'Shodashamsha Chart' },
    { value: 'D20', label: 'Vishamansha Chart' },
    { value: 'D24', label: 'Chaturvimshamsha Chart' },
    { value: 'D27', label: 'Bhamsha Chart' },
    { value: 'D30', label: 'Trishamansha Chart' },
    { value: 'D40', label: 'Khavedamsha Chart' },
    { value: 'D45', label: 'Akshvedansha Chart' },
    { value: 'D60', label: 'Shashtymsha Chart' },
    { value: 'cuspal', label: 'Cuspal Chart' },
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

    populateSelect('birth_day', 1, 31, true);
    populateMonth('birth_month');
    populateSelect('birth_year', 1900, new Date().getFullYear());
    populateSelect('birth_hour', 0, 23, true);
    populateSelect('birth_minute', 0, 59, true);
    populateSelect('birth_second', 0, 59, true);
  }, []);

  // Hide suggestions when clicked outside
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

  // Input handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '').replace(/(\..*)\./g, '$1');
    setFormData((prev) => ({ ...prev, fullname: value }));
  };

  const handleBirthPlaceChange = (e) => {
    setBirthPlaceQuery(e.target.value);
    setFormData((prev) => ({ ...prev, birth_place: e.target.value }));
  };

  // Debounced search
  useEffect(() => {
    if (birthPlaceQuery.length < 2) {
      setSuggestions([]);
      return;
    }
    const handler = setTimeout(async () => {
      try {
        const res = await fetch(`${baseUrl}User_Api_Controller/search_city?q=${encodeURIComponent(birthPlaceQuery)}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setSuggestions(data.length ? data : [{ display_name: 'No results found' }]);
      } catch (err) {
        setSuggestions([{ display_name: 'Error fetching results' }]);
        console.error(err);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [birthPlaceQuery]);

  const handleSuggestionClick = (item) => {
    if (!item.lat && !item.lon && !item.latitude && !item.longitude) return;
    setFormData((prev) => ({
      ...prev,
      birth_place: item.display_name,
      birth_lat: item.lat || item.latitude || '28.7041',
      birth_lon: item.lon || item.longitude || '77.1025',
    }));
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      { id: 'fullname', label: 'Full Name' },
      { id: 'gender', label: 'Gender' },
      { id: 'birth_day', label: 'Day' },
      { id: 'birth_month', label: 'Month' },
      { id: 'birth_year', label: 'Year' },
      { id: 'birth_hour', label: 'Hour' },
      { id: 'birth_minute', label: 'Minute' },
      { id: 'birth_place', label: 'Place of Birth' },
      { id: 'language', label: 'Language' },
      { id: 'chartType', label: 'Chart Type' },
    ];

    const missingField = requiredFields.find(({ id }) => !formData[id] || formData[id].trim() === '');
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
      boy_day: formData.birth_day,
      boy_month: formData.birth_month,
      boy_year: formData.birth_year,
      boy_hour: formData.birth_hour,
      boy_minute: formData.birth_minute,
      boy_second: formData.birth_second || "00",
      boy_birthPlace: formData.birth_place,
      boy_lat: formData.birth_lat || "28.7041",
      boy_lon: formData.birth_lon || "77.1025",
      lan: formData.language || "en",
      chartid: formData.chartType,
      astro_feature: formData.astro_feature,
    };

    try {
      const res = await axios.post(`${baseUrl}User_Api_Controller/horoscope_charts`, submitData);
      const data = res.data;
      setResult(data);
      setLoading(false);
      if (!data.success) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to load horoscope chart.',
          confirmButtonColor: '#ff9800',
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setResult({ success: false });
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch horoscope chart. Please try again later.',
        confirmButtonColor: '#ff9800',
      });
    }
  };

  const renderResult = () => {
    if (!result) return null;
    if (!result.success || !result.data || !result.data.data)
      return <div className="alert alert-danger">No data returned from API</div>;
    const kundli = result.data.data;
    return (
      <>
        <div className="alert alert-success">Horoscope Chart Loaded</div>
        <div className="text-center my-3">
          <img src={kundli.base64_image} alt="Horoscope Chart" className="img-fluid" />
        </div>
      </>
    );
  };

  return (
    <div className="min-vh-100 bg-[#fefaea]">
      <main className="d-flex flex-column flex-lg-row gap-3 p-md-4">
        <div className="flex-grow-1">
          <div className="container pb-5">

            <div className="mb-4">
              <Link to="/" className="d-inline-flex align-items-center gap-2 text-dark text-decoration-none">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to home
              </Link>
            </div>

            <div className="position-relative w-100 mb-4">
              <img
                src={freekundli}
                alt="Free Kundli"
                className="w-100"
                style={{ height: '250px', objectFit: 'cover' }} /* TODO: responsive heights */
              />
            </div>

            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-4 mb-4">
              {[{ img: asteric, text: '100% Free' }, { img: kidstar, text: 'Accurate Prediction' }, { img: shield, text: 'Private & Secure' }].map((item, i) => (
                <div key={i} className="d-flex align-items-center gap-2">
                  <img src={item.img} alt={item.text} className="img-fluid" style={{ width: '24px', height: '24px' }} />
                  <span className="text-warning fw-medium small">{item.text}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3  p-4 mb-5 mx-auto" style={{ maxWidth: '700px' }}>
              <div className="text-center mb-3">
                <div className="d-inline-flex justify-content-center align-items-center bg-warning rounded-circle mb-3" style={{ width: '70px', height: '70px' }}>
                  <img src={planet} alt="Planet" className="img-fluid" style={{ width: '40px', height: '40px' }} />
                </div>
                <h5 className="fw-medium text-dark">Get Your Horoscope Chart Analysis</h5>
                <p className="text-muted small">Provide your exact birth details for precise analysis</p>
              </div>

              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">Full Name</label>
                <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleNameChange} className="form-control bg-light" required />
              </div>

              {/* Gender */}
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <div className="d-flex flex-wrap gap-3">
                  {['male', 'female'].map((g) => (
                    <div key={g} className="form-check form-check-inline">
                      <input type="radio" id={`gender-${g}`} name="gender" value={g} checked={formData.gender === g} onChange={handleInputChange} className="form-check-input" required />
                      <label htmlFor={`gender-${g}`} className="form-check-label">{g.charAt(0).toUpperCase() + g.slice(1)}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date of Birth */}
              <div className="row g-2 mb-3">
                <label className="form-label">Date of Birth</label>
                <div className="col">
                  <select id="birth_day" name="birth_day" value={formData.birth_day} onChange={handleInputChange} className="form-select bg-light" required />
                </div>
                <div className="col">
                  <select id="birth_month" name="birth_month" value={formData.birth_month} onChange={handleInputChange} className="form-select bg-light" required />
                </div>
                <div className="col">
                  <select id="birth_year" name="birth_year" value={formData.birth_year} onChange={handleInputChange} className="form-select bg-light" required />
                </div>
              </div>

              {/* Time of Birth */}
              <div className="row g-2 mb-3">
                <label className="form-label">Time of Birth</label>
                <div className="col">
                  <select id="birth_hour" name="birth_hour" value={formData.birth_hour} onChange={handleInputChange} className="form-select bg-light" required />
                </div>
                <div className="col">
                  <select id="birth_minute" name="birth_minute" value={formData.birth_minute} onChange={handleInputChange} className="form-select bg-light" required />
                </div>
                <div className="col">
                  <select id="birth_second" name="birth_second" value={formData.birth_second} onChange={handleInputChange} className="form-select bg-light" />
                </div>
              </div>

              {/* Place of Birth */}
              <div className="mb-3 position-relative">
                <label htmlFor="birth_place" className="form-label">Place of Birth</label>
                <input ref={inputRef} type="text" id="birth_place" name="birth_place" value={formData.birth_place} onChange={handleBirthPlaceChange} className="form-control bg-light" placeholder="City, State, Country" autoComplete="off" required />
                {suggestions.length > 0 && (
                  <div ref={suggestionsRef} className="position-absolute bg-white border border-secondary rounded w-100 mt-1" style={{ zIndex: 10, maxHeight: '200px', overflowY: 'auto' }}>
                    {suggestions.map((item, i) => (
                      <div key={i} onClick={() => handleSuggestionClick(item)} className="p-2 border-bottom hover-bg-light" style={{ cursor: 'pointer' }}>
                        {item.display_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Language */}
              <div className="mb-3">
                <label htmlFor="language" className="form-label">Language</label>
                <select id="language" name="language" value={formData.language} onChange={handleInputChange} className="form-select bg-light" required>
                  <option value="" disabled>Select Language</option>
                  {languages.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              </div>

              {/* Chart Type */}
              <div className="mb-4">
                <label htmlFor="chartType" className="form-label">Chart Type</label>
                <select id="chartType" name="chartType" value={formData.chartType} onChange={handleInputChange} className="form-select bg-light" required>
                  <option value="" disabled>Select Chart Type</option>
                  {chartTypes.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              {/* Submit */}
              <div className="text-center">
                <button type="submit" className="btn btn-warning w-100 text-white fw-bold /* TODO: convert gradient manually */">
                  Get Horoscope Chart
                </button>
              </div>
            </form>

            {loading && (
              <div className="text-center my-3">
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Fetching your chart, please wait...</p>
              </div>
            )}

            <div className="container mt-4">{renderResult()}</div>

            {/* Features */}
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
              {[{ img: moonStars, title: 'Planetary Analysis', desc: 'Detailed analysis of planets' },
              { img: favorite, title: 'Love & Marriage', desc: 'Insights into romance & compatibility' },
              { img: diamond, title: 'Remedies & Gems', desc: 'Personalized gemstone recommendations' }
              ].map((item, i) => (
                <div key={i} className="col text-center" style={{ cursor: 'pointer' }} onClick={() => window.location.href = baseUrl}>
                  <img src={item.img} alt={item.title} className="img-fluid mb-2" style={{ width: '40px', height: '40px' }} />
                  <h6 className="fw-bold text-dark">{item.title}</h6>
                  <p className="text-muted small">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default HoroscopeCharts;