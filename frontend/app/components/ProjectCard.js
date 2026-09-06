'use client';

import Link from 'next/link';
import styles from './ProjectCard.module.css';

export const ProjectCard = ({
  id,
  title,
  description,
  raised,
  goal,
  backers,
  status = 'active',
}) => {
  const progress = Math.min((parseFloat(raised) / parseFloat(goal)) * 100, 100);

  return (
    <div className={styles.card}>
      <div className={styles.tagRow}>
        <span className={styles.tag}>[ {status.toUpperCase()} ]</span>
        {status === 'active' && (
          <span className={styles.live}>
            <span className={styles.liveDot} />
            Live
          </span>
        )}
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.statsRow}>
        <span className={styles.raised}>{raised} / {goal} ETH</span>
        <div className={styles.backers}>
          <span className={styles.backersLabel}>Backers</span>
          <span className={styles.backersValue}>{backers}</span>
        </div>
      </div>

      <Link href={`/project/${id}`} className={styles.viewLink}>
        View project
      </Link>
    </div>
  );
};
