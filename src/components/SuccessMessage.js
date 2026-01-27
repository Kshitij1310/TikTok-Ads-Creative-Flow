import React from 'react';
import styles from './SuccessMessage.module.css';

const SuccessMessage = ({ result, onDismiss }) => {
  if (!result) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>✓</div>
        <div className={styles.message}>
          <h3 className={styles.title}>Ad Created Successfully!</h3>
          <div className={styles.details}>
            <p>
              <strong>Campaign:</strong> {result.campaignName}
            </p>
            <p>
              <strong>Objective:</strong> {result.objective}
            </p>
            <p>
              <strong>Status:</strong> {result.status}
            </p>
            <p className={styles.note}>{result.message}</p>
          </div>
        </div>
      </div>
      <button
        className={styles.closeBtn}
        onClick={onDismiss}
        type="button"
      >
        ×
      </button>
    </div>
  );
};

export default SuccessMessage;
