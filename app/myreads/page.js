"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const CATEGORIES = [
    { id: "novels", label: "Novels" },
    { id: "study-based", label: "Study Based" },
];

function googleSearchUrl(title, author) {
    return `https://www.google.com/search?q=${encodeURIComponent(`${title} by ${author}`)}`;
}

export default function MyReadsPage() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`${API}/api/bookshelf`)
            .then((res) => res.json())
            .then((data) => setBooks(data))
            .catch(() => setBooks([]));
    }, []);

    return (
        <>
            <Header />
            <main>
                <section className="myreads-page">
                    <div className="container">
                        <h1>MyReads</h1>
                        <p className="projects-page-desc">
                            Books I have read and found worth sharing — with my raw, unfiltered thoughts.
                        </p>

                        <div className="myreads-layout">
                            {/* Sidebar */}
                            <aside className="myreads-sidebar">
                                {CATEGORIES.map((cat) => (
                                    <a
                                        key={cat.id}
                                        href={`#${cat.id}`}
                                        className="sidebar-tab"
                                    >
                                        {cat.label}
                                    </a>
                                ))}
                            </aside>

                            {/* All sections stacked */}
                            <div className="myreads-content">
                                {CATEGORIES.map((cat) => {
                                    const catBooks = books.filter((b) => b.category === cat.id);
                                    return (
                                        <div key={cat.id} id={cat.id} className="myreads-category">
                                            <h2>{cat.label}</h2>
                                            {catBooks.length > 0 ? (
                                                <div className="book-list">
                                                    {catBooks.map((book, i) => (
                                                        <div key={i} className="book-row animate-in">
                                                            <span className="book-number">{i + 1}.</span>
                                                            <a
                                                                href={googleSearchUrl(book.title, book.author)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="book-title-link"
                                                            >
                                                                {book.title}
                                                            </a>
                                                            <span className="book-author-inline">by {book.author}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="empty-state">
                                                    No books here yet — check back soon!
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
