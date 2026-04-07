import React from 'react';
import { STYLES } from '../constants';
import founderImg from '../../founderImage/OurImage.jpeg';

var COMPANY_VALUES = [
  { icon: '🏆', title: 'Excellence', description: 'We strive for excellence in every interaction and every event we list on our platform.' },
  { icon: '🤝', title: 'Community', description: 'We believe in building strong communities that connect event-goers across India.' },
  { icon: '🔐', title: 'Trust', description: 'Your trust is our most valuable asset. Every booking is safe, secure and guaranteed.' },
];


var MILESTONES = [
  { year: '2022', event: 'EventSphere founded in Bhubaneswar, Odisha' },
  { year: '2023', event: 'Expanded to 10 major Indian cities' },
  { year: '2024', event: 'Crossed 1 million events booked' },
  { year: '2026', event: 'Now serving 28 states across India' },
];

/* Safe image with fallback */
function SafeImage(props) {
  var fallback = 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&auto=format';
  function handleError(e) { e.target.src = fallback; }
  return <img src={props.src} alt={props.alt} onError={handleError} style={props.style} className={props.className} />;
}

function About({ onNavigate }) {
  return (
    <div className="page-wrapper">

      {/* ===== HERO ===== */}
      <div
        style={{
          position: 'relative',
          color: 'white',
          padding: '90px 32px 100px',
          textAlign: 'center',
          overflow: 'hidden',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(15,12,41,0.88) 0%, rgba(48,43,99,0.82) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '750px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '30px',
            padding: '8px 22px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '28px',
          }}>
            🇮🇳 Our Story
          </div>
          <h1 className="animate-fade-in-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', fontFamily: 'Poppins, sans-serif', marginBottom: '20px' }}>
            About <span className="gradient-text">EventSphere</span>
          </h1>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.82)', lineHeight: '1.7' }}>
            Learn about our journey, our vision, and what makes us India's leading event booking platform.
          </p>
        </div>
      </div>

      {/* ===== STORY & VALUES ===== */}
      <section style={{ padding: '90px 32px', background: 'linear-gradient(180deg, #f8faff 0%, #ffffff 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '70px' }}>

            {/* Our Story */}
            <div className="card-premium animate-fade-in-left" style={{ padding: '40px' }}>
              <div style={{
                width: '56px', height: '56px', background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
                borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', marginBottom: '24px',
              }}>📖</div>
              <h2 style={{ fontSize: '1.7rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>Our Story</h2>
              <p style={{ color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
                Founded in 2022 in Bhubaneswar, Odisha, EventSphere was born from a simple idea: every Indian deserves access to extraordinary experiences. We started as a small passionate team and grew rapidly.
              </p>
              <p style={{ color: '#475569', lineHeight: '1.8' }}>
                Today, we connect event organizers with attendees across all 28 Indian states, making it easier than ever to discover and book unforgettable moments — from Bhubaneswar to Mumbai, Delhi to Goa.
              </p>
            </div>

            {/* Our Values */}
            <div className="card-premium animate-fade-in-right" style={{ padding: '40px' }}>
              <div style={{
                width: '56px', height: '56px', background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
                borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', marginBottom: '24px',
              }}>💎</div>
              <h2 style={{ fontSize: '1.7rem', fontWeight: '800', marginBottom: '24px', color: '#1e293b' }}>Our Values</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {COMPANY_VALUES.map(function(value) {
                  return (
                    <div key={value.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      <div style={{
                        width: '44px', height: '44px', minWidth: '44px',
                        background: 'linear-gradient(135deg, #f0f0ff, #e0e7ff)',
                        borderRadius: '12px', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '20px',
                      }}>
                        {value.icon}
                      </div>
                      <div>
                        <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>{value.title}</h3>
                        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>{value.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Timeline / Milestones */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="section-title">Our Journey</h2>
            <div className="divider" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {MILESTONES.map(function(m, i) {
              return (
                <div
                  key={m.year}
                  className="animate-fade-in-up"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    borderRadius: '20px',
                    padding: '32px 24px',
                    textAlign: 'center',
                    color: 'white',
                    animationDelay: (i * 0.15) + 's',
                  }}
                >
                  <div style={{ fontSize: '2.4rem', fontWeight: '900', marginBottom: '12px', fontFamily: 'Poppins, sans-serif' }}>
                    {m.year}
                  </div>
                  <p style={{ fontSize: '14px', opacity: '0.9', lineHeight: '1.6' }}>{m.event}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section style={{ padding: '80px 32px', background: '#ffffff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 className="section-title">Meet Our Founders</h2>
            <div className="divider" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="card-premium animate-fade-in-up" style={{ padding: '36px', textAlign: 'center', width: '100%', maxWidth: '600px' }}>
              <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 24px' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', border: '4px solid #6366f1' }}>
                  <img
                    src={founderImg}
                    alt="Founders"
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transform: 'scale(1.4)', transformOrigin: 'center 20%',
                    }}
                  />
                </div>
                <div style={{
                  position: 'absolute', bottom: '4px', right: '4px',
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: '#22c55e', border: '3px solid white',
                }} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'center' }}>
                <div>
                  <h3 style={{ fontWeight: '800', fontSize: '1.2rem', color: '#1e293b', marginBottom: '6px' }}>Arham</h3>
                  <p style={{ color: '#6366f1', fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>Co-Founder & CEO</p>
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>helloarham596@gmail.com</p>
                </div>
                <div>
                  <h3 style={{ fontWeight: '800', fontSize: '1.2rem', color: '#1e293b', marginBottom: '6px' }}>Himesh Jaiswal</h3>
                  <p style={{ color: '#6366f1', fontWeight: '600', fontSize: '14px', marginBottom: '8px' }}>Co-Founder & CTO</p>
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>himeshjaiswal12@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{
        padding: '80px 32px',
        background: 'linear-gradient(135deg, #0f0c29, #302b63)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: '0.1',
        }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.6rem', fontWeight: '900', color: 'white', marginBottom: '16px', fontFamily: 'Poppins, sans-serif' }}>
            Join Millions of Event Lovers 
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.7' }}>
            Start exploring amazing events today and create unforgettable memories across India.
          </p>
          <button onClick={() => onNavigate('explore')} className="btn-orange" style={{ padding: '16px 48px', fontSize: '16px' }}>
            Explore Events Now 
          </button>
        </div>
      </section>

    </div>
  );
}

export default About;
