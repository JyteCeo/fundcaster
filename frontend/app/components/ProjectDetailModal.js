'use client';

import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { contractAddress, abi } from '../constants';

export const ProjectDetailModal = ({ 
  project, 
  isOpen, 
  onClose 
}) => {
  const [ethAmount, setEthAmount] = useState('0.5');
  const [usdAmount, setUsdAmount] = useState('');
  const [ethPrice, setEthPrice] = useState(null);

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
    if (isOpen) fetchPrice();
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

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

  const progress = Math.min((parseFloat(project.raised) / parseFloat(project.goal)) * 100, 100);

  // Mock data for donors and transactions
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
    <>
      {/* Backdrop */}
      <div className="detail-modal-overlay" onClick={onClose} />
      
      {/* Modal */}
      <div className="detail-modal">
        {/* Close Button */}
        <button className="detail-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

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
                This project aims to revolutionize the Web3 space by providing innovative solutions 
                for decentralized applications. Our team is committed to building transparent, 
                secure, and user-friendly tools that empower developers and users alike.
              </p>
            </section>

            {/* Team Section */}
            <section className="detail-section">
              <h2 className="detail-section-title">👥 Project Team</h2>
              <ul className="detail-list">
                <li>Lead Developer - Smart Contract Architecture</li>
                <li>Frontend Engineer - UI/UX Design</li>
                <li>Security Auditor - Code Review & Testing</li>
              </ul>
            </section>

            {/* Security Section */}
            <section className="detail-section">
              <h2 className="detail-section-title">🔒 Security & Audits</h2>
              <p className="detail-description">
                All smart contracts are audited and verified on-chain. Funds are held in a 
                transparent escrow until project milestones are met.
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
                <h3 className="detail-card-title">Fund Project</h3>
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
                    {isPending ? '...' : isConfirming ? '⏳' : isConfirmed ? '✓' : 'Fund'}
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
          </div>
        </div>
      </div>
    </>
  );
};
