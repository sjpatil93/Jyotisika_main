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

const ManglikDosha = () => {
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
    astro_feature: 'manglik_dosha',
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

  // Dropdown population
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

  // Click outside suggestion box
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && suggestionsRef.current &&
        !inputRef.current.contains(e.target) &&
        !suggestionsRef.current.contains(e.target)) {
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

  // City search (debounced)
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
        console.error(err);
        setSuggestions([{ display_name: 'Error fetching results' }]);
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

  // Submit form
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

    const payload = {
      boy_name: formData.fullname,
      boy_gender: formData.gender,
      boy_day: formData.birth_day,
      boy_month: formData.birth_month,
      boy_year: formData.birth_year,
      boy_hour: formData.birth_hour,
      boy_minute: formData.birth_minute,
      boy_second: formData.birth_second || '00',
      boy_birthPlace: formData.birth_place,
      boy_lat: formData.birth_lat || '28.7041',
      boy_lon: formData.birth_lon || '77.1025',
      lan: formData.language || 'en',
    };

    try {
      const res = await axios.post(`${baseUrl}User_Api_Controller/getManglikDosha`, payload);
      const data = res.data;
      setResult(data);
      setLoading(false);
      if (!data.success) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to load Manglik Dosha analysis.',
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
        text: 'Unable to fetch data, please try again later.',
        confirmButtonColor: '#ff9800',
      });
    }
  };

  // Render Result
  const renderResult = () => {
    if (!result) return null;
    if (!result.success)
      return <div className="alert alert-danger">No data returned: {result.message || 'Unknown error'}</div>;
    const data = result.data;
    return (
      <>
        <div className="alert alert-success">Manglik Dosha Analysis Loaded</div>
        <div className="card p-3 mt-3 shadow-sm">
          <h5>Manglik Dosha Status</h5>
          <p><strong>Status:</strong> {data.manglik_status || 'N/A'}</p>
          <p><strong>House:</strong> {data.house || 'N/A'}</p>
          <p><strong>Intensity:</strong> {data.intensity || 'N/A'}</p>
          <p><strong>Cancellation:</strong> {data.cancellation || 'N/A'}</p>
          <h6 className="mt-3">Recommended Remedies</h6>
          <ul>{(data.remedies || []).map((r, i) => <li key={i}>{r}</li>)}</ul>
        </div>
      </>
    );
  };

  return (
    <div className="min-vh-100 bg-[#fefaea]">
      <main className="container py-4">
        {/* Back to Home */}
        <div className="mb-4">
          <Link to="/" className="d-inline-flex align-items-center text-dark text-decoration-none">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="ms-2 fw-semibold">Back to home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="position-relative rounded shadow overflow-hidden mb-4">
          <img src={freekundli} alt="Manglik Dosha" className="w-100" style={{ height: '280px', objectFit: 'cover' }} />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
          <div className="position-absolute top-50 start-50 translate-middle text-center text-white px-3">
            <h2 className="text-warning fw-bold">Manglik Dosha Analysis</h2>
            <p className="small">Discover if Manglik Dosha affects your life and relationships.</p>
          </div>
        </div>

        {/* Features */}
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-4 mb-5">
          {[{ img: asteric, text: '100% Free' }, { img: kidstar, text: 'Accurate Prediction' }, { img: shield, text: 'Private & Secure' }].map((f, i) => (
            <div key={i} className="d-flex align-items-center gap-2">
              <img src={f.img} alt={f.text} width="24" height="24" />
              <span className="text-warning fw-medium">{f.text}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded p-4 mx-auto mb-5" style={{ maxWidth: '700px' }}>
          <div className="text-center mb-4">
            <div className="d-inline-flex justify-content-center align-items-center bg-warning rounded-circle mb-3" style={{ width: '70px', height: '70px' }}>
              <img src={planet} alt="Planet" width="40" height="40" />
            </div>
            <h5>Get Your Manglik Dosha Analysis</h5>
            <p className="text-muted small">Provide your accurate birth details for precise results.</p>
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="fullname" value={formData.fullname} onChange={handleNameChange} className="form-control bg-light" required />
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div className="d-flex gap-4">
              {['male', 'female'].map((g) => (
                <div className="form-check" key={g}>
                  <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleInputChange} className="form-check-input" required />
                  <label className="form-check-label text-capitalize">{g}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="row g-2 mb-3">
            <label className="form-label">Date of Birth</label>
            <div className="col"><select id="birth_day" name="birth_day" className="form-select bg-light" onChange={handleInputChange} required /></div>
            <div className="col"><select id="birth_month" name="birth_month" className="form-select bg-light" onChange={handleInputChange} required /></div>
            <div className="col"><select id="birth_year" name="birth_year" className="form-select bg-light" onChange={handleInputChange} required /></div>
          </div>

          {/* Time of Birth */}
          <div className="row g-2 mb-3">
            <label className="form-label">Time of Birth</label>
            <div className="col"><select id="birth_hour" name="birth_hour" className="form-select bg-light" onChange={handleInputChange} required /></div>
            <div className="col"><select id="birth_minute" name="birth_minute" className="form-select bg-light" onChange={handleInputChange} required /></div>
            <div className="col"><select id="birth_second" name="birth_second" className="form-select bg-light" onChange={handleInputChange} /></div>
          </div>

          {/* Place of Birth */}
          <div className="mb-3 position-relative">
            <label className="form-label">Place of Birth</label>
            <input ref={inputRef} type="text" name="birth_place" value={formData.birth_place} onChange={handleBirthPlaceChange} className="form-control bg-light" placeholder="City, State, Country" required />
            {suggestions.length > 0 && (
              <div ref={suggestionsRef} className="position-absolute bg-white border rounded shadow w-100 mt-1" style={{ zIndex: 10, maxHeight: '200px', overflowY: 'auto' }}>
                {suggestions.map((item, i) => (
                  <div key={i} onClick={() => handleSuggestionClick(item)} className="p-2 border-bottom hover-bg-light" style={{ cursor: 'pointer' }}>
                    {item.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Language */}
          <div className="mb-4">
            <label className="form-label">Language</label>
            <select name="language" className="form-select bg-light" onChange={handleInputChange} required>
              <option value="" disabled>Select Language</option>
              {languages.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
            </select>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-warning w-100 text-white fw-bold /* TODO: gradient manually */">
            Check Manglik Dosha
          </button>
        </form>

        {loading && (
          <div className="text-center my-3">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Fetching your analysis, please wait...</p>
          </div>
        )}

        <div className="mt-4">{renderResult()}</div>

        {/* Bottom Features */}
        <div className="row row-cols-1 row-cols-md-3 g-4 py-4">
          {[{ img: moonStars, title: 'Planetary Analysis', desc: 'Detailed analysis of all 9 planets.' },
            { img: favorite, title: 'Love & Marriage', desc: 'Insights into your romantic life.' },
            { img: diamond, title: 'Remedies & Gems', desc: 'Personalized gemstone recommendations.' }
          ].map((item, i) => (
            <div key={i} className="col text-center" style={{ cursor: 'pointer' }} onClick={() => window.location.href = baseUrl}>
              <img src={item.img} alt={item.title} width="40" height="40" className="mb-2" />
              <h6 className="fw-bold">{item.title}</h6>
              <p className="text-muted small">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ManglikDosha;