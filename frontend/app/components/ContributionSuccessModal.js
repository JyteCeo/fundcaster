'use client';

import { Modal } from './Modal';
import styles from './ContributionSuccessModal.module.css';

function shortHash(value) {
  if (!value) return '';
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

export function ContributionSuccessModal({ isOpen, onClose, txHash, txUrl, onShare, shareCopied }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="contribution-success-title">
      <div className={styles.iconWrap}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h2 id="contribution-success-title" className={styles.title}>Contribution confirmed</h2>
      <p className={styles.subhead}>
        Your funds are now held in escrow on-chain. You can track this transaction any time.
      </p>

      <div className={styles.txRow}>
        <span className={styles.txHash}>{shortHash(txHash)}</span>
        <a
          href={txUrl}
          target="_blank"
          rel="noreferrer"
          className={styles.txLink}
          aria-label="View transaction on Etherscan"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <path d="M15 3h6v6" />
            <path d="M10 14L21 3" />
          </svg>
        </a>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.viewBtn} onClick={onClose}>
          View project
        </button>
        <button type="button" className={styles.shareBtn} onClick={onShare}>
          {shareCopied ? 'Link copied' : 'Share project'}
        </button>
      </div>
    </Modal>
  );
}
