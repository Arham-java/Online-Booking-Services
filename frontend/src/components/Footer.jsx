import React from 'react';

var FOOTER_LINKS = [
  { label: 'Home', view: 'home' },
  { label: 'Explore', view: 'explore' },
  { label: 'Events', view: 'events' },
  { label: 'About Us', view: 'about' },
  { label: 'Contact', view: 'contactus' },
];

var SOCIAL_LINKS = [
  { icon: '📘', name: 'Facebook' },
  { icon: '📸', name: 'Instagram' },
  { icon: '🐦', name: 'Twitter' },
  { icon: '▶️', name: 'YouTube' },
];

function Footer({ onNavigate }) {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      color: 'white',
      padding: '60px 32px 30px',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Top Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '48px' }}>

          {/* Brand */}
          <div>
            <div style={{
              fontSize: '28px',
              fontWeight: '800',
              fontFamily: 'Poppins, sans-serif',
              background: 'linear-gradient(135deg, #a5b4fc, #f0abfc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px',
            }}>
              🎫 EventSphere
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.8', fontSize: '14px', marginBottom: '20px' }}>
              India's premier event booking platform. Discover concerts, sports, cultural festivals, and more across all major Indian cities.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {SOCIAL_LINKS.map(function(s) {
                return (
                  <div
                    key={s.name}
                    title={s.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={function(e) { e.currentTarget.style.background = 'rgba(99,102,241,0.4)'; }}
                    onMouseLeave={function(e) { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  >
                    {s.icon}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: '700', marginBottom: '20px', color: '#e2e8f0', fontSize: '16px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FOOTER_LINKS.map(function(link) {
                return (
                  <button
                    key={link.view}
                    onClick={() => onNavigate && onNavigate(link.view)}
                    style={{
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      color: '#94a3b8',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'color 0.2s ease',
                      padding: '0',
                    }}
                    onMouseEnter={function(e) { e.target.style.color = '#a5b4fc'; }}
                    onMouseLeave={function(e) { e.target.style.color = '#94a3b8'; }}
                  >
                    → {link.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 style={{ fontWeight: '700', marginBottom: '20px', color: '#e2e8f0', fontSize: '16px' }}>Events In India</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur', 'Pune'].map(function(city) {
                return (
                  <span key={city} style={{ color: '#94a3b8', fontSize: '14px' }}>📍 {city}</span>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontWeight: '700', marginBottom: '20px', color: '#e2e8f0', fontSize: '16px' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                📧 himeshjaiswal12@gmail.com
              </div>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                📧 helloarham596@gmail.com
              </div>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                📞 +91 9608456717
              </div>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                📞 +91 9552012347
              </div>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                🏢 Bhubaneswar, Odisha, India
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '0' }}>
            © 2026 EventSphere Platform. All rights reserved. Made with ❤️ in India.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: '#64748b', fontSize: '13px', textDecoration: 'none' }}
              onMouseEnter={function(e) { e.target.style.color = '#a5b4fc'; }}
              onMouseLeave={function(e) { e.target.style.color = '#64748b'; }}
            >Terms of Service</a>
            <a href="#" style={{ color: '#64748b', fontSize: '13px', textDecoration: 'none' }}
              onMouseEnter={function(e) { e.target.style.color = '#a5b4fc'; }}
              onMouseLeave={function(e) { e.target.style.color = '#64748b'; }}
            >Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
