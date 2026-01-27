import React, { useState } from 'react';

const Signup = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    alert("Account created successfully (Mock)");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20">
        <div>
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Create Account</h2>
        </div>
        <p className="text-center text-slate-400">Join EventSphere today.</p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-semibold text-cyan-400">Full Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-500 transition" 
              placeholder="Enter your Name "
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-cyan-400">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-500 transition" 
              placeholder="mail@gmail.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-cyan-400">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-500 transition" 
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="w-full py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">
            Sign Up
          </button>
        </form>
        
        <p className="text-sm text-center text-slate-400">
          Already have an account? 
          <button onClick={switchToLogin} className="ml-1 font-semibold text-cyan-400 hover:text-cyan-300 transition">Login</button>
        </p>
      </div>
    </div>
  );
};

export default Signup;