import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://jyotisika.in/jyotisika_test/User_Api_Controller/show_mob_puja";

const MobPooja = () => {
  const [pujaList, setPujaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(API_URL);

        if (response.data.status === "success") {
          setPujaList(response.data.data);
        } else {
          setError("Failed to fetch puja data");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading Puja details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="alert alert-danger mt-4 text-center" role="alert">
        {error}
      </div>
    );
  }

  // Empty data
  if (pujaList.length === 0) {
    return <p className="text-center mt-4">No Puja records found.</p>;
  }

  // Display cards
  return (
    <div className="container mt-4">
       <Link to="/" style={{ textDecoration: "none" }}>
        <h5 className="text-dark">← Back to home</h5>
      </Link>

      <h3 className="text-center mb-4 text-warning"> Mob Puja </h3>
      <div className="row g-4">
        {pujaList.map((puja) => (
          <div className="col-12 col-sm-6 col-md-3 mb-4" key={puja.mobid}>
            <div className="card h-100 shadow-sm">
              <img
                src={`https://jyotisika.in/jyotisika_test/uploads/services/${puja.image}`}
                className="card-img-top"
                alt={puja.puja_name}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{puja.puja_name}</h5>
                <p className="card-text mb-1"><strong>Pujari:</strong> {puja.name}</p>
                <p className="card-text mb-1"><strong>Mode:</strong> {puja.mode}</p>
                <p className="card-text mb-1"><strong>Date:</strong> {puja.mobpujadate}</p>
                <p className="card-text mb-2"><strong>Price:</strong> ₹{puja.price}</p>
                <a
                  href={puja.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-warning mt-auto"
                >
                  Join / View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobPooja;
