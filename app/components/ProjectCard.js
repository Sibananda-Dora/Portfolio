export default function ProjectCard({ title, description, tags, url }) {
    const content = (
        <>
            <h3>{title}</h3>
            <p>{description}</p>
            {tags && tags.length > 0 && (
                <div className="project-tags">
                    {tags.map((tag) => (
                        <span key={tag} className="project-tag">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </>
    );

    if (url) {
        return (
            <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-card" 
                style={{ display: 'block', textDecoration: 'none', cursor: 'pointer' }}
            >
                {content}
            </a>
        );
    }

    return (
        <div className="project-card">
            {content}
        </div>
    );
}
