'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { parseEther } from 'viem';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { getProjectById } from '../../data/projects';
import { contractAddress, abi } from '../../constants';
import styles from './page.module.css';

const QUICK_AMOUNTS = [0.05, 0.1, 0.5, 1];
const TABS = ['story', 'milestones', 'updates', 'backers'];

function shortAddress(value) {
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export default function ProjectDetailPage() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('story');
  const [isFollowing, setIsFollowing] = useState(false);
  const [ethAmount, setEthAmount] = useState('0.5');
  const [usdAmount, setUsdAmount] = useState('');
  const [ethPrice, setEthPrice] = useState(null);

  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const chainId = useChainId();

  // Get project data
  useEffect(() => {
    const projectData = getProjectById(params.id);
    if (projectData) {
      setProject(projectData);
    }
  }, [params.id]);

  // Wagmi Hooks
  const { data: hash, isPending, writeContract, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // Reset after success
  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => reset(), 3000);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, reset]);

  // Fetch ETH Price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        if (data?.ethereum?.usd) {
          setEthPrice(data.ethereum.usd);
          setUsdAmount((0.5 * data.ethereum.usd).toFixed(2));
        }
      } catch (error) {
        setEthPrice(2500);
        setUsdAmount((0.5 * 2500).toFixed(2));
      }
    };
    fetchPrice();
  }, []);

  const handleEthChange = (e) => {
    const val = e.target.value;
    setEthAmount(val);
    if (ethPrice && val) {
      setUsdAmount((parseFloat(val) * ethPrice).toFixed(2));
    } else {
      setUsdAmount('');
    }
  };

  const handleQuickSelect = (value) => {
    setEthAmount(String(value));
    if (ethPrice) {
      setUsdAmount((value * ethPrice).toFixed(2));
    }
  };

  const handleFund = async () => {
    if (!ethAmount) return;
    try {
      writeContract({
        address: contractAddress,
        abi: abi,
        functionName: 'fund',
        value: parseEther(ethAmount),
      });
    } catch (error) {
      console.error("Fund failed:", error);
    }
  };

  // Loading state
  if (!project) {
    return (
      <main className={styles.page}>
        <div className={styles.loading}>Loading project...</div>
      </main>
    );
  }

  const progress = Math.min((parseFloat(project.raised) / parseFloat(project.goal)) * 100, 100);
  const isSepolia = chainId === sepolia.id;
  const networkName = isSepolia ? 'Sepolia Testnet' : 'Ethereum Mainnet';
  const etherscanBase = isSepolia ? 'https://sepolia.etherscan.io' : 'https://etherscan.io';
  const etherscanUrl = `${etherscanBase}/address/${contractAddress}`;
  const daysLeftLabel = project.status === 'past' ? 'Ended' : `${project.daysLeft}d`;
  const tickerBackers = [...project.recentBackers, ...project.recentBackers];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Discover</Link>
          <span>/</span>
          <span>{project.category}</span>
          <span>/</span>
          <span className={styles.breadcrumbCurrent}>{project.title}</span>
        </nav>

        <div className={styles.grid}>
          {/* Main content */}
          <div className={styles.main}>
            <header className={styles.header}>
              <div className={styles.tagRow}>
                <span className={styles.tag}>[ {project.category} ]</span>
                {project.status === 'active' && (
                  <span className={styles.live}>
                    <span className={styles.liveDot} />
                    Live
                  </span>
                )}
              </div>
              <h1 className={styles.title}>{project.title}</h1>
              <p className={styles.subhead}>{project.tagline}</p>
            </header>

            {/* Cover image area */}
            {project.coverImage ? (
              <div className={styles.cover}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.coverImage} alt={project.title} className={styles.coverImage} />
              </div>
            ) : (
              <div className={styles.cover} style={{ backgroundColor: `${project.imageColor}14` }}>
                <div className={styles.coverPlaceholder}>
                  <span className={styles.coverCategory}>[ {project.category} ]</span>
                  <span className={styles.coverTitle}>{project.title}</span>
                </div>
              </div>
            )}

            {/* Creator row */}
            <div className={styles.creatorRow}>
              <div className={styles.creatorInfo}>
                <span className={styles.avatar}>{initials(project.creator.name)}</span>
                <div>
                  <div className={styles.creatorNameRow}>
                    <span className={styles.creatorName}>{project.creator.name}</span>
                    {project.creator.verified && (
                      <span className={styles.verifiedMark}>
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <span className={styles.creatorAddress}>{shortAddress(project.creator.address)}</span>
                </div>
              </div>
              <button
                type="button"
                className={`${styles.followBtn} ${isFollowing ? styles.followBtnActive : ''}`}
                onClick={() => setIsFollowing((prev) => !prev)}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>

            {/* Content tabs */}
            <section>
              <div className={styles.tabs}>
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'updates' ? `Updates (${project.updates.length})` : tab}
                  </button>
                ))}
              </div>

              {activeTab === 'story' && (
                <article className={styles.story}>
                  {project.story.map((section) => (
                    <div key={section.heading} className={styles.storySection}>
                      <h3 className={styles.sectionTitle}>{section.heading}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </article>
              )}

              {activeTab === 'milestones' && (
                <div className={styles.timeline}>
                  {project.milestones.map((milestone, index) => (
                    <div key={milestone.title} className={styles.timelineItem}>
                      <div className={styles.timelineMarker}>
                        <span className={`${styles.timelineDot} ${styles[`dot-${milestone.status}`]}`} />
                        {index < project.milestones.length - 1 && (
                          <span className={styles.timelineLine} />
                        )}
                      </div>
                      <div className={styles.timelineContent}>
                        <div className={styles.timelineTop}>
                          <span className={styles.timelineTitle}>{milestone.title}</span>
                          <span className={styles.timelineTarget}>{milestone.target}</span>
                        </div>
                        <span className={`${styles.timelineStatus} ${styles[`status-${milestone.status}`]}`}>
                          {milestone.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'updates' && (
                <div className={styles.updatesList}>
                  {project.updates.map((update) => (
                    <div key={update.title} className={styles.updateItem}>
                      <span className={styles.updateDate}>{update.date}</span>
                      <h4 className={styles.updateTitle}>{update.title}</h4>
                      <p className={styles.updateBody}>{update.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'backers' && (
                <div className={styles.backersList}>
                  {project.recentBackers.map((backer) => (
                    <div key={`${backer.address}-${backer.time}`} className={styles.backerRow}>
                      <span className={styles.backerAddress}>{backer.address}</span>
                      <span className={styles.backerAmount}>{backer.amount} ETH</span>
                      <span className={styles.backerTime}>{backer.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Transparency panel */}
            <div className={styles.transparency}>
              <h3 className={styles.transparencyTitle}>Escrow &amp; verification</h3>
              <p className={styles.transparencyNote}>
                Contributions are sent directly to the contract below and can be
                withdrawn by the project owner. This contract does not currently
                implement automatic refunds if a goal is missed, so always review
                the contract on Etherscan before funding.
              </p>
              <div className={styles.transparencyRow}>
                <a
                  href={etherscanUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.contractLink}
                >
                  Contract: {shortAddress(contractAddress)} ↗
                </a>
                <span className={styles.transparencyDivider}>|</span>
                <span className={styles.network}>{networkName}</span>
              </div>
            </div>
          </div>

          {/* Funding sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.widget}>
              <div className={styles.fundedRow}>
                <span className={styles.fundedLabel}>Funded</span>
                <span className={styles.fundedPercent}>{progress.toFixed(0)}%</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
              <div className={styles.raisedRow}>
                <span className={styles.raisedValue}>{project.raised}</span> / {project.goal} ETH
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statBlock}>
                  <span className={styles.statLabel}>Backers</span>
                  <span className={styles.statValue}>{project.backers}</span>
                </div>
                <div className={styles.statBlock}>
                  <span className={styles.statLabel}>Days left</span>
                  <span className={styles.statValue}>{daysLeftLabel}</span>
                </div>
                <div className={`${styles.statBlock} ${styles.statBlockWide}`}>
                  <span className={styles.statLabel}>Min. contribution</span>
                  <span className={styles.minContributionValue}>{project.minContribution} ETH</span>
                </div>
              </div>

              {project.status !== 'active' ? (
                <p className={styles.closedNote}>
                  {project.status === 'upcoming'
                    ? 'Funding opens soon.'
                    : 'Funding for this project has closed.'}
                </p>
              ) : !isConnected ? (
                <div className={styles.connectPrompt}>
                  <p className={styles.connectNote}>Connect your wallet to fund this project.</p>
                  <button type="button" className={styles.fundBtn} onClick={openConnectModal}>
                    Connect wallet to fund
                  </button>
                </div>
              ) : (
                <div className={styles.fundForm}>
                  <div className={styles.inputWrap}>
                    <input
                      type="number"
                      className={styles.amountInput}
                      value={ethAmount}
                      onChange={handleEthChange}
                      placeholder="0.5"
                      step="0.01"
                    />
                    <span className={styles.inputSuffix}>ETH</span>
                  </div>
                  {usdAmount && <div className={styles.usdEquiv}>≈ ${usdAmount} USD</div>}
                  <div className={styles.chips}>
                    {QUICK_AMOUNTS.map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`${styles.chip} ${parseFloat(ethAmount) === value ? styles.chipActive : ''}`}
                        onClick={() => handleQuickSelect(value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className={styles.fundBtn}
                    onClick={handleFund}
                    disabled={isPending || isConfirming}
                  >
                    {isPending ? 'Confirm in wallet…' : isConfirming ? 'Processing…' : isConfirmed ? 'Funded ✓' : 'Fund now'}
                  </button>
                  <div className={styles.gasNote}>Est. gas: ~0.0012 ETH</div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Recent backers ticker */}
        <div className={styles.ticker}>
          <span className={styles.tickerLabel}>Recent</span>
          <div className={styles.tickerTrack}>
            <div className={styles.tickerInner}>
              {tickerBackers.map((backer, index) => (
                <span key={`${backer.address}-${index}`} className={styles.tickerItem}>
                  {backer.address} contributed {backer.amount} ETH
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
