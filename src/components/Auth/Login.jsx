import React, { useState } from 'react';

const Login = ({ switchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password });
    alert("Login successful (Mock)");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600">EventSphere</h2>
        <p className="text-center text-gray-500">Welcome back! Please login to your account.</p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300">
            Login
          </button>
        </form>
        
        <p className="text-sm text-center text-gray-600">
          Don't have an account? 
          <button onClick={switchToSignup} className="ml-1 font-semibold text-indigo-600 hover:underline">Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;