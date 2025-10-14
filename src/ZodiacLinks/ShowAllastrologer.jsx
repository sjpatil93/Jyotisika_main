import React, { useEffect, useState } from "react";
import axios from "axios";
import star from '../assets/images/star.png'
import experience from '../assets/images/experience.png'
import money from '../assets/images/money.png'
import language from '../assets/images/language.png'

const ShowAllAstrologer = () => {
  const [astrologers, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://jyotisika.in/jyotisika_test/User_Api_Controller/getastrologer";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.status === "success") {
          setAstrologers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching astrologers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        {astrologers.length > 0 ? (
          astrologers.map((astro) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
              key={astro.id}
            >
              <div
                className="card shadow-sm "
                style={{
                  width: "16rem",
                  height: "22rem",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <div className="row">
                  <div className="col-5">

                    <img
                      src={`https://jyotisika.in/jyotisika_test/${astro.profile_image}`}
                      className="card-img-top"
                      alt={astro.name}
                      style={{ borderRadius: "50%", height: "95px", width: "100%", margin: "10px", border: "1px solid black" }}
                    />
                  </div>
                  <div className="col-6 pt-3">
                    <h6 className="card-title mb-2 fw-bold fs-6" style={{ color: "#ff9500ff" }}>{astro.name}</h6>
                  </div>
                </div>
                <div className="  " style={{ justifyContent: "left" }}>
                  <div className="" style={{ fontSize: "0.9rem" }}>
                    <strong><img src={star} alt="" style={{ padding: "10px" }} />:</strong> <span
                      style={{
                        display: "inline-block",
                        maxWidth: "200px",     // adjust as per layout
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "middle",
                      }}
                    >
                      {astro.specialties}
                    </span>
                  </div>
                  <div> <strong><img src={experience} alt="" style={{ padding: "10px" }} />:</strong> {astro.experience} yrs </div>
                  <div><strong><img src={money} alt="" style={{ padding: "10px" }} />:</strong>{astro.price_per_minute} Rs per minute </div>
                  <div>
                    <strong><img src={language} alt="" style={{ padding: "10px" }} />:</strong>  <span
                      style={{
                        display: "inline-block",
                        maxWidth: "150px",     // adjust as per layout
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        verticalAlign: "middle",
                      }}
                    >
                      {astro.languages}
                    </span>
                  </div>

                  <div className="row" style={{width:"100%", margin:"3px"}}>
                    <div className="col-6"><a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-warning w-100 border border border-success"
                    >
                      Chat
                    </a>
                    </div>
                    <div className="col-6">
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm  w-100 border btn-secondary border-success"
                      >
                        Call
                      </a>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No astrologers found.</div>
        )}
      </div>
    </div>
  );
};

export default ShowAllAstrologer;
