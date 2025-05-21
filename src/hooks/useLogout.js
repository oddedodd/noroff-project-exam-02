import { useNavigate } from 'react-router-dom';
import { useAuthState } from './useAuthState';

/**
 * Custom hook to handle user logout functionality
 * @param {string} redirectTo - The path to redirect to after logout (defaults to '/login')
 * @returns {Function} logout - Function to handle user logout
 */
export function useLogout(redirectTo = '/login') {
  const navigate = useNavigate();
  const { updateAuthState } = useAuthState();

  const logout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    
    // Update global auth state
    updateAuthState(null);
    
    // Redirect to specified path
    navigate(redirectTo);
  };

  return logout;
} 