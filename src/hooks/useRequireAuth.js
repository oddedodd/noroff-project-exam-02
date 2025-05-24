import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from './useAuthState';

/**
 * Custom hook to protect routes that require authentication
 * @param {string} redirectTo - The path to redirect to when user is not authenticated (defaults to '/login')
 * @returns {Object|null} user - The authenticated user data or null if not authenticated
 */
export function useRequireAuth(redirectTo = '/login') {
  const { user } = useAuthState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(redirectTo);
    }
  }, [user, navigate, redirectTo]);

  return user;
} 