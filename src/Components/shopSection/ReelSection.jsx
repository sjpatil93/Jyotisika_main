import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ReelCard = ({ reel, onClick, index }) => (
  <div
    className="reel-card"
    style={{
      flex: "0 0 auto",
      margin: "0 12px",
      borderRadius: "16px",
      overflow: "hidden",
      position: "relative",
      cursor: "pointer",
      background: "#000",
    }}
    onClick={() => onClick(reel.video)}
  >
    <video
      src={reel.video}
      style={{
        height: "450px",
        width: "100%",
        objectFit: "cover",
        borderRadius: "16px",
      }}
      muted
    />

    {/* Index Tag */}
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        background: "#fff",
        borderRadius: "50px",
        padding: "2px 8px",
        fontSize: "14px",
        fontWeight: "bold",
      }}
    >
      #{index + 1}
    </div>

    {/* Play Button Overlay */}
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      }}
    >
      ▶
    </div>

    {/* Title Overlay */}
    <div
      style={{
        position: "absolute",
        bottom: "0",
        left: "0",
        width: "100%",
        padding: "8px",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "16px",
        background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
      }}
    >
      {reel.title}
    </div>
  </div>
);

const ReelSection = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://jyotisika.in/jyotisika_test/Video_api/list_videos")
      .then((res) => {
        if (res.data.status === "success") {
          setReels(res.data.data);
        }
      })
      .catch((err) => console.error("API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  const cardsPerView = () => {
    if (window.innerWidth >= 1200) return 4;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const handleNext = () => {
    if (currentIndex + 1 < reels.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  if (loading) return <p className="text-center mt-5">Loading reels...</p>;

  if (reels.length === 0)
    return <p className="text-center mt-5">No reels available right now.</p>;

  return (
    <div style={{ backgroundColor: "#fefaea", padding: "40px 20px" }}>
      <h1
        style={{
          fontFamily: "serif",
          fontWeight: "bold",
          textAlign: "center",
          color: "#f57c00",
          marginBottom: "30px",
        }}
      >
        Reels Section
      </h1>

      <div className="position-relative">
        <div
          className="d-flex align-items-center mb-3"
          style={{ overflow: "hidden" }}
          ref={carouselRef}
        >
          <div
            className="d-flex"
            style={{
              transform: `translateX(-${currentIndex * (18 * 16 + 24)}px)`,
              transition: "transform 0.5s ease",
            }}
          >
            {reels.map((reel, i) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                index={i}
                onClick={handleVideoClick}
              />
            ))}
          </div>
        </div>

        {/* Custom Arrows */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#fff",
            border: "2px solid #f57c00",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
        >
          ❮
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex + cardsPerView() >= reels.length}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "#fff",
            border: "2px solid #f57c00",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
        >
          ❯
        </button>
      </div>

      {/* Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Video</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          {selectedVideo && (
            <video src={selectedVideo} controls style={{ width: "100%" }} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReelSection;
