import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthState } from '../hooks/useAuthState';
import logo from '../assets/logo01.svg';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthState();
  const logout = useLogout();

  return (
    <nav className="bg-sand-light px-4 sm:px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src={logo}
              alt="Holidaze Logo"
              className="h-12 mr-2"
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex space-x-6 items-center font-[nunito] text-lg ">
          <Link to="/" className="text-cocoa hover:text-coral uppercase">Home</Link>
          <a href="#" className="text-cocoa hover:text-coral uppercase">Venues</a>
          <a href="#" className="text-cocoa hover:text-coral uppercase">Contact</a>
          {user ? (
            <>
              <Link to="/profile" className="text-cocoa hover:text-coral uppercase">
                My Profile
              </Link>
              <button 
                onClick={logout}
                className="bg-teal-dark hover:bg-coral-dark hover:cursor-pointer text-sand-light uppercase px-6 py-2 rounded-full font-medium"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-coral hover:bg-coral-light hover:cursor-pointer text-sand-light uppercase px-6 py-2 rounded-full font-medium">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-2 space-y-4 px-4 text-center">
          <a href="#" className="block text-cocoa hover:text-coral uppercase text-center">Home</a>
          <a href="#" className="block text-cocoa hover:text-coral uppercase text-center">Venues</a>
          <a href="#" className="block text-cocoa hover:text-coral uppercase text-center">Contact</a>
          {user ? (
            <>
              <Link to="/profile" className="block text-cocoa hover:text-coral uppercase text-center">
                My Profile
              </Link>
              <button 
                onClick={logout}
                className="w-full bg-coral hover:bg-coral-dark hover:cursor-pointer text-sand-light uppercase px-6 py-2 rounded-full font-medium"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login" className="w-full bg-coral hover:bg-coral-dark hover:cursor-pointer text-sand-light uppercase px-6 py-2 rounded-full font-medium">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;