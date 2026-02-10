import React from 'react';
import { EventCategoryCard, EventCard } from '../components/UI/SharedComponents';
import { STYLES } from '../constants';

const RECOMMENDED_EVENTS = [
  { name: 'Movies', icon: '🎬', image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=300&fit=crop', desc: 'Book movie tickets' },
  { name: 'Stand-ups', icon: '😂', image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&h=300&fit=crop', desc: 'Comedy shows' },
  { name: 'Concerts', icon: '🎵', image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop', desc: 'Live music events' },
  { name: 'Sports', icon: '⚽', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop', desc: 'Sports matches' },
];

const ALL_EVENTS = [
  { title: 'Summer Music Festival', image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop', date: 'July 15, 2026', location: 'Central Park, NY' },
  { title: 'Tech Conference 2026', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', date: 'August 20, 2026', location: 'San Francisco, CA' },
  { title: 'Art Exhibition', image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=300&fit=crop', date: 'September 5, 2026', location: 'Los Angeles, CA' },
];

const Events = ({ onNavigate }) => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative text-white py-32 px-8 text-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Browse Events
          </h1>
          <p className="text-lg text-gray-100">
            Discover and book tickets for amazing events around the world.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-8 max-w-6xl mx-auto bg-gradient-to-b from-blue-50 to-white">
      
      {/* Recommended Events Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-blue-600">Recommended Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RECOMMENDED_EVENTS.map((event) => (
            <EventCategoryCard 
              key={event.name}
              category={event.name}
              icon={event.icon}
              image={event.image}
              description={event.desc}
            />
          ))}
        </div>
      </section>
      
      {/* All Events Section */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-8 text-blue-600">All Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_EVENTS.map((event) => (
            <EventCard 
              key={event.title}
              title={event.title}
              image={event.image}
              date={event.date}
              location={event.location}
            />
          ))}
        </div>
      </section>
    </div>
    </div>
  );
};

export default Events;
