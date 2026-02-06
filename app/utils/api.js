// utils/api.js

// For development, it's fine to have the backend URL here
// For production, you should use environment variables:
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_BASE_URL = 'http://localhost:8000';

// Cache for config with timeout
let configCache = null;
let configCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache

// Get public config from backend with better error handling
export async function getPublicConfig() {
    const now = Date.now();
    
    // Return cached config if it's still valid
    if (configCache && (now - configCacheTime) < CACHE_DURATION) {
        return configCache;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/config/public`);
        
        if (!response.ok) {
            console.warn('Failed to fetch config, using fallback');
            return getFallbackConfig();
        }
        
        const data = await response.json();
        
        // Validate and normalize the response
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
        
        return normalizedConfig;
        
    } catch (error) {
        console.error('Error fetching config:', error);
        return getFallbackConfig();
    }
}

// Helper to get language flag emoji
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

// Fallback config for when backend is unavailable
function getFallbackConfig() {
    return {
        interest_reasons: [
            { id: 'productivity', label: 'Productivity', description: 'Boost productivity' },
            { id: 'writing', label: 'Writing', description: 'Improve writing workflow' },
            { id: 'learning', label: 'Learning', description: 'Enhance learning experience' },
            { id: 'content', label: 'Content Creation', description: 'Create better content' },
            { id: 'students', label: 'Student Work', description: 'Help with studies' },
            { id: 'business', label: 'Business', description: 'Business use cases' },
            { id: 'accessibility', label: 'Accessibility', description: 'Accessibility features' },
            { id: 'other', label: 'Other', description: 'Other reasons' }
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

// Join waitlist with proper formatting
export async function joinWaitlist(formData) {
    try {
        // Validate required fields
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
        
        // Format the data exactly as backend expects
        const formattedData = {
            email: formData.email.trim(),
            name: formData.name.trim(),
            interest_reason: formData.interest_reason, // Single string
            preferred_languages: Array.isArray(formData.preferred_languages) 
                ? formData.preferred_languages 
                : [formData.preferred_languages] // Ensure it's an array
        };
        
        console.log('Sending to backend:', formattedData);
        
        const response = await fetch(`${API_BASE_URL}/api/auth/waitlist/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formattedData)
        });
        
        const responseData = await response.json();
        
        if (!response.ok) {
            // Handle backend validation errors
            const errorMessage = responseData.detail || 
                                responseData.message || 
                                responseData.error || 
                                'Failed to join waitlist';
            throw new Error(errorMessage);
        }
        
        return {
            success: true,
            data: responseData,
            message: 'Successfully joined the waitlist!'
        };
        
    } catch (error) {
        console.error('Error joining waitlist:', error);
        
        // Return structured error
        return {
            success: false,
            error: error.message || 'An unexpected error occurred',
            data: null
        };
    }
}

// Helper to extract interest reason ID from selection
export function getInterestReasonId(selectedReasons) {
    if (!selectedReasons || selectedReasons.length === 0) return null;
    
    // We only support single selection, so take the first one
    const selected = selectedReasons[0];
    
    // If it's already an ID string, return it
    if (typeof selected === 'string') return selected;
    
    // If it's an object with an id property, return the id
    if (selected && selected.id) return selected.id;
    
    // Otherwise, try to use it as is
    return selected;
}

// Helper to get language codes from selection
export function getLanguageCodes(selectedLanguages) {
    if (!selectedLanguages || selectedLanguages.length === 0) return [];
    
    return selectedLanguages.map(lang => {
        // If it's already a code string, return it
        if (typeof lang === 'string') return lang;
        
        // If it's an object with a code property, return the code
        if (lang && lang.code) return lang.code;
        
        // Otherwise, try to use it as is
        return lang;
    });
}