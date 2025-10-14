/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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

const PlanetaryPositions = () => {
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
        astro_feature: 'planetary_positions',
    });
    const [suggestions, setSuggestions] = useState([]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [birthPlaceQuery, setBirthPlaceQuery] = useState('');

    const baseUrl = 'https://jyotisika.in/jyotisika_test/';

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
            const months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
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
        populateSelect('boy_year', 1900, new Date().getFullYear());
        populateSelect('boy_hour', 0, 23, true);
        populateSelect('boy_minute', 0, 59, true);
        populateSelect('boy_second', 0, 59, true);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBirthPlaceChange = (e) => {
        setBirthPlaceQuery(e.target.value);
        setFormData((prev) => ({ ...prev, boy_birthPlace: e.target.value }));
    };

    useEffect(() => {
        if (birthPlaceQuery.length < 2) {
            setSuggestions([]);
            return;
        }
        const handler = setTimeout(async () => {
            try {
                const res = await fetch(`${baseUrl}User_Api_Controller/search_city?q=${encodeURIComponent(birthPlaceQuery)}`);
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
            boy_birthPlace: item.display_name,
            boy_lat: item.lat || item.latitude || '28.7041',
            boy_lon: item.lon || item.longitude || '77.1025',
        }));
        setSuggestions([]);
    };

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
        const missingField = requiredFields.find(({ id }) => !formData[id]);
        if (missingField) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Information',
                text: `Please fill out the ${missingField.label} field.`,
                confirmButtonColor: '#28a745',
            });
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${baseUrl}User_Api_Controller/planetary_positions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, lan: formData.language || 'en' }),
            });
            const data = await res.json();
            setResult(data);
            setLoading(false);
        } catch (error) {
            console.error('Error loading data:', error);
            setResult({ success: false, error: 'Data not loaded due to server problem' });
            setLoading(false);
        }
    };

    const renderResult = () => {
        if (!result) return null;
        if (!result.success) {
            return <div className="alert alert-danger">Check your network</div>;
        }
        const { astro_feature } = formData;
        if (astro_feature === 'planetary_positions') {
            const planets = result.data.data.planets;
            return (
                <div className="table-responsive mt-3">
                    <div className="alert alert-success">Planetary Positions Loaded</div>
                    <table className="table table-bordered table-hover text-center align-middle">
                        <thead className="table-primary">
                            <tr>
                                <th>Planet</th>
                                <th>Sign</th>
                                <th>Degree</th>
                                <th>Nakshatra</th>
                                <th>House</th>
                                <th>Speed</th>
                                <th>Retrograde</th>
                                <th>Combusted</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planets.map((planet, index) => (
                                <tr key={index}>
                                    <td><strong>{planet.name || 'N/A'}</strong></td>
                                    <td>{planet.sign || 'N/A'}</td>
                                    <td>{planet.full_degree || 'N/A'}</td>
                                    <td>{planet.nakshatra || 'N/A'} ({planet.nakshatra_pada || '-'})</td>
                                    <td>{planet.house || 'N/A'}</td>
                                    <td>{planet.speed || 'N/A'}</td>
                                    <td>{planet.is_retro === 'true' ? 'Yes' : 'No'}</td>
                                    <td>{planet.is_combusted === 'true' ? 'Yes' : 'No'}</td>
                                    <td><img src={planet.image} alt={planet.name} className="w-10 h-10 mx-auto" /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
        return <div className="alert alert-success">{astro_feature.replace(/_/g, ' ')} Data Loaded</div>;
    };

    return (
        <div className="min-h-screen bg-[#fefaea] font-poppins py-5">
            <div className="container">
                {/* Back to Home */}
                <div className="mb-4">
                    <Link to="/" className="text-decoration-none text-dark d-flex align-items-center gap-2">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Home
                    </Link>
                </div>

                {/* Header Image */}
                <div className="position-relative mb-5 rounded-lg overflow-hidden shadow-md" style={{ height: '300px' }}>
                    <img src={freekundli} alt="Free Kundli" className="w-100 h-100 object-fit-cover" />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"></div>
                    <div className="position-absolute top-50 start-50 translate-middle text-white text-center px-3">
                        <h1 className="display-5 text-warning mb-2">Planetary Positions</h1>
                        <p className="lead text-light">Decode how planetary alignments define your strengths and challenges. Get insights into your personality, career, relationships, and life path.</p>
                    </div>
                </div>

                {/* Features */}
                <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                    {[{ img: asteric, text: '100% Free' }, { img: kidstar, text: 'Accurate Prediction' }, { img: shield, text: 'Private & Secure' }].map((item, idx) => (
                        <div key={idx} className="d-flex align-items-center gap-2">
                            <img src={item.img} alt={item.text} className="w-4 h-4" />
                            <span className="text-warning fw-medium">{item.text}</span>
                        </div>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white p-4 p-md-5 rounded-3 shadow-sm">
                    <div className="row g-3">
                        {/* Full Name */}
                        <div className="col-md-6">
                            <label htmlFor="fullname" className="form-label">Full Name</label>
                            <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleInputChange} className="form-control" placeholder="Enter your full name" required />
                        </div>

                        {/* Gender */}
                        <div className="col-md-6">
                            <label className="form-label">Gender</label>
                            <div className="d-flex gap-3">
                                {['male', 'female'].map((gender) => (
                                    <div key={gender} className="form-check">
                                        <input type="radio" id={`gender-${gender}`} name="gender" value={gender} checked={formData.gender === gender} onChange={handleInputChange} className="form-check-input" required />
                                        <label htmlFor={`gender-${gender}`} className="form-check-label">{gender.charAt(0).toUpperCase() + gender.slice(1)}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DOB */}
                        <div className="col-md-4">
                            <label className="form-label">Day</label>
                            <select id="boy_day" name="boy_day" value={formData.boy_day} onChange={handleInputChange} className="form-select" required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Month</label>
                            <select id="boy_month" name="boy_month" value={formData.boy_month} onChange={handleInputChange} className="form-select" required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Year</label>
                            <select id="boy_year" name="boy_year" value={formData.boy_year} onChange={handleInputChange} className="form-select" required />
                        </div>

                        {/* Time */}
                        <div className="col-md-4">
                            <label className="form-label">Hour</label>
                            <input type="number" id="boy_hour" name="boy_hour" value={formData.boy_hour} onChange={handleInputChange} min="0" max="23" className="form-control" required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Minute</label>
                            <input type="number" id="boy_minute" name="boy_minute" value={formData.boy_minute} onChange={handleInputChange} min="0" max="59" className="form-control" required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Second</label>
                            <input type="number" id="boy_second" name="boy_second" value={formData.boy_second} onChange={handleInputChange} min="0" max="59" className="form-control" />
                        </div>

                        {/* Birth Place */}
                        <div className="col-12 position-relative">
                            <label htmlFor="boy_birthPlace" className="form-label">Place of Birth</label>
                            <input type="text" id="boy_birthPlace" name="boy_birthPlace" value={formData.boy_birthPlace} onChange={handleBirthPlaceChange} className="form-control" placeholder="City, State, Country" required />
                            {suggestions.length > 0 && (
                                <div className="list-group position-absolute w-100 z-index-10">
                                    {suggestions.map((item, idx) => (
                                        <button key={idx} type="button" className="list-group-item list-group-item-action" onClick={() => handleSuggestionClick(item)}>
                                            {item.display_name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Language */}
                        <div className="col-12">
                            <label htmlFor="language" className="form-label">Language</label>
                            <select id="language" name="language" value={formData.language} onChange={handleInputChange} className="form-select" required>
                                <option value="">Select Language</option>
                                {['hindi', 'english', 'marathi', 'gujarati', 'tamil'].map((lang) => (
                                    <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>
                                ))}
                            </select>
                        </div>

                        {/* Submit */}
                        <div className="col-12 d-grid mt-3">
                            <button type="submit" className="btn btn-warning btn-lg">Get Planetary Positions</button>
                            {loading && <div className="mt-3 text-center">Loading...</div>}
                        </div>

                        {/* Result */}
                        <div className="col-12 mt-4">{renderResult()}</div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlanetaryPositions;
