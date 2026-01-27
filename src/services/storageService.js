// Local Storage Service for persisting ads

const ADS_STORAGE_KEY = 'tiktok_ads_created';

/**
 * Get all saved ads from local storage
 */
export const getSavedAds = () => {
  try {
    const adsData = localStorage.getItem(ADS_STORAGE_KEY);
    return adsData ? JSON.parse(adsData) : [];
  } catch (error) {
    console.error('Error reading saved ads:', error);
    return [];
  }
};

/**
 * Save a new ad to local storage
 */
export const saveAd = (adData) => {
  try {
    const existingAds = getSavedAds();
    const newAd = {
      id: Date.now(), // Simple ID using timestamp
      ...adData,
      createdAt: new Date().toISOString(),
    };
    const updatedAds = [newAd, ...existingAds]; // Add new ad to the beginning
    localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(updatedAds));
    return newAd;
  } catch (error) {
    console.error('Error saving ad:', error);
    throw error;
  }
};

/**
 * Delete an ad from local storage
 */
export const deleteAd = (adId) => {
  try {
    const existingAds = getSavedAds();
    const filteredAds = existingAds.filter((ad) => ad.id !== adId);
    localStorage.setItem(ADS_STORAGE_KEY, JSON.stringify(filteredAds));
    return true;
  } catch (error) {
    console.error('Error deleting ad:', error);
    throw error;
  }
};

/**
 * Clear all saved ads
 */
export const clearAllAds = () => {
  try {
    localStorage.removeItem(ADS_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing ads:', error);
    throw error;
  }
};
