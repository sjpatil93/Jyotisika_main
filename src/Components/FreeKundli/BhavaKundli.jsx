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

const BhavaKundli = () => {
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
        chart_id: '',
        astro_feature: 'bhava_kundli',
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
        { value: 'ma', label: 'Marathi' },
        { value: 'gu', label: 'Gujarati' },
        { value: 'ta', label: 'Tamil' },
        { value: 'bn', label: 'Bengali' },
        { value: 'tl', label: 'Telugu' },
        { value: 'ml', label: 'Malayalam' },
        { value: 'kn', label: 'Kannada' },
    ];

    const chartOptions = [
        { value: '1', label: 'Bhava Kundli 1' },
        { value: '2', label: 'Bhava Kundli 2' },
        { value: '3', label: 'Bhava Kundli 3' },
        { value: '4', label: 'Bhava Kundli 4' },
        { value: '5', label: 'Bhava Kundli 5' },
        { value: '6', label: 'Bhava Kundli 6' },
        { value: '7', label: 'Bhava Kundli 7' },
        { value: '8', label: 'Bhava Kundli 8' },
        { value: '9', label: 'Bhava Kundli 9' },
        { value: '10', label: 'Bhava Kundli 10' },
        { value: '11', label: 'Bhava Kundli 11' },
        { value: '12', label: 'Bhava Kundli 12' },
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

    // Click outside to hide suggestions
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
        setFormData((prev) => ({ ...prev, birth_place: e.target.value }));
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

    // Handle suggestion click
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

    // Handle form submission
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
            { id: 'chart_id', label: 'Bhava Kundli Chart' },
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
            chartid: formData.chart_id || "1",
        };
        const apiUrl = `${baseUrl}User_Api_Controller/bhava_kundli_data`;
        try {
            const res = await axios.post(apiUrl, submitData);
            const data = res.data;
            setResult(data);
            setLoading(false);
            if (data.success) {
                // Success handled in render
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Failed to load Bhava Kundli analysis.',
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
                text: error.response?.status === 404 ?
                    'The Bhava Kundli API is not available. Please check the server configuration or contact support.' : 'An error occurred while fetching Bhava Kundli data. Please try again later.',
                confirmButtonColor: '#ff9800',
            });
        }
    };

    // Render result based on API response
    const renderResult = () => {
        if (!result) return null;
        if (!result.success) {
            return <div className="alert alert-danger">No data returned from API: {result.message || 'Unknown error'}</div>;
        }

        if (!result.data || !result.data.data || !result.data.data.base64_image) {
            return <div className="alert alert-danger">Invalid data structure from API.</div>;
        }

        const kundli = result.data.data;
        return (
            <>
                <div className="alert alert-success">Bhava Kundli Data Loaded</div>
                <h5 className="text-center mt-4">🔹 Bhava Kundli Information</h5>
                <p className="text-muted text-center mb-3 px-3">
                    The Bhava Kundli (House Chart) provides an in-depth view of planetary placements in each house
                    based on the individual's exact birth time and location. It helps understand areas such as career,
                    relationships, health, and wealth through house-wise analysis.
                </p>
                <div className="text-center my-3">
                    <img src={kundli.base64_image} alt="Bhava Kundli Chart" className="result-image img-fluid rounded shadow" />
                </div>
            </>
        );
    };

    return (
        <div className="min-h-screen bg-[#fefaea] font-poppins">
            <main className="flex flex-col lg:flex-row gap-5 md:p-7">
                {/* Main Content */}
                <div className="free-kundli flex-1">
                    <div className="div max-w-7xl mx-auto p-0 pb-16">
                        {/* Back to Home */}
                        <div className="back-to-home mb-8">
                            <Link
                                to="/"
                                className="flex items-center gap-2 text-black font-medium text-sm md:text-base hover:text-[#ee7f00] transition-colors text-decoration-none"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Back to home
                            </Link>
                        </div>

                        {/* Header Image Section */}
                        <div className="overlap-group-wrapper relative w-full h-[200px] sm:h-[250px] md:h-[300px] bg-white overflow-hidden mb-12 rounded-lg shadow-md">
                            <div className="overlap-group relative w-full h-full">
                                <img
                                    src={freekundli}
                                    alt="Free Kundli"
                                    className="chatgpt-image-jul absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="rectangle absolute inset-0 bg-[#1e1e1e69]"></div>
                                <div className="text-overlay absolute top-[10%] right-[5%] w-[70%] sm:w-[50%] md:w-[60%] sm:pt-10 sm:pl-50 text-right">
                                    <div className="text-wrapper-3 font-[Samarkan] text-[#ee7f00] text-2xl sm:text-3xl md:text-4xl mb-2 text-left">
                                        Free Bhava Kundli
                                    </div>
                                    <p className="p font-poppins text-[#fdf0bd] text-sm sm:text-base leading-5 text-left max-w-[483px]">
                                        Generate your Bhava Kundli to gain insights into various life aspects like career, relationships, and health based on house-wise planetary placements.                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="frame-5 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 mb-12">
                            {[
                                { img: asteric, text: '100% Free', className: 'frame6img1' },
                                { img: kidstar, text: 'Accurate Prediction', className: 'frame6img2' },
                                { img: shield, text: 'Private & Secure', className: 'frame6img3' },
                            ].map((item, index) => (
                                <div key={index} className="frame-6 flex items-center gap-2">
                                    <img
                                        src={item.img}
                                        alt={item.text}
                                        className={`${item.className} w-4 h-4 sm:w-5 sm:h-5`}
                                    />
                                    <span className="text-wrapper-4 text-[#ee7f00] font-medium text-sm sm:text-base">
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <form id="kundliForm" onSubmit={handleSubmit} className="kundli-form font-poppins bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12 max-w-4xl mx-auto">
                            <div className="frame-wrapper">
                                <div className="frame-7 flex flex-col items-center gap-4">
                                    <div className="frame-8 flex flex-col items-center gap-2 max-w-[669px]">
                                        <div className="frame-9 flex flex-col items-center gap-3 max-w-[501px]">
                                            <div className="planetbox w-[71px] h-[71px] bg-[#FFE09B] rounded-full flex items-center justify-center">
                                                <img src={planet} alt="Planet" className="planet w-10 h-10 object-cover" />
                                            </div>
                                            <p className="text-wrapper-5 text-[#1e1e1e] font-medium text-xl sm:text-2xl text-center">
                                                Get Your Free Bhava Kundli by Date of Birth
                                            </p>
                                        </div>
                                        <p className="text-wrapper-6 text-[#626262] text-sm sm:text-base text-center max-w-[501px]">
                                            Accurate birth information is essential for precise Bhava Kundli analysis
                                        </p>
                                    </div>

                                    <div className="form-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Full Name */}
                                        <div className="form-row flex flex-col gap-2">
                                            <label htmlFor="fullname" className="form-label text-[#1e1e1e] text-sm sm:text-base">Full Name</label>
                                            <input
                                                type="text"
                                                id="fullname"
                                                name="fullname"
                                                value={formData.fullname}
                                                onChange={handleNameChange}
                                                placeholder="Enter your full name"
                                                className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                required
                                            />
                                        </div>

                                        {/* Gender */}
                                        <div className="form-row flex flex-col gap-2">
                                            <label className="form-label text-[#1e1e1e] text-sm sm:text-base">Gender</label>
                                            <div className="gender-options flex flex-col sm:flex-row gap-4">
                                                {['male', 'female'].map((gender) => (
                                                    <div key={gender} className="radio-group flex items-center gap-2">
                                                        <input
                                                            type="radio"
                                                            id={`gender-${gender}`}
                                                            name="gender"
                                                            value={gender}
                                                            checked={formData.gender === gender}
                                                            onChange={handleInputChange}
                                                            className="w-5 h-5 border-2 border-[#ccc] rounded-full bg-[#EAEAEA] focus:ring-[#ff9800] checked:bg-[#ff9800] checked:border-[#ff9800] appearance-none cursor-pointer relative checked:after:content-[''] checked:after:block checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-white checked:after:rounded-full checked:after:m-1"
                                                            required
                                                        />
                                                        <label htmlFor={`gender-${gender}`} className="text-[#1e1e1e] text-sm sm:text-base cursor-pointer">
                                                            {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Date of Birth */}
                                        <div className="form-row flex flex-col gap-2">
                                            <label className="form-label text-[#1e1e1e] text-sm sm:text-base">Date of Birth</label>
                                            <div className="dob-row grid grid-cols-3 gap-2">
                                                <select
                                                    id="birth_day"
                                                    name="birth_day"
                                                    value={formData.birth_day}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                    required
                                                />
                                                <select
                                                    id="birth_month"
                                                    name="birth_month"
                                                    value={formData.birth_month}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                    required
                                                />
                                                <select
                                                    id="birth_year"
                                                    name="birth_year"
                                                    value={formData.birth_year}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Time of Birth */}
                                        <div className="form-row flex flex-col gap-2">
                                            <label className="form-label text-[#1e1e1e] text-sm sm:text-base">Time of Birth</label>
                                            <div className="dob-row grid grid-cols-3 gap-2">
                                                <select
                                                    id="birth_hour"
                                                    name="birth_hour"
                                                    value={formData.birth_hour}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                    required
                                                />
                                                <select
                                                    id="birth_minute"
                                                    name="birth_minute"
                                                    value={formData.birth_minute}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                    required
                                                />
                                                <select
                                                    id="birth_second"
                                                    name="birth_second"
                                                    value={formData.birth_second}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                />
                                            </div>
                                        </div>

                                        {/* Place of Birth */}
                                        <div className="form-row full-width flex flex-col gap-2 md:col-span-2 relative">
                                            <label htmlFor="birth_place" className="form-label text-[#1e1e1e] text-sm sm:text-base">Place of Birth</label>
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                id="birth_place"
                                                name="birth_place"
                                                value={formData.birth_place}
                                                onChange={handleBirthPlaceChange}
                                                placeholder="City, State, Country"
                                                className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                autocomplete="off"
                                                required
                                            />
                                            <input type="hidden" id="birth_lat" name="birth_lat" value={formData.birth_lat} />
                                            <input type="hidden" id="birth_lon" name="birth_lon" value={formData.birth_lon} />
                                            {suggestions.length > 0 && (
                                                <div ref={suggestionsRef} className="suggestions absolute z-10 bg-white border border-[#ddd] rounded shadow-sm max-w-[500px] top-full mt-1 max-h-[200px] overflow-y-auto">
                                                    {suggestions.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            onClick={() => handleSuggestionClick(item)}
                                                            className="suggestion p-2 hover:bg-[#f1f1f1] cursor-pointer border-b border-[#ddd] last:border-b-0"
                                                        >
                                                            {item.display_name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Language */}
                                        <div className="form-row full-width flex flex-col gap-2 md:col-span-2">
                                            <label htmlFor="language" className="form-label text-[#1e1e1e] text-sm sm:text-base">Language</label>
                                            <select
                                                id="language"
                                                name="language"
                                                value={formData.language}
                                                onChange={handleInputChange}
                                                className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                required
                                            >
                                                <option value="" disabled selected>Select Language</option>
                                                {languages.map((lang) => (
                                                    <option key={lang.value} value={lang.value}>
                                                        {lang.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Chart Selection */}
                                        <div className="form-row full-width flex flex-col gap-2 md:col-span-2">
                                            <label htmlFor="chart_id" className="form-label text-[#1e1e1e] text-sm sm:text-base">Select Bhava Kundli Chart</label>
                                            <select
                                                id="chart_id"
                                                name="chart_id"
                                                value={formData.chart_id}
                                                onChange={handleInputChange}
                                                className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                required
                                            >
                                                <option value="" disabled selected>Select Chart Type</option>
                                                {chartOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Astrological Feature (Hidden) */}
                                        <input
                                            type="hidden"
                                            id="astro_feature"
                                            name="astro_feature"
                                            value="bhava_kundli"
                                        />

                                        {/* Submit */}
                                        <div className="form-row full-width flex flex-col gap-5 md:col-span-2 rounded-lg pt-4 rounded-b-lg">
                                            <button
                                                type="submit"
                                                className="submit-btn w-full py-3 text-white font-bold rounded-lg bg-gradient-to-r from-[#ff9800] to-[#ff5722] hover:from-[#ff5722] hover:to-[#e64a19] transition-all"
                                            >
                                                Get Bhava Kundli
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
                                <p className="mt-2">Fetching your analysis, please wait...</p>
                            </div>
                        )}
                        <div id="kundliResult" className="container mt-4">{renderResult()}</div>

                        {/* Features Grid */}
                        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 pb-16 pt-4">
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
                                    className={`${item.className} flex flex-col items-center gap-4 cursor-pointer`}
                                    onClick={() => window.location.href = item.link}
                                >
                                    <img src={item.img} alt={item.title} className="img-2 w-10 h-10" />
                                    <p className="div-2 text-center text-[#1e1e1e]">
                                        <span className="span block font-medium">{item.title}</span>
                                        <span className="text-wrapper-11 block text-[#757575] text-sm">{item.desc}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BhavaKundli;