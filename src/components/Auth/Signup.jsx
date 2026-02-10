import React, { useState } from 'react';
import { FormInput } from '../UI/SharedComponents';
import { getRoleButtonClass } from '../../constants';

const Signup = ({ switchToLogin, onSignup }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [role, setRole] = useState('user');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup:', formData, 'Role:', role);
    if (onSignup) onSignup(role);
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen py-12 px-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1514991643770-3f5e2d1f0aea?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white/80"></div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl border border-gray-200 shadow-lg relative z-10">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-600">
          Create Account
        </h2>
        <p className="text-center text-gray-600">Join EventSphere and start booking events today.</p>

        {/* Role Selection */}
        <div className="flex gap-4">
          <button 
            type="button"
            onClick={() => setRole('user')}
            className={getRoleButtonClass(role === 'user', 'blue')}
          >
            User
          </button>
          <button 
            type="button"
            onClick={() => setRole('organizer')}
            className={getRoleButtonClass(role === 'organizer', 'orange')}
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
          <button type="submit" className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-300">
            Sign Up as {role === 'user' ? 'User' : 'Organizer'}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600">
          Already have an account? 
          <button 
            onClick={switchToLogin} 
            className="ml-1 font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;