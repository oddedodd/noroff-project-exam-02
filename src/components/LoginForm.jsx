// components/LoginForm.jsx
import { useState } from 'react';

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Signing in as:", email, password);
    onSubmit({ email, password });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label htmlFor="email" className="block text-lg font-[nunito] font-medium text-cocoa-dark">Email address</label>
        <input
          type="email"
          id="email"
          className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className="w-full border border-cocoa-dark rounded px-3 py-2 mt-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-dark hover:bg-amber text-sand font-[nunito] uppercase font-light py-2 rounded mt-4 hover:cursor-pointer"
      >
        SIGN IN
      </button>
    </form>
  );
}

export default LoginForm;