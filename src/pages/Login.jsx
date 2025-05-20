// pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleLoginSubmit({ email, password }) {
    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || 'Login failed');
      }

      // Store the access token and user data
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.data));

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