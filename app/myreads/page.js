import Header from "../components/Header";
import Footer from "../components/Footer";

const API = "http://127.0.0.1:8000";

async function fetchAPI(endpoint, fallback = []) {
    try {
        const res = await fetch(`${API}${endpoint}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return await res.json();
    } catch {
        console.warn(`Failed to fetch ${endpoint}, using fallback.`);
        return fallback;
    }
}

function googleSearchUrl(title, author) {
    return `https://www.google.com/search?q=${encodeURIComponent(`${title} by ${author}`)}`;
}

export const metadata = {
    title: "MyReads — Sibananda Dora",
    description: "Books I have read and found worth sharing.",
};

export default async function MyReadsPage() {
    const bookshelf = await fetchAPI("/api/bookshelf");

    return (
        <>
            <Header />
            <main>
                <section className="projects-page">
                    <div className="container">
                        <h1>MyReads</h1>
                        <p className="projects-page-desc">
                            Books I have read and found worth sharing — with my raw, unfiltered thoughts.
                        </p>

                        {bookshelf.length > 0 ? (
                            <div className="book-list">
                                {bookshelf.map((book, i) => (
                                    <div key={i} className={`book-card animate-in animate-delay-${(i % 4) + 1}`}>
                                        <a
                                            href={googleSearchUrl(book.title, book.author)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="book-cover-link"
                                        >
                                            <img
                                                src={book.cover || "/books/default.jpg"}
                                                alt={`${book.title} by ${book.author}`}
                                                className="book-cover"
                                            />
                                        </a>
                                        <div className="book-info">
                                            <h2>
                                                <a
                                                    href={googleSearchUrl(book.title, book.author)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {book.title}
                                                </a>
                                            </h2>
                                            <p className="book-author">by {book.author}</p>
                                            {book.read_date && (
                                                <p className="book-date">Read: {book.read_date}</p>
                                            )}
                                            <p className="book-review">{book.review}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                List coming soon — currently reading and curating!
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
