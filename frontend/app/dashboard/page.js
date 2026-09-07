'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ProjectCard } from '../components/ProjectCard';
import { EmptyState } from '../components/EmptyState';
import { getProjectById } from '../data/projects';
import { mockContributions, watchlistProjectIds, createdProjectIds } from '../data/userActivity';
import styles from './page.module.css';

const TABS = [
  { id: 'contributions', label: 'My contributions' },
  { id: 'watchlist', label: 'Watchlist' },
  { id: 'campaigns', label: 'My campaigns' },
];

function shortAddress(value) {
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('contributions');
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!isConnected) {
    return (
      <main className={styles.page}>
        <div className={styles.connectState}>
          <span className={styles.connectKicker}>Dashboard</span>
          <h1 className={styles.connectTitle}>Connect your wallet</h1>
          <p className={styles.connectBody}>
            Connect a wallet to view your contributions, watchlist, and campaigns.
          </p>
          <button type="button" className={styles.connectBtn} onClick={openConnectModal}>
            Connect wallet
          </button>
        </div>
      </main>
    );
  }

  const contributions = mockContributions
    .map((c) => ({ ...c, project: getProjectById(c.projectId) }))
    .filter((c) => c.project);

  const watchlistProjects = watchlistProjectIds.map((id) => getProjectById(id)).filter(Boolean);
  const createdProjects = createdProjectIds.map((id) => getProjectById(id)).filter(Boolean);

  const totalContributed = contributions.reduce((sum, c) => sum + parseFloat(c.amount), 0);
  const activeCampaignsBacked = new Set(
    contributions.filter((c) => c.project.status === 'active').map((c) => c.project.id)
  ).size;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.summarySection}>
          <div className={styles.kickerCol}>
            <span className={styles.kicker}>Dashboard</span>
          </div>
          <div className={styles.summaryPanel}>
            <div className={styles.identity}>
              <h1 className={styles.address}>{shortAddress(address)}</h1>
              <p className={styles.identityLabel}>Connected wallet</p>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statBlock}>
                <span className={styles.statLabel}>Total contributed</span>
                <span className={styles.statValue}>{totalContributed.toFixed(2)} ETH</span>
              </div>
              <div className={styles.statBlock}>
                <span className={styles.statLabel}>Active campaigns backed</span>
                <span className={styles.statValue}>{activeCampaignsBacked}</span>
              </div>
              <div className={styles.statBlock}>
                <span className={styles.statLabel}>Campaigns created</span>
                <span className={styles.statValue}>{createdProjects.length}</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.tabSection}>
          <div className={styles.kickerCol}>
            <span className={styles.kicker}>
              {TABS.find((tab) => tab.id === activeTab)?.label}
            </span>
          </div>

          <div className={styles.tabArea}>
            <div className={styles.tabs}>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'contributions' && (
              contributions.length > 0 ? (
                <ul className={styles.contributionsList}>
                  {contributions.map((c) => {
                    const progress = Math.min(
                      (parseFloat(c.project.raised) / parseFloat(c.project.goal)) * 100,
                      100
                    );
                    return (
                      <li key={`${c.projectId}-${c.date}`} className={styles.contributionRow}>
                        <Link href={`/project/${c.project.id}`} className={styles.contributionTitle}>
                          {c.project.title}
                        </Link>
                        <span className={styles.contributionAmount}>{c.amount} ETH</span>
                        <span className={styles.contributionDate}>{formatDate(c.date)}</span>
                        <div className={styles.contributionProgress}>
                          <div className={styles.progressTrack}>
                            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                          </div>
                          <span className={styles.progressLabel}>{progress.toFixed(0)}%</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <EmptyState
                  title="No contributions yet"
                  message="You haven't backed any campaigns yet."
                  actionLabel="Back to Discover"
                  actionHref="/"
                />
              )
            )}

            {activeTab === 'watchlist' && (
              watchlistProjects.length > 0 ? (
                <div className={styles.grid}>
                  {watchlistProjects.map((p) => (
                    <ProjectCard
                      key={p.id}
                      id={p.id}
                      title={p.title}
                      description={p.description}
                      raised={p.raised}
                      goal={p.goal}
                      backers={p.backers}
                      status={p.status}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Your watchlist is empty"
                  message="Save campaigns from Discover to keep track of them here."
                  actionLabel="Back to Discover"
                  actionHref="/"
                />
              )
            )}

            {activeTab === 'campaigns' && (
              createdProjects.length > 0 ? (
                <div className={styles.grid}>
                  {createdProjects.map((p) => (
                    <ProjectCard
                      key={p.id}
                      id={p.id}
                      title={p.title}
                      description={p.description}
                      raised={p.raised}
                      goal={p.goal}
                      backers={p.backers}
                      status={p.status}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No campaigns yet"
                  message="You haven't created any campaigns yet."
                  actionLabel="Start a fundraiser"
                  actionHref="/start"
                />
              )
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
