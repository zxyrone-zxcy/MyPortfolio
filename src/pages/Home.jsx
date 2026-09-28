import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Facebook, Instagram, Linkedin } from 'lucide-react';
import profilePhoto from '../assets/hero.png';
import '../styles/global.css';
import '../styles/responsive.css';

const roles = ['Data Analyst', 'Junior Developer'];

const Home = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isRoleFading, setIsRoleFading] = useState(false);
  const containerRef = useRef(null);

  // Interchangeable Role Text Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRoleFading(true);
      setTimeout(() => {
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setIsRoleFading(false);
      }, 400); // Duration matches CSS fade-out
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !('IntersectionObserver' in window)) {
      containerRef.current?.querySelectorAll('.reveal-on-scroll').forEach((el) => el.classList.add('visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    containerRef.current.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page" ref={containerRef}>
      <main className="main-content page-width">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          {/* Animated Background Glow & Orbiting Particles */}
          <div className="hero-glow" />
          <div className="hero-particles">
            <span className="particle p1" />
            <span className="particle p2" />
            <span className="particle p3" />
            <span className="particle p4" />
          </div>

          <div className="hero-tech-layer" aria-hidden="true">
            <span className="tech-orb orb-one" />
            <span className="tech-orb orb-two" />
            <span className="tech-orb orb-three" />
            <span className="tech-line line-one" />
            <span className="tech-line line-two" />
            <span className="chip chip-one" />
            <span className="chip chip-two" />
            <span className="chip chip-three" />
          </div>

          <div className="hero-content">
            <p className="hero-subtitle">SOFTWARE · DATA · SYSTEMS</p>

            <h1 className="hero-name">
              Xyrone Edmund Zamudio
            </h1>

            <div className="role-container">
              <h2 className={`hero-role ${isRoleFading ? 'fade-out' : 'fade-in'}`}>
                {roles[currentRoleIndex]}
              </h2>
            </div>

            <p className="hero-description">
              I build thoughtful, digital systems and turn data into useful decisions—one clear, considered solution at a time.
            </p>

            <a href="#approach" className="scroll-indicator" aria-label="Scroll to explore section">
              <span>SCROLL TO EXPLORE</span>
              <span className="scroll-arrow-wrap">
                <ArrowDown size={14} className="bounce-icon" />
              </span>
            </a>
          </div>
        </section>

        {/* My Approach Section */}
        <section id="approach" className="section-container reveal-on-scroll">
          <p className="section-badge">MY APPROACH</p>
          <div className="approach-banner">
            <p className="approach-banner-text">"Building systems with code, uncovering answers with data."</p>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="section-container grid-2 reveal-on-scroll">
          <div className="about-text-content">
            <p className="section-badge">ABOUT ME</p>
            <h2 className="section-title">Curiosity is where clear solutions begin.</h2>
            <p className="section-paragraph">
              I enjoy understanding how things work beneath the surface, then turning complex problems into clean, practical solutions. By combining software development with data analysis, I aim to create work that is not only functional, but also thoughtful, useful, and easy to understand.
            </p>

            <div className="pill-group">
              <span className="pill">Problem solving </span>
              <span className="pill">Data thinking </span>
              <span className="pill">Continuous learning </span>
            </div>
          </div>

          <div className="about-number-card">
            <span className="number-large">01</span>
            <p className="number-caption">
              The goal is never complexity for its own sake. It is a better path from question to outcome.
            </p>
          </div>
        </section>

        {/* My Dedication Section */}
        <section className="section-container grid-2 reveal-on-scroll">
          <div className="dedication-content">
            <p className="section-badge">PROFESSIONAL PROFILE</p>
            <h2 className="section-title">Hello, I am Xyrone.</h2>

            <div className="dedication-list">
              <div className="dedication-item">
                <h4>Getting Started to IT Field</h4>
                <p>Before jumping into IT, I was always the person who actually enjoyed solving math problems. Pre-calculus and basic calculus were right up my alley back in school. Beyond just working through equations on paper, I liked seeing how things worked in the physical world—at one point, a friend and I even built a small line-following truck using an Arduino, which was my first real hands-on experience getting code and hardware to talk to each other.</p>
              </div>

              <div className="dedication-item">
                <h4>The Pressure to Enter the IT Field</h4>
                <p>entering the IT field brought a lot of pressure. It feels like everyone expects you to know five different programming languages, networking, and cloud systems right out of the gate, and the sheer volume of things to learn can be pretty overwhelming. But whenever I start feeling that doubt, I remind myself of where I started. I’ve always been drawn to solving complex math problems, and tackling pre-calc and calculus taught me how to break down tough logic.</p>
              </div>

              <div className="dedication-item">
                <h4>Getting used to it.</h4>
                <p>Once I get comfortable with the fact that nobody knows everything and everybody is looking things up, the learning curve stops feeling like a wall and starts feeling like just another problem to solve</p>
              </div>
            </div>

            <p className="dedication-footer">
              Lastly, Thank you for my special someone, you made me feel determined.
            </p>
          </div>

          <div className="photo-card-wrapper">
            <div className="photo-card">
              <img src={profilePhoto} alt="Xyrone Edmund Zamudio" className="profile-img" />
            </div>
          </div>
        </section>

        {/* Social Links Section */}
        <section id="social-links" className="section-container reveal-on-scroll">
          <p className="section-badge">CONNECT</p>
          <h2 className="section-title">Find me online.</h2>
          <div className="social-links" aria-label="Social media links">
            <a href="https://www.facebook.com/zxcyro" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">
              <Facebook size={20} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/xyronezamudio1018/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <Linkedin size={20} aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/zxcyrone_/" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
              <Instagram size={20} aria-hidden="true" />
            </a>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
