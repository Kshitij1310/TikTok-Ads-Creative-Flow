import { ERROR_MESSAGES } from '../constants';

/**
 * Validate music ID via TikTok Ads API or mocked endpoint
 */
export const validateMusicId = async (musicId, accessToken) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock validation logic
      if (!musicId || musicId.trim() === '') {
        reject({
          errorType: 'INVALID_MUSIC_ID',
          message: ERROR_MESSAGES.INVALID_MUSIC_ID,
        });
        return;
      }

      // Simulate API validation
      if (musicId.includes('valid')) {
        resolve({
          id: musicId,
          title: 'Sample Music Track',
          artist: 'Sample Artist',
          duration: 30,
          isValid: true,
        });
      } else if (musicId.includes('invalid')) {
        reject({
          errorType: 'INVALID_MUSIC_ID',
          message: ERROR_MESSAGES.INVALID_MUSIC_ID,
        });
      } else if (accessToken && accessToken.includes('expired')) {
        reject({
          errorType: 'EXPIRED_TOKEN',
          message: ERROR_MESSAGES.EXPIRED_TOKEN,
        });
      } else {
        // Default: consider valid if doesn't match error patterns
        resolve({
          id: musicId,
          title: 'Music Track ' + musicId.substring(0, 10),
          artist: 'Artist Name',
          duration: 30,
          isValid: true,
        });
      }
    }, 800);
  });
};

/**
 * Simulate music upload and generate mock Music ID
 */
export const uploadCustomMusic = async (file, accessToken) => {
  return new Promise((resolve, reject) => {
    // Validate file
    if (!file) {
      reject({
        errorType: 'NO_FILE',
        message: 'Please select a music file.',
      });
      return;
    }

    // Simulate upload process
    setTimeout(() => {
      if (accessToken && accessToken.includes('expired')) {
        reject({
          errorType: 'EXPIRED_TOKEN',
          message: ERROR_MESSAGES.EXPIRED_TOKEN,
        });
        return;
      }

      if (file.name.includes('invalid')) {
        reject({
          errorType: 'MUSIC_UPLOAD_FAILED',
          message: ERROR_MESSAGES.MUSIC_UPLOAD_FAILED,
        });
        return;
      }

      // Generate mock Music ID
      const mockMusicId = 'music_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

      resolve({
        id: mockMusicId,
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
        duration: 30,
        isValid: true,
        isCustom: true,
      });
    }, 1500);
  });
};

/**
 * Get music information by ID
 */
export const getMusicInfo = async (musicId, accessToken) => {
  return validateMusicId(musicId, accessToken);
};
