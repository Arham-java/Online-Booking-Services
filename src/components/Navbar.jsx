import React from 'react';
import { NAVIGATION_ITEMS, STYLES } from '../constants';

const Navbar = ({ isLoggedIn, onLogout, onNavigate }) => {
  const handleNavigate = (item) => {
    const view = item.view.toLowerCase();
    onNavigate(view);
  };

  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-50">
      {/* Logo */}
      <div 
        className={`text-2xl font-black cursor-pointer tracking-tighter uppercase ${STYLES.gradientText}`}
        onClick={() => onNavigate('home')}
      >
        Event<span className="from-blue-400 to-purple-500 bg-gradient-to-r bg-clip-text">Sphere</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 font-medium text-slate-300">
        {NAVIGATION_ITEMS.map((item) => (
          <button 
            key={item.view} 
            onClick={() => handleNavigate(item)} 
            className="hover:text-cyan-400 transition duration-300"
          >
            {item.label}
          </button>
        ))}
        {/* Dashboard link only shown when logged in */}
        {isLoggedIn && (
          <button 
            onClick={() => onNavigate('dashboard')} 
            className="hover:text-cyan-400 transition duration-300"
          >
            Dashboard
          </button>
        )}
      </div>

      {/* Auth Buttons */}
      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
            <button 
              onClick={() => onNavigate('login')} 
              className={STYLES.textBtn}
            >
              Login
            </button>
            <button 
              onClick={() => onNavigate('signup')} 
              className={STYLES.primaryBtn}
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
