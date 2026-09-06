'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';
import styles from './page.module.css';

const STEPS = [
  { id: 1, code: '01', label: 'Basics' },
  { id: 2, code: '02', label: 'Story' },
  { id: 3, code: '03', label: 'Funding' },
  { id: 4, code: '04', label: 'Payout' },
  { id: 5, code: '05', label: 'Review' },
];

const CATEGORY_OPTIONS = [...new Set(projects.map((project) => project.category))].sort();

const TITLE_MAX = 60;
const TAGLINE_MAX = 120;
const ESTIMATED_GAS_ETH = 0.004;

function generateHex(length) {
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += Math.floor(Math.random() * 16).toString(16);
  }
  return out;
}

export default function StartFundraiserPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tagline: '',
    coverImageName: '',
    story: [{ heading: '', body: '' }],
    fundingGoal: '',
    durationDays: '',
    minContribution: '',
    milestones: [],
    payoutSchedule: '',
  });
  const [isDragging, setIsDragging] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [ethPrice, setEthPrice] = useState(null);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [deployment, setDeployment] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);
  const fileInputRef = useRef(null);

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  useEffect(() => {
    let cancelled = false;
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        if (!cancelled && data?.ethereum?.usd) {
          setEthPrice(data.ethereum.usd);
        }
      } catch (error) {
        if (!cancelled) setEthPrice(2500);
      }
    };
    fetchPrice();
    return () => {
      cancelled = true;
    };
  }, []);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (file) => {
    if (file) updateField('coverImageName', file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files?.[0]);
  };

  const updateStorySection = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      story: prev.story.map((section, i) => (i === index ? { ...section, [field]: value } : section)),
    }));
  };

  const addStorySection = () => {
    setFormData((prev) => ({ ...prev, story: [...prev.story, { heading: '', body: '' }] }));
  };

  const removeStorySection = (index) => {
    setFormData((prev) => ({ ...prev, story: prev.story.filter((_, i) => i !== index) }));
  };

  const updateMilestone = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m, i) => (i === index ? { ...m, [field]: value } : m)),
    }));
  };

  const addMilestone = () => {
    setFormData((prev) => ({ ...prev, milestones: [...prev.milestones, { title: '', target: '' }] }));
  };

  const removeMilestone = (index) => {
    setFormData((prev) => ({ ...prev, milestones: prev.milestones.filter((_, i) => i !== index) }));
  };

  const goToStep = (id) => {
    if (id < step) setStep(id);
  };

  const handleContinue = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeployment({
        contractAddress: `0x${generateHex(40)}`,
        txHash: `0x${generateHex(64)}`,
      });
      setDeploying(false);
      setDeployed(true);
    }, 1400);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${formData.title.trim() || 'Untitled campaign'} — built with FundArc`);
    } catch (error) {
      // clipboard unavailable in this context; the copy is a nice-to-have
    }
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 3000);
  };

  const previewTitle = formData.title.trim() || 'Untitled campaign';
  const previewTagline =
    formData.tagline.trim() || 'Your campaign tagline will appear here as you type.';

  const basicsValid = Boolean(formData.title.trim() && formData.category && formData.tagline.trim());

  const storyValid =
    formData.story.length > 0 && formData.story.every((s) => s.heading.trim() && s.body.trim());

  const fundingGoalNum = parseFloat(formData.fundingGoal);
  const durationNum = parseInt(formData.durationDays, 10);
  const minContributionNum = parseFloat(formData.minContribution);
  const milestonesValid = formData.milestones.every((m) => m.title.trim() && parseFloat(m.target) > 0);
  const fundingValid =
    fundingGoalNum > 0 && durationNum > 0 && minContributionNum > 0 && milestonesValid;

  const payoutValid = isConnected && Boolean(formData.payoutSchedule);

  const stepValidity = { 1: basicsValid, 2: storyValid, 3: fundingValid, 4: payoutValid };
  const canContinue = stepValidity[step] ?? true;

  const fundingGoalUsd =
    ethPrice && fundingGoalNum > 0 ? (fundingGoalNum * ethPrice).toFixed(2) : null;
  const gasUsd = ethPrice ? (ESTIMATED_GAS_ETH * ethPrice).toFixed(2) : null;

  if (deployed) {
    return (
      <main>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <header>
            <h1 className={styles.successTitle}>{previewTitle}</h1>
            <p className={styles.successSubhead}>
              Your campaign has been prepared for deployment. This is a preview flow — no smart
              contract has actually been deployed.
            </p>
          </header>

          <div className={styles.successDetails}>
            <div className={styles.successRow}>
              <span className={styles.reviewLabel}>Contract address (placeholder)</span>
              <div className={styles.addressBox}>{deployment?.contractAddress}</div>
            </div>
            <div className={styles.successRow}>
              <span className={styles.reviewLabel}>Transaction hash (placeholder)</span>
              <div className={styles.addressBox}>{deployment?.txHash}</div>
            </div>
          </div>

          <p className={styles.successCaveat}>
            These values are generated locally for preview purposes only. The campaign-creation
            contract hasn&apos;t been built yet, so nothing was sent to the blockchain.
          </p>

          <div className={styles.successActions}>
            <Link href="/" className={styles.primaryBtnLink}>View campaign</Link>
            <button type="button" className={styles.ghostBtn} onClick={handleShare}>
              {shareCopied ? 'Link copied' : 'Share'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className={styles.stepperBar}>
        <ol className={styles.stepper}>
          {STEPS.map((s) => {
            const state = s.id < step ? 'complete' : s.id === step ? 'current' : 'upcoming';
            return (
              <li key={s.id} className={styles.stepItem} data-state={state}>
                <span className={styles.stepLine} />
                <button
                  type="button"
                  className={styles.stepLabel}
                  disabled={s.id >= step}
                  onClick={() => goToStep(s.id)}
                >
                  {state !== 'upcoming' && <span className={styles.stepDot} />}
                  {s.code} {s.label}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.formCol}>
            {step === 1 ? (
              <>
                <div className={styles.intro}>
                  <h1 className={styles.heading}>Campaign basics</h1>
                  <p className={styles.subhead}>
                    Establish the core identity of your fundraiser. This information anchors
                    your campaign and is the first thing backers see.
                  </p>
                </div>

                <div className={styles.form}>
                  <div className={styles.field}>
                    <div className={styles.fieldHead}>
                      <label className={styles.label} htmlFor="title">Project title</label>
                      <span className={styles.counter}>{formData.title.length} / {TITLE_MAX}</span>
                    </div>
                    <input
                      id="title"
                      type="text"
                      className={styles.titleInput}
                      value={formData.title}
                      maxLength={TITLE_MAX}
                      placeholder="The Sovereign Archive Project"
                      onChange={(e) => updateField('title', e.target.value)}
                    />
                    <p className={styles.helper}>A clear, striking title for your campaign ledger.</p>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="category">Category</label>
                    <select
                      id="category"
                      className={styles.select}
                      value={formData.category}
                      onChange={(e) => updateField('category', e.target.value)}
                    >
                      <option value="">Select a category</option>
                      {CATEGORY_OPTIONS.map((code) => (
                        <option key={code} value={code}>{code}</option>
                      ))}
                    </select>
                    <p className={styles.helper}>Pick the category that best fits your project.</p>
                  </div>

                  <div className={styles.field}>
                    <div className={styles.fieldHead}>
                      <label className={styles.label} htmlFor="tagline">Short tagline</label>
                      <span className={styles.counter}>{formData.tagline.length} / {TAGLINE_MAX}</span>
                    </div>
                    <textarea
                      id="tagline"
                      className={styles.textarea}
                      rows={2}
                      maxLength={TAGLINE_MAX}
                      value={formData.tagline}
                      placeholder="Preserving critical open-source data through decentralized storage networks."
                      onChange={(e) => updateField('tagline', e.target.value)}
                    />
                    <p className={styles.helper}>One sentence that sums up what backers are funding.</p>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Cover image</label>
                    <div
                      className={`${styles.dropzone} ${isDragging ? styles.dropzoneActive : ''}`}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      role="button"
                      tabIndex={0}
                    >
                      <span className={styles.dropzoneIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 16V4M12 4l-5 5M12 4l5 5" />
                          <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
                        </svg>
                      </span>
                      <span className={styles.dropzoneText}>
                        {formData.coverImageName || 'Drag & drop or click to browse'}
                      </span>
                      <span className={styles.dropzoneHint}>Recommended size: 1200 x 630px (max 5MB)</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className={styles.hiddenInput}
                        onChange={(e) => handleFileSelect(e.target.files?.[0])}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.actions}>
                  {draftSaved && <span className={styles.savedNote}>Draft saved</span>}
                  <button type="button" className={styles.ghostBtn} onClick={handleSaveDraft}>
                    Save draft
                  </button>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    disabled={!canContinue}
                    onClick={handleContinue}
                  >
                    Continue to story
                  </button>
                </div>
              </>
            ) : step === 2 ? (
              <>
                <div className={styles.intro}>
                  <h1 className={styles.heading}>Tell your story</h1>
                  <p className={styles.subhead}>
                    Break your pitch into sections backers can scan: the problem, your approach,
                    and where the funds go.
                  </p>
                </div>

                <div className={styles.form}>
                  {formData.story.map((section, index) => (
                    <div key={index} className={styles.field}>
                      <div className={styles.fieldHead}>
                        <label className={styles.label} htmlFor={`story-heading-${index}`}>
                          Section {index + 1} heading
                        </label>
                        {formData.story.length > 1 && (
                          <button
                            type="button"
                            className={styles.removeBtn}
                            onClick={() => removeStorySection(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        id={`story-heading-${index}`}
                        type="text"
                        className={styles.sectionHeadingInput}
                        value={section.heading}
                        placeholder="Why this matters"
                        onChange={(e) => updateStorySection(index, 'heading', e.target.value)}
                      />
                      <span className={styles.subLabel}>Body</span>
                      <textarea
                        className={styles.textarea}
                        rows={4}
                        value={section.body}
                        placeholder="Explain this part of your project in a paragraph or two."
                        onChange={(e) => updateStorySection(index, 'body', e.target.value)}
                      />
                    </div>
                  ))}

                  <button type="button" className={styles.addRowBtn} onClick={addStorySection}>
                    + Add another section
                  </button>
                </div>

                <div className={styles.actions}>
                  <button type="button" className={styles.ghostBtn} onClick={handleBack}>
                    Back
                  </button>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    disabled={!canContinue}
                    onClick={handleContinue}
                  >
                    Continue to funding
                  </button>
                </div>
              </>
            ) : step === 3 ? (
              <>
                <div className={styles.intro}>
                  <h1 className={styles.heading}>Funding structure</h1>
                  <p className={styles.subhead}>
                    Set your goal, timeline, and minimum contribution. Milestones are optional
                    but help backers trust the plan.
                  </p>
                </div>

                <div className={styles.form}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="fundingGoal">Funding goal</label>
                    <div className={styles.amountField}>
                      <input
                        id="fundingGoal"
                        type="number"
                        min="0"
                        step="0.01"
                        className={styles.amountInput}
                        value={formData.fundingGoal}
                        placeholder="50"
                        onChange={(e) => updateField('fundingGoal', e.target.value)}
                      />
                      <span className={styles.amountSuffix}>ETH</span>
                    </div>
                    <p className={styles.helper}>
                      {fundingGoalUsd ? `≈ $${fundingGoalUsd} USD` : 'Fetching live ETH price…'}
                    </p>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="durationDays">Campaign duration</label>
                    <div className={styles.amountField}>
                      <input
                        id="durationDays"
                        type="number"
                        min="1"
                        step="1"
                        className={styles.amountInput}
                        value={formData.durationDays}
                        placeholder="30"
                        onChange={(e) => updateField('durationDays', e.target.value)}
                      />
                      <span className={styles.amountSuffix}>DAYS</span>
                    </div>
                    <p className={styles.helper}>How long backers have to fund this campaign.</p>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="minContribution">Minimum contribution</label>
                    <div className={styles.amountField}>
                      <input
                        id="minContribution"
                        type="number"
                        min="0"
                        step="0.001"
                        className={styles.amountInput}
                        value={formData.minContribution}
                        placeholder="0.01"
                        onChange={(e) => updateField('minContribution', e.target.value)}
                      />
                      <span className={styles.amountSuffix}>ETH</span>
                    </div>
                    <p className={styles.helper}>The smallest contribution a backer can make.</p>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Milestones (optional)</label>
                    <p className={styles.sectionHelper}>
                      Split your goal into funding milestones backers can track.
                    </p>

                    {formData.milestones.map((milestone, index) => (
                      <div key={index} className={styles.milestoneRow}>
                        <input
                          type="text"
                          className={styles.milestoneTitleInput}
                          value={milestone.title}
                          placeholder="Milestone title"
                          onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                        />
                        <div className={styles.amountField}>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            className={styles.amountInput}
                            value={milestone.target}
                            placeholder="10"
                            onChange={(e) => updateMilestone(index, 'target', e.target.value)}
                          />
                          <span className={styles.amountSuffix}>ETH</span>
                        </div>
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => removeMilestone(index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}

                    <button type="button" className={styles.addRowBtn} onClick={addMilestone}>
                      + Add milestone
                    </button>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button type="button" className={styles.ghostBtn} onClick={handleBack}>
                    Back
                  </button>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    disabled={!canContinue}
                    onClick={handleContinue}
                  >
                    Continue to payout
                  </button>
                </div>
              </>
            ) : step === 4 ? (
              <>
                <div className={styles.intro}>
                  <h1 className={styles.heading}>Payout details</h1>
                  <p className={styles.subhead}>
                    Confirm where funds are sent and how they&apos;re released.
                  </p>
                </div>

                <div className={styles.form}>
                  <div className={styles.field}>
                    <label className={styles.label}>Payout address</label>
                    {isConnected ? (
                      <div className={styles.addressBox}>{address}</div>
                    ) : (
                      <div className={styles.connectBox}>
                        <p className={styles.sectionHelper}>
                          Connect a wallet to receive funds from this campaign.
                        </p>
                        <button type="button" className={styles.ghostBtn} onClick={openConnectModal}>
                          Connect wallet
                        </button>
                      </div>
                    )}
                    <p className={styles.helper}>
                      Funds raised are sent to this address according to your payout schedule.
                    </p>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Payout schedule</label>
                    <div className={styles.choiceRow}>
                      <button
                        type="button"
                        className={styles.choiceBtn}
                        data-active={formData.payoutSchedule === 'milestones'}
                        onClick={() => updateField('payoutSchedule', 'milestones')}
                      >
                        At milestones
                      </button>
                      <button
                        type="button"
                        className={styles.choiceBtn}
                        data-active={formData.payoutSchedule === 'end'}
                        onClick={() => updateField('payoutSchedule', 'end')}
                      >
                        At campaign end
                      </button>
                    </div>
                    <p className={styles.helper}>
                      {formData.payoutSchedule === 'milestones'
                        ? 'Funds release incrementally as each milestone is marked complete.'
                        : formData.payoutSchedule === 'end'
                        ? 'Funds release in a single payout once the campaign closes.'
                        : 'Choose when raised funds are released to you.'}
                    </p>
                  </div>

                  <div className={styles.noteBox}>
                    Funds are held in a smart-contract escrow, not by FundArc, until your payout
                    conditions are met. A small protocol fee is deducted from each payout to cover
                    network and platform costs.
                  </div>
                </div>

                <div className={styles.actions}>
                  <button type="button" className={styles.ghostBtn} onClick={handleBack}>
                    Back
                  </button>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    disabled={!canContinue}
                    onClick={handleContinue}
                  >
                    Continue to review
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.intro}>
                  <h1 className={styles.heading}>Review &amp; deploy</h1>
                  <p className={styles.subhead}>
                    Double check everything below. Once deployed, campaign parameters can&apos;t
                    be changed.
                  </p>
                </div>

                <div className={styles.reviewPanel}>
                  <h2 className={styles.reviewTitle}>{previewTitle}</h2>

                  <div className={styles.reviewGrid}>
                    <div className={styles.reviewBlock}>
                      <span className={styles.reviewLabel}>Category</span>
                      <span className={styles.reviewValue}>{formData.category || '—'}</span>
                    </div>
                    <div className={styles.reviewBlock}>
                      <span className={styles.reviewLabel}>Cover image</span>
                      <span className={styles.reviewValue}>{formData.coverImageName || 'Not set'}</span>
                    </div>
                    <div className={styles.reviewBlock}>
                      <span className={styles.reviewLabel}>Funding goal</span>
                      <span className={styles.reviewValue}>{formData.fundingGoal || '0'} ETH</span>
                      {fundingGoalUsd && <span className={styles.reviewSub}>≈ ${fundingGoalUsd} USD</span>}
                    </div>
                    <div className={styles.reviewBlock}>
                      <span className={styles.reviewLabel}>Duration</span>
                      <span className={styles.reviewValue}>{formData.durationDays || '0'} days</span>
                    </div>
                    <div className={styles.reviewBlock}>
                      <span className={styles.reviewLabel}>Minimum contribution</span>
                      <span className={styles.reviewValue}>{formData.minContribution || '0'} ETH</span>
                    </div>
                    <div className={styles.reviewBlock}>
                      <span className={styles.reviewLabel}>Payout schedule</span>
                      <span className={styles.reviewValue}>
                        {formData.payoutSchedule === 'milestones'
                          ? 'At milestones'
                          : formData.payoutSchedule === 'end'
                          ? 'At campaign end'
                          : '—'}
                      </span>
                    </div>
                  </div>

                  <div className={styles.reviewSection}>
                    <span className={styles.reviewLabel}>Story sections</span>
                    <ul className={styles.reviewList}>
                      {formData.story.map((section, index) => (
                        <li key={index}>{section.heading || `Section ${index + 1}`}</li>
                      ))}
                    </ul>
                  </div>

                  {formData.milestones.length > 0 && (
                    <div className={styles.reviewSection}>
                      <span className={styles.reviewLabel}>Milestones</span>
                      <ul className={styles.reviewList}>
                        {formData.milestones.map((m, index) => (
                          <li key={index}>{m.title || `Milestone ${index + 1}`} — {m.target || '0'} ETH</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className={styles.reviewSection}>
                    <span className={styles.reviewLabel}>Payout address</span>
                    <div className={styles.addressBox}>{address || 'No wallet connected'}</div>
                  </div>

                  <div className={styles.gasLine}>
                    <span>Estimated deployment gas</span>
                    <span>{ESTIMATED_GAS_ETH} ETH{gasUsd ? ` (≈ $${gasUsd})` : ''}</span>
                  </div>
                </div>

                <div className={styles.previewFull}>
                  <ProjectCard
                    id="draft"
                    title={previewTitle}
                    description={previewTagline}
                    raised="0"
                    goal={formData.fundingGoal || '1'}
                    backers={0}
                    status="draft"
                  />
                </div>

                <p className={styles.deployNote}>
                  Deploying requires a campaign-creation smart contract, which doesn&apos;t exist
                  yet. This button is a placeholder — it will not send a transaction.
                </p>

                <div className={styles.actions}>
                  <button type="button" className={styles.ghostBtn} onClick={handleBack} disabled={deploying}>
                    Back
                  </button>
                  <button type="button" className={styles.primaryBtn} onClick={handleDeploy} disabled={deploying}>
                    {deploying ? 'Deploying…' : 'Deploy campaign'}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className={styles.previewCol}>
            <div className={styles.previewHeader}>
              <span className={styles.previewDot} />
              <span className={styles.previewLabel}>Live preview</span>
            </div>
            <ProjectCard
              id="draft"
              title={previewTitle}
              description={previewTagline}
              raised="0"
              goal={formData.fundingGoal || '1'}
              backers={0}
              status="draft"
            />
            <p className={styles.previewNote}>
              Changes are reflected automatically. Final rendering may vary slightly by screen size.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
