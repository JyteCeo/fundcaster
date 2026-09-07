'use client';

import { Modal } from './Modal';
import styles from './FundingConfirmationModal.module.css';

export function FundingConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  projectTitle,
  ethAmount,
  usdAmount,
  gasEstimateEth,
  isPending,
  isConfirming,
  error,
}) {
  const busy = isPending || isConfirming;
  const amountNum = parseFloat(ethAmount) || 0;
  const total = (amountNum + gasEstimateEth).toFixed(4);
  const errorMessage = error?.shortMessage || error?.message;

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="funding-confirmation-title">
      <div className={styles.header}>
        <span className={styles.kicker}>Funding confirmation</span>
        <h2 id="funding-confirmation-title" className={styles.title}>Confirm contribution</h2>
        <p className={styles.subhead}>Review transaction details before signing.</p>
      </div>

      <div className={styles.ledger}>
        <div className={styles.ledgerRow}>
          <span className={styles.ledgerLabel}>Project</span>
          <span className={styles.ledgerProject}>{projectTitle}</span>
        </div>

        <div className={styles.ledgerRow}>
          <span className={styles.ledgerLabel}>Amount</span>
          <div className={styles.amountLine}>
            <span className={styles.amountValue}>
              {amountNum} <span className={styles.amountUnit}>ETH</span>
            </span>
            {usdAmount && <span className={styles.usdValue}>≈ ${usdAmount} USD</span>}
          </div>
        </div>

        <div className={styles.ledgerRow}>
          <span className={styles.ledgerLabel}>Estimated gas</span>
          <span className={styles.ledgerMono}>{gasEstimateEth} ETH</span>
        </div>

        <div className={`${styles.ledgerRow} ${styles.ledgerTotal}`}>
          <span className={styles.ledgerLabel}>Total deduction</span>
          <span className={styles.totalValue}>{total} ETH</span>
        </div>
      </div>

      {errorMessage && <p className={styles.errorNote}>{errorMessage}</p>}

      <div className={styles.actions}>
        <button type="button" className={styles.confirmBtn} onClick={onConfirm} disabled={busy}>
          {isPending ? 'Confirm in wallet…' : isConfirming ? 'Processing…' : 'Confirm and fund'}
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={busy}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}
