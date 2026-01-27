import React from 'react';
import styles from './SavedAds.module.css';

const SavedAds = ({ ads, onDelete }) => {
  if (!ads || ads.length === 0) {
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section className={styles.savedAdsSection}>
      <div className={styles.header}>
        <h3>Saved Ads ({ads.length})</h3>
        <p>Your ads are saved locally and will persist across sessions</p>
      </div>

      <div className={styles.adsList}>
        {ads.map((ad) => (
          <div key={ad.id} className={styles.adCard}>
            <div className={styles.cardHeader}>
              <h4>{ad.campaignName}</h4>
              <span className={styles.objective}>{ad.objective}</span>
            </div>

            <div className={styles.cardContent}>
              <p className={styles.adText}>{ad.adText}</p>

              <div className={styles.details}>
                <div className={styles.detailRow}>
                  <span className={styles.label}>CTA:</span>
                  <span className={styles.value}>{ad.cta}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Music:</span>
                  <span className={styles.value}>
                    {ad.musicOption === 'none'
                      ? 'No Music'
                      : ad.musicOption === 'existing'
                      ? `ID: ${ad.existingMusicId}`
                      : `Custom: ${ad.customMusicId}`}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.label}>Created:</span>
                  <span className={styles.value}>{formatDate(ad.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(ad.id)}
                title="Delete this ad"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SavedAds;
