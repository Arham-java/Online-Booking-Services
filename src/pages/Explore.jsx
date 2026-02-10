import React from 'react';
import { EventCategoryCard, EventCard } from '../components/UI/SharedComponents';
import { EVENT_CATEGORIES, STYLES } from '../constants';

const FEATURED_EVENTS = [
  { title: 'Summer Music Festival', image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop', date: 'July 15, 2026', location: 'Central Park, NY' },
  { title: 'Tech Conference 2026', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', date: 'August 20, 2026', location: 'San Francisco, CA' },
  { title: 'Art Exhibition', image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=300&fit=crop', date: 'September 5, 2026', location: 'Los Angeles, CA' },
  { title: 'International Film Festival', image: 'https://images.unsplash.com/photo-1489599849228-ed4dc14caf23?w=400&h=300&fit=crop', date: 'October 10, 2026', location: 'Toronto, Canada' },
  { title: 'Marathon Championship', image: 'https://images.unsplash.com/photo-1552674612-5f6015be9edf?w=400&h=300&fit=crop', date: 'November 3, 2026', location: 'Boston, MA' },
  { title: 'Winter Music Fest', image: 'https://images.unsplash.com/photo-1514989940723-e8d76fb8727b?w=400&h=300&fit=crop', date: 'December 20, 2026', location: 'Miami, FL' },
];

const CATEGORY_IMAGES = {
  'Concerts': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
  'Sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop',
  'Movies': 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=300&fit=crop',
  'Comedy': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
  'Workshops': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop',
};

const Explore = ({ onNavigate }) => {
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
          />
          <select className={STYLES.formInput}>
            <option>All Categories</option>
            <option>Concerts</option>
            <option>Sports</option>
            <option>Movies</option>
            <option>Comedy</option>
          </select>
          <button className={STYLES.primaryBtn}>
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
            />
          ))}
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">
          Featured Events
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_EVENTS.map((event) => (
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

export default Explore;
