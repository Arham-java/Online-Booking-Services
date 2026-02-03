import React from 'react';
import { EventCategoryCard, EventCard } from '../components/UI/SharedComponents';

const Explore = ({ onNavigate }) => {
  return (
    <div className="py-20 px-8 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Explore Events</h1>
      <p className="text-center text-slate-400 text-lg mb-16 max-w-3xl mx-auto">
        Discover thousands of amazing events happening around the world.
      </p>
      
      {/* Search Section */}
      <div className="mb-16 bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">Search Events</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <input 
            type="text" 
            placeholder="Search by event name..." 
            className="px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-500 transition" 
          />
          <select className="px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-white transition">
            <option className="bg-slate-900">All Categories</option>
            <option className="bg-slate-900">Concerts</option>
            <option className="bg-slate-900">Sports</option>
            <option className="bg-slate-900">Movies</option>
            <option className="bg-slate-900">Comedy</option>
          </select>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">Search</button>
        </div>
      </div>

      {/* Categories Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Browse by Category</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          <EventCategoryCard category="Concerts" image="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop" description="Live music performances" />
          <EventCategoryCard category="Sports" image="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop" description="Sports events" />
          <EventCategoryCard category="Movies" image="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=300&fit=crop" description="Movie screenings" />
          <EventCategoryCard category="Comedy" image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" description="Stand-up shows" />
          <EventCategoryCard category="Workshops" image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop" description="Educational events" />
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Featured Events</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <EventCard title="Summer Music Festival" image="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop" date="July 15, 2026" location="Central Park, NY" />
          <EventCard title="Tech Conference 2026" image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" date="August 20, 2026" location="San Francisco, CA" />
          <EventCard title="Art Exhibition" image="https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=300&fit=crop" date="September 5, 2026" location="Los Angeles, CA" />
          <EventCard title="International Film Festival" image="https://images.unsplash.com/photo-1489599849228-ed4dc14caf23?w=400&h=300&fit=crop" date="October 10, 2026" location="Toronto, Canada" />
          <EventCard title="Marathon Championship" image="https://images.unsplash.com/photo-1552674612-5f6015be9edf?w=400&h=300&fit=crop" date="November 3, 2026" location="Boston, MA" />
          <EventCard title="Winter Music Fest" image="https://images.unsplash.com/photo-1514989940723-e8d76fb8727b?w=400&h=300&fit=crop" date="December 20, 2026" location="Miami, FL" />
        </div>
      </section>
    </div>
  );
};

export default Explore;
