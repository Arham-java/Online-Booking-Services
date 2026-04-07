import React from 'react';

/* Indian event names and locations */
var FEATURES = [
  {
    emoji: '📱',
    title: 'Instant Access',
    desc: 'Receive your digital tickets immediately after booking via email. No waiting, no hassle!',
  },
  {
    emoji: '🔒',
    title: 'Secure Payments',
    desc: 'Your transactions are protected with military-grade encryption and trusted payment gateways.',
  },
  {
    emoji: '🌍',
    title: 'Pan-India Reach',
    desc: 'From local performances to national festivals across Mumbai, Delhi, Bengaluru and more.',
  },
];

/* Verified working Unsplash images - Indian themed events */
var FEATURED_EVENTS = [
  {
    title: 'Sunburn Music Festival',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=600&h=400&fit=crop&auto=format',
    date: 'December 27–29, 2026',
    location: 'Vagator Beach, Goa',
    category: 'Concert',
    price: '₹2,500',
  },
  {
    title: 'India Tech Summit 2026',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format',
    date: 'September 12, 2026',
    location: 'HICC, Hyderabad',
    category: 'Conference',
    price: '₹1,800',
  },
  {
    title: 'Zakir Khan Live Stand-up',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=600&h=400&fit=crop&auto=format',
    date: 'October 5, 2026',
    location: 'NSCI Dome, Mumbai',
    category: 'Comedy',
    price: '₹999',
  },
];

var STATS = [
  { value: '28', label: 'Indian States', icon: '🗺️' },
  { value: '5M+', label: 'Events Booked', icon: '🎫' },
  { value: '50K+', label: 'Events Listed', icon: '📅' },
  { value: '4.9★', label: 'User Rating', icon: '⭐' },
];

/* Helper: image with fallback if broken */
function SafeImage(props) {
  var fallback = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop&auto=format';

  function handleError(e) {
    e.target.src = fallback;
  }

  return (
    <img
      src={props.src}
      alt={props.alt}
      onError={handleError}
      style={props.style}
      className={props.className}
    />
  );
}

function Home({ onNavigate }) {
  var [searchQuery, setSearchQuery] = React.useState('');

  function handleSearch() {
    if (onNavigate) onNavigate('explore');
  }

  return (
    <div className="page-wrapper">

      {/* ===== HERO SECTION ===== */}
      <header
        style={{
          position: 'relative',
          color: 'white',
          padding: '80px 32px 100px',
          textAlign: 'center',
          overflow: 'hidden',
          minHeight: '620px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url("https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(15,12,41,0.85) 0%, rgba(48,43,99,0.80) 50%, rgba(36,36,62,0.85) 100%)',
        }} />

        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(99,102,241,0.12)',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(236,72,153,0.12)',
          filter: 'blur(60px)',
        }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto' }}>

          {/* Badge */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '30px',
            padding: '8px 22px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '28px',
            letterSpacing: '0.5px',
          }}>
            🇮🇳 India's #1 Event Booking Platform
          </div>

          <h1 className="animate-fade-in-up" style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '900',
            lineHeight: '1.15',
            marginBottom: '24px',
            fontFamily: 'Poppins, sans-serif',
          }}>
            Find & Book Your <br />
            <span className="gradient-text">Perfect Indian Events</span>
          </h1>

          <p className="animate-fade-in-up delay-200" style={{
            fontSize: '1.25rem',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '600px',
            margin: '0 auto 48px',
            lineHeight: '1.7',
          }}>
            Discover concerts, cultural festivals, sports events, comedies & more. Book tickets instantly across all major Indian cities.
          </p>

          {/* Search Bar */}
          <div className="animate-fade-in-up delay-300" style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: '20px',
            padding: '20px 24px',
            marginBottom: '36px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '12px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="🔍  Search events, artists, venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="form-control"
                style={{ borderRadius: '12px', fontSize: '15px' }}
              />
              <select className="form-control" style={{ borderRadius: '12px', width: 'auto', minWidth: '150px' }}>
                <option>All Categories</option>
                <option>Concerts</option>
                <option>Sports</option>
                <option>Movies</option>
                <option>Comedy</option>
                <option>Workshops</option>
              </select>
              <select className="form-control" style={{ borderRadius: '12px', width: 'auto', minWidth: '150px' }}>
                <option>All Cities</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bengaluru</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
                <option>Kolkata</option>
                <option>Goa</option>
              </select>
              <button
                onClick={handleSearch}
                className="btn-primary"
                style={{ whiteSpace: 'nowrap', padding: '14px 28px' }}
              >
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up delay-400" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('explore')} className="btn-primary" style={{ fontSize: '16px', padding: '16px 36px' }}>
              <span>Browse Events</span>
            </button>
            <button onClick={() => onNavigate('signup')} className="btn-outline" style={{ fontSize: '16px', padding: '14px 36px' }}>
              Get Started Free →
            </button>
          </div>

        </div>
      </header>

      {/* ===== STATS SECTION ===== */}
      <section style={{ padding: '60px 32px', background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {STATS.map(function(stat, i) {
            return (
              <div
                key={stat.label}
                className="animate-count-up"
                style={{
                  textAlign: 'center',
                  color: 'white',
                  animationDelay: (i * 0.1) + 's',
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{ fontSize: '2.8rem', fontWeight: '900', fontFamily: 'Poppins, sans-serif', lineHeight: '1' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '14px', opacity: '0.85', marginTop: '8px', fontWeight: '500' }}>{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section style={{ padding: '90px 32px', background: 'linear-gradient(180deg, #f8faff 0%, #ffffff 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title">Why Choose EventSphere?</h2>
            <div className="divider" />
            <p className="section-subtitle" style={{ marginTop: '20px' }}>
              We make event discovery and booking easy, secure, and fun for every Indian.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {FEATURES.map(function(feature, i) {
              return (
                <div
                  key={feature.title}
                  className="card-premium animate-fade-in-up"
                  style={{ padding: '40px 32px', textAlign: 'center', animationDelay: (i * 0.15) + 's' }}
                >
                  <div className="feature-icon">{feature.emoji}</div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '14px', color: '#1e293b' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '15px' }}>
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED EVENTS ===== */}
      <section style={{ padding: '90px 32px', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="section-title">Featured Events in India</h2>
            <div className="divider" />
            <p className="section-subtitle" style={{ marginTop: '20px' }}>
              Handpicked events happening across India right now
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {FEATURED_EVENTS.map(function(event, i) {
              return (
                <div
                  key={event.title}
                  className="card-premium animate-fade-in-up"
                  style={{ animationDelay: (i * 0.15) + 's' }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                    <SafeImage
                      src={event.image}
                      alt={event.title}
                      className="img-hover-zoom"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Category Badge */}
                    <div style={{
                      position: 'absolute', top: '14px', left: '14px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      color: 'white', fontSize: '12px', fontWeight: '700',
                      padding: '5px 14px', borderRadius: '20px',
                    }}>
                      {event.category}
                    </div>
                    {/* Price Badge */}
                    <div style={{
                      position: 'absolute', top: '14px', right: '14px',
                      background: 'linear-gradient(135deg, #f97316, #ef4444)',
                      color: 'white', fontSize: '13px', fontWeight: '800',
                      padding: '5px 14px', borderRadius: '20px',
                    }}>
                      {event.price}
                    </div>
                    {/* Gradient overlay */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                      background: 'linear-gradient(to top, rgba(15,12,41,0.6), transparent)',
                    }} />
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '14px', color: '#1e293b', lineHeight: '1.4' }}>
                      {event.title}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                      <span style={{ color: '#6366f1', fontSize: '14px', fontWeight: '500' }}>📅 {event.date}</span>
                      <span style={{ color: '#64748b', fontSize: '14px' }}>📍 {event.location}</span>
                    </div>
                    <button
                      onClick={() => onNavigate('explore')}
                      className="btn-primary"
                      style={{ width: '100%', padding: '12px' }}
                    >
                      <span>Book Now</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <button onClick={() => onNavigate('explore')} className="btn-primary" style={{ padding: '16px 48px', fontSize: '16px' }}>
              <span>View All Events →</span>
            </button>
          </div>
        </div>
      </section>

      {/* ===== CALL TO ACTION BANNER ===== */}
      <section style={{
        padding: '80px 32px',
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(99,102,241,0.15)', filter: 'blur(80px)',
        }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: 'white', marginBottom: '16px', fontFamily: 'Poppins, sans-serif' }}>
            Ready to Experience India's Best Events?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.7' }}>
            Join millions of Indians who book their favorite events on EventSphere. Sign up for free today.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('signup')} className="btn-orange" style={{ padding: '16px 40px', fontSize: '16px' }}>
              Create Free Account →
            </button>
            <button onClick={() => onNavigate('explore')} className="btn-outline" style={{ padding: '14px 40px', fontSize: '16px' }}>
              Browse Events
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
