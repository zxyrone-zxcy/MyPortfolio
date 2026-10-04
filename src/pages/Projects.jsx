import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Projects = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(3);

  const projectPlaceholders = [
    { id: 1, title: 'PUBMAT FOR AWS', description: 'Add the title and short description for project 01.' },
    { id: 2, title: 'Project 02', description: 'Add the title and short description for project 02.' },
    { id: 3, title: 'Project 03', description: 'Add the title and short description for project 03.' },
    { id: 4, title: 'Project 04', description: 'Add the title and short description for project 04.' },
    { id: 5, title: 'Project 05', description: 'Add the title and short description for project 05.' },
    { id: 6, title: 'Project 06', description: 'Add the title and short description for project 06.' },
    { id: 7, title: 'Project 07', description: 'Add the title and short description for project 07.' },
  ];

  const handleCardClick = (index) => {
    setSelectedIndex(index);
    setActiveCardIndex(index);
    setIsDrawerOpen(true);
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
              A space for future work, case studies, and thoughtful experiments.
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
                    className={`canva-card stack-card ${distance === 0 ? 'is-active' : ''} ${activeCardIndex === index ? 'is-forward' : ''}`}
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
                    aria-label={`Open details for ${project.title}`}
                    onClick={() => handleCardClick(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(index);
                      }
                    }}
                  >
                    <span className="project-card-art" aria-hidden="true">
                      <span>{String(project.id).padStart(2, '0')}</span>
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

      {isDrawerOpen && (
        <section
          id="projects-drawer"
          className="projects-drawer"
          aria-labelledby="projects-drawer-title"
          onClick={(e) => {
            if (e.target.id === 'projects-drawer') setIsDrawerOpen(false);
          }}
        >
          <div className="projects-drawer-panel" role="dialog" aria-modal="true">
            <div className="projects-drawer-header">
              <h2 className="projects-drawer-title" id="projects-drawer-title">
                {projectPlaceholders[activeCardIndex]?.title ?? 'Project details'}
              </h2>
              <button
                className="canva-button projects-drawer-close"
                type="button"
                aria-label="Close Projects"
                onClick={() => setIsDrawerOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {activeCardIndex !== null && (
              <article className="canva-card project-placeholder-card">
                <h3>{projectPlaceholders[activeCardIndex].title}</h3>
                <p>{projectPlaceholders[activeCardIndex].description}</p>
              </article>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Projects;