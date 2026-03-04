import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

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

export const metadata = {
    title: "Projects — Sibananda Dora",
    description: "All projects by Sibananda Dora.",
};

export default async function ProjectsPage() {
    const projects = await fetchAPI("/api/projects");

    return (
        <>
            <Header />
            <main>
                <section className="projects-page">
                    <div className="container">
                        <h1>All Projects</h1>
                        <p className="projects-page-desc">
                            Things I have built, am building, or plan to build.
                        </p>
                        <div className="projects-grid">
                            {projects.map((project, i) => (
                                <div key={i} className={`animate-in animate-delay-${(i % 4) + 1}`}>
                                    <ProjectCard {...project} />
                                </div>
                            ))}
                            {projects.length === 0 && (
                                <div className="empty-state">
                                    No projects yet. Check back soon!
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
