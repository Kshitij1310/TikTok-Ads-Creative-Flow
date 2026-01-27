import { OAUTH_CONFIG, STORAGE_KEYS, ERROR_MESSAGES } from '../constants';

/**
 * Generate a random string for OAuth state parameter
 */
export const generateOAuthState = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Initiate OAuth flow by redirecting to TikTok auth endpoint
 */
export const initiateOAuthFlow = () => {
  const state = generateOAuthState();
  localStorage.setItem(STORAGE_KEYS.OAUTH_STATE, state);

  const oauthUrl = new URLSearchParams({
    client_id: OAUTH_CONFIG.CLIENT_ID,
    redirect_uri: OAUTH_CONFIG.REDIRECT_URI,
    response_type: 'code',
    state: state,
    scope: 'ads', // Required scope for ads management
  });

  // In production, this would redirect to the actual TikTok OAuth URL
  // window.location.href = `${OAUTH_CONFIG.AUTH_URL}?${oauthUrl}`;

  // For demo purposes, we'll simulate the flow
  console.log('OAuth flow initiated with state:', state);
};

/**
 * Exchange authorization code for access token
 * In production, this would be handled by a backend server for security
 */
export const exchangeCodeForToken = async (code) => {
  // Simulate API call with mocked response
  // In production: POST to backend endpoint which securely exchanges code
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful token exchange
      if (code === 'valid_code') {
        const mockToken = {
          access_token: 'mock_access_token_' + Date.now(),
          token_type: 'Bearer',
          expires_in: 7200,
          scope: 'ads',
        };
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, mockToken.access_token);
        resolve(mockToken);
      } else if (code === 'invalid_client') {
        reject({
          errorType: 'INVALID_CLIENT',
          message: ERROR_MESSAGES.INVALID_CLIENT,
        });
      } else if (code === 'missing_scope') {
        reject({
          errorType: 'MISSING_SCOPE',
          message: ERROR_MESSAGES.MISSING_SCOPE,
        });
      } else {
        reject({
          errorType: 'UNKNOWN',
          message: 'Authorization failed. Please try again.',
        });
      }
    }, 1000);
  });
};

/**
 * Validate stored access token
 */
export const validateToken = async (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!token) {
        reject({
          errorType: 'NO_TOKEN',
          message: 'No authentication token found.',
        });
        return;
      }

      if (token.includes('expired')) {
        reject({
          errorType: 'EXPIRED_TOKEN',
          message: ERROR_MESSAGES.EXPIRED_TOKEN,
        });
        return;
      }

      if (token.includes('revoked')) {
        reject({
          errorType: 'REVOKED_TOKEN',
          message: ERROR_MESSAGES.REVOKED_TOKEN,
        });
        return;
      }

      resolve({ valid: true, token });
    }, 500);
  });
};

/**
 * Get stored access token
 */
export const getStoredToken = () => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * Clear stored token and state
 */
export const clearAuth = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.OAUTH_STATE);
};

/**
 * Refresh access token (mock implementation)
 */
export const refreshToken = async (refreshToken) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newToken = {
        access_token: 'mock_access_token_' + Date.now(),
        token_type: 'Bearer',
        expires_in: 7200,
      };
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newToken.access_token);
      resolve(newToken);
    }, 1000);
  });
};
