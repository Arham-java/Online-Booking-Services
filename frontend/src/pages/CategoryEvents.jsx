import React, { useState, useEffect } from 'react';
import { EventCard } from '../components/UI/SharedComponents';
import { EVENT_CATEGORIES } from '../constants';
import { getEventsCall, bookEventCall } from '../services/api';
import { generateDummyEvents } from '../dummyEvents';

/* Verified working Unsplash images per category */
var CATEGORY_IMAGES = {
  'Concerts':  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1800&q=80',
  'Sports':    'https://images.unsplash.com/photo-1540747913346-19212a4b423a?auto=format&fit=crop&w=1800&q=80',
  'Movies':    'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1800&q=80',
  'Comedy':    'https://images.unsplash.com/photo-1541845157-a6d2d100c931?auto=format&fit=crop&w=1800&q=80',
  'Stand-ups': 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?auto=format&fit=crop&w=1800&q=80',
  'Workshops': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80',
};

// var CATEGORY_ICONS = {
//   'Concerts':  '🎵',
//   'Sports':    '🏏',
//   'Movies':    '🎬',
//   'Comedy':    '😂',
//   'Stand-ups': '🎤',
//   'Workshops': '📚',
// };

var CATEGORY_COLORS = {
  'Concerts':  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'Sports':    'linear-gradient(135deg, #f97316, #ef4444)',
  'Movies':    'linear-gradient(135deg, #ec4899, #8b5cf6)',
  'Comedy':    'linear-gradient(135deg, #f59e0b, #f97316)',
  'Stand-ups': 'linear-gradient(135deg, #10b981, #06b6d4)',
  'Workshops': 'linear-gradient(135deg, #06b6d4, #6366f1)',
};

/* Filter events by category */
function filterByCategory(eventsData, cat) {
  if (cat === 'All Categories') return eventsData;

  var catLower = cat.toLowerCase();
  var filtered = [];

  for (var k = 0; k < eventsData.length; k++) {
    var e = eventsData[k];
    var t = (e.title || '').toLowerCase();
    var d = (e.description || '').toLowerCase();
    var c = (e.category || '').toLowerCase();

    var match = t.includes(catLower) || d.includes(catLower) || c.includes(catLower);

    if (cat === 'Concerts'  && (t.includes('music') || t.includes('concert') || t.includes('sunburn') || t.includes('bollywood') || t.includes('nh7') || d.includes('music'))) match = true;
    if (cat === 'Movies'    && (t.includes('film') || t.includes('movie') || t.includes('festival') || t.includes('premiere') || d.includes('film'))) match = true;
    if (cat === 'Sports'    && (t.includes('sport') || t.includes('ipl') || t.includes('cricket') || t.includes('kabaddi') || t.includes('football') || t.includes('marathon') || d.includes('sport'))) match = true;
    if (cat === 'Workshops' && (t.includes('workshop') || t.includes('startup') || t.includes('masterclass') || t.includes('yoga') || d.includes('workshop'))) match = true;
    if ((cat === 'Comedy' || cat === 'Stand-ups') && (t.includes('stand') || t.includes('comedy') || t.includes('zakir') || t.includes('kapil') || d.includes('comedy'))) match = true;

    if (match) filtered.push(e);
  }
  return filtered;
}

function CategoryEvents(props) {
  var category = props.viewData || 'All Categories';

  var [events, setEvents] = useState([]);
  var [loading, setLoading] = useState(true);

  var heroImage = CATEGORY_IMAGES[category] || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80';
  var catIcon = CATEGORY_ICONS[category] || '🎪';
  var catColor = CATEGORY_COLORS[category] || 'linear-gradient(135deg, #6366f1, #8b5cf6)';

  useEffect(function() {
    async function fetchEvents() {
      try {
        var dbData = await getEventsCall();
        var dummyData = generateDummyEvents();
        var combined = dbData.concat(dummyData);
        setEvents(filterByCategory(combined, category));
      } catch (error) {
        console.log('Failed to fetch events', error);
        var dummyData = generateDummyEvents();
        setEvents(filterByCategory(dummyData, category));
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [category]);

  async function handleBook(eventId) {
    if (String(eventId).startsWith('dummy-')) {
      alert('Booking and payment successful! Your seat is securely confirmed.');
      setEvents(function(prev) {
        return prev.map(function(ev) {
          if (ev._id === eventId) {
            return Object.assign({}, ev, { availableSpots: Math.max(0, ev.availableSpots - 1) });
          }
          return ev;
        });
      });
      return;
    }

    try {
      await bookEventCall(eventId, 1);
      alert('Booking and payment successful! Your seat is confirmed.');
      var dbData = await getEventsCall();
      var dummyData = generateDummyEvents();
      setEvents(filterByCategory(dbData.concat(dummyData), category));
    } catch (error) {
      console.log(error);
      var msg = 'Failed to book event. Please try logging in again.';
      if (error && error.response && error.response.data && error.response.data.message) {
        msg = error.response.data.message;
      }
      alert(msg);
      if (error && error.response && error.response.status === 401) {
        props.onNavigate('login');
      }
    }
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
          backgroundImage: 'url("' + heroImage + '")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(15,12,41,0.90) 0%, rgba(48,43,99,0.85) 100%)',
        }} />

        {/* Decorative circle */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(99,102,241,0.15)', filter: 'blur(60px)',
        }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>

          {/* Category icon pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: catColor,
            borderRadius: '30px',
            padding: '10px 26px',
            fontSize: '15px', fontWeight: '700',
            marginBottom: '28px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            {catIcon} {category}
          </div>

          <h1 className="animate-fade-in-up" style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '900', fontFamily: 'Poppins, sans-serif',
            marginBottom: '20px', lineHeight: '1.2',
          }}>
            {category} Events <br /><span className="gradient-text">Across India</span>
          </h1>

          <p className="animate-fade-in-up delay-200" style={{
            fontSize: '1.1rem', color: 'rgba(255,255,255,0.82)',
            lineHeight: '1.7', marginBottom: '40px',
          }}>
            Explore the best {category.toLowerCase()} events happening across India. Secure your spot today!
          </p>

          <button
            onClick={() => props.onNavigate('explore')}
            className="btn-outline"
            style={{ fontSize: '15px', padding: '12px 32px' }}
          >
            ← Back to Explore
          </button>
        </div>
      </div>

      {/* ===== EVENTS GRID ===== */}
      <div style={{ padding: '80px 32px 90px', background: 'linear-gradient(180deg, #f8faff 0%, #ffffff 100%)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1e293b', marginBottom: '6px' }}>
                {catIcon} {category} Events in India
              </h2>
              <p style={{ color: '#64748b', fontSize: '15px' }}>
                {loading ? 'Loading...' : events.length + ' events found across India'}
              </p>
            </div>
            <button
              onClick={() => props.onNavigate('explore')}
              style={{
                background: 'linear-gradient(135deg, #f0f0ff, #ede9fe)',
                border: '1px solid #c7d2fe',
                borderRadius: '14px', padding: '12px 24px',
                color: '#6366f1', fontWeight: '700', fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              ← Back to All Events
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div className="loading-spinner" />
              <p style={{ color: '#64748b', marginTop: '20px', fontSize: '16px' }}>
                Loading {category} events...
              </p>
            </div>
          ) : events.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '80px 40px',
              background: 'white', borderRadius: '28px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: '72px', marginBottom: '24px' }}>🔍</div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1e293b', marginBottom: '12px' }}>
                No {category} Events Found
              </h3>
              <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
                There are currently no {category.toLowerCase()} events listed. Check back soon or explore other categories.
              </p>
              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={() => props.onNavigate('explore')}
                  className="btn-primary"
                  style={{ padding: '14px 32px' }}
                >
                  <span>Browse All Events</span>
                </button>
                <button
                  onClick={() => props.onNavigate('events')}
                  style={{
                    background: 'linear-gradient(135deg, #f0f0ff, #ede9fe)',
                    border: '1px solid #c7d2fe',
                    borderRadius: '14px', padding: '14px 32px',
                    color: '#6366f1', fontWeight: '700', fontSize: '15px',
                    cursor: 'pointer',
                  }}
                >
                  View Events Page
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Category pills for switching */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
                {['Concerts', 'Sports', 'Movies', 'Comedy', 'Workshops'].map(function(cat) {
                  return (
                    <button
                      key={cat}
                      onClick={() => props.onNavigate('category', cat)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '20px',
                        border: cat === category ? 'none' : '1px solid #e2e8f0',
                        background: cat === category ? catColor : 'white',
                        color: cat === category ? 'white' : '#475569',
                        fontWeight: '600', fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {CATEGORY_ICONS[cat]} {cat}
                    </button>
                  );
                })}
              </div>

              {/* Events Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
                {events.map(function(event) {
                  var imageUrl = event.image || 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=350&fit=crop&auto=format';
                  return (
                    <EventCard
                      key={event._id}
                      id={event._id}
                      title={event.title}
                      image={imageUrl}
                      date={event.date}
                      location={event.location}
                      price={event.price}
                      availableSpots={event.availableSpots}
                      onBook={handleBook}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  );
}

export default CategoryEvents;
