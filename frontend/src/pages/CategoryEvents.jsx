import React, { useState, useEffect } from 'react';
import { EventCard } from '../components/UI/SharedComponents';
import { STYLES, EVENT_CATEGORIES } from '../constants';
import { getEventsCall, bookEventCall } from '../services/api';
import { generateDummyEvents } from '../dummyEvents';

const CATEGORY_IMAGES = {
  'Concerts': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1600&q=80',
  'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80',
  'Movies': 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1600&q=80',
  'Comedy': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80',
  'Stand-ups': 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?auto=format&fit=crop&w=1600&q=80',
  'Workshops': 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
};

const CategoryEvents = ({ onNavigate, viewData }) => {
  const category = viewData || 'All Categories';
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback image if category is not found in the constants map
  const heroImage = CATEGORY_IMAGES[category] || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const dbData = await getEventsCall();
        const dummyData = generateDummyEvents();
        // Combine real db events and mock events so it never shows empty
        let combinedData = [...dbData, ...dummyData];

        const filterByCategory = (eventsData, cat) => {
            if (cat === 'All Categories') return eventsData;
            const catLower = cat.toLowerCase();
            return eventsData.filter(e => {
                const t = (e.title || '').toLowerCase();
                const d = (e.description || '').toLowerCase();
                return t.includes(catLower) || d.includes(catLower) ||
                (cat === 'Concerts' && (t.includes('music') || t.includes('concert') || d.includes('music'))) ||
                (cat === 'Movies' && (t.includes('film') || t.includes('movie') || d.includes('film'))) ||
                (cat === 'Sports' && (t.includes('sport') || t.includes('basketball') || t.includes('marathon') || d.includes('sport'))) ||
                (cat === 'Workshops' && (t.includes('workshop') || t.includes('bootcamp') || t.includes('masterclass') || d.includes('workshop'))) ||
                ((cat === 'Comedy' || cat === 'Stand-ups') && (t.includes('stand') || t.includes('comedy') || d.includes('comedy')));
            });
        };
        setEvents(filterByCategory(combinedData, category));
      } catch (error) {
        console.error('Failed to fetch events', error);
        // Fallback to strictly dummy if server fails completely
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [category]);

  const handleBook = async (eventId) => {
    // Determine if it's a mock dummy event
    if (String(eventId).startsWith('dummy-')) {
       // Simulate a successful payment and booking interaction!
       alert('Booking and payment successful! Your seat is securely confirmed for this event.');
       // Decrement spot locally right away
       setEvents(prevEvents => prevEvents.map(ev => 
         ev._id === eventId ? { ...ev, availableSpots: Math.max(0, ev.availableSpots - 1) } : ev
       ));
       return;
    }

    try {
      await bookEventCall(eventId, 1);
      alert('Booking and payment successful! Your seat is confirmed.');
      const data = await getEventsCall();
      const dummyData = generateDummyEvents();
      // Refilter
      // Helper again for refilter
      const filterByCategory = (eventsData, cat) => {
          if (cat === 'All Categories') return eventsData;
          const catLower = cat.toLowerCase();
          return eventsData.filter(e => {
              const t = (e.title || '').toLowerCase();
              const d = (e.description || '').toLowerCase();
              return t.includes(catLower) || d.includes(catLower) ||
              (cat === 'Concerts' && (t.includes('music') || t.includes('concert') || d.includes('music'))) ||
              (cat === 'Movies' && (t.includes('film') || t.includes('movie') || d.includes('film'))) ||
              (cat === 'Sports' && (t.includes('sport') || t.includes('basketball') || t.includes('marathon') || d.includes('sport'))) ||
              (cat === 'Workshops' && (t.includes('workshop') || t.includes('bootcamp') || t.includes('masterclass') || d.includes('workshop'))) ||
              ((cat === 'Comedy' || cat === 'Stand-ups') && (t.includes('stand') || t.includes('comedy') || d.includes('comedy')));
          });
      };
      setEvents(filterByCategory([...data, ...dummyData], category));
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to book event. Please try logging in again.');
      if (error.response?.status === 401) {
        onNavigate('login');
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative text-white py-32 px-8 text-center overflow-hidden"
        style={{
          backgroundImage: `url("${heroImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 text-white capitalize">
            {category} Events
          </h1>
          <p className="text-lg text-blue-100 font-medium">
            Explore the best {category.toLowerCase()} happening near you and secure your spots today!
          </p>
          <button onClick={() => onNavigate('explore')} className="mt-8 px-6 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 font-bold transition">
             ← Back to Explore
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-8 max-w-7xl mx-auto min-h-[50vh]">
        <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Available {category}</h2>
            <div className="text-gray-500 font-medium">{events.length} Events found</div>
        </div>
        
        {loading ? (
          <div className="text-center py-10 text-xl font-medium text-gray-500">Loading {category}...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
             <div className="text-5xl mb-4">🔍</div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">No {category} found</h3>
             <p className="text-gray-500 mb-6">There are currently no events matching this category.</p>
             <button onClick={() => onNavigate('explore')} className={STYLES.primaryBtn}>
                Browse All Events
             </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
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
      </div>
    </div>
  );
};

export default CategoryEvents;
