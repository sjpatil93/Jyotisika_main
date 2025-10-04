import React, { useState } from 'react';
import '../cssFiles/FormComponent.css';


const KundliMatching = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    timeOfBirth: { hh: '', mm: '', ss: '' },
    placeOfBirth: '',
    language: '',
    feature: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      timeOfBirth: {
        ...prev.timeOfBirth,
        [name]: value
      }
    }));
  };
  return (
    <div className='shadow-sm'>
      <div className='text-center'>
        <h4>Match you Horoscope</h4>
        <p>Accurate birth information is essential for precise astrological analysis</p>
      </div>

      <div className="form-container">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            /> Female
          </label>
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Time of Birth</label>
          <input
            type="number"
            name="hh"
            value={formData.timeOfBirth.hh}
            onChange={handleTimeChange}
            placeholder="HH"
            min="0"
            max="23"
          />
          <input
            type="number"
            name="mm"
            value={formData.timeOfBirth.mm}
            onChange={handleTimeChange}
            placeholder="MM"
            min="0"
            max="59"
          />
          <input
            type="number"
            name="ss"
            value={formData.timeOfBirth.ss}
            onChange={handleTimeChange}
            placeholder="SS"
            min="0"
            max="59"
          />
        </div>
        <div className="form-group">
          <label>Place of Birth</label>
          <input
            type="text"
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={handleChange}
            placeholder="City, State, Country"
          />
        </div>
        <div className="form-group">
          <label>Language</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="">Select Language</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
          </select>
        </div>
        <div className="form-group">
          <label>Select Feature</label>
          <select
            name="feature"
            value={formData.feature}
            onChange={handleChange}
          >
            <option value="">Select Astrological Feature</option>
            <option value="basic">Basic Astrology</option>
            <option value="planetary">Planetary Positions</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default KundliMatching