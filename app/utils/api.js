// utils/api.js

/**
 * API Configuration and Utilities
 * 
 * Centralized API communication layer for Cliro waitlist functionality.
 * Handles configuration fetching, form submissions, and error management.
 */

// Environment configuration
const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Cliro',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};

// Development environment logging
if (ENV.ENVIRONMENT === 'development') {
  console.debug('API Environment:', {
    API_URL: ENV.API_URL,
    ENVIRONMENT: ENV.ENVIRONMENT,
  });
}

// Validate required configuration
if (!ENV.API_URL) {
  console.error('NEXT_PUBLIC_API_URL is not set in environment variables');
  if (ENV.ENVIRONMENT === 'production') {
    throw new Error('NEXT_PUBLIC_API_URL is required for production');
  }
}

// Cache for configuration with 5-minute TTL
let configCache = null;
let configCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Fetches public configuration from backend API
 * Returns cached result if available and not expired
 * Falls back to default configuration if API is unavailable
 * 
 * @returns {Promise<Object>} Normalized configuration object
 */
export async function getPublicConfig() {
  const now = Date.now();
  
  // Return cached configuration if valid
  if (configCache && (now - configCacheTime) < CACHE_DURATION) {
    return configCache;
  }
  
  try {
    if (ENV.ENVIRONMENT === 'development') {
      console.debug('Fetching configuration from backend');
    }
    
    const response = await fetch(`${ENV.API_URL}/api/auth/config/public`, {
      signal: AbortSignal.timeout(10000),
    });
    
    if (!response.ok) {
      console.warn('Failed to fetch configuration, using fallback');
      return getFallbackConfig();
    }
    
    const data = await response.json();
    
    // Normalize and validate response structure
    const normalizedConfig = {
      interest_reasons: Array.isArray(data.interest_reasons) 
        ? data.interest_reasons.map(reason => ({
            id: reason.id || reason,
            label: reason.label || reason.name || reason.id || reason,
            description: reason.description || ''
          }))
        : getFallbackConfig().interest_reasons,
      supported_languages: Array.isArray(data.supported_languages)
        ? data.supported_languages.map(lang => ({
            code: lang.code || lang,
            name: lang.name || lang.label || lang.code || lang,
            flag: lang.flag || getLanguageFlag(lang.code || lang)
          }))
        : getFallbackConfig().supported_languages
    };
    
    // Update cache
    configCache = normalizedConfig;
    configCacheTime = now;
    
    return normalizedConfig;
    
  } catch (error) {
    console.error('Error fetching configuration:', error.message);
    return getFallbackConfig();
  }
}

/**
 * Submits waitlist registration to backend API
 * Includes comprehensive validation and error handling
 * 
 * @param {Object} formData - Waitlist form data
 * @param {string} formData.email - User email address
 * @param {string} formData.name - User name
 * @param {string} formData.interest_reason - Selected interest reason
 * @param {string[]} formData.preferred_languages - Selected language codes
 * @returns {Promise<Object>} Response object with success status and data
 */
export async function joinWaitlist(formData) {
  try {
    // Client-side validation
    if (!formData.email || !formData.email.includes('@')) {
      throw new Error('Please enter a valid email address');
    }
    
    if (!formData.name || formData.name.trim().length < 2) {
      throw new Error('Please enter your name (minimum 2 characters)');
    }
    
    if (!formData.interest_reason) {
      throw new Error('Please select why you\'re interested in Cliro');
    }
    
    if (!formData.preferred_languages || formData.preferred_languages.length === 0) {
      throw new Error('Please select at least one language');
    }
    
    // Prepare data for backend API
    const requestData = {
      email: formData.email.trim(),
      name: formData.name.trim(),
      interest_reason: formData.interest_reason,
      preferred_languages: Array.isArray(formData.preferred_languages) 
        ? formData.preferred_languages 
        : [formData.preferred_languages]
    };
    
    if (ENV.ENVIRONMENT === 'development') {
      console.debug('Submitting waitlist registration:', requestData);
    }
    
    const response = await fetch(`${ENV.API_URL}/api/auth/waitlist/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestData),
      signal: AbortSignal.timeout(15000),
    });
    
    // Parse response with error handling for malformed JSON
    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = responseText ? JSON.parse(responseText) : {};
    } catch (parseError) {
      responseData = { message: responseText };
    }
    
    if (!response.ok) {
      // Extract error message from backend response
      const errorMessage = responseData.detail || 
                          responseData.message || 
                          responseData.error || 
                          `Server error (${response.status})`;
      throw new Error(errorMessage);
    }
    
    return {
      success: true,
      data: responseData,
      message: 'Successfully joined the waitlist!'
    };
    
  } catch (error) {
    console.error('Waitlist submission error:', error);
    
    // Handle specific error types
    if (error.name === 'AbortError' || error.name === 'TimeoutError') {
      return {
        success: false,
        error: 'Request timeout. Please try again.',
        data: null
      };
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Network error. Please check your connection.',
        data: null
      };
    }
    
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
      data: null
    };
  }
}

/**
 * Fallback configuration used when backend API is unavailable
 * Provides default options for interest reasons and languages
 * 
 * @returns {Object} Default configuration object
 */
function getFallbackConfig() {
  return {
    interest_reasons: [
      { id: 'productivity', label: 'Productivity' },
      { id: 'writing', label: 'Writing' },
      { id: 'learning', label: 'Learning' },
      { id: 'content', label: 'Content Creation' },
      { id: 'students', label: 'Student Work' },
      { id: 'business', label: 'Business' },
      { id: 'accessibility', label: 'Accessibility' },
      { id: 'other', label: 'Other' }
    ],
    supported_languages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Spanish', flag: '🇪🇸' },
      { code: 'fr', name: 'French', flag: '🇫🇷' },
      { code: 'de', name: 'German', flag: '🇩🇪' },
      { code: 'it', name: 'Italian', flag: '🇮🇹' },
      { code: 'pt', name: 'Portuguese', flag: '🇵🇹' }
    ]
  };
}

/**
 * Maps language codes to corresponding flag emojis
 * 
 * @param {string} code - ISO language code
 * @returns {string} Flag emoji or fallback symbol
 */
function getLanguageFlag(code) {
  const flags = {
    'en': '🇺🇸',
    'es': '🇪🇸', 
    'fr': '🇫🇷',
    'de': '🇩🇪',
    'it': '🇮🇹',
    'pt': '🇵🇹'
  };
  return flags[code] || '🌐';
}

/**
 * Health check for backend API connectivity
 * Useful for monitoring and diagnostic purposes
 * 
 * @returns {Promise<boolean>} True if backend is reachable and healthy
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${ENV.API_URL}/health`, {
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch (error) {
    console.warn('Backend health check failed:', error.message);
    return false;
  }
}

/**
 * Extracts interest reason ID from selection array
 * Supports single selection only (takes first element)
 * 
 * @param {Array} selectedReasons - Array of selected reasons
 * @returns {string|null} Extracted reason ID or null if empty
 */
export function getInterestReasonId(selectedReasons) {
  if (!selectedReasons || selectedReasons.length === 0) return null;
  
  const selected = selectedReasons[0];
  
  if (typeof selected === 'string') return selected;
  if (selected && selected.id) return selected.id;
  
  return selected;
}

/**
 * Extracts language codes from selection array
 * Normalizes various input formats to consistent code strings
 * 
 * @param {Array} selectedLanguages - Array of selected languages
 * @returns {string[]} Array of language codes
 */
export function getLanguageCodes(selectedLanguages) {
  if (!selectedLanguages || selectedLanguages.length === 0) return [];
  
  return selectedLanguages.map(lang => {
    if (typeof lang === 'string') return lang;
    if (lang && lang.code) return lang.code;
    return lang;
  });
}