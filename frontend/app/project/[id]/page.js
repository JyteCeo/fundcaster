'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { getProjectById } from '../../data/projects';
import { contractAddress, abi } from '../../constants';
import { CustomConnectButton } from '../../components/CustomConnectButton';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [ethAmount, setEthAmount] = useState('0.5');
  const [usdAmount, setUsdAmount] = useState('');
  const [ethPrice, setEthPrice] = useState(null);

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
      <main className="detail-page">
        <nav className="navbar">
          <Link href="/" style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.5px', textDecoration: 'none', color: 'white' }}>
            <span style={{ color: '#3b82f6' }}>Fund</span>Caster
          </Link>
          <CustomConnectButton />
        </nav>
        <div className="detail-loading">Loading project...</div>
      </main>
    );
  }

  const progress = Math.min((parseFloat(project.raised) / parseFloat(project.goal)) * 100, 100);

  // Mock data
  const topDonors = [
    { address: '0xShav...rB6', amount: '2.0', avatar: '👨‍💻' },
    { address: '0xRand...ll1', amount: '1.5', avatar: '👩‍🔬' },
    { address: '0xDev...x42', amount: '1.2', avatar: '🧑‍🎨' },
  ];

  const recentTxns = [
    { address: '0x1234...', amount: '+1.2 ETH', time: '2 mins ago' },
    { address: '0x5678...', amount: '+0.5 ETH', time: '5 mins ago' },
    { address: '0x9abc...', amount: '+2.0 ETH', time: '12 mins ago' },
  ];

  return (
    <main className="detail-page">
      {/* Navbar */}
      <nav className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <Link href="/" style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.5px', textDecoration: 'none', color: 'white' }}>
            <span style={{ color: '#3b82f6' }}>Fund</span>Caster
          </Link>
          <div className="nav-links nav-links-desktop">
            <Link href="/" className="nav-link">← Back to Projects</Link>
          </div>
        </div>
        <CustomConnectButton />
      </nav>

      {/* Main Content */}
      <div className="detail-container">
        <div className="detail-modal-grid">
          {/* LEFT COLUMN - Project Content */}
          <div className="detail-left">
            {/* Hero Visual */}
            <div className="detail-hero" style={{ background: `linear-gradient(135deg, ${project.imageColor}30, ${project.imageColor}10)` }}>
              <div className="detail-hero-icon" style={{ textShadow: `0 0 40px ${project.imageColor}` }}>
                {project.icon}
              </div>
            </div>

            {/* Title */}
            <h1 className="detail-title">{project.title}</h1>
            
            {/* Status Badges */}
            <div className="detail-badges">
              <span className="status-badge" data-status={project.status}>
                {project.status === 'active' ? 'ACTIVE FUNDING' : 'COMPLETED'}
              </span>
              {project.status === 'active' && <span className="live-badge">((•)) LIVE</span>}
            </div>

            {/* Project Story Section */}
            <section className="detail-section">
              <h2 className="detail-section-title">📖 Project Story</h2>
              <p className="detail-description">
                {project.description}
              </p>
              <p className="detail-description">
                Our mission is to revolutionize the Web3 ecosystem by creating tools and infrastructure 
                that empower developers and users. We believe in transparency, security, and community-driven 
                development. Every contribution helps us move closer to a truly decentralized future.
              </p>
              <p className="detail-description">
                The funds raised will be used for smart contract development, security audits, 
                infrastructure costs, and community growth initiatives.
              </p>
            </section>

            {/* Team Section */}
            <section className="detail-section">
              <h2 className="detail-section-title">👥 Project Team</h2>
              <ul className="detail-list">
                <li><strong>Lead Developer</strong> - Smart Contract Architecture & Solidity</li>
                <li><strong>Frontend Engineer</strong> - React, Next.js & Web3 Integration</li>
                <li><strong>Security Auditor</strong> - Code Review, Testing & Audit Coordination</li>
                <li><strong>Community Manager</strong> - Discord, Twitter & User Support</li>
              </ul>
            </section>

            {/* Roadmap Section */}
            <section className="detail-section">
              <h2 className="detail-section-title">🗺️ Roadmap</h2>
              <ul className="detail-list">
                <li><strong>Phase 1:</strong> Smart contract development and testing</li>
                <li><strong>Phase 2:</strong> Security audit by leading firms</li>
                <li><strong>Phase 3:</strong> Mainnet deployment and beta launch</li>
                <li><strong>Phase 4:</strong> Community governance and DAO transition</li>
              </ul>
            </section>

            {/* Security Section */}
            <section className="detail-section">
              <h2 className="detail-section-title">🔒 Security & Audits</h2>
              <p className="detail-description">
                All smart contracts undergo rigorous testing and are audited by industry-leading security firms. 
                We implement multi-signature wallets, timelocks, and transparent fund management. 
                All code is open source and verified on-chain for full transparency.
              </p>
            </section>
          </div>

          {/* RIGHT COLUMN - Funding Sidebar */}
          <div className="detail-right">
            {/* Funding Stats Card */}
            <div className="detail-card">
              <div className="detail-raised">
                <span className="detail-raised-amount">{project.raised} ETH</span>
                <span className="detail-raised-label">Total Raised</span>
              </div>
              <div className="detail-goal">Goal: {project.goal} ETH</div>
              
              {/* Progress Bar */}
              <div className="progress-bar-bg" style={{ height: '8px', marginTop: '12px' }}>
                <div 
                  className="progress-bar-fill" 
                  style={{ 
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #38bdf8, #818cf8)'
                  }}
                />
              </div>
              <div className="detail-progress-text">{progress.toFixed(0)}% funded</div>

              {/* Donors & Share */}
              <div className="detail-donors-row">
                <span>👥 {project.backers} Donors</span>
                <div className="detail-share-btns">
                  <button className="detail-share-btn">🐦 Share</button>
                  <button className="detail-share-btn">📤 Share</button>
                </div>
              </div>
            </div>

            {/* Fund Project Card */}
            {project.status === 'active' && (
              <div className="detail-card">
                <h3 className="detail-card-title">Fund This Project</h3>
                <label className="detail-input-label">Amount in ETH</label>
                <div className="detail-fund-row">
                  <input
                    type="number"
                    className="detail-fund-input"
                    value={ethAmount}
                    onChange={handleEthChange}
                    placeholder="0.5"
                    step="0.01"
                  />
                  <button 
                    className="detail-fund-btn"
                    onClick={handleFund}
                    disabled={isPending || isConfirming}
                  >
                    {isPending ? '...' : isConfirming ? '⏳' : isConfirmed ? '✓ Funded!' : 'Fund'}
                  </button>
                </div>
                {usdAmount && (
                  <div className="detail-usd-equiv">≈ ${usdAmount} USD</div>
                )}
                
                {project.isOwner && (
                  <button className="detail-withdraw-btn">
                    Withdraw (Owner Only)
                  </button>
                )}
              </div>
            )}

            {/* Top Donors Card */}
            <div className="detail-card">
              <h3 className="detail-card-title">Top Donors</h3>
              <div className="detail-donors-list">
                {topDonors.map((donor, i) => (
                  <div key={i} className="detail-donor-item">
                    <span className="detail-donor-avatar">{donor.avatar}</span>
                    <span className="detail-donor-address">{donor.address}</span>
                    <span className="detail-donor-amount">{donor.amount} ETH</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Transactions Card */}
            <div className="detail-card">
              <h3 className="detail-card-title">Recent Transactions</h3>
              <div className="detail-txns-list">
                {recentTxns.map((tx, i) => (
                  <div key={i} className="detail-txn-item">
                    <span className="detail-txn-address">{tx.address}</span>
                    <span className="detail-txn-amount">{tx.amount}</span>
                    <span className="detail-txn-time">{tx.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Back Button */}
            <Link href="/" className="detail-back-btn">
              ← Back to All Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
