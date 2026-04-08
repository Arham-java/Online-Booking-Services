import React, { useState } from 'react';
import { signupCall } from '../../services/api';

function Signup({ switchToLogin, onSignup }) {
  var [formData, setFormData] = useState({ name: '', email: '', password: '' });
  var [role, setRole] = useState('user');
  var [loading, setLoading] = useState(false);

  function handleChange(field, value) {
    setFormData(function(prev) { return Object.assign({}, prev, { [field]: value }); });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      var data = await signupCall(formData.name, formData.email, formData.password, role);
      console.log('Signup Success:', data);
      if (onSignup) onSignup(data);
    } catch (error) {
      console.log('Signup Error:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Error during signup. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: 'url("https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1800&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(15,12,41,0.92) 0%, rgba(48,43,99,0.88) 100%)',
      }} />

      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(249,115,22,0.2)', filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-60px',
        width: '250px', height: '250px', borderRadius: '50%',
        background: 'rgba(99,102,241,0.15)', filter: 'blur(60px)',
      }} />

      {/* Card */}
      <div className="animate-fade-in-up" style={{
        position: 'relative', zIndex: 10,
        background: 'rgba(255,255,255,0.98)',
        borderRadius: '28px',
        padding: '48px 44px',
        width: '100%', maxWidth: '480px',
        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎪</div>
          <h2 style={{
            fontSize: '2rem', fontWeight: '900', fontFamily: 'Poppins, sans-serif',
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: '8px',
          }}>
            Join EventSphere!
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px' }}>
            Create your free account and start discovering amazing Indian events.
          </p>
        </div>

        {/* Role Selection */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
          <button
            type="button"
            onClick={() => setRole('user')}
            style={{
              flex: 1, padding: '12px',
              borderRadius: '14px',
              border: role === 'user' ? '2px solid #6366f1' : '2px solid #e2e8f0',
              background: role === 'user' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'white',
              color: role === 'user' ? 'white' : '#64748b',
              fontWeight: '700', fontSize: '14px',
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
          >
            👤 I'm a User
          </button>
          <button
            type="button"
            onClick={() => setRole('organizer')}
            style={{
              flex: 1, padding: '12px',
              borderRadius: '14px',
              border: role === 'organizer' ? '2px solid #f97316' : '2px solid #e2e8f0',
              background: role === 'organizer' ? 'linear-gradient(135deg, #f97316, #ef4444)' : 'white',
              color: role === 'organizer' ? 'white' : '#64748b',
              fontWeight: '700', fontSize: '14px',
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
          >
            🏢 I'm Organizer
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-orange"
            style={{ padding: '16px', fontSize: '16px', borderRadius: '14px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? '⏳ Creating Account...' : ('Sign Up as ' + (role === 'user' ? 'User' : 'Organizer'))}
          </button>
        </form>

        {/* Login link */}
        <p style={{ textAlign: 'center', marginTop: '24px', color: '#64748b', fontSize: '14px' }}>
          Already have an account?{' '}
          <button
            onClick={switchToLogin}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#6366f1', fontWeight: '700', fontSize: '14px',
              padding: '0',
            }}
          >
            Login →
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;