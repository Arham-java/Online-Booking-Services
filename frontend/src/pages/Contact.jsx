import React, { useState } from 'react';

var CONTACT_INFO = [
  {
    icon: '📧',
    title: 'Email Us',
    details: ['himeshjaiswal12@gmail.com', 'helloarham596@gmail.com'],
    subtext: 'We respond within 24 hours',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    icon: '📞',
    title: 'Call Us',
    details: ['+91 9608456717', '+91 9552012347'],
    subtext: 'Monday – Saturday, 9AM – 7PM IST',
    gradient: 'linear-gradient(135deg, #f97316, #ef4444)',
  },
  {
    icon: '🏢',
    title: 'Visit Us',
    details: ['EventSphere HQ', 'Bhubaneswar, Odisha'],
    subtext: 'India – 751024',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
];

var FAQ_LIST = [
  { q: 'How do I book a ticket?', a: 'Browse events, select your event, click "Book Now", complete payment and get your e-ticket instantly via email.' },
  { q: 'Are my payments secure?', a: 'Yes! All payments go through encrypted PCI-DSS compliant gateways. Your card details are never stored.' },
  { q: 'Can I cancel or get a refund?', a: 'Refund policies depend on the event organizer. Check the event page for specific cancellation terms.' },
  { q: 'Which cities does EventSphere cover?', a: 'We cover 28 Indian states and all major cities including Mumbai, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, Goa and more.' },
];

function Contact({ onNavigate }) {
  var [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  var [openFaq, setOpenFaq] = useState(null);
  var [submitted, setSubmitted] = useState(false);

  function handleChange(field, value) {
    setFormData(function(prev) { return Object.assign({}, prev, { [field]: value }); });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Message sent:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(function() { setSubmitted(false); }, 5000);
  }

  function toggleFaq(i) {
    setOpenFaq(openFaq === i ? null : i);
  }

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
          minHeight: '450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url("https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(15,12,41,0.88) 0%, rgba(48,43,99,0.82) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '700px', margin: '0 auto' }}>
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
            💬 We'd love to hear from you
          </div>
          <h1 className="animate-fade-in-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', fontFamily: 'Poppins, sans-serif', marginBottom: '20px' }}>
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.82)', lineHeight: '1.7' }}>
            Have questions, feedback, or need help? Our team is here for you.
          </p>
        </div>
      </div>

      {/* ===== CONTACT CARDS ===== */}
      <section style={{ padding: '80px 32px 40px', background: 'linear-gradient(180deg, #f8faff 0%, #fff 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '70px' }}>
            {CONTACT_INFO.map(function(info, i) {
              return (
                <div
                  key={info.title}
                  className="animate-fade-in-up"
                  style={{
                    background: 'white',
                    borderRadius: '24px',
                    padding: '36px',
                    textAlign: 'center',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    animationDelay: (i * 0.15) + 's',
                  }}
                  onMouseEnter={function(e) {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(99,102,241,0.18)';
                  }}
                  onMouseLeave={function(e) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                  }}
                >
                  <div style={{
                    width: '72px', height: '72px',
                    background: info.gradient,
                    borderRadius: '20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '32px', margin: '0 auto 20px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                  }}>
                    {info.icon}
                  </div>
                  <h3 style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '14px', color: '#1e293b' }}>
                    {info.title}
                  </h3>
                  {info.details.map(function(d) {
                    return (
                      <p key={d} style={{ color: '#374151', fontWeight: '500', fontSize: '15px', lineHeight: '1.6', margin: '4px 0' }}>
                        {d}
                      </p>
                    );
                  })}
                  <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '10px' }}>{info.subtext}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FORM + FAQ ===== */}
      <section style={{ padding: '0 32px 90px', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>

          {/* Contact Form */}
          <div style={{ background: 'white', borderRadius: '28px', padding: '44px', boxShadow: '0 16px 50px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>Send a Message ✉️</h2>
              <p style={{ color: '#64748b', fontSize: '15px' }}>Fill in your details and we'll get back to you within 24 hours.</p>
            </div>

            {submitted && (
              <div style={{
                background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                border: '1px solid #6ee7b7',
                borderRadius: '14px',
                padding: '16px 20px',
                marginBottom: '24px',
                color: '#065f46',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                ✅ Message sent! We'll reply within 24 hours.
              </div>
            )}

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
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">Message</label>
                <textarea
                  placeholder="Write your message here..."
                  rows="5"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                  className="form-control"
                  style={{ resize: 'vertical' }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '15px', fontSize: '16px', borderRadius: '14px' }}>
                <span>Send Message 🚀</span>
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>FAQ ❓</h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '32px' }}>Quick answers to common questions.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {FAQ_LIST.map(function(faq, i) {
                var isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    style={{
                      background: 'white',
                      borderRadius: '16px',
                      border: isOpen ? '2px solid #6366f1' : '1px solid #e2e8f0',
                      overflow: 'hidden',
                      transition: 'all 0.25s ease',
                      boxShadow: isOpen ? '0 8px 24px rgba(99,102,241,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    <button
                      onClick={() => toggleFaq(i)}
                      style={{
                        width: '100%', textAlign: 'left',
                        padding: '20px 24px',
                        background: 'none', border: 'none',
                        cursor: 'pointer',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        fontWeight: '600', fontSize: '15px', color: '#1e293b',
                      }}
                    >
                      {faq.q}
                      <span style={{ fontSize: '20px', color: '#6366f1', transition: 'transform 0.25s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 24px 20px', color: '#64748b', lineHeight: '1.7', fontSize: '14px' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div style={{
              marginTop: '32px',
              borderRadius: '20px',
              overflow: 'hidden',
              height: '200px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              fontWeight: '700',
              flexDirection: 'column',
              gap: '8px',
            }}>
              <span style={{ fontSize: '48px' }}>🗺️</span>
              <p>Bhubaneswar, Odisha, India 🇮🇳</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Contact;
