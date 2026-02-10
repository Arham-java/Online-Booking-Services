import React from 'react';
import { STYLES } from '../constants';

const FEATURES = [
  {
    title: 'Instant Access',
    emoji: '📱',
    desc: 'Receive your digital tickets immediately after booking via email.',
  },
  {
    title: 'Secure Payments',
    emoji: '🔒',
    desc: 'Your transactions are protected with military-grade encryption.',
  },
  {
    title: 'Global Reach',
    emoji: '🌍',
    desc: 'From local workshops to international festivals, we have it all.',
  },
];

const FEATURED_EVENTS = [
  { 
    title: 'Summer Music Festival', 
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop', 
    date: 'July 15, 2026', 
    location: 'Central Park, NY' 
  },
  { 
    title: 'Tech Conference 2026', 
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', 
    date: 'August 20, 2026', 
    location: 'San Francisco, CA' 
  },
  { 
    title: 'Comedy Night', 
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=300&fit=crop', 
    date: 'March 10, 2026', 
    location: 'Los Angeles, CA' 
  },
];

const Home = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div>
      {/* Hero Section with Search */}
      <header 
        className="relative text-white py-40 px-8 text-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find & Book Your Perfect Events
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 leading-relaxed">
            Discover amazing concerts, sports, movies, and more. Book tickets instantly.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input 
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/30 text-gray-900 placeholder-gray-500"
              />
              <select className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-gray-900">
                <option>All Categories</option>
                <option>Concerts</option>
                <option>Sports</option>
                <option>Movies</option>
                <option>Comedy</option>
              </select>
              <input 
                type="date"
                className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-gray-900"
              />
              <button className="bg-orange-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300">
                Search
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button 
              onClick={() => onNavigate('explore')}
              className="bg-orange-500 text-white font-bold px-8 py-3 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Browse Events
            </button>
            <button 
              onClick={() => onNavigate('signup')}
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Why Choose EventSphere?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mb-4 text-5xl">{feature.emoji}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Trusted by Millions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <p className="text-gray-600">Countries</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10M+</div>
              <p className="text-gray-600">Events</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50M+</div>
              <p className="text-gray-600">Bookings</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">4.8★</div>
              <p className="text-gray-600">Ratings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Featured Events Coming Soon
          </h2>
          <div className="grid grid:cols-1 md:grid-cols-3 gap-8">
            {FEATURED_EVENTS.map((event) => (
              <div key={event.title} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{event.title}</h3>
                  <p className="text-gray-600 mb-1 flex items-center gap-2">📅 {event.date}</p>
                  <p className="text-gray-600 mb-4 flex items-center gap-2">📍 {event.location}</p>
                  <button className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
