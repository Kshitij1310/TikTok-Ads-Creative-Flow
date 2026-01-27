import React, { useState } from 'react';
import { validateAdForm, submitAd, handleApiError } from '../services/adService';
import { CTAS, AD_OBJECTIVES, MUSIC_OPTIONS } from '../constants';
import MusicSelector from './MusicSelector';
import ErrorBanner from './ErrorBanner';
import styles from './AdForm.module.css';

const AdForm = ({ accessToken, onSuccess }) => {
  const [formData, setFormData] = useState({
    campaignName: '',
    objective: AD_OBJECTIVES.TRAFFIC,
    adText: '',
    cta: CTAS[0],
    musicOption: MUSIC_OPTIONS.NONE,
    existingMusicId: '',
    customMusicId: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [systemError, setSystemError] = useState(null);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear field-level error on change
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleMusicOptionChange = (value) => {
    handleFieldChange('musicOption', value);
    // Reset music-related fields when switching options
    setFormData((prev) => ({
      ...prev,
      existingMusicId: '',
      customMusicId: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSystemError(null);

    // Validate form
    const formErrors = validateAdForm(formData);
    if (formErrors) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await submitAd(formData, accessToken);
      onSuccess?.(result);
      // Reset form on success
      setFormData({
        campaignName: '',
        objective: AD_OBJECTIVES.TRAFFIC,
        adText: '',
        cta: CTAS[0],
        musicOption: MUSIC_OPTIONS.NONE,
        existingMusicId: '',
        customMusicId: '',
      });
    } catch (error) {
      const handledError = handleApiError(error);
      if (handledError.isAuthError) {
        setSystemError(handledError.message);
      } else {
        setErrors((prev) => ({
          ...prev,
          form: handledError.message,
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Create Ad</h2>
        <p>Set up your ad with required details and music preference</p>
      </div>

      {systemError && (
        <ErrorBanner error={systemError} onClose={() => setSystemError(null)} isAuthError={true} />
      )}

      {errors.form && (
        <div className={styles.globalError}>{errors.form}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Campaign Name */}
        <div className={styles.formGroup}>
          <label htmlFor="campaignName" className={styles.label}>
            Campaign Name <span className={styles.required}>*</span>
          </label>
          <input
            id="campaignName"
            type="text"
            placeholder="e.g., Summer Sale Campaign"
            value={formData.campaignName}
            onChange={(e) => handleFieldChange('campaignName', e.target.value)}
            className={`${styles.input} ${errors.campaignName ? styles.inputError : ''}`}
            minLength="3"
            maxLength="100"
          />
          {errors.campaignName && (
            <div className={styles.fieldError}>{errors.campaignName}</div>
          )}
          <div className={styles.fieldHint}>
            Minimum 3 characters
          </div>
        </div>

        {/* Objective */}
        <div className={styles.formGroup}>
          <label htmlFor="objective" className={styles.label}>
            Objective <span className={styles.required}>*</span>
          </label>
          <select
            id="objective"
            value={formData.objective}
            onChange={(e) => handleFieldChange('objective', e.target.value)}
            className={styles.select}
          >
            <option value={AD_OBJECTIVES.TRAFFIC}>{AD_OBJECTIVES.TRAFFIC}</option>
            <option value={AD_OBJECTIVES.CONVERSIONS}>{AD_OBJECTIVES.CONVERSIONS}</option>
          </select>
          {errors.objective && (
            <div className={styles.fieldError}>{errors.objective}</div>
          )}
          <div className={styles.fieldHint}>
            {formData.objective === AD_OBJECTIVES.CONVERSIONS &&
              'Note: Music is required for Conversions objective'}
          </div>
        </div>

        {/* Ad Text */}
        <div className={styles.formGroup}>
          <label htmlFor="adText" className={styles.label}>
            Ad Text <span className={styles.required}>*</span>
          </label>
          <textarea
            id="adText"
            placeholder="Write your ad text (max 100 characters)"
            value={formData.adText}
            onChange={(e) => handleFieldChange('adText', e.target.value)}
            className={`${styles.textarea} ${errors.adText ? styles.inputError : ''}`}
            maxLength="100"
            rows="4"
          />
          <div className={styles.charCount}>
            {formData.adText.length}/100 characters
          </div>
          {errors.adText && (
            <div className={styles.fieldError}>{errors.adText}</div>
          )}
        </div>

        {/* CTA */}
        <div className={styles.formGroup}>
          <label htmlFor="cta" className={styles.label}>
            Call-to-Action <span className={styles.required}>*</span>
          </label>
          <select
            id="cta"
            value={formData.cta}
            onChange={(e) => handleFieldChange('cta', e.target.value)}
            className={styles.select}
          >
            {CTAS.map((ctaOption) => (
              <option key={ctaOption} value={ctaOption}>
                {ctaOption}
              </option>
            ))}
          </select>
          {errors.cta && (
            <div className={styles.fieldError}>{errors.cta}</div>
          )}
        </div>

        {/* Music Selector */}
        <MusicSelector
          musicOption={formData.musicOption}
          onMusicOptionChange={handleMusicOptionChange}
          existingMusicId={formData.existingMusicId}
          onExistingMusicIdChange={(value) => handleFieldChange('existingMusicId', value)}
          customMusicId={formData.customMusicId}
          onCustomMusicIdChange={(value) => handleFieldChange('customMusicId', value)}
          objective={formData.objective}
          accessToken={accessToken}
          errors={errors}
        />

        {/* Submit Button */}
        <div className={styles.buttonGroup}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitBtn}
          >
            {isSubmitting ? 'Creating Ad...' : 'Create Ad'}
          </button>
          <p className={styles.notice}>
            ℹ️ Your ad will be submitted for review after creation.
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdForm;
