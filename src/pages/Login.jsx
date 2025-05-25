import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useAuthState } from '../hooks/useAuthState';
import { loginUser } from '../api';

/**
 * Login component that provides user authentication functionality
 * @component
 * @returns {JSX.Element} The rendered Login page
 */
function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateAuthState } = useAuthState();

  /**
   * Handles the login form submission
   * @async
   * @param {Object} credentials - The login credentials
   * @param {string} credentials.email - User's email address
   * @param {string} credentials.password - User's password
   */
  async function handleLoginSubmit({ email, password }) {
    try {
      const data = await loginUser({ email, password });

      // Store the access token and user data
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.data));

      // Update global auth state
      updateAuthState(data.data);

      // Redirect to profile page
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-sand flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <img src="/logo02.svg" alt="Holidaze logo" className="h-36 mx-auto mb-2" />

      </div>

      <div className="bg-sand-light p-8 rounded-lg w-full max-w-md text-center">
        <h2 className="text-4xl font-[dm_sans] font-bold mb-6 text-cocoa-dark">Sign in</h2>

        {error && (
          <div className="mb-4 p-3 bg-coral text-sand-light rounded-md">
            {error}
          </div>
        )}

        <LoginForm onSubmit={handleLoginSubmit} />

        <p className="text-m text-cocoa-dark font-[nunito] font-light mt-6">
          Don't have an account?{' '}
          <a href="/register" className="font-bold hover:underline">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;