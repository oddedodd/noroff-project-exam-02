import { useState, useEffect } from 'react';

/**
 * Custom event name for authentication state changes
 * @constant {string}
 */
const AUTH_EVENT = 'authStateChange';

/**
 * Custom hook to manage authentication state across the application
 * @returns {Object} Authentication state and update function
 * @property {Object|null} user - The current user object or null if not authenticated
 * @property {Function} updateAuthState - Function to update the authentication state
 */
export function useAuthState() {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        return null;
      }
    }
    return null;
  });

  /**
   * Updates the authentication state and broadcasts the change
   * @param {Object|null} newUser - The new user object or null when logging out
   */
  const updateAuthState = (newUser) => {
    setUser(newUser);
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent(AUTH_EVENT, { detail: newUser }));
  };

  // Listen for auth state changes
  useEffect(() => {
    /**
     * Event handler for authentication state changes
     * @param {CustomEvent} event - The auth state change event
     */
    const handleAuthChange = (event) => {
      setUser(event.detail);
    };

    window.addEventListener(AUTH_EVENT, handleAuthChange);
    return () => window.removeEventListener(AUTH_EVENT, handleAuthChange);
  }, []);

  return { user, updateAuthState };
} 