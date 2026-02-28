export default function ProjectCard({ title, description, tags, url }) {
    return (
        <div className="project-card">
            <h3>
                {url ? <a href={url} target="_blank" rel="noopener noreferrer">{title}</a> : title}
            </h3>
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
        </div>
    );
}
