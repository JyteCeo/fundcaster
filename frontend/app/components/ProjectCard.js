'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { contractAddress, abi } from '../constants';

export const ProjectCard = ({ 
  id,
  title, 
  description, 
  raised, 
  goal, 
  donors, 
  backers,
  status = 'active',
  imageColor,
  icon,
  isOwner = false
}) => {
  const [ethAmount, setEthAmount] = useState('0.1');
  const [usdAmount, setUsdAmount] = useState('');
  const [ethPrice, setEthPrice] = useState(null);

  // Wagmi Hooks
  const { data: hash, isPending, writeContract, reset } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // Reset state after success
  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        reset();
      }, 3000);
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
          setUsdAmount((0.1 * data.ethereum.usd).toFixed(2));
        } else {
          throw new Error("Invalid Price Data");
        }
      } catch (error) {
        console.error("Failed to fetch ETH price", error);
        setEthPrice(2500);
        setUsdAmount((0.1 * 2500).toFixed(2));
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

  const handleUsdChange = (e) => {
    const val = e.target.value;
    setUsdAmount(val);
    if (ethPrice && val) {
      setEthAmount((parseFloat(val) / ethPrice).toFixed(4));
    } else {
      setEthAmount('');
    }
  };

  const handleFund = async (e) => {
    e.preventDefault();
    e.stopPropagation();
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

  const progress = Math.min((parseFloat(raised) / parseFloat(goal)) * 100, 100);
  
  return (
    <div className="platform-card">
      {/* Clickable Header - Links to Detail Page */}
      <Link href={`/project/${id}`} className="card-header-link">
        <div className="card-header" style={{ background: `linear-gradient(180deg, ${imageColor}20, transparent)` }}>
          <div className="status-badge" data-status={status}>
            {status === 'active' ? 'ACTIVE FUNDING' : 'COMPLETED'}
          </div>
          {status === 'active' && <div className="live-badge">((•)) LIVE</div>}
          
          <div className="project-visual">
            <div className="visual-icon" style={{ boxShadow: `0 0 30px ${imageColor}60` }}>{icon}</div>
          </div>
        </div>
      </Link>

      <div className="card-content">
        {/* Clickable Title - Links to Detail Page */}
        <Link href={`/project/${id}`} className="card-title-link">
          <h3>{title}</h3>
        </Link>
        <p>{description}</p>

        <div className="progress-section">
          {/* Progress Bar */}
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${progress}%`,
                background: status === 'active' 
                  ? 'linear-gradient(90deg, #38bdf8, #818cf8)' 
                  : 'linear-gradient(90deg, #38bdf8, #38bdf8)' 
              }}
            ></div>
          </div>
          
          <div className="stats-row" style={{ marginBottom: '20px' }}>
            <div className="stat-group">
              <span className="stat-value">{raised} ETH</span>
              <span className="stat-sub">Raised</span>
            </div>
            <div className="stat-group right">
              <span className="stat-value">{goal} ETH</span>
              <span className="stat-sub">Goal</span>
            </div>
          </div>

          {/* Funding Actions */}
          {status === 'active' && (
            <div className="fund-actions">
              <div className="input-group">
                <div className="input-box">
                  <div className="input-field-wrapper">
                    <input 
                      type="number" 
                      className="fund-input" 
                      value={ethAmount}
                      onChange={handleEthChange}
                      placeholder="0.1"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="input-suffix">ETH</span>
                  </div>
                </div>
                <div className="input-box">
                  <div className="input-field-wrapper">
                    <input 
                      type="number" 
                      className="fund-input" 
                      value={usdAmount}
                      onChange={handleUsdChange}
                      placeholder="0.00"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="input-suffix">USD</span>
                  </div>
                </div>
              </div>
              
              <button 
                className="btn-quick-fund-action" 
                onClick={handleFund}
                disabled={isPending || isConfirming}
                style={{ opacity: (isPending || isConfirming) ? 0.7 : 1 }}
              >
                {isPending ? 'Confirming...' : isConfirming ? 'Processing...' : isConfirmed ? '✓ Funded!' : 'Fund Now'}
              </button>

              {isOwner && (
                <button className="btn-withdraw" onClick={(e) => e.stopPropagation()}>
                  Withdraw
                </button>
              )}
            </div>
          )}

          {/* View Details Link for Completed Projects */}
          {status === 'completed' && (
            <Link href={`/project/${id}`} className="card-details-link">
              View Project Details →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
