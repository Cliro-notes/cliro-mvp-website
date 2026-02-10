// utils/api.js

// Environment configuration
const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Cliro',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};

// Log environment in development
if (ENV.ENVIRONMENT === 'development') {
  console.log('API Environment:', {
    API_URL: ENV.API_URL,
    ENVIRONMENT: ENV.ENVIRONMENT,
  });
}

// Validate API URL
if (!ENV.API_URL) {
  console.error('❌ NEXT_PUBLIC_API_URL is not set in environment variables');
  if (ENV.ENVIRONMENT === 'production') {
    throw new Error('NEXT_PUBLIC_API_URL is required for production');
  }
}

// Cache for config
let configCache = null;
let configCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

/**
 * Get public configuration from backend
 */
export async function getPublicConfig() {
  const now = Date.now();
  
  // Return cached config if it's still valid
  if (configCache && (now - configCacheTime) < CACHE_DURATION) {
    return configCache;
  }
  
  try {
    console.log(`📡 Fetching config from: ${ENV.API_URL}/api/auth/config/public`);
    
    const response = await fetch(`${ENV.API_URL}/api/auth/config/public`, {
      // Add timeout for better UX
      signal: AbortSignal.timeout(10000),
    });
    
    if (!response.ok) {
      console.warn('⚠️ Failed to fetch config, using fallback');
      return getFallbackConfig();
    }
    
    const data = await response.json();
    
    // Normalize the response
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
    
    configCache = normalizedConfig;
    configCacheTime = now;
    
    console.log('✅ Config loaded successfully');
    return normalizedConfig;
    
  } catch (error) {
    console.error('❌ Error fetching config:', error.message);
    return getFallbackConfig();
  }
}

/**
 * Join waitlist with proper error handling
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
    
    // Prepare data for backend
    const requestData = {
      email: formData.email.trim(),
      name: formData.name.trim(),
      interest_reason: formData.interest_reason,
      preferred_languages: Array.isArray(formData.preferred_languages) 
        ? formData.preferred_languages 
        : [formData.preferred_languages]
    };
    
    console.log('📤 Sending waitlist data:', {
      url: `${ENV.API_URL}/api/auth/waitlist/join`,
      data: requestData
    });
    
    const response = await fetch(`${ENV.API_URL}/api/auth/waitlist/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestData),
      // Add timeout
      signal: AbortSignal.timeout(15000),
    });
    
    // Handle response
    const responseText = await response.text();
    let responseData;
    
    try {
      responseData = responseText ? JSON.parse(responseText) : {};
    } catch (e) {
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
    
    console.log('✅ Waitlist submission successful:', responseData);
    return {
      success: true,
      data: responseData,
      message: 'Successfully joined the waitlist!'
    };
    
  } catch (error) {
    console.error('❌ Error joining waitlist:', error);
    
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
 * Fallback configuration when backend is unavailable
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
 * Get flag emoji for language code
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
  return flags[code] || 'world';
}

/**
 * Utility function to check if backend is reachable
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${ENV.API_URL}/health`, {
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}