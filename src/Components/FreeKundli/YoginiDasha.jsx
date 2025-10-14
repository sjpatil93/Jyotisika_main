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

const YoginiDasha = () => {
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
        astro_feature: 'yogini_dasha',
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
        ];

        const missingField = requiredFields.find(({ id }) => {
            let val = formData[id];
            if (id === 'fullname' || id === 'birth_place') {
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
        };
        const apiUrl = `${baseUrl}User_Api_Controller/yogini_dasha`;
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
                    text: 'No Yogini Dasha data was returned. Please try again.',
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
                text: error.message.includes('404') ?
                    'The Yogini Dasha API is not available. Please check the server configuration or contact support.' : 'An error occurred while fetching Yogini Dasha data. Please try again later.',
                confirmButtonColor: '#ff9800',
            });
        }
    };

    const renderResult = () => {
        if (!result) return null;
        if (!result.success) {
            return <div className="alert alert-danger">No data returned from API.</div>;
        }

        const dashaData = result.data?.data?.maha_dasha || [];
        return (
            <div className="card border-primary mb-3">
                <div className="card-header bg-primary text-white">
                    <i className="bi bi-calendar2-week"></i> Yogini Dasha Periods
                </div>
                <div className="card-body table-responsive">
                    <table className="table table-bordered table-hover align-middle text-center">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Dasha</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashaData.map((dasha, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{dasha.dasha || 'N/A'}</td>
                                    <td>{dasha.start_date || 'N/A'}</td>
                                    <td>{dasha.end_date || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="min-vh-100 bg-[#fefaea]"> {/* TODO: adjust background color */}
            <main className="d-flex flex-column flex-lg-row gap-3 p-3">
                <div className="flex-grow-1">
                    <div className="container p-0 pb-4">
                        {/* Back to Home */}
                        <div className="mb-3">
                            <Link
                                to="/"
                                className="d-flex align-items-center gap-2 text-dark text-decoration-none fw-medium"
                                /* TODO: add hover effect similar to Tailwind */
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Back to home
                            </Link>
                        </div>

                        {/* Header Image Section */}
                        <div className="position-relative w-100 mb-4">
                            <img
                                src={freekundli}
                                alt="Free Kundli"
                                className="w-100"
                                style={{ height: '250px', objectFit: 'cover' }} /* TODO: responsive heights */
                            />
                            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(30,30,30,0.41)' }}></div> {/* overlay */}
                            <div className="position-absolute top-0 end-0 p-3" style={{ maxWidth: '60%' }}>
                                <h2 className="text-warning fw-bold">Yogini Dasha Analysis</h2>
                                <p className="text-light small">Discover your cosmic blueprint with our comprehensive Yogini Dasha analysis. Get insights
                                    into life events, planetary periods, and their influences.</p>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mb-4">
                            {[
                                { img: asteric, text: '100% Free' },
                                { img: kidstar, text: 'Accurate Prediction' },
                                { img: shield, text: 'Private & Secure' },
                            ].map((item, index) => (
                                <div key={index} className="d-flex align-items-center gap-2">
                                    <img src={item.img} alt={item.text} width="20" height="20" />
                                    <span className="text-warning fw-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <form id="kundliForm" onSubmit={handleSubmit} className="bg-white rounded  p-4 mb-4 mx-auto" style={{ maxWidth: '900px' }}>
                            <div className="text-center mb-3">
                                <div className="bg-warning rounded-circle d-flex justify-content-center align-items-center mx-auto" style={{ width: '70px', height: '70px' }}>
                                    <img src={planet} alt="Planet" width="40" height="40" />
                                </div>
                                <p className="fw-medium h5 mt-2">Get Your Yogini Dasha Analysis by Date of Birth</p>
                                <p className="text-muted small">Accurate birth information is essential for precise astrological analysis</p>
                            </div>

                            <div className="row g-3">
                                {/* Full Name */}
                                <div className="col-md-6">
                                    <label htmlFor="fullname" className="form-label">Full Name</label>
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
                                <div className="col-md-6">
                                    <label className="form-label">Gender</label>
                                    <div className="d-flex gap-3">
                                        {['male', 'female'].map((gender) => (
                                            <div key={gender} className="form-check form-check-inline">
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
                                                <label htmlFor={`gender-${gender}`} className="form-check-label">
                                                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div className="col-md-6">
                                    <label className="form-label">Date of Birth</label>
                                    <div className="row g-2">
                                        <div className="col">
                                            <select id="birth_day" name="birth_day" value={formData.birth_day} onChange={handleInputChange} className="form-select" required />
                                        </div>
                                        <div className="col">
                                            <select id="birth_month" name="birth_month" value={formData.birth_month} onChange={handleInputChange} className="form-select" required />
                                        </div>
                                        <div className="col">
                                            <select id="birth_year" name="birth_year" value={formData.birth_year} onChange={handleInputChange} className="form-select" required />
                                        </div>
                                    </div>
                                </div>

                                {/* Time of Birth */}
                                <div className="col-md-6">
                                    <label className="form-label">Time of Birth</label>
                                    <div className="row g-2">
                                        <div className="col">
                                            <select id="birth_hour" name="birth_hour" value={formData.birth_hour} onChange={handleInputChange} className="form-select" required />
                                        </div>
                                        <div className="col">
                                            <select id="birth_minute" name="birth_minute" value={formData.birth_minute} onChange={handleInputChange} className="form-select" required />
                                        </div>
                                        <div className="col">
                                            <select id="birth_second" name="birth_second" value={formData.birth_second} onChange={handleInputChange} className="form-select" />
                                        </div>
                                    </div>
                                </div>

                                {/* Place of Birth */}
                                <div className="col-12 position-relative">
                                    <label htmlFor="birth_place" className="form-label">Place of Birth</label>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        id="birth_place"
                                        name="birth_place"
                                        value={formData.birth_place}
                                        onChange={handleBirthPlaceChange}
                                        placeholder="City, State, Country"
                                        className="form-control"
                                        autoComplete="off"
                                        required
                                    />
                                    <input type="hidden" id="birth_lat" name="birth_lat" value={formData.birth_lat} />
                                    <input type="hidden" id="birth_lon" name="birth_lon" value={formData.birth_lon} />
                                    {suggestions.length > 0 && (
                                        <div ref={suggestionsRef} className="position-absolute bg-white border shadow-sm w-100" style={{ maxHeight: '200px', overflowY: 'auto', zIndex: 1000 }}>
                                            {suggestions.map((item, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => handleSuggestionClick(item)}
                                                    className="p-2 border-bottom mb-0 cursor-pointer"
                                                >
                                                    {item.display_name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Language */}
                                <div className="col-12">
                                    <label htmlFor="language" className="form-label">Language</label>
                                    <select id="language" name="language" value={formData.language} onChange={handleInputChange} className="form-select" required>
                                        <option value="" disabled>Select Language</option>
                                        {languages.map((lang) => (
                                            <option key={lang.value} value={lang.value}>
                                                {lang.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Astrological Feature */}
                                <input type="hidden" id="astro_feature" name="astro_feature" value="yogini_dasha" />

                                {/* Submit */}
                                <div className="col-12">
                                    <button type="submit" className="btn btn-warning w-100 fw-bold">
                                        Get Yogini Dasha Analysis
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* Loader */}
                        {loading && (
                            <div className="text-center my-3 container">
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-2">Fetching your data, please wait...</p>
                            </div>
                        )}

                        <div id="kundliResult" className="container mt-4">{renderResult()}</div>

                        {/* Features Grid */}
                        <div className="row row-cols-1 row-cols-md-3 g-3 my-4">
                            {[
                                {
                                    img: moonStars,
                                    title: 'Planetary Analysis',
                                    desc: 'Detailed analysis of all 9 planets and their influences on your life',
                                    link: `${baseUrl}FreeKundli_Controller/PlanetaryPosition`,
                                },
                                {
                                    img: favorite,
                                    title: 'Love & Marriage',
                                    desc: 'Insights into your romantic life and marriage compatibility',
                                    link: `${baseUrl}User/KundliMatching`,
                                },
                                {
                                    img: diamond,
                                    title: 'Remedies & Gems',
                                    desc: 'Personalized remedies and gemstone recommendations',
                                    link: `${baseUrl}FreeKundli_Controller/GemstoneRecommendation`,
                                },
                            ].map((item, index) => (
                                <div key={index} className="col">
                                    <div className="h-100 text-center p-3 cursor-pointer" onClick={() => window.location.href = item.link}>
                                        <img src={item.img} alt={item.title} className="mx-auto" width="40" height="40" />
                                        <h5 className="mt-2">{item.title}</h5>
                                        <p className="text-muted small">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default YoginiDasha;
