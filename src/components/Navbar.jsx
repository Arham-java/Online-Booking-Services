import React from 'react';
import { NAVIGATION_ITEMS, STYLES } from '../constants';

const Navbar = ({ isLoggedIn, onLogout, onNavigate }) => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Logo */}
      <button
        onClick={() => onNavigate('home')}
        className="text-2xl font-bold cursor-pointer hover:opacity-80 transition text-blue-600"
      >
        EventSphere
      </button>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 font-medium text-gray-700">
        {NAVIGATION_ITEMS.map((item) => (
          <button 
            key={item.view} 
            onClick={() => onNavigate(item.view)}
            className="hover:text-blue-600 transition duration-300"
          >
            {item.label}
          </button>
        ))}
        {isLoggedIn && (
          <button 
            onClick={() => onNavigate('dashboard')}
            className="hover:text-blue-600 transition duration-300"
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
              className="text-blue-600 font-semibold px-4 py-2 hover:text-blue-700 transition"
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
            className="border border-red-300 text-red-600 px-5 py-2 rounded-lg font-semibold hover:bg-red-50 transition duration-300"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
