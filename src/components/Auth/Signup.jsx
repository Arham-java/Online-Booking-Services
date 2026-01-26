import React, { useState } from 'react';

const Signup = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    alert("Account created successfully (Mock)");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600">Create Account</h2>
        <p className="text-center text-gray-500">Join EventSphere today.</p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" 
              placeholder="John Doe"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" 
              placeholder="you@example.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" 
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300">
            Sign Up
          </button>
        </form>
        
        <p className="text-sm text-center text-gray-600">
          Already have an account? 
          <button onClick={switchToLogin} className="ml-1 font-semibold text-indigo-600 hover:underline">Login</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;