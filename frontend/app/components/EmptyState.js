'use client';

import Link from 'next/link';
import styles from './EmptyState.module.css';

export function EmptyState({ title, message, actionLabel, actionHref, onAction }) {
  return (
    <div className={styles.empty}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {message && <p className={styles.message}>{message}</p>}
      {actionLabel && actionHref && (
        <Link href={actionHref} className={styles.action}>
          {actionLabel}
        </Link>
      )}
      {actionLabel && !actionHref && onAction && (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
