import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  function handleLogout() {
    // Clear user data from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login');
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-coral hover:bg-coral-dark text-sand font-[nunito] uppercase font-light py-2 px-4 rounded hover:cursor-pointer"
    >
      Logout
    </button>
  );
}

export default Logout; 