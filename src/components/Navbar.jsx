import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleHomeClick = (event) => {
    setIsOpen(false);
    if (location.pathname === "/" && !location.hash) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header>
      <nav className="top-nav" aria-label="Primary navigation">
        <Link to="/" className="brand-mark" aria-label="Back to top" onClick={handleHomeClick}>
          <span className="brand-dot" aria-hidden="true"></span>
          <span>Xyrone / Dev</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link" onClick={handleHomeClick}>Home</Link>
          <Link to="/experience" className="nav-link">Experiences</Link>
          <Link to="/certifications" className="nav-link">Certificates</Link>
          <Link to="/projects" className="nav-link">Projects</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
        </div>

        <div className="menu-wrap">
          <button
            className="menu-trigger"
            type="button"
            aria-expanded={isOpen}
            aria-controls="portfolio-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>Menu</span>
            {isOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

          {isOpen && (
            <div id="portfolio-menu" className="portfolio-menu" role="menu">
              <Link to="/" className="menu-item" role="menuitem" onClick={handleHomeClick}>Home</Link>
              <Link to="/experience" className="menu-item" role="menuitem">Experiences</Link>
              <Link to="/certifications" className="menu-item" role="menuitem">Certificates</Link>
              <Link to="/projects" className="menu-item" role="menuitem">Projects</Link>
              <Link to="/blog" className="menu-item" role="menuitem">Blog</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
