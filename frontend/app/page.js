'use client';

import { useState } from 'react';
import { CustomConnectButton } from './components/CustomConnectButton';
import { ProjectCard } from './components/ProjectCard';
import { projects } from './data/projects';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <main>
      {/* Navbar */}
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
            <span style={{ color: '#3b82f6' }}>Fund</span>Caster
          </div>
          <div className="nav-links nav-links-desktop">
            <a href="#" className="nav-link" style={{ color: 'white' }}>Discover</a>
            <a href="#" className="nav-link">Start Fundraiser</a>
            <a href="#" className="nav-link">About</a>
          </div>
        </div>
        
        {/* Desktop Connect Button */}
        <div className="desktop-connect">
          <CustomConnectButton />
        </div>

        {/* Hamburger Button (Mobile Only) */}
        <button 
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      />
      
      {/* Mobile Slide-out Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <div style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
            <span style={{ color: '#3b82f6' }}>Fund</span>Caster
          </div>
        </div>
        <div className="mobile-nav-links">
          <a href="#" className="mobile-nav-link" onClick={closeMenu}>Discover</a>
          <a href="#" className="mobile-nav-link" onClick={closeMenu}>Start Fundraiser</a>
          <a href="#" className="mobile-nav-link" onClick={closeMenu}>About</a>
        </div>
        <div className="mobile-connect-wrapper">
          <CustomConnectButton />
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          Decentralized <br /> Crowd Funding<br />
          for the Future
        </h1>
        <button className="hero-btn">
          Explore Projects
        </button>
      </section>

      {/* Project Grid */}
      <div className="grid-container">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id}
            {...project}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}><span style={{ color: '#3b82f6' }}>Fund</span>Caster</h4>
            <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
              Empowering the next generation of <br/> decentralized innovation.
            </p>
          </div>
          <div className="footer-col">
            <h4>Discover</h4>
            <a href="#">Trending Projects</a>
            <a href="#">New Launches</a>
            <a href="#">Success Stories</a>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a href="#">Help Center</a>
            <a href="#">Smart Contracts</a>
            <a href="#">Brand Assets</a>
          </div>
          <div className="footer-col">
            <h4>Socials</h4>
            <a href="#">Twitter / X</a>
            <a href="#">Discord</a>
            <a href="#">Github</a>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2025 FundCaster Platform. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
