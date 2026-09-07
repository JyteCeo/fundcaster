'use client';

import styles from './Skeleton.module.css';

export function Skeleton({ className = '', style }) {
  return <div className={`${styles.block} ${className}`} style={style} aria-hidden="true" />;
}

export function CardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.tagRow}>
        <Skeleton className={styles.tag} />
        <Skeleton className={styles.livePill} />
      </div>
      <Skeleton className={styles.titleLine} />
      <Skeleton className={styles.descLine} />
      <Skeleton className={styles.descLineShort} />
      <Skeleton className={styles.progress} />
      <div className={styles.statsRow}>
        <Skeleton className={styles.stat} />
        <Skeleton className={styles.statSmall} />
      </div>
      <Skeleton className={styles.link} />
    </div>
  );
}
