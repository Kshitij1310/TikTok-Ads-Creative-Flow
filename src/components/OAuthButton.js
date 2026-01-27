import React, { useState, useEffect } from 'react';
import { getStoredToken } from '../services/authService';
import styles from './OAuthButton.module.css';

const OAuthButton = ({ onConnect, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if already connected
    const token = getStoredToken();
    setIsConnected(!!token);
  }, []);

  const handleConnect = () => {
    setIsLoading(true);

    // Simulate OAuth flow
    setTimeout(() => {
      try {
        // In production, this would redirect to TikTok's OAuth endpoint
        // For demo, we'll simulate a successful OAuth flow
        const mockAuthCode = 'valid_code';

        // Exchange code for token (handled in parent or auth service)
        onConnect?.(mockAuthCode);
        setIsConnected(true);
      } catch (error) {
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    localStorage.removeItem('tiktok_ads_access_token');
  };

  return (
    <div className={styles.container}>
      {isConnected ? (
        <div className={styles.connectedState}>
          <span className={styles.checkmark}>✓</span>
          <span className={styles.connectedText}>Connected to TikTok Ads</span>
          <button
            className={styles.disconnectBtn}
            onClick={handleDisconnect}
            type="button"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className={styles.connectBtn}
          onClick={handleConnect}
          disabled={isLoading}
          type="button"
        >
          {isLoading ? 'Connecting...' : 'Connect TikTok Ads Account'}
        </button>
      )}
    </div>
  );
};

export default OAuthButton;
