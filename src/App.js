import React, { useState, useEffect } from 'react';
import OAuthButton from './components/OAuthButton';
import AdForm from './components/AdForm';
import ErrorBanner from './components/ErrorBanner';
import SuccessMessage from './components/SuccessMessage';
import SavedAds from './components/SavedAds';
import { exchangeCodeForToken, validateToken, getStoredToken } from './services/authService';
import { getSavedAds, saveAd, deleteAd } from './services/storageService';
import styles from './App.module.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [systemError, setSystemError] = useState(null);
  const [successResult, setSuccessResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedAds, setSavedAds] = useState([]);
 
  // Check for existing token on mount
  useEffect(() => {
    // Load saved ads from local storage
    const loadedAds = getSavedAds();
    setSavedAds(loadedAds);

    const storedToken = getStoredToken();
    if (storedToken) {
      validateToken(storedToken)
        .then(() => {
          setAccessToken(storedToken);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          setAuthError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Check for OAuth callback code in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (code) {
      handleAuthCode(code);
    } else if (error) {
      setAuthError(`Authorization failed: ${error}`);
    }
  }, []);

  const handleAuthCode = async (code) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const tokenResponse = await exchangeCodeForToken(code);
      setAccessToken(tokenResponse.access_token);
      setIsAuthenticated(true);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async (code) => {
    await handleAuthCode(code);
  };

  const handleDisconnect = () => {
    setIsAuthenticated(false);
    setAccessToken(null);
    setAuthError(null);
    setSystemError(null);
    setSuccessResult(null);
  };

  const handleAdSuccess = (result) => {
    // Save the ad to local storage
    const savedAd = saveAd(result);
    // Update the saved ads list in state
    setSavedAds([savedAd, ...savedAds]);
    // Show success message
    setSuccessResult(result);
    setSystemError(null);
  };

  const handleDeleteAd = (adId) => {
    deleteAd(adId);
    setSavedAds(savedAds.filter((ad) => ad.id !== adId));
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>TikTok Ads Creative Flow</h1>
            <p className={styles.subtitle}>
              Create and manage your TikTok ad campaigns with ease
            </p>
          </div>
        </header>

        <main className={styles.main}>
          {/* Authentication Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Step 1: Authenticate</h2>
              <p>Connect your TikTok Ads account to get started</p>
            </div>

            {authError && (
              <ErrorBanner
                error={authError}
                onClose={() => setAuthError(null)}
                isAuthError={true}
              />
            )}

            <OAuthButton
              onConnect={handleConnect}
              onError={(error) => setAuthError(error.message)}
            />
          </section>

          {/* Ad Creation Section */}
          {isAuthenticated && (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2>Step 2: Create Your Ad</h2>
                <p>Fill in the details below to create a new ad campaign</p>
              </div>

              {systemError && (
                <ErrorBanner
                  error={systemError}
                  onClose={() => setSystemError(null)}
                  isAuthError={true}
                />
              )}

              {successResult && (
                <SuccessMessage
                  result={successResult}
                  onDismiss={() => setSuccessResult(null)}
                />
              )}

              <AdForm
                accessToken={accessToken}
                onSuccess={handleAdSuccess}
              />

              <SavedAds ads={savedAds} onDelete={handleDeleteAd} />

              <button
                className={styles.disconnectBtn}
                onClick={handleDisconnect}
                type="button"
              >
                Disconnect Account
              </button>
            </section>
          )}

        </main>

        <footer className={styles.footer}>
          <p>
            TikTok Ads Creative Flow Demo 
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
