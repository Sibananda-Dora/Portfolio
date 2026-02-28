export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Column 1: Writings & Learning */}
                    <div className="footer-section">
                        <h4>Writings & Learning</h4>
                        <ul>
                            <li><a href="#blogs">Blogs</a></li>
                            <li><a href="#bookshelf">Bookshelf</a></li>
                            <li><a href="#papershelf">Papershelf</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Projects */}
                    <div className="footer-section">
                        <h4>Projects</h4>
                        <ul>
                            <li><a href="https://github.com/Sibananda-Dora" target="_blank" rel="noopener noreferrer">OpenMedia CLI</a></li>
                            <li><a href="https://github.com/Sibananda-Dora" target="_blank" rel="noopener noreferrer">All Projects →</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Connect */}
                    <div className="footer-section">
                        <h4>Connect</h4>
                        <ul>
                            <li><a href="https://github.com/Sibananda-Dora" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                            <li><a href="https://www.linkedin.com/in/sibananda-dora-a487a1389/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                            <li><a href="https://x.com/Sibanand007" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Other */}
                    <div className="footer-section">
                        <h4>Other</h4>
                        <ul>
                            <li><a href="mailto:sibanandadora443@gmail.com">Contact Me</a></li>
                            <li><a href="#about">About</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {currentYear} Sibananda Dora. All rights reserved.</p>
                    <div className="footer-socials">
                        <a href="https://github.com/Sibananda-Dora" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://www.linkedin.com/in/sibananda-dora-a487a1389/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://x.com/Sibanand007" target="_blank" rel="noopener noreferrer">X</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
