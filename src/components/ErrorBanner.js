import React from 'react';
import styles from './ErrorBanner.module.css';

const ErrorBanner = ({ error, onClose, isAuthError = false }) => {
  if (!error) return null;

  return (
    <div className={`${styles.banner} ${styles[isAuthError ? 'authError' : 'systemError']}`}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <span className={styles.icon}>⚠</span>
        </div>
        <div className={styles.message}>
          <div className={styles.title}>
            {isAuthError ? 'Authentication Error' : 'Error'}
          </div>
          <div className={styles.description}>{error}</div>
          {isAuthError && (
            <div className={styles.help}>
              💡 Tip: Please reconnect your TikTok Ads account to continue.
            </div>
          )}
        </div>
      </div>
      <button
        className={styles.closeBtn}
        onClick={onClose}
        type="button"
        aria-label="Close error"
      >
        ×
      </button>
    </div>
  );
};

export default ErrorBanner;
