'use client';

import { useEffect, useState } from 'react';
import { ProjectCard } from './components/ProjectCard';
import { CardSkeleton } from './components/Skeleton';
import { EmptyState } from './components/EmptyState';
import { projects } from './data/projects';
import styles from './page.module.css';

const SKELETON_COUNT = 6;

const TABS = [
  { key: 'active', label: 'Active' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'past', label: 'Past' },
];

const featuredProject =
  projects.find((project) => project.status === 'active') || projects[0];

export default function Home() {
  const [activeTab, setActiveTab] = useState('active');
  const [isLoading, setIsLoading] = useState(true);

  // Simulated initial load; swap for a real loading flag once projects come from a live source.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = projects.filter((project) => project.status === activeTab);
  const featuredProgress = featuredProject
    ? Math.min((parseFloat(featuredProject.raised) / parseFloat(featuredProject.goal)) * 100, 100)
    : 0;

  const totalRaised = projects.reduce((sum, project) => sum + parseFloat(project.raised), 0);
  const totalBackers = projects.reduce((sum, project) => sum + (project.backers || 0), 0);

  const scrollToProjects = () => {
    document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className={styles.main}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.kicker}>01 / ON-CHAIN CROWDFUNDING</p>
          <h1 className={styles.headline}>Back the projects building the future.</h1>
          <p className={styles.subhead}>
            Transparent, verifiable, and governed by smart contracts. Discover and fund
            the next generation of decentralized infrastructure and culture with
            absolute certainty.
          </p>
          <div className={styles.heroActions}>
            <button type="button" className={styles.btnPrimary} onClick={scrollToProjects}>
              Explore projects
            </button>
            <a href="/start" className={styles.btnGhost}>
              Start a fundraiser
            </a>
          </div>
        </div>

        {featuredProject && (
          <div className={styles.heroRight}>
            <div className={styles.featuredCard}>
              <div className={styles.featuredTagRow}>
                <span className={styles.featuredTag}>[ {featuredProject.status.toUpperCase()} ]</span>
                {featuredProject.status === 'active' && (
                  <span className={styles.featuredLive}>
                    <span className={styles.liveDot} />
                    Live
                  </span>
                )}
              </div>
              <h2 className={styles.featuredTitle}>{featuredProject.title}</h2>
              <div className={styles.featuredStats}>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: `${featuredProgress}%` }} />
                </div>
                <div className={styles.featuredStatsRow}>
                  <span className={styles.featuredRaised}>
                    {featuredProject.raised} / {featuredProject.goal} ETH
                  </span>
                  <div className={styles.featuredBackers}>
                    <span className={styles.featuredBackersLabel}>Backers</span>
                    <span className={styles.featuredBackersValue}>{featuredProject.backers}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Trust strip */}
      <section className={styles.trustStrip}>
        <div className={styles.trustBlock}>
          <span className={styles.trustValue}>{totalRaised.toFixed(1)} ETH</span>
          <span className={styles.trustLabel}>/ Total raised</span>
        </div>
        <div className={styles.trustBlock}>
          <span className={styles.trustValue}>{projects.length}</span>
          <span className={styles.trustLabel}>/ Projects funded</span>
        </div>
        <div className={styles.trustBlock}>
          <span className={styles.trustValue}>{totalBackers.toLocaleString()}</span>
          <span className={styles.trustLabel}>/ Backers</span>
        </div>
        <div className={styles.trustBlock}>
          <span className={styles.trustValue}>Verified</span>
          <span className={styles.trustLabel}>/ Audited</span>
        </div>
      </section>

      {/* Project tabs + grid */}
      <section id="projects-section">
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              <span className={styles.tabCount}>
                ({projects.filter((p) => p.status === tab.key).length})
              </span>
            </button>
          ))}
        </div>

        <div className={styles.grid} aria-busy={isLoading} aria-label="Discover projects">
          {isLoading ? (
            Array.from({ length: SKELETON_COUNT }).map((_, index) => <CardSkeleton key={index} />)
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => <ProjectCard key={project.id} {...project} />)
          ) : (
            <div className={styles.emptyWrap}>
              <EmptyState
                title="The ledger is quiet"
                message={`No ${activeTab} projects at the moment.`}
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
