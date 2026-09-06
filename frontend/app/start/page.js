'use client';

import { useRef, useState } from 'react';
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

export default function StartFundraiserPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    tagline: '',
    coverImageName: '',
  });
  const [isDragging, setIsDragging] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const fileInputRef = useRef(null);

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

  const goToStep = (id) => {
    if (id < step) setStep(id);
  };

  const handleContinue = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 3000);
  };

  const previewTitle = formData.title.trim() || 'Untitled campaign';
  const previewTagline =
    formData.tagline.trim() || 'Your campaign tagline will appear here as you type.';
  const activeStep = STEPS.find((s) => s.id === step);

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
                  <button type="button" className={styles.primaryBtn} onClick={handleContinue}>
                    Continue to story
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.comingNext}>
                <span className={styles.comingKicker}>{activeStep.code} / {activeStep.label}</span>
                <h2 className={styles.comingTitle}>Coming next</h2>
                <p className={styles.comingBody}>
                  This step isn&apos;t built yet. Head back to Basics to keep editing what&apos;s there.
                </p>
                <button type="button" className={styles.ghostBtn} onClick={handleBack}>
                  Back
                </button>
              </div>
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
              goal="1"
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
