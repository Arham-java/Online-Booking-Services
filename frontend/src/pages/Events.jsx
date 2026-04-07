import React, { useState, useEffect } from 'react';
import { EventCategoryCard, EventCard } from '../components/UI/SharedComponents';
import { STYLES } from '../constants';
import { getEventsCall, bookEventCall } from '../services/api';

/* Indian event categories with verified Unsplash images */
var RECOMMENDED_EVENTS = [
  {
    name: 'Movies',
    // icon: '🎬',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop&auto=format',
    desc: 'Book Bollywood & Hollywood tickets',
  },
  {
    name: 'Stand-ups',
    // icon: '😂',
    image: 'https://images.unsplash.com/photo-1541845157-a6d2d100c931?w=400&h=300&fit=crop&auto=format',
    desc: 'Live comedy shows in your city',
  },
  {
    name: 'Concerts',
    // icon: '🎵',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop&auto=format',
    desc: 'Live music & Bollywood concerts',
  },
  {
    name: 'Sports',
    // icon: '🏏',
    image: 'https://images.unsplash.com/photo-1540747913346-19212a4b423a?w=400&h=300&fit=crop&auto=format',
    desc: 'Cricket, football & kabaddi matches',
  },
];

/* Indian events with verified Unsplash images */
var ALL_EVENTS = [
  {
    title: 'Sunburn Festival – Goa',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=500&h=350&fit=crop&auto=format',
    date: 'December 27, 2026',
    location: 'Vagator Beach, Goa',
  },
  {
    title: 'Indian Premier League (IPL) Final',
    image: 'https://images.unsplash.com/photo-1540747913346-19212a4b423a?w=500&h=350&fit=crop&auto=format',
    date: 'May 28, 2026',
    location: 'Wankhede Stadium, Mumbai',
  },
  {
    title: 'Jaipur Literature Festival 2026',
    image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=500&h=350&fit=crop&auto=format',
    date: 'January 26, 2026',
    location: 'Diggi Palace, Jaipur',
  },
];

/* image with error fallback */
function SafeImage(props) {
  var fallback = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=350&fit=crop&auto=format';
  function handleError(e) { e.target.src = fallback; }
  return <img src={props.src} alt={props.alt} onError={handleError} style={props.style} className={props.className} />;
}

function Events({ onNavigate }) {
  var [events, setEvents] = useState([]);
  var [loading, setLoading] = useState(true);

  useEffect(function() {
    async function fetchEvents() {
      try {
        var data = await getEventsCall();
        setEvents(data);
      } catch (error) {
        console.log('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  async function handleBook(eventId) {
    try {
      await bookEventCall(eventId, 1);
      alert('Booking successful!');
      var data = await getEventsCall();
      setEvents(data);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || 'Failed to book event. Please try logging in again.');
      if (error.response?.status === 401) {
        onNavigate('login');
      }
    }
  }

  function handleCategoryExplore(cat) {
    onNavigate('category', cat);
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
          minHeight: '480px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url("https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1800&q=80")',
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
            🎫 Browse All Events
          </div>
          <h1 className="animate-fade-in-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: '900', fontFamily: 'Poppins, sans-serif', marginBottom: '20px' }}>
            Events Across <span className="gradient-text">India</span>
          </h1>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.82)', lineHeight: '1.7' }}>
            Discover and book tickets for concerts, sports, comedy shows, and more happening across India.
          </p>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div style={{ padding: '80px 32px 60px', background: 'linear-gradient(180deg, #f8faff 0%, #ffffff 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Recommended Events */}
          <section style={{ marginBottom: '72px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 className="section-title">Recommended Events</h2>
              <div className="divider" />
              <p className="section-subtitle" style={{ marginTop: '16px' }}>
                Popular categories to explore across India
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '24px' }}>
              {RECOMMENDED_EVENTS.map(function(event, i) {
                return (
                  <div
                    key={event.name}
                    className="card-premium animate-fade-in-up"
                    style={{ overflow: 'hidden', animationDelay: (i * 0.1) + 's' }}
                  >
                    <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                      <SafeImage
                        src={event.image}
                        alt={event.name}
                        className="img-hover-zoom"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(15,12,41,0.7), transparent)',
                        display: 'flex', alignItems: 'flex-end', padding: '16px',
                      }}>
                        <span style={{ fontSize: '32px' }}>{event.icon}</span>
                      </div>
                    </div>
                    <div style={{ padding: '20px' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>{event.name}</h3>
                      <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '16px' }}>{event.desc}</p>
                      <button
                        onClick={() => handleCategoryExplore(event.name)}
                        className="btn-primary"
                        style={{ width: '100%', padding: '10px', fontSize: '14px', borderRadius: '12px' }}
                      >
                        <span>Explore {event.name}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* All Events from DB */}
          <section id="all-events-section">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 className="section-title">All Available Events</h2>
              <div className="divider" />
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div className="loading-spinner" />
                <p style={{ color: '#64748b', marginTop: '20px', fontSize: '16px' }}>Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '60px',
                background: 'white', borderRadius: '24px',
                border: '1px solid #e2e8f0',
              }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}></div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>No Events Found</h3>
                <p style={{ color: '#64748b', marginBottom: '28px' }}>No live events yet. Check back later or explore our curated events below.</p>
                <button onClick={() => onNavigate('explore')} className="btn-primary" style={{ padding: '12px 32px' }}>
                  <span>Explore Events</span>
                </button>

                {/* Show static Indian events as fallback */}
                <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', textAlign: 'left' }}>
                  {ALL_EVENTS.map(function(event, i) {
                    return (
                      <div key={event.title} className="card-premium" style={{ animationDelay: (i * 0.1) + 's' }}>
                        <div style={{ height: '180px', overflow: 'hidden' }}>
                          <SafeImage
                            src={event.image}
                            alt={event.title}
                            className="img-hover-zoom"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ padding: '20px' }}>
                          <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '10px' }}>{event.title}</h3>
                          <p style={{ color: '#6366f1', fontSize: '13px', fontWeight: '500' }}>📅 {event.date}</p>
                          <p style={{ color: '#64748b', fontSize: '13px' }}>📍 {event.location}</p>
                          <button onClick={() => onNavigate('explore')} className="btn-primary" style={{ width: '100%', marginTop: '16px', padding: '10px', fontSize: '14px', borderRadius: '12px' }}>
                            <span>View Details</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
                {events.map(function(event) {
                  return (
                    <EventCard
                      key={event._id}
                      id={event._id}
                      title={event.title}
                      image={event.image || 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=350&fit=crop&auto=format'}
                      date={event.date}
                      location={event.location}
                      availableSpots={event.availableSpots}
                      onBook={handleBook}
                    />
                  );
                })}
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}

export default Events;
