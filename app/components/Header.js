"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="container header-inner">
                <a href="/" className="header-brand">
                    Sibananda Dora
                </a>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

                <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
                    <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
                    <a href="/projects" onClick={() => setMenuOpen(false)}>Projects</a>
                    <a href="/highlights" onClick={() => setMenuOpen(false)}>Highlights</a>
                    <a href="/myreads" onClick={() => setMenuOpen(false)}>MyReads</a>
                    <a href="/#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}
