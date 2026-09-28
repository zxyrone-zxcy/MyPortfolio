import React, { useState } from 'react';
import { X } from 'lucide-react';

const Projects = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const projectPlaceholders = [
    { id: 1, title: 'Project 01', description: 'Add the title and short description for project 01.' },
    { id: 2, title: 'Project 02', description: 'Add the title and short description for project 02.' },
    { id: 3, title: 'Project 03', description: 'Add the title and short description for project 03.' },
    { id: 4, title: 'Project 04', description: 'Add the title and short description for project 04.' },
    { id: 5, title: 'Project 05', description: 'Add the title and short description for project 05.' },
    { id: 6, title: 'Project 06', description: 'Add the title and short description for project 06.' },
    { id: 7, title: 'Project 07', description: 'Add the title and short description for project 07.' },
  ];

  const handleCardClick = (index) => {
    setActiveCardIndex(index);
    setIsDrawerOpen(true);
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

          <div className="project-stack" aria-label="Project placeholders">
            {projectPlaceholders.map((project, index) => (
              <article
                key={project.id}
                className={`canva-card stack-card ${activeCardIndex === index ? 'is-forward' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={`Open details for ${project.title}`}
                onClick={() => handleCardClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(index);
                  }
                }}
              >
                <h2>{project.title}</h2>
                <p>{project.description}</p>
              </article>
            ))}
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