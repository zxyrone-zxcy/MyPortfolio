import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import signWiseImage from '../assets/SignWiseASL.png';
import simpleLoginImage from '../assets/simple-log-in-system.png';
import mockupLoginImage from '../assets/MockUpLogInDesign.png';

const Projects = () => {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [isMockupZoomOpen, setIsMockupZoomOpen] = useState(false);

  const projectPlaceholders = [
    { id: 1, title: 'SignWise: American Sign Language', description: 'A project to learn American Sign Language for People.', image: signWiseImage, url: 'https://github.com/zxyrone-zxcy/signwiseasl' },
    { id: 2, title: 'Simple Log-In System', description: 'A group project to create a reliable security system.', image: simpleLoginImage, url: 'https://github.com/zxyrone-zxcy/login-system-grupo-main' },
    { id: 3, title: 'Log-In Mock Up', description: 'A design prototype for log-in interface.', image: mockupLoginImage, imageFit: 'contain', url: null, zoomable: true },
  ];

  useEffect(() => {
    if (!isMockupZoomOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMockupZoomOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMockupZoomOpen]);

  const handleCardClick = (index) => {
    const project = projectPlaceholders[index];
    if (index !== selectedIndex % projectPlaceholders.length) {
      setSelectedIndex(index);
      return;
    }

    if (project.url) {
      window.location.assign(project.url);
    } else if (project.zoomable) {
      setIsMockupZoomOpen(true);
    }
  };

  const moveSelection = (direction) => {
    setSelectedIndex((currentIndex) => (currentIndex + direction + projectPlaceholders.length) % projectPlaceholders.length);
  };

  return (
    <main className="projects-page">
      <section id="projects" className="section project-section-fixed" aria-labelledby="projects-heading">
        <div className="page-width">
          <h1 id="projects-heading" className="section-label projects-label">PROJECTS</h1>

          <div className="side-note projects-panel">
            <p className="note-copy">
              A space for my future work, case studies, and thoughtful experiments.
            </p>
          </div>

          <div className="projects-carousel-wrap">
            <div className="projects-carousel-controls" aria-label="Project carousel controls">
              <button type="button" aria-label="Previous project" onClick={() => moveSelection(-1)}>
                <ChevronLeft size={19} aria-hidden="true" />
              </button>
              <button type="button" aria-label="Next project" onClick={() => moveSelection(1)}>
                <ChevronRight size={19} aria-hidden="true" />
              </button>
            </div>
            <div className="project-stack" role="region" aria-roledescription="carousel" aria-label="Projects">
              {projectPlaceholders.map((project, index) => {
                let relativePosition = (index - selectedIndex + projectPlaceholders.length) % projectPlaceholders.length;
                if (relativePosition > Math.floor(projectPlaceholders.length / 2)) {
                  relativePosition -= projectPlaceholders.length;
                }
                const distance = Math.abs(relativePosition);

                return (
                  <article
                    key={project.id}
                    className={`canva-card stack-card ${distance === 0 ? 'is-active' : ''}`}
                    style={{
                      '--card-x': `${relativePosition * 9.2}rem`,
                      '--card-y': `${distance * 8}px`,
                      '--card-rotation': `${relativePosition * -8}deg`,
                      '--card-scale': Math.max(.58, 1 - distance * .12),
                      '--card-opacity': Math.max(.34, 1 - distance * .2),
                      zIndex: projectPlaceholders.length - distance,
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={distance === 0}
                    aria-label={`Select ${project.title}`}
                    onClick={() => handleCardClick(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(index);
                      }
                    }}
                  >
                    <span className="project-card-art" aria-hidden="true">
                      <img className={project.imageFit === 'contain' ? 'is-contained' : ''} src={project.image} alt="" />
                    </span>
                    <div className="project-card-copy">
                      <h2>{project.title}</h2>
                      <p>{project.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {isMockupZoomOpen && (
        <div
          className="project-image-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Log-In Mock Up image"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsMockupZoomOpen(false);
          }}
        >
          <button
            className="project-image-viewer-close"
            type="button"
            aria-label="Close image viewer"
            autoFocus
            onClick={() => setIsMockupZoomOpen(false)}
          >
            <X size={22} aria-hidden="true" />
          </button>
          <img src={mockupLoginImage} alt="Log-In Mock Up design" />
        </div>
      )}

    </main>
  );
};

export default Projects;