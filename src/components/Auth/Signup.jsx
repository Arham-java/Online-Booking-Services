import React, { useState } from 'react';
import { FormInput } from '../UI/SharedComponents';
import { STYLES } from '../../constants';

const Signup = ({ switchToLogin, onSignup }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [role, setRole] = useState('user'); // 'user' or 'organizer'

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup:', formData, 'Role:', role);
    // Pass role to onSignup callback
    if (onSignup) onSignup(role);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${STYLES.darkBg}`}>
      <div className={`w-full max-w-md p-8 space-y-6 ${STYLES.card}`}>
        {/* Title */}
        <h2 className={`text-3xl font-bold text-center ${STYLES.gradientText}`}>
          Create Account
        </h2>
        <p className="text-center text-slate-400">Join EventSphere today.</p>

        {/* Role Selection */}
        <div className="flex gap-4">
          <button 
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
              role === 'user' 
                ? 'bg-cyan-500 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            User
          </button>
          <button 
            type="button"
            onClick={() => setRole('organizer')}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
              role === 'organizer' 
                ? 'bg-purple-500 text-white' 
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            Organizer
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormInput 
            label="Full Name" 
            placeholder="Your name" 
            type="text" 
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <FormInput 
            label="Email Address" 
            placeholder="mail@gmail.com" 
            type="email" 
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <FormInput 
            label="Password" 
            placeholder="••••••••" 
            type="password" 
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          <button type="submit" className={STYLES.primaryBtn + ' w-full'}>
            Sign Up as {role === 'user' ? 'User' : 'Organizer'}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-slate-400">
          Already have an account? 
          <button 
            onClick={switchToLogin} 
            className="ml-1 font-semibold text-cyan-400 hover:text-cyan-300 transition"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;