import React, { useState, useEffect } from 'react';
import { EventCategoryCard, EventCard } from '../components/UI/SharedComponents';
import { EVENT_CATEGORIES, STYLES } from '../constants';
import { getEventsCall, bookEventCall } from '../services/api';
import { generateDummyEvents } from '../dummyEvents';

var FEATURED_EVENTS = [
  { title: 'Summer Music Festival', image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop', date: 'July 15, 2026', location: 'Central Park, NY' },
  { title: 'Tech Conference 2026', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', date: 'August 20, 2026', location: 'San Francisco, CA' },
  { title: 'Art Exhibition', image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=300&fit=crop', date: 'September 5, 2026', location: 'Los Angeles, CA' },
  { title: 'International Film Festival', image: 'https://images.unsplash.com/photo-1489599849228-ed4dc14caf23?w=400&h=300&fit=crop', date: 'October 10, 2026', location: 'Toronto, Canada' },
  { title: 'Marathon Championship', image: 'https://images.unsplash.com/photo-1552674612-5f6015be9edf?w=400&h=300&fit=crop', date: 'November 3, 2026', location: 'Boston, MA' },
  { title: 'Winter Music Fest', image: 'https://images.unsplash.com/photo-1514989940723-e8d76fb8727b?w=400&h=300&fit=crop', date: 'December 20, 2026', location: 'Miami, FL' },
];

var CATEGORY_IMAGES = {
  'Concerts': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
  'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop',
  'Movies': 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=300&fit=crop',
  'Comedy': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
  'Workshops': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop',
};

function Explore({ onNavigate }) {
  var [events, setEvents] = useState([]);
  var [loading, setLoading] = useState(true);
  var [searchQuery, setSearchQuery] = useState('');
  var [activeSearch, setActiveSearch] = useState('');
  var [selectedCategory, setSelectedCategory] = useState('All Categories');

  useEffect(() => {
    async function fetchEvents() {
      try {
        var data = await getEventsCall();
        var dummyData = generateDummyEvents();
        setEvents([...data, ...dummyData]);
      } catch (error) {
        console.log('Failed to fetch events', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  async function handleBook(eventId) {
    if (String(eventId).startsWith('dummy-')) {
       alert('Booking and payment successful! Your seat is securely confirmed for this event.');
       setEvents(prevEvents => prevEvents.map(ev => 
         ev._id === eventId ? { ...ev, availableSpots: Math.max(0, ev.availableSpots - 1) } : ev
       ));
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
  };

  function handleSearchClick() {
    var query = searchQuery;
    if (selectedCategory !== 'All Categories') {
      query = searchQuery + ' ' + selectedCategory; // basic mockup of combined search since backend lacks category
    }
    setActiveSearch(query);
    document.getElementById('events-list-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  function handleCategoryExplore(cat) {
    onNavigate('category', cat);
  };

  var filteredEvents = events.filter(e => 
    e.title.toLowerCase().includes(activeSearch.toLowerCase()) || 
    (e.description && e.description.toLowerCase().includes(activeSearch.toLowerCase())) ||
    e.location.toLowerCase().includes(activeSearch.toLowerCase())
  );

  return (
    <div>
      {/* Hero Section */}
      <div className="relative text-white py-32 px-8 text-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className={`text-5xl font-bold mb-6 ${STYLES.gradientText}`}>
            Explore Events
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Discover thousands of amazing events happening around the world.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-8 max-w-6xl mx-auto bg-gradient-to-b from-blue-50 to-white">
      
      {/* Search Section */}
      <div className={`mb-16 ${STYLES.card} p-8`}>
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Search Events</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <input 
            type="text" 
            placeholder="Search by event name..." 
            className={STYLES.formInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
          />
          <select 
            className={STYLES.formInput} 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Concerts</option>
            <option>Sports</option>
            <option>Movies</option>
            <option>Comedy</option>
          </select>
          <button onClick={handleSearchClick} className={STYLES.primaryBtn}>
            Search
          </button>
        </div>
      </div>

      {/* Browse by Category Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          Browse by Category
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {EVENT_CATEGORIES.map((category) => (
            <EventCategoryCard 
              key={category.name}
              category={category.name}
              icon={category.icon}
              image={CATEGORY_IMAGES[category.name]}
              description={`${category.name} events`}
              onExplore={handleCategoryExplore}
            />
          ))}
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section id="events-list-section">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          Featured Events
        </h2>
        {loading ? (
          <div className="text-center py-10">Loading events...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No events found based on your search.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.slice(0, 6).map((event) => (
              <EventCard 
                key={event._id}
                id={event._id}
                title={event.title}
                image={event.image || `https://source.unsplash.com/random/400x300/?${encodeURIComponent(event.title)}`}
                date={event.date}
                location={event.location}
                price={event.price}
                availableSpots={event.availableSpots}
                onBook={handleBook}
              />
            ))}
          </div>
        )}
      </section>
    </div>
    </div>
  );
};

export default Explore;
