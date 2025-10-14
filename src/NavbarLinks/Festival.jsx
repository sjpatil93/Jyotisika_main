import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { NavLink, useNavigate,Link } from 'react-router-dom';

const Festival = () => {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const API_URL = "https://jyotisika.in/jyotisika_test/User_Api_Controller/show_festivals";

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.status === "success") {
          setFestivals(response.data.data);
        } else {
          Swal.fire("Error", response.data.message || "Something went wrong", "error");
        }
      } catch (err) {
        console.error("Error fetching festivals:", err);
        setError(err.message);
        Swal.fire("Error", "Failed to fetch festival data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchFestivals();
  }, []);

  const filteredFestivals = festivals.filter(festival =>
    festival.festivals_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReadMore = (id) => {
    navigate(`/festival/${id}`);
  };

  if (loading) return <p className="text-center mt-5">Loading festivals...</p>;
  if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;

  return (
    <div className="container text-center mt-4">
      <Link to="/festivals" style={{ textDecoration: "none" }}>
        <h5 className="text-dark mb-3">← Back to Festivals</h5>
      </Link>


      <h3 style={{ color: "rgba(238,128,0,1)" }}>Upcoming Festivals</h3>

      {/* Search Box */}
      <div className="row mb-4 mt-4">
        <div className="input-group w-md-50 mx-auto" style={{ width: "50%" }}>
          <input
            type="search"
            className="form-control shadow-sm"
            placeholder="Search upcoming festivals"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-warning" type="button">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>

      {/* Festival Cards */}
      <div className="row justify-content-center g-4">
        {filteredFestivals.length > 0 ? (
          filteredFestivals.map((festival) => (
            <div
              className="card shadow-sm border-0 text-center col-6 col-md-3"
              style={{ width: "220px", height: "380px" }}
              key={festival.festivals_id} // ✅ Unique key
            >
              <img
                src={`https://jyotisika.in/jyotisika_test/${festival.festivals_image}`}
                alt={festival.festivals_title}
                className="rounded mb-2"
                style={{ height: "200px", width: "100%", objectFit: "cover" }}
              />
              <h6>{festival.festivals_title}</h6>
              <p>{new Date(festival.festivals_date).toDateString()}</p>
              <p className="text-muted small" style={{ height: "40px", overflow: "hidden" }}>
                {festival.festivals_decription}
              </p>

              <button
                className="btn btn-outline-warning btn-sm mb-4 "
                onClick={() => handleReadMore(festival.festivals_id)}
              >
                Read More
              </button>
            </div>
          ))
        ) : (
          <p>No festivals found.</p>
        )}
      </div>
    </div>
  );
};

export default Festival;
