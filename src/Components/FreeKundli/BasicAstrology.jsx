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

const BasicAstrology = () => {
    const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
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
        astro_feature: 'basicastrology',
    });
    const [suggestions, setSuggestions] = useState([]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [birthPlaceQuery, setBirthPlaceQuery] = useState('');

    // Base URL (replace with your actual API base URL)
    const baseUrl = 'https://jyotisika.in/jyotisika_test/';

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
        populateSelect('boy_year', 1900, new Date().getFullYear());
        populateSelect('boy_hour', 0, 23, true);
        populateSelect('boy_minute', 0, 59, true);
        populateSelect('boy_second', 0, 59, true);
    }, []);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle birth place input change
    // const handleBirthPlaceChange = (e) => {
    //     setBirthPlaceQuery(e.target.value);
    //     setFormData((prev) => ({ ...prev, boy_birthPlace: e.target.value }));
    // };

    // Debounced API call for city suggestions
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

    // Handle suggestion click
    // (Duplicate removed)

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
            { id: 'astro_feature', input: 'Astrological Feature' },
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
        const apiUrl = `${baseUrl}User_Api_Controller/${formData.astro_feature}`;
        try {
            const res = await fetch(apiUrl, {
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

    // Render result based on API response
    const renderResult = () => {
        if (!result) return null;
        if (!result.success) {
            return <div className="alert alert-danger">Check your network</div>;
        }

        const { astro_feature } = formData;
        const { data } = result;

        switch (astro_feature) {
            case 'basicastrology':
                {
                    const astro = data.data;
                    return (
                        <div className="table-responsive">
                            <div className="alert alert-success mb-3 ">Basic Astrology Data Loaded</div>
                            <table className="table table-bordered table-striped align-middle">
                                <tbody>
                                    <tr className="table-primary fw-bold text-center">
                                        <td colSpan="2">Birth Details</td>
                                    </tr>
                                    <tr><th scope="row">Full Name</th><td>{astro.full_name || 'N/A'}</td></tr>
                                    <tr><th scope="row">Gender</th><td>{astro.gender || 'N/A'}</td></tr>
                                    <tr><th scope="row">Date of Birth</th><td>{astro.day}-{astro.month}-{astro.year}</td></tr>
                                    <tr><th scope="row">Time of Birth</th><td>{astro.hour}:{astro.minute}</td></tr>
                                    <tr><th scope="row">Place</th><td>{astro.place || 'N/A'}</td></tr>
                                    <tr><th scope="row">Latitude / Longitude</th><td>{astro.latitude}, {astro.longitude}</td></tr>
                                    <tr className="table-primary fw-bold text-center">
                                        <td colSpan="2">Zodiac & Nakshatra</td>
                                    </tr>
                                    <tr><th scope="row">Sun Sign</th><td>{astro.sunsign || 'N/A'}</td></tr>
                                    <tr><th scope="row">Moon Sign</th><td>{astro.moonsign || 'N/A'}</td></tr>
                                    <tr><th scope="row">Nakshatra</th><td>{astro.nakshatra || 'N/A'}</td></tr>
                                    <tr><th scope="row">Rashi Akshar</th><td>{astro.rashi_akshar || 'N/A'}</td></tr>
                                    <tr className="table-primary fw-bold text-center">
                                        <td colSpan="2">Panchang Elements</td>
                                    </tr>
                                    <tr><th scope="row">Tithi</th><td>{astro.tithi || 'N/A'}</td></tr>
                                    <tr><th scope="row">Paksha</th><td>{astro.paksha || 'N/A'}</td></tr>
                                    <tr><th scope="row">Vaar (Week Day)</th><td>{astro.vaar || 'N/A'}</td></tr>
                                    <tr><th scope="row">Karana</th><td>{astro.karana || 'N/A'}</td></tr>
                                    <tr><th scope="row">Yoga</th><td>{astro.yoga || 'N/A'}</td></tr>
                                    <tr><th scope="row">Chandramasa</th><td>{astro.chandramasa || 'N/A'}</td></tr>
                                    <tr><th scope="row">Ayanamsha</th><td>{astro.ayanamsha || 'N/A'}</td></tr>
                                    <tr className="table-primary fw-bold text-center">
                                        <td colSpan="2">Personality & Classification</td>
                                    </tr>
                                    <tr><th scope="row">Gana</th><td>{astro.gana || 'N/A'}</td></tr>
                                    <tr><th scope="row">Nadi</th><td>{astro.nadi || 'N/A'}</td></tr>
                                    <tr><th scope="row">Varna</th><td>{astro.varna || 'N/A'}</td></tr>
                                    <tr><th scope="row">Vashya</th><td>{astro.vashya || 'N/A'}</td></tr>
                                    <tr><th scope="row">Yoni</th><td>{astro.yoni || 'N/A'}</td></tr>
                                    <tr><th scope="row">Yunja</th><td>{astro.yunja || 'N/A'}</td></tr>
                                    <tr><th scope="row">Tatva</th><td>{astro.tatva || 'N/A'}</td></tr>
                                    <tr className="table-primary fw-bold text-center">
                                        <td colSpan="2">Miscellaneous</td>
                                    </tr>
                                    <tr><th scope="row">Paya</th><td>Type – {astro.paya?.type ?? 'N/A'}, Result – {astro.paya?.result ?? 'N/A'}</td></tr>
                                    <tr><th scope="row">Prahar</th><td>{astro.prahar || 'N/A'}</td></tr>
                                    <tr><th scope="row">Sunrise</th><td>{astro.sunrise || 'N/A'}</td></tr>
                                    <tr><th scope="row">Sunset</th><td>{astro.sunset || 'N/A'}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    );
                }
            default:
                return (
                    <div className="alert alert-success">{astro_feature.replace(/_/g, ' ')} Data Loaded</div>
                );
        }
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

    return (
        <div className="min-h-screen bg-[#fefaea] font-poppins">
            <main className="flex flex-col lg:flex-row gap-5 p-4 md:p-7">
                {/* Main Content */}
                <div className="free-kundli flex-1">
                    <div className="div max-w-7xl mx-auto p-0 md:p-4 pb-16">
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
                                <div className="text-overlay absolute top-[10%] sm:top-[8%] right-[2%] sm:right-[3%] w-[70%] sm:w-[60%] sm:p-10 sm:pl-50  ">
                                    <div className="text-wrapper-3 font-samarkan text-orange-500 text-2xl sm:text-3xl md:text-5xl mb-2 text-left">
                                        Basic Astrology
                                    </div>
                                    <p className="p font-poppins text-[#fdf0bd] text-sm sm:text-base leading-tight text-left max-w-[483px]">
                                        Discover your cosmic blueprint with our comprehensive Vedic astrology analysis. Get insights
                                        into your personality, career, relationships, and life path.
                                    </p>
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
                                                Get Your Basic Astrology by Date of Birth
                                            </p>
                                        </div>
                                        <p className="text-wrapper-6 text-[#626262] text-sm sm:text-base text-center max-w-[501px]">
                                            Accurate birth information is essential for precise astrological analysis
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
                                                onChange={handleInputChange}
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
                                                    id="boy_day"
                                                    name="boy_day"
                                                    value={formData.boy_day}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                    required
                                                />
                                                <select
                                                    id="boy_month"
                                                    name="boy_month"
                                                    value={formData.boy_month}
                                                    onChange={handleInputChange}
                                                    className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                    required
                                                />
                                                <select
                                                    id="boy_year"
                                                    name="boy_year"
                                                    value={formData.boy_year}
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
                                                <input
                                                    type="number"
                                                    id="boy_hour"
                                                    name="boy_hour"
                                                    value={formData.boy_hour}
                                                    onChange={handleInputChange}
                                                    placeholder="HH"
                                                    min="0"
                                                    max="23"
                                                    className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                    required
                                                />
                                                <input
                                                    type="number"
                                                    id="boy_minute"
                                                    name="boy_minute"
                                                    value={formData.boy_minute}
                                                    onChange={handleInputChange}
                                                    placeholder="MM"
                                                    min="0"
                                                    max="59"
                                                    className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                    required
                                                />
                                                <input
                                                    type="number"
                                                    id="boy_second"
                                                    name="boy_second"
                                                    value={formData.boy_second}
                                                    onChange={handleInputChange}
                                                    placeholder="SS"
                                                    min="0"
                                                    max="59"
                                                    className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                />
                                            </div>
                                        </div>

                                        {/* Place of Birth */}
                                        <div className="form-row full-width flex flex-col gap-2 md:col-span-2 relative">
                                            <label htmlFor="boy_birthPlace" className="form-label text-[#1e1e1e] text-sm sm:text-base">Place of Birth</label>
                                            <input
                                                type="text"
                                                id="boy_birthPlace"
                                                name="boy_birthPlace"
                                                value={formData.boy_birthPlace}
                                                onChange={handleBirthPlaceChange}
                                                placeholder="City, State, Country"
                                                className="p-2 bg-[#EAEAEA] rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff9800]"
                                                required
                                            />
                                            <input type="hidden" id="boy_lat" name="boy_lat" value={formData.boy_lat} />
                                            <input type="hidden" id="boy_lon" name="boy_lon" value={formData.boy_lon} />
                                            {suggestions.length > 0 && (
                                                <div id="suggestions" className="absolute z-10 bg-white border rounded shadow-sm w-full top-full mt-1">
                                                    {suggestions.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            onClick={() => handleSuggestionClick(item)}
                                                            className="p-2 hover:bg-gray-100 cursor-pointer"
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
                                                <option value="">Select Language</option>
                                                {['hindi', 'english', 'marathi', 'gujarati', 'tamil'].map((lang) => (
                                                    <option key={lang} value={lang}>
                                                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Astrological Feature (hidden) */}
                                        <input
                                            type="hidden"
                                            id="astro_feature"
                                            name="astro_feature"
                                            value="basicastrology"
                                        />

                                        {/* Submit and Loader */}
                                        <div className="form-row full-width flex flex-col gap-5 md:col-span-2 pt-4">
                                            <button
                                                type="submit"
                                                className="submit-btn w-full py-3 text-white font-bold rounded-lg bg-gradient-to-r from-[#ff9800] to-[#ff5722] hover:from-[#ff5722] hover:to-[#e64a19] transition-all"
                                            >
                                                Get Kundli
                                            </button>
                                            {loading && (
                                                <div id="loader" className="text-center my-3">
                                                    <div className="spinner-border text-success" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    <p className="mt-2">Fetching your data, please wait...</p>
                                                </div>
                                            )}
                                            <div id="kundliResult">{renderResult()}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

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

export default BasicAstrology;