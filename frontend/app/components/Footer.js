'use client';

import { useState } from 'react';
import styles from './Footer.module.css';

const LINK_COLUMNS = [
  {
    heading: 'Explore',
    links: ['Discover', 'Categories', 'Featured', 'Leaderboard'],
  },
  {
    heading: 'Creators',
    links: ['Start a fundraiser', 'Creator guide', 'Fees', 'Verification'],
  },
  {
    heading: 'Resources',
    links: ['How it works', 'Docs', 'FAQ', 'Support', 'Blog'],
  },
  {
    heading: 'Company',
    links: ['About', 'Careers', 'Brand', 'Contact'],
  },
  {
    heading: 'Legal',
    links: ['Terms', 'Privacy', 'Risk disclosure', 'Cookies'],
  },
];

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (event) => {
    event.preventDefault();
    setEmail('');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.wordmark}>FundArc</div>
          <p className={styles.mission}>On-chain crowdfunding you can verify</p>
        </div>

        <form className={styles.subscribeRow} onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Email address"
            className={styles.emailInput}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit" className={styles.subscribeBtn}>
            Subscribe
          </button>
        </form>
      </div>

      <div className={styles.columns}>
        {LINK_COLUMNS.map((column) => (
          <div key={column.heading} className={styles.column}>
            <h4 className={styles.columnHeading}>{column.heading}</h4>
            <div className={styles.columnLinks}>
              {column.links.map((label) => (
                <a key={label} href="#" className={styles.columnLink}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.trustRow}>
        <div className={styles.audited}>
          <span className={styles.auditedLabel}>Audited by</span>
          <div className={styles.auditedLogo}>[ LOGO ]</div>
        </div>
        <div className={styles.trustRight}>
          <a href="#" className={styles.walletAddress}>0x4B...8F2</a>
          <div className={styles.networkBadges}>
            <span className={styles.networkBadge}>[ ETHEREUM ]</span>
            <span className={styles.networkBadge}>[ BASE ]</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copyright}>&copy; 2026 FundArc</span>
        <div className={styles.bottomRight}>
          <div className={styles.bottomIcons}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
            </svg>
          </div>
          <div className={styles.localeSelect}>
            <span>EN / USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
