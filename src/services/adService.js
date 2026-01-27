import { ERROR_MESSAGES, AD_OBJECTIVES, MUSIC_OPTIONS } from '../constants';

/**
 * Validate ad form data before submission
 */
export const validateAdForm = (formData) => {
  const errors = {};

  // Validate campaign name
  if (!formData.campaignName || formData.campaignName.trim().length < 3) {
    errors.campaignName = ERROR_MESSAGES.CAMPAIGN_NAME_SHORT;
  }

  // Validate ad text
  if (!formData.adText || formData.adText.trim() === '') {
    errors.adText = ERROR_MESSAGES.REQUIRED_FIELD;
  } else if (formData.adText.length > 100) {
    errors.adText = ERROR_MESSAGES.AD_TEXT_LONG;
  }

  // Validate objective
  if (!formData.objective) {
    errors.objective = ERROR_MESSAGES.REQUIRED_FIELD;
  }

  // Validate CTA
  if (!formData.cta) {
    errors.cta = ERROR_MESSAGES.REQUIRED_FIELD;
  }

  // Validate music option
  if (!formData.musicOption) {
    errors.musicOption = ERROR_MESSAGES.REQUIRED_FIELD;
  }

  // Validate music based on objective and option
  if (formData.musicOption === MUSIC_OPTIONS.NONE && formData.objective === AD_OBJECTIVES.CONVERSIONS) {
    errors.musicOption = ERROR_MESSAGES.NO_MUSIC_CONVERSIONS;
  }

  if (formData.musicOption === MUSIC_OPTIONS.EXISTING && !formData.existingMusicId) {
    errors.existingMusicId = ERROR_MESSAGES.REQUIRED_FIELD;
  }

  if (formData.musicOption === MUSIC_OPTIONS.CUSTOM && !formData.customMusicId) {
    errors.customMusicId = 'Please upload a music file first.';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Submit ad creation request to TikTok Ads API
 */
export const submitAd = async (formData, accessToken) => {
  return new Promise((resolve, reject) => {
    // Validate token first
    if (!accessToken) {
      reject({
        errorType: 'NO_TOKEN',
        message: ERROR_MESSAGES.EXPIRED_TOKEN,
        code: 401,
      });
      return;
    }

    if (accessToken.includes('expired')) {
      reject({
        errorType: 'EXPIRED_TOKEN',
        message: ERROR_MESSAGES.EXPIRED_TOKEN,
        code: 401,
      });
      return;
    }

    if (accessToken.includes('revoked')) {
      reject({
        errorType: 'REVOKED_TOKEN',
        message: ERROR_MESSAGES.REVOKED_TOKEN,
        code: 401,
      });
      return;
    }

    // Simulate API submission
    setTimeout(() => {
      // Simulate various error scenarios
      if (formData.campaignName.includes('invalid')) {
        reject({
          errorType: 'INVALID_REQUEST',
          message: 'Campaign name contains invalid characters.',
          code: 400,
        });
        return;
      }

      if (formData.campaignName.includes('geo')) {
        reject({
          errorType: 'GEO_RESTRICTION',
          message: ERROR_MESSAGES.GEO_RESTRICTION,
          code: 403,
        });
        return;
      }

      if (formData.existingMusicId && formData.existingMusicId.includes('notfound')) {
        reject({
          errorType: 'INVALID_MUSIC',
          message: ERROR_MESSAGES.INVALID_MUSIC_ID,
          code: 400,
        });
        return;
      }

      // Successful submission
      const adId = 'ad_' + Date.now();
      resolve({
        adId,
        campaignName: formData.campaignName,
        objective: formData.objective,
        status: 'pending_review',
        createdAt: new Date().toISOString(),
        message: 'Ad created successfully and submitted for review.',
      });
    }, 1500);
  });
};

/**
 * Handle API errors and convert to human-readable messages
 */
export const handleApiError = (error) => {
  if (error.code === 401) {
    return {
      errorType: error.errorType || 'AUTH_ERROR',
      message: error.message || ERROR_MESSAGES.EXPIRED_TOKEN,
      isAuthError: true,
    };
  }

  if (error.code === 403) {
    return {
      errorType: error.errorType || 'GEO_RESTRICTION',
      message: error.message || ERROR_MESSAGES.GEO_RESTRICTION,
      isAuthError: false,
    };
  }

  if (error.code === 400) {
    return {
      errorType: error.errorType || 'VALIDATION_ERROR',
      message: error.message || 'Invalid request. Please check your input.',
      isAuthError: false,
    };
  }

  if (error.message && error.message.includes('Network')) {
    return {
      errorType: 'NETWORK_ERROR',
      message: ERROR_MESSAGES.NETWORK_ERROR,
      isAuthError: false,
    };
  }

  return {
    errorType: error.errorType || 'UNKNOWN_ERROR',
    message: error.message || 'An unexpected error occurred. Please try again.',
    isAuthError: false,
  };
};
