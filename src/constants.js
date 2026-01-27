// TikTok OAuth Configuration
// In production, these would be environment variables
export const OAUTH_CONFIG = {
  CLIENT_ID: 'your_client_id_here',
  CLIENT_SECRET: 'your_client_secret_here',
  REDIRECT_URI: `${window.location.origin}/callback`,
  AUTH_URL: 'https://auth.tiktok.com/authorize',
  TOKEN_URL: 'https://business-api.tiktok.com/oauth2/token',
};

// Local storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'tiktok_ads_access_token',
  OAUTH_STATE: 'tiktok_oauth_state',
};

// Error messages mapping
export const ERROR_MESSAGES = {
  INVALID_CLIENT: 'Invalid client ID or secret. Please check your OAuth credentials.',
  MISSING_SCOPE: 'Missing required "ads" permission scope. Please re-authenticate with proper permissions.',
  EXPIRED_TOKEN: 'Your authentication token has expired. Please reconnect your TikTok Ads account.',
  REVOKED_TOKEN: 'Your TikTok Ads account access has been revoked. Please reconnect.',
  GEO_RESTRICTION: 'This feature is not available in your region.',
  INVALID_MUSIC_ID: 'The music ID you provided is invalid or no longer available.',
  MUSIC_UPLOAD_FAILED: 'Failed to upload custom music. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  CAMPAIGN_NAME_SHORT: 'Campaign name must be at least 3 characters.',
  AD_TEXT_LONG: 'Ad text cannot exceed 100 characters.',
  REQUIRED_FIELD: 'This field is required.',
  NO_MUSIC_CONVERSIONS: 'Music is required when objective is "Conversions".',
};

// Music options
export const MUSIC_OPTIONS = {
  EXISTING: 'existing',
  CUSTOM: 'custom',
  NONE: 'none',
};

// Ad objectives
export const AD_OBJECTIVES = {
  TRAFFIC: 'Traffic',
  CONVERSIONS: 'Conversions',
};

// CTAs available
export const CTAS = [
  'Learn More',
  'Shop Now',
  'Sign Up',
  'Download',
  'Contact Us',
  'Watch Now',
];
