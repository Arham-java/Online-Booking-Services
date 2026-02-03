import React from 'react';

const Navbar = ({ isLoggedIn, onLogout, onNavigate }) => {
  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-50">
      {/* Logo */}
      <div 
        className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer tracking-tighter uppercase"
        onClick={() => onNavigate('home')}
      >
        Event<span className="from-blue-400 to-purple-500 bg-gradient-to-r bg-clip-text">Sphere</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 font-medium text-slate-300">
        {['Home', 'Dashboard', 'Explore', 'About Us', 'Contact Us'].map((item) => (
          <button 
            key={item} 
            onClick={() => onNavigate(item === 'About Us' ? 'about' : item === 'Contact Us' ? 'contactus' : item.toLowerCase())} 
            className="hover:text-cyan-400 transition duration-300"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
            <button 
              onClick={() => onNavigate('login')} 
              className="text-cyan-400 font-semibold px-4 py-2 hover:bg-cyan-400/10 rounded-lg transition duration-300"
            >
              Login
            </button>
            <button 
              onClick={() => onNavigate('signup')} 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300"
            >
              Sign Up
            </button>
          </>
        ) : (
          <button 
            onClick={onLogout} 
            className="border border-red-500/50 text-red-400 px-5 py-2 rounded-lg font-semibold hover:bg-red-500/10 transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
