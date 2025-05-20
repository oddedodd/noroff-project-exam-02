import { useState } from 'react';

function RegisterUserForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    venueManager: false
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label htmlFor="name" className="block text-lg font-[nunito] font-medium text-cocoa-dark">Username</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <p className="text-xs text-center text-cocoa-light font-[nunito] italic mt-2">
          Must not contain punctuation symbols apart from underscore (_)
        </p>
      </div>

      <div>
        <label htmlFor="email" className="block text-lg font-[nunito] font-medium text-cocoa-dark">Email address</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <p className="text-xs text-center text-cocoa-light font-[nunito] italic mt-2">
          Must be a valid <code>@stud.noroff.no</code> email address
        </p>
      </div>

      <div>
        <label htmlFor="password" className="block text-lg font-[nunito] font-medium text-cocoa-dark">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="8"
        />
        <p className="text-xs text-center text-cocoa-light font-[nunito] italic mt-2">
          Must be at least 8 characters long
        </p>
      </div>

      <div>
        <label htmlFor="bio" className="block text-lg font-[nunito] font-medium text-cocoa-dark">Bio (Optional)</label>
        <textarea
          id="bio"
          name="bio"
          className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
          value={formData.bio}
          onChange={handleChange}
          maxLength="160"
        />
        <p className="text-xs text-center text-cocoa-light font-[nunito] italic mt-2">
          Maximum 160 characters
        </p>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="venueManager"
          name="venueManager"
          className="mr-2"
          checked={formData.venueManager}
          onChange={handleChange}
        />
        <label htmlFor="venueManager" className="text-lg font-[nunito] font-medium text-cocoa-dark">
          Register as a venue manager
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-amber-dark hover:bg-amber text-sand font-[nunito] uppercase font-light py-2 rounded mt-4 hover:cursor-pointer"
      >
        CREATE ACCOUNT
      </button>
    </form>
  );
}

export default RegisterUserForm;
