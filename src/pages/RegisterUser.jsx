import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterUserForm from '../components/RegisterUserForm';
import { registerUser } from '../api';

/**
 * RegisterUser component that handles user registration functionality
 * @component
 * @returns {JSX.Element} The rendered RegisterUser page
 */
function RegisterUser() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Handles the registration form submission
   * @async
   * @param {Object} formData - The registration form data
   * @param {string} formData.name - User's username
   * @param {string} formData.email - User's email address
   * @param {string} formData.password - User's password
   * @param {boolean} formData.venueManager - Whether user is a venue manager
   * @param {string} [formData.bio] - User's optional biography
   */
  async function handleRegisterSubmit(formData) {
    try {
      // Clean up the form data by removing empty optional fields
      const cleanedData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        venueManager: formData.venueManager
      };

      if (formData.bio) cleanedData.bio = formData.bio;

      const data = await registerUser(cleanedData);

      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.data));

      // Redirect to login page after successful registration
      navigate('/login');
      console.log('Registration successful');
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
        <h2 className="text-4xl font-[dm_sans] font-bold mb-6 text-cocoa-dark">Create Account</h2>

        {error && (
          <div className="mb-4 p-3 bg-coral text-sand-light rounded-md">
            {error}
          </div>
        )}

        <RegisterUserForm onSubmit={handleRegisterSubmit} />

        <p className="text-m text-cocoa-dark font-[nunito] font-light mt-6">
          Already have an account?{' '}
          <a href="/login" className="font-bold hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterUser;