import Header from "./components/Header";
import SocialLinks from "./components/SocialLinks";
import ProjectCard from "./components/ProjectCard";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/**
 * Fetch data from the FastAPI backend.
 * Falls back to defaults if the backend is unreachable.
 */
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

export default async function Home() {
  // Fetch all data from backend in parallel
  const [profile, projects, blogs, bookshelf, papershelf] = await Promise.all([
    fetchAPI("/api/profile", {
      name: "Sibananda Dora",
      tagline: "ai, systems, and python. always building.",
      bio: ["I am a Computer Science student and a future software engineer."],
      philosophy: {
        title: "Philosophy Time",
        text: "Loading...",
        closing: "",
      },
      social: [],
    }),
    fetchAPI("/api/projects"),
    fetchAPI("/api/blogs"),
    fetchAPI("/api/bookshelf"),
    fetchAPI("/api/papershelf"),
  ]);

  const hasBlogs = blogs.length > 0;
  const hasBooks = bookshelf.length > 0;
  const hasPapers = papershelf.length > 0;
  const hasContent = hasBlogs || hasBooks || hasPapers;

  return (
    <>
      <Header />

      <main>
        {/* ========== HERO SECTION ========== */}
        <section className="hero" id="about">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-content animate-in">
                <h1 className="hero-heading">Hey, I am {profile.name?.split(" ")[0]}</h1>
                <p className="hero-tagline">{profile.tagline}</p>
                <div className="hero-bio">
                  {profile.bio?.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
              <div className="hero-image-wrapper animate-in animate-delay-2">
                <img
                  src="/profile.jpg"
                  alt={profile.name}
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========== SOCIAL LINKS ========== */}
        <div className="animate-in animate-delay-3">
          <SocialLinks />
        </div>

        {/* ========== DYNAMIC CONTENT SECTIONS ========== */}
        {hasContent && (
          <section className="content-sections" id="blogs">
            <div className="container">
              <div className="content-grid">
                {/* Blog Posts */}
                {hasBlogs && (
                  <div className="content-section">
                    <h2>
                      Recent blog posts •{" "}
                      <a href="/blogs">Full archive →</a>
                    </h2>
                    <p className="content-section-desc">
                      Things I have written recently.
                    </p>
                    <ul className="content-list">
                      {blogs.map((post, i) => (
                        <li key={i}>
                          <span className="date">{post.date}</span>
                          <a href={post.url}>{post.title}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bookshelf */}
                {hasBooks && (() => {
                  const novel = bookshelf.find(b => b.category === "novels");
                  const study = bookshelf.find(b => b.category === "study-based");
                  const picks = [novel, study].filter(Boolean);
                  return (
                    <div className="content-section">
                      <h2>
                        Bookshelf •{" "}
                        <a href="/myreads">All books →</a>
                      </h2>
                      <p className="content-section-desc">
                        Books I have been reading.
                      </p>
                      <ul className="content-list">
                        {picks.map((book, i) => (
                          <li key={i}>
                            <a
                              href={`https://www.google.com/search?q=${encodeURIComponent(`${book.title} by ${book.author}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {book.title}
                            </a>
                            {book.author && (
                              <span className="date"> — {book.author}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })()}

                {/* Papershelf */}
                {hasPapers && (
                  <div className="content-section">
                    <h2>
                      Papershelf •{" "}
                      <a href="/papershelf">All papers →</a>
                    </h2>
                    <p className="content-section-desc">
                      Papers I have read recently.
                    </p>
                    <ul className="content-list">
                      {papershelf.map((paper, i) => (
                        <li key={i}>
                          <a href={paper.url} target="_blank" rel="noopener noreferrer">
                            {paper.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ========== PROJECTS ========== */}
        <section className="projects-section" id="projects">
          <div className="container">
            <h2 className="animate-in section-heading">
              Featured Projects • <a href="/projects" className="section-link">All projects →</a>
            </h2>
            <div className="projects-grid">
              {projects.map((project, i) => (
                <div key={i} className={`animate-in animate-delay-${i + 1}`}>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== PHILOSOPHY ========== */}
        {profile.philosophy && (
          <section className="philosophy-section">
            <div className="container">
              <div className="philosophy-card animate-in">
                <h2>{profile.philosophy.title}</h2>
                <p>{profile.philosophy.text}</p>
                {profile.philosophy.closing && (
                  <p style={{ marginTop: "0.75rem" }}>{profile.philosophy.closing}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ========== CONTACT FORM ========== */}
        <ContactForm />
      </main>

      <Footer />
    </>
  );
}
