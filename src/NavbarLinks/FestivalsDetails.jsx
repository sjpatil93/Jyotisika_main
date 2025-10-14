import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const FestivalDetails = () => {
    const { id } = useParams();
    const [festival, setFestival] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFestival = async () => {
            try {
                const response = await axios.get("https://jyotisika.in/jyotisika_test/User_Api_Controller/show_festivals");
                if (response.data.status === "success") {
                    // ✅ Find festival by id (string comparison)
                    const selectedFestival = response.data.data.find(f => f.festivals_id.toString() === id);
                    if (selectedFestival) {
                        setFestival(selectedFestival);
                    } else {
                        Swal.fire("Error", "Festival not found", "error");
                    }
                } else {
                    Swal.fire("Error", response.data.message || "Something went wrong", "error");
                }
            } catch (err) {
                console.error("Error fetching festival details:", err);
                setError(err.message);
                Swal.fire("Error", "Failed to fetch festival data", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchFestival();
    }, [id]);

    if (loading) return <p className="text-center mt-5">Loading festival details...</p>;
    if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;
    if (!festival) return <p className="text-center mt-5">Festival not found</p>;

    return (
        <div className="container mt-4">
            <Link to="/festivals" style={{ textDecoration: "none" }}>
                <h5 className="text-dark mb-3">← Back to Festivals</h5>
            </Link>

            <div className="card shadow-sm border-0">
                <img
                    src={`https://jyotisika.in/jyotisika_test/${festival.festivals_image}`}
                    alt={festival.festivals_title}
                    className="card-img-top"
                    style={{ height: "400px", objectFit: "cover" }}
                />
                <div className="card-body">
                    <h2>{festival.festivals_title}</h2>
                    <p><strong>Date:</strong> {new Date(festival.festivals_date).toDateString()}</p>
                    <p className="text-muted small" style={{ height: "40px", overflow: "hidden" }}>
                        {festival.festivals_decription}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FestivalDetails;
