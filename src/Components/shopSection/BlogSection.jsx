import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function BlogsSection() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(
                    "https://jyotishvitran.org/TestingLink/Astrology/User_Api_Controller/showblogs"
                );
                if (!response.ok) throw new Error("Failed to fetch blogs");
                const result = await response.json();
                if (result.status === "success") {
                    setBlogs(result.data);
                } else {
                    setError("No blogs available");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-muted">{error}</p>;

    // Split blogs into chunks of 4 per slide
    const chunkedBlogs = [];
    for (let i = 0; i < blogs.length; i += 4) {
        chunkedBlogs.push(blogs.slice(i, i + 4));
    }

    return (
        <section className="py-5" style={{ backgroundColor: "#fefaea" }}>
            <div className="container">
                <div className="row align-items-center mb-4">
                    <div className="col text-center">
                        <h2
                            className="highlight"
                        >
                            Blogs of Astrology
                        </h2>
                        <p className="text-muted mb-0">
                            Explore the latest insights in astrology
                        </p>
                    </div>
                </div>

                <Carousel interval={4000} indicators={true} controls={true}>
                    {chunkedBlogs.map((group, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {group.map((blog) => (
                                    <Col md={3} sm={6} xs={12} key={blog.blog_id} className="mb-3">
                                        <Link
                                            to={`/User/ViewBlogInfo/${blog.blog_id}`}
                                            className="text-decoration-none"
                                        >
                                            <div className="card border-0 rounded-3 h-100 blog-card shadow-sm">
                                                <img
                                                    src={`https://jyotishvitran.org/TestingLink/Astrology/${blog.blog_image}`}
                                                    className="card-img-top rounded-top-3 blog-img"
                                                    alt={blog.blog_title}
                                                    style={{ objectFit: "cover", height: "200px" }}
                                                />
                                                <div className="card-body d-flex flex-column justify-content-between">
                                                    <h5
                                                        className="card-title blog-title"
                                                        style={{
                                                            fontFamily: "Roboto, sans-serif",
                                                            fontSize: "1.1rem",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {blog.blog_title}
                                                    </h5>
                                                    <p
                                                        className="blog-date"
                                                        style={{ fontSize: "0.9rem", color: "#6c757d" }}
                                                    >
                                                        Today
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>

                <div className="row mt-4">
                    <div className="col text-center">
                        <Link
                            to="/User/Blog"
                            className="btn fw-bold px-4 py-2 rounded-3"
                            style={{
                                background:
                                    "linear-gradient(90deg, rgba(254,191,49,1) 0%, rgba(238,128,0,1) 100%)",
                                color: "white",
                                fontSize: "16px",
                                width: "134px",
                                height: "37px",
                                borderRadius: "8px",
                                fontWeight: 600,
                            }}
                        >
                            <span>View All</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogsSection;
