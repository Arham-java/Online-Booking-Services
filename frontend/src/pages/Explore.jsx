import React, { useState, useEffect } from 'react';
import { EventCard } from '../components/UI/SharedComponents';
import { EVENT_CATEGORIES } from '../constants';
import { getEventsCall, bookEventCall } from '../services/api';
import { generateDummyEvents } from '../dummyEvents';

/* Indian Featured Events with verified Unsplash images */
var FEATURED_EVENTS_INDIA = [
  {
    title: 'Sunburn Music Festival',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=500&h=350&fit=crop&auto=format',
    date: 'December 27, 2026',
    location: 'Vagator Beach, Goa',
    category: 'Concerts',
    price: 2500,
  },
  {
    title: 'India Tech Summit 2026',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=350&fit=crop&auto=format',
    date: 'September 12, 2026',
    location: 'HICC, Hyderabad',
    category: 'Workshops',
    price: 1800,
  },
  {
    title: 'IPL Final 2026',
    image: 'https://images.unsplash.com/photo-1540747913346-19212a4b423a?w=500&h=350&fit=crop&auto=format',
    date: 'May 28, 2026',
    location: 'Wankhede Stadium, Mumbai',
    category: 'Sports',
    price: 3500,
  },
  {
    title: 'Zakir Khan Live Comedy',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=350&fit=crop&auto=format',
    date: 'October 5, 2026',
    location: 'NSCI Dome, Mumbai',
    category: 'Comedy',
    price: 999,
  },
  {
    title: 'Jaipur Literature Festival',
    image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=500&h=350&fit=crop&auto=format',
    date: 'January 26, 2027',
    location: 'Diggi Palace, Jaipur',
    category: 'Workshops',
    price: 500,
  },
  {
    title: 'Bollywood Night – Lata Tribute',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=350&fit=crop&auto=format',
    date: 'November 15, 2026',
    location: 'NCPA, Mumbai',
    category: 'Concerts',
    price: 1200,
  },
];

/* Category images – verified Unsplash */
var CATEGORY_IMAGES = {
  'Concerts':  'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=200&fit=crop&auto=format',
  'Sports':    'https://images.unsplash.com/photo-1540747913346-19212a4b423a?w=300&h=200&fit=crop&auto=format',
  'Movies':    'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=200&fit=crop&auto=format',
  'Comedy':    'https://images.unsplash.com/photo-1541845157-a6d2d100c931?w=300&h=200&fit=crop&auto=format',
  'Workshops': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop&auto=format',
};

/* Image with fallback */
function SafeImage(props) {
  var fallback = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=350&fit=crop&auto=format';
  function handleError(e) { e.target.src = fallback; }
  return <img src={props.src} alt={props.alt} onError={handleError} style={props.style} className={props.className} />;
}

function Explore({ onNavigate }) {
  var [events, setEvents] = useState([]);
  var [loading, setLoading] = useState(true);
  var [searchQuery, setSearchQuery] = useState('');
  var [activeSearch, setActiveSearch] = useState('');
  var [selectedCategory, setSelectedCategory] = useState('All Categories');

  useEffect(function() {
    async function fetchEvents() {
      try {
        var data = await getEventsCall();
        var dummyData = generateDummyEvents();
        setEvents([...data, ...dummyData]);
      } catch (error) {
        console.log('Failed to fetch events', error);
        var fallbackData = generateDummyEvents();
        setEvents(fallbackData);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  async function handleBook(eventId) {
    if (String(eventId).startsWith('dummy-')) {
      alert('Booking and payment successful! Your seat is securely confirmed for this event.');
      setEvents(function(prevEvents) {
        return prevEvents.map(function(ev) {
          return ev._id === eventId ? Object.assign({}, ev, { availableSpots: Math.max(0, ev.availableSpots - 1) }) : ev;
        });
      });
      return;
    }
    try {
      await bookEventCall(eventId, 1);
      alert('Booking and payment successful! Your seat is confirmed.');
      var data = await getEventsCall();
      var dummyData = generateDummyEvents();
      setEvents([...data, ...dummyData]);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || 'Failed to book event. Please try logging in again.');
      if (error.response?.status === 401) {
        onNavigate('login');
      }
    }
  }

  function handleSearchClick() {
    var query = searchQuery;
    if (selectedCategory !== 'All Categories') {
      query = searchQuery + ' ' + selectedCategory;
    }
    setActiveSearch(query);
    document.getElementById('events-list-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  function handleCategoryExplore(cat) {
    onNavigate('category', cat);
  }

  var filteredEvents = events.filter(function(e) {
    return (
      e.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
      (e.description && e.description.toLowerCase().includes(activeSearch.toLowerCase())) ||
      e.location.toLowerCase().includes(activeSearch.toLowerCase())
    );
  });

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
          backgroundImage: 'url("https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(15,12,41,0.88) 0%, rgba(48,43,99,0.82) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
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
            🔍 Find Your Next Experience
          </div>
          <h1 className="animate-fade-in-up" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: '900', fontFamily: 'Poppins, sans-serif', marginBottom: '20px' }}>
            Explore <span className="gradient-text">India's Best Events</span>
          </h1>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.82)', lineHeight: '1.7', marginBottom: '48px' }}>
            Discover thousands of amazing events happening across India — concerts, sports, comedy, cinema and more.
          </p>

          {/* Search bar inside hero */}
          <div className="animate-fade-in-up delay-300" style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: '20px',
            padding: '16px 20px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
            display: 'grid',
            gridTemplateColumns: '1fr auto auto',
            gap: '12px',
            alignItems: 'center',
          }}>
            <input
              type="text"
              placeholder="🔍  Search by event name, city, artist..."
              className="form-control"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
              style={{ borderRadius: '12px' }}
            />
            <select
              className="form-control"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ borderRadius: '12px', minWidth: '160px', width: 'auto' }}
            >
              <option>All Categories</option>
              <option>Concerts</option>
              <option>Sports</option>
              <option>Movies</option>
              <option>Comedy</option>
              <option>Workshops</option>
            </select>
            <button onClick={handleSearchClick} className="btn-primary" style={{ padding: '14px 28px', whiteSpace: 'nowrap' }}>
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div style={{ padding: '80px 32px', background: 'linear-gradient(180deg, #f8faff 0%, #ffffff 100%)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* Browse by Category */}
          <section style={{ marginBottom: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 className="section-title">Browse by Category</h2>
              <div className="divider" />
              <p className="section-subtitle" style={{ marginTop: '16px' }}>Pick a category and dive in</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {EVENT_CATEGORIES.map(function(category, i) {
                var catImage = CATEGORY_IMAGES[category.name] || 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=200&fit=crop&auto=format';
                return (
                  <div
                    key={category.name}
                    className="card-premium animate-fade-in-up"
                    style={{ overflow: 'hidden', animationDelay: (i * 0.1) + 's', cursor: 'pointer' }}
                    onClick={() => handleCategoryExplore(category.name)}
                  >
                    <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                      <SafeImage
                        src={catImage}
                        alt={category.name}
                        className="img-hover-zoom"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(15,12,41,0.7), rgba(0,0,0,0.15))',
                      }}>
                      </div>
                    </div>
                    <div style={{ padding: '16px', textAlign: 'center' }}>
                      <h3 style={{ fontWeight: '700', color: '#1e293b', fontSize: '1rem', marginBottom: '12px' }}>
                        {category.name}
                      </h3>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCategoryExplore(category.name); }}
                        className="btn-primary"
                        style={{ width: '100%', padding: '10px', fontSize: '13px', borderRadius: '12px' }}
                      >
                        <span>Explore</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Featured Events - Static Indian events shown first */}
          <section style={{ marginBottom: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 className="section-title">Featured Indian Events</h2>
              <div className="divider" />
              <p className="section-subtitle" style={{ marginTop: '16px' }}>Handpicked events from across India</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginBottom: '48px' }}>
              {FEATURED_EVENTS_INDIA.map(function(event, i) {
                return (
                  <div
                    key={event.title}
                    className="card-premium animate-fade-in-up"
                    style={{ overflow: 'hidden', animationDelay: (i * 0.1) + 's' }}
                  >
                    <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                      <SafeImage
                        src={event.image}
                        alt={event.title}
                        className="img-hover-zoom"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {/* Category badge */}
                      <div style={{
                        position: 'absolute', top: '14px', left: '14px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: 'white', fontSize: '12px', fontWeight: '700',
                        padding: '4px 12px', borderRadius: '20px',
                      }}>
                        {event.category}
                      </div>
                      {/* Price badge */}
                      <div style={{
                        position: 'absolute', top: '14px', right: '14px',
                        background: 'linear-gradient(135deg, #f97316, #ef4444)',
                        color: 'white', fontSize: '13px', fontWeight: '800',
                        padding: '4px 12px', borderRadius: '20px',
                      }}>
                        ₹{event.price}
                      </div>
                    </div>
                    <div style={{ padding: '22px' }}>
                      <h3 style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1e293b', marginBottom: '12px', lineHeight: '1.4' }}>
                        {event.title}
                      </h3>
                      <p style={{ color: '#6366f1', fontSize: '13px', fontWeight: '500', marginBottom: '6px' }}>📅 {event.date}</p>
                      <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '18px' }}>📍 {event.location}</p>
                      <button onClick={() => onNavigate('events')} className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '14px', borderRadius: '12px' }}>
                        <span>Book Now</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Live Events From DB */}
          <section id="events-list-section">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 className="section-title">All Events</h2>
              <div className="divider" />
              <p className="section-subtitle" style={{ marginTop: '16px' }}>Browse and book tickets for all listed events</p>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div className="loading-spinner" />
                <p style={{ color: '#64748b', marginTop: '20px', fontSize: '16px' }}>Loading events...</p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>No results found</h3>
                <p style={{ color: '#64748b' }}>Try different keywords or clear your search.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
                {filteredEvents.slice(0, 12).map(function(event) {
                  return (
                    <EventCard
                      key={event._id}
                      id={event._id}
                      title={event.title}
                      image={event.image || 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=350&fit=crop&auto=format'}
                      date={event.date}
                      location={event.location}
                      price={event.price}
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

export default Explore;
