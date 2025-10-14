import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const BookPuja = () => {
  const [pujas, setPujas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL =
    "https://jyotisika.in/jyotisika_test/User_Api_Controller/show_puja";

  // ✅ Fetch data on mount
  useEffect(() => {
    const fetchPujas = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.status === "success") {
          setPujas(response.data.data);
        } else {
          Swal.fire(
            "Error",
            response.data.message || "Something went wrong",
            "error"
          );
        }
      } catch (err) {
        console.error("Error fetching pujas:", err);
        setError(err.message);
        Swal.fire("Error", "Failed to fetch puja data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPujas();
  }, []);

  // ✅ Handle loading state
  if (loading) {
    return <p className="text-center mt-5">Loading pujas...</p>;
  }

  // ✅ Handle error state
  if (error) {
    return <p className="text-danger text-center mt-5">Error: {error}</p>;
  }

  // ✅ Filter pujas by search term
  const filteredPujas = pujas.filter((puja) =>
    puja.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h5 className="text-dark">← Back to home</h5>
      </Link>

      <div className="container text-center">
        <h3 style={{ color: "rgba(238,128,0,1)" }}>Book Pooja</h3>

        {/* 🔍 Search box */}
        <div className="row mb-4 mt-4">
          <div
            className="input-group w-md-50 mx-auto search-box"
            style={{ height: "40px", width: "50%" }}
          >
            <input
              type="search"
              className="form-control shadow-sm"
              placeholder="Search pujas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-warning" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        {/* 🪔 Puja list */}
        <div className="row justify-content-center">
          {filteredPujas.length > 0 ? (
            filteredPujas.map((puja) => (
              <div
                key={puja.id}
                className="card shadow-sm border-0 text-center mt-4 col-md-3 col-6 mb-4"
                style={{ width: "230px", height: "360px", margin: "auto" }}
              >
                <img
                  src={"https://jyotisika.in/jyotisika_test/uploads/services/" + puja.image}
                  alt={puja.name}
                  className="rounded mb-2"
                  style={{
                    height: "200px",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <h6>{puja.name}</h6>
                <p
                  className="text-muted"
                  style={{
                    fontSize: "14px",
                    margin: "0 10px",
                    minHeight: "40px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,        // ✅ Show only 2 lines
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",  // ✅ Add "..." at the end
                  }}
                >
                  {puja.description}
                </p>

                <p>
                  <strong>₹{puja.price}</strong>
                </p>
                <button className="btn btn-outline-warning btn-sm mb-4">
                  Book Now
                </button>
              </div>
            ))
          ) : (
            <p>No pujas found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BookPuja;
