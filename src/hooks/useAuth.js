import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to handle user authentication state and protected route redirects
 * @param {string} redirectTo - The path to redirect to when user is not authenticated (defaults to '/login')
 * @returns {{user: Object|null, isLoading: boolean}} Authentication state object
 * @returns {Object|null} user - The authenticated user data or null if not authenticated
 * @returns {boolean} isLoading - Loading state while checking authentication
 */
export function useAuth(redirectTo = '/login') {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');

    if (!storedUser || !accessToken) {
      // If no user data or token, redirect to login
      navigate(redirectTo);
      return;
    }

    // Parse and set user data
    try {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      // If there's an error parsing the data, clear storage and redirect
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      navigate(redirectTo);
    } finally {
      setIsLoading(false);
    }
  }, [navigate, redirectTo]);

  return { user, isLoading };
}