import React, { useState } from 'react';
import { validateMusicId, uploadCustomMusic } from '../services/musicService';
import styles from './MusicSelector.module.css';
import { MUSIC_OPTIONS, AD_OBJECTIVES } from '../constants';

const MusicSelector = ({
  musicOption,
  onMusicOptionChange,
  existingMusicId,
  onExistingMusicIdChange,
  customMusicId,
  onCustomMusicIdChange,
  objective,
  accessToken,
  errors,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [musicValidationError, setMusicValidationError] = useState(null);
  const [musicValidationSuccess, setMusicValidationSuccess] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const isNoMusicDisabled = objective === AD_OBJECTIVES.CONVERSIONS;

  const handleExistingMusicValidation = async () => {
    if (!existingMusicId.trim()) {
      setMusicValidationError('Please enter a music ID');
      return;
    }

    setIsValidating(true);
    setMusicValidationError(null);
    setMusicValidationSuccess(null);

    try {
      const result = await validateMusicId(existingMusicId, accessToken);
      setMusicValidationSuccess(
        `Music validated: "${result.title}" by ${result.artist}`
      );
    } catch (error) {
      setMusicValidationError(error.message || 'Failed to validate music ID');
    } finally {
      setIsValidating(false);
    }
  };

  const handleCustomMusicUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);
    setMusicValidationSuccess(null);

    try {
      const result = await uploadCustomMusic(file, accessToken);
      onCustomMusicIdChange(result.id);
      setMusicValidationSuccess(
        `Custom music uploaded successfully. Music ID: ${result.id.substring(0, 20)}...`
      );
    } catch (error) {
      setUploadError(error.message || 'Failed to upload music');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        Music Option <span className={styles.required}>*</span>
      </label>

      <div className={styles.optionsGrid}>
        {/* No Music Option */}
        <div className={styles.optionGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="musicOption"
              value={MUSIC_OPTIONS.NONE}
              checked={musicOption === MUSIC_OPTIONS.NONE}
              onChange={() => {
                onMusicOptionChange(MUSIC_OPTIONS.NONE);
                setMusicValidationError(null);
              }}
              disabled={isNoMusicDisabled}
              className={styles.radio}
            />
            <span className={styles.radioText}>
              No Music
              {isNoMusicDisabled && (
                <span className={styles.disabledHint}>
                  (Not allowed for Conversions objective)
                </span>
              )}
            </span>
          </label>
        </div>

        {/* Existing Music Option */}
        <div className={styles.optionGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="musicOption"
              value={MUSIC_OPTIONS.EXISTING}
              checked={musicOption === MUSIC_OPTIONS.EXISTING}
              onChange={() => {
                onMusicOptionChange(MUSIC_OPTIONS.EXISTING);
                setUploadError(null);
              }}
              className={styles.radio}
            />
            <span className={styles.radioText}>Use Existing Music ID</span>
          </label>

          {musicOption === MUSIC_OPTIONS.EXISTING && (
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter music ID (e.g., music_123456789)"
                value={existingMusicId}
                onChange={(e) => {
                  onExistingMusicIdChange(e.target.value);
                  setMusicValidationError(null);
                }}
                className={`${styles.input} ${
                  musicValidationError ? styles.inputError : ''
                }`}
                disabled={isValidating}
              />
              <button
                type="button"
                onClick={handleExistingMusicValidation}
                disabled={isValidating || !existingMusicId.trim()}
                className={styles.validateBtn}
              >
                {isValidating ? 'Validating...' : 'Validate'}
              </button>
            </div>
          )}
        </div>

        {/* Custom Music Option */}
        <div className={styles.optionGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="musicOption"
              value={MUSIC_OPTIONS.CUSTOM}
              checked={musicOption === MUSIC_OPTIONS.CUSTOM}
              onChange={() => {
                onMusicOptionChange(MUSIC_OPTIONS.CUSTOM);
                setMusicValidationError(null);
              }}
              className={styles.radio}
            />
            <span className={styles.radioText}>Upload Custom Music</span>
          </label>

          {musicOption === MUSIC_OPTIONS.CUSTOM && (
            <div className={styles.inputGroup}>
              <label className={styles.fileInputLabel}>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleCustomMusicUpload}
                  disabled={isUploading}
                  className={styles.fileInput}
                />
                <span className={styles.fileInputButton}>
                  {isUploading ? 'Uploading...' : 'Choose Audio File'}
                </span>
              </label>
              {customMusicId && (
                <div className={styles.uploadedInfo}>
                  ✓ Uploaded (ID: {customMusicId.substring(0, 20)}...)
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Error Messages */}
      {errors?.musicOption && (
        <div className={styles.fieldError}>{errors.musicOption}</div>
      )}
      {musicValidationError && (
        <div className={styles.fieldError}>{musicValidationError}</div>
      )}
      {uploadError && <div className={styles.fieldError}>{uploadError}</div>}

      {/* Success Messages */}
      {musicValidationSuccess && (
        <div className={styles.success}>{musicValidationSuccess}</div>
      )}
    </div>
  );
};

export default MusicSelector;
