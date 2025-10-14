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

const VimshottariDasha = () => {
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
        astro_feature: 'vimshottari_dasha',
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
        { value: 'tm', label: 'Tamil' },
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
                'January','February','March','April','May','June',
                'July','August','September','October','November','December'
            ];
            const select = document.getElementById(id);
            if (select) {
                select.innerHTML = '<option value="" disabled selected>Select</option>';
                months.forEach((month,i)=>{select.innerHTML += `<option value="${i+1}">${month}</option>`});
            }
        };
        populateSelect('boy_day',1,31,true);
        populateMonth('boy_month');
        populateSelect('boy_year',1900,new Date().getFullYear());
        populateSelect('boy_hour',0,23,true);
        populateSelect('boy_minute',0,59,true);
        populateSelect('boy_second',0,59,true);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleNameChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g,'').replace(/(\..*)\./g,'$1');
        setFormData(prev=>({...prev, fullname:value}));
    };

    const handleBirthPlaceChange = (e) => {
        setBirthPlaceQuery(e.target.value);
        setFormData(prev => ({...prev, boy_birthPlace:e.target.value}));
    };

    // Debounced API call for city suggestions
    useEffect(()=>{
        if(birthPlaceQuery.length<2){setSuggestions([]); return;}
        const handler = setTimeout(async ()=>{
            try{
                const res = await fetch(`${baseUrl}User_Api_Controller/search_city?q=${encodeURIComponent(birthPlaceQuery)}`);
                const data = await res.json();
                setSuggestions(data.length?data:[{display_name:'No results found'}]);
            }catch(err){setSuggestions([{display_name:'Error fetching results'}]); console.error(err);}
        },300);
        return ()=>clearTimeout(handler);
    },[birthPlaceQuery]);

    const handleSuggestionClick = (item)=>{
        if(!item.lat&&!item.lon&&!item.latitude&&!item.longitude) return;
        setFormData(prev=>({
            ...prev,
            boy_birthPlace: item.display_name,
            boy_lat: item.lat || item.latitude || '28.7041',
            boy_lon: item.lon || item.longitude || '77.1025'
        }));
        setSuggestions([]);
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const requiredFields=[
            {id:'fullname', label:'Full Name'},
            {id:'gender', label:'Gender'},
            {id:'boy_day', label:'Day'},
            {id:'boy_month', label:'Month'},
            {id:'boy_year', label:'Year'},
            {id:'boy_hour', label:'Hour'},
            {id:'boy_minute', label:'Minute'},
            {id:'boy_birthPlace', label:'Place of Birth'},
            {id:'language', label:'Language'}
        ];
        const missingField = requiredFields.find(({id})=>!formData[id]?.toString().trim());
        if(missingField){
            Swal.fire({
                icon:'error',
                title:'Missing Information',
                text:`Please fill out the ${missingField.label} field.`,
                confirmButtonColor:'#ff9800'
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
            boy_second: formData.boy_second||"00",
            boy_birthPlace: formData.boy_birthPlace,
            boy_lat: formData.boy_lat||"28.7041",
            boy_lon: formData.boy_lon||"77.1025",
            lan: formData.language||'en'
        };
        try{
            const res = await fetch(`${baseUrl}User_Api_Controller/vimshottari_dasha`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(submitData)
            });
            const data = await res.json();
            setResult(data);
            setLoading(false);
        }catch(error){
            console.error(error);
            setResult({success:false,error:'Data not loaded due to server problem'});
            setLoading(false);
        }
    };

    const renderResult = ()=>{
        if(!result) return null;
        if(!result.success) return <div className="alert alert-danger">No data returned from API.</div>;

        const mahaDashaObj = result.data.data.maha_dasha;
        const dashas = Object.entries(mahaDashaObj).map(([planet, range])=>({planet,...range}));

        return (
            <div className="table-responsive mt-3">
                <div className="alert alert-success">Vimshottari Dasha Loaded</div>
                <table className="table table-bordered table-hover align-middle text-center">
                    <thead className="table-primary">
                        <tr>
                            <th>Planet</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Duration</th>
                            <th>Antardasha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashas.map(dasha=>(
                            <tr key={dasha.planet}>
                                <td><strong>{dasha.planet||'N/A'}</strong></td>
                                <td>{dasha.start_date||'N/A'}</td>
                                <td>{dasha.end_date||'N/A'}</td>
                                <td>{dasha.duration||'N/A'}</td>
                                <td>
                                    {dasha.antardasha? dasha.antardasha.map(ad=>(
                                        <div key={ad.planet}>{ad.planet}: {ad.start_date} to {ad.end_date}</div>
                                    )):'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#fefaea] font-poppins py-5">
            <div className="container">
                {/* Back to Home */}
                <div className="mb-4">
                    <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none text-dark">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Back to Home
                    </Link>
                </div>

                {/* Header */}
                <div className="position-relative mb-5 rounded-lg overflow-hidden shadow-md" style={{height:'300px'}}>
                    <img src={freekundli} alt="Free Kundli" className="w-100 h-100 object-fit-cover"/>
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"></div>
                    <div className="position-absolute top-50 start-50 translate-middle text-white text-center px-3">
                        <h1 className="display-5 text-warning mb-2">Vimshottari Dasha</h1>
                        <p className="lead text-light">Understand when your planets bring opportunities and challenges. Insights into personality, career, relationships, and life path.</p>
                    </div>
                </div>

                {/* Features */}
                <div className="d-flex flex-wrap justify-center gap-3 mb-5">
                    {[{img:asteric,text:'100% Free'},{img:kidstar,text:'Accurate Prediction'},{img:shield,text:'Private & Secure'}].map((item,idx)=>(
                        <div key={idx} className="d-flex align-items-center gap-2">
                            <img src={item.img} alt={item.text} className="w-4 h-4"/>
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
                            <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleNameChange} className="form-control" placeholder="Enter your full name" required/>
                        </div>

                        {/* Gender */}
                        <div className="col-md-6">
                            <label className="form-label">Gender</label>
                            <div className="d-flex gap-3">
                                {['male','female'].map(gender=>(
                                    <div key={gender} className="form-check">
                                        <input type="radio" id={`gender-${gender}`} name="gender" value={gender} checked={formData.gender===gender} onChange={handleInputChange} className="form-check-input" required/>
                                        <label htmlFor={`gender-${gender}`} className="form-check-label">{gender.charAt(0).toUpperCase()+gender.slice(1)}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DOB */}
                        <div className="col-md-4">
                            <label className="form-label">Day</label>
                            <select id="boy_day" name="boy_day" value={formData.boy_day} onChange={handleInputChange} className="form-select" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Month</label>
                            <select id="boy_month" name="boy_month" value={formData.boy_month} onChange={handleInputChange} className="form-select" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Year</label>
                            <select id="boy_year" name="boy_year" value={formData.boy_year} onChange={handleInputChange} className="form-select" required/>
                        </div>

                        {/* Time */}
                        <div className="col-md-4">
                            <label className="form-label">Hour</label>
                            <select id="boy_hour" name="boy_hour" value={formData.boy_hour} onChange={handleInputChange} className="form-select" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Minute</label>
                            <select id="boy_minute" name="boy_minute" value={formData.boy_minute} onChange={handleInputChange} className="form-select" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Second</label>
                            <select id="boy_second" name="boy_second" value={formData.boy_second} onChange={handleInputChange} className="form-select"/>
                        </div>

                        {/* Birth Place */}
                        <div className="col-md-12 position-relative">
                            <label htmlFor="boy_birthPlace" className="form-label">Place of Birth</label>
                            <input ref={inputRef} type="text" id="boy_birthPlace" name="boy_birthPlace" value={formData.boy_birthPlace} onChange={handleBirthPlaceChange} className="form-control" placeholder="City, State, Country" required/>
                            <input type="hidden" id="boy_lat" name="boy_lat" value={formData.boy_lat}/>
                            <input type="hidden" id="boy_lon" name="boy_lon" value={formData.boy_lon}/>
                            {suggestions.length>0 && (
                                <div ref={suggestionsRef} className="position-absolute bg-white border rounded w-100 mt-1 max-h-200 overflow-auto zindex-tooltip">
                                    {suggestions.map((item,index)=>(
                                        <div key={index} onClick={()=>handleSuggestionClick(item)} className="p-2 hover-bg-light cursor-pointer border-bottom last-border-0">
                                            {item.display_name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Language */}
                        <div className="col-md-12">
                            <label htmlFor="language" className="form-label">Language</label>
                            <select id="language" name="language" value={formData.language} onChange={handleInputChange} className="form-select" required>
                                <option value="">Select Language</option>
                                {languages.map(lang=><option key={lang.value} value={lang.value}>{lang.label}</option>)}
                            </select>
                        </div>

                        {/* Submit */}
                        <div className="col-md-12 mt-3">
                            <button type="submit" className="btn btn-warning w-100">Get Vimshottari Dasha</button>
                        </div>

                        {/* Loader */}
                        {loading && <div className="col-md-12 text-center my-3"><div className="spinner-border text-success" role="status"></div><p>Fetching your data...</p></div>}

                        {/* Result */}
                        <div className="col-md-12">{renderResult()}</div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VimshottariDasha;
