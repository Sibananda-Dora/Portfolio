"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function HighlightsPage() {
    const [highlights, setHighlights] = useState([]);
    const [lightbox, setLightbox] = useState(null);

    useEffect(() => {
        fetch(`${API}/api/highlights`)
            .then((res) => res.json())
            .then((data) => setHighlights(data))
            .catch(() => setHighlights([]));
    }, []);

    return (
        <>
            <Header />
            <main>
                <section className="highlights-page">
                    <div className="container">
                        <h1>Highlights</h1>
                        <p className="projects-page-desc">
                            Hackathons, achievements, and key moments from my B.Tech journey.
                        </p>

                        {highlights.length > 0 ? (
                            <div className="highlights-list">
                                {highlights.map((item, i) => (
                                    <div key={i} className="highlight-card animate-in">
                                        <div className="highlight-content">
                                            <h2>{item.title}</h2>
                                            {item.date && <p className="highlight-date">{item.date}</p>}

                                            {item.photos && item.photos.length > 0 && (
                                                <div className="highlight-photos">
                                                    {item.photos.map((photo, j) => (
                                                        <img
                                                            key={j}
                                                            src={photo}
                                                            alt={`${item.title} - photo ${j + 1}`}
                                                            className="highlight-photo"
                                                            onClick={() => setLightbox(photo)}
                                                            style={{ cursor: "pointer" }}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            <p className="highlight-desc">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                Highlights coming soon — stay tuned!
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />

            {/* Lightbox Modal */}
            {lightbox && (
                <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
                    <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
                    <img
                        src={lightbox}
                        alt="Enlarged photo"
                        className="lightbox-img"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}
