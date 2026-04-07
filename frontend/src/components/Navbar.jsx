import React, { useState } from 'react';
import { NAVIGATION_ITEMS } from '../constants';

function Navbar({ isLoggedIn, onLogout, onNavigate }) {
  var [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar-glass">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            style={{
              border: 'none',
              cursor: 'pointer',
              fontSize: '26px',
              fontWeight: '800',
              fontFamily: 'Poppins, sans-serif',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.5px',
            }}
          >
            🎫 EventSphere
          </button>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden md:flex">
            {NAVIGATION_ITEMS.map(function(item) {
              return (
                <button
                  key={item.view}
                  onClick={() => onNavigate(item.view)}
                  className="nav-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}
                >
                  {item.label}
                </button>
              );
            })}
            {isLoggedIn && (
              <button
                onClick={() => onNavigate('dashboard')}
                className="nav-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '15px' }}
              >
                Dashboard
              </button>
            )}
          </div>

          {/* Auth Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6366f1',
                    fontWeight: '600',
                    fontSize: '15px',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={function(e) { e.target.style.background = '#f0f0ff'; }}
                  onMouseLeave={function(e) { e.target.style.background = 'none'; }}
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="btn-primary"
                  style={{ padding: '10px 24px', fontSize: '14px', borderRadius: '12px' }}
                >
                  <span>Sign Up Free</span>
                </button>
              </>
            ) : (
              <button
                onClick={onLogout}
                style={{
                  background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
                  border: '1px solid #fca5a5',
                  color: '#dc2626',
                  fontWeight: '600',
                  fontSize: '14px',
                  padding: '10px 22px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={function(e) { e.target.style.background = 'linear-gradient(135deg, #fecaca, #fca5a5)'; }}
                onMouseLeave={function(e) { e.target.style.background = 'linear-gradient(135deg, #fee2e2, #fecaca)'; }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
