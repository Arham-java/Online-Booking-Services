import React from 'react';
import { EventCategoryCard, EventCard } from '../components/UI/SharedComponents';

const Events = ({ onNavigate }) => {
  return (
    <div className="py-20 px-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Browse Events</h1>
      <p className="text-center text-slate-400 mb-16">Discover and book tickets for amazing events around the world.</p>
      
      {/* Recommended Events */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-cyan-400">Recommended Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EventCategoryCard category="Movies" image="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=300&fit=crop" description="Book movie tickets" />
          <EventCategoryCard category="Stand-ups" image="https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&h=300&fit=crop" description="Comedy shows" />
          <EventCategoryCard category="Concerts" image="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop" description="Live music events" />
          <EventCategoryCard category="Sports" image="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop" description="Sports matches" />
        </div>
      </section>
      
      {/* All Events */}
      <h2 className="text-2xl font-bold text-center mb-8 text-cyan-400">All Events</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <EventCard title="Summer Music Festival" image="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop" date="July 15, 2026" location="Central Park, NY" />
        <EventCard title="Tech Conference 2026" image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" date="August 20, 2026" location="San Francisco, CA" />
        <EventCard title="Art Exhibition" image="https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=300&fit=crop" date="September 5, 2026" location="Los Angeles, CA" />
      </div>
    </div>
  );
};

export default Events;
