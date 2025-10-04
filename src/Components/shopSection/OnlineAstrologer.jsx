import React, { useEffect, useState } from "react";

const OnlineAstrologer = () => {
  const [astrologers, setAstrologers] = useState([]);

  useEffect(() => {
    fetch(
      "https://jyotisika.in/jyotisika_test/User_Api_Controller/getastrologer"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          // only keep online astrologers
          const onlineAstros = data.data.filter(
            (astro) => astro.is_online === "1"
          );
          setAstrologers(onlineAstros);
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <div style={{ backgroundColor: "#fefaea", padding: "20px" }}>
      <h1 className="highlight text-center pt-5 ">Astrologer</h1>
      <p className="text-center"> Divine essentials crafted for your journey.</p>
      {astrologers.length === 0 ? (
        <p className="text-center text-danger fs-4">No astrologers found.</p>
      ) : (
        <div className="d-flex flex-wrap gap-3">
          {astrologers.map((astro) => (
            <div key={astro.id} className="card shadow-sm" style={{ width: "18rem" }}>
              <div className="row">
                <div className="col-5">

                  <img
                    src={`https://jyotisika.in/jyotisika_test/${astro.profile_image}`}
                    className="card-img-top"
                    alt={astro.name}
                    style={{borderRadius:"50%",height:"105px",width:"100%",padding:"10px"}}
                  />
                </div>
                <div className="col-6 p-3">
                  <h5 className="card-title">{astro.name}</h5>
                  <h6 className="" style={{color:"#FD8B07"}}>Kundli matching , Horoscope...</h6>
                </div>
                <div className="card-body">

                  <p className="card-text p-2">

                    Experience  : {astro.experience} years <br />
                    Price  : ₹{astro.price_per_minute}/minute <br />
                    Rating  : ⭐ ⭐ ⭐ {astro.average_rating}
                  </p>
                  <h6 className="card-subtitle mb-2 text-muted p-2">
                    {astro.languages}
                  </h6>
                  <a
                    href={astro["meeting-link"]}
                    className="card-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Join Meeting
                  </a>
                  <a href={`mailto:${astro.email}`} className="card-link">
                    Email
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OnlineAstrologer;
