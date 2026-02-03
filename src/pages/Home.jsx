import React from 'react';
import { FeatureCard, EventCard, EventCategoryCard } from '../components/UI/SharedComponents';

const Home = ({ onNavigate }) => {
  return (
    <div>
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-cyan-600/20 via-transparent to-transparent text-white py-28 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Unforgettable Experiences <br /> Start Here
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-slate-300 leading-relaxed">
            Book tickets for the most exclusive concerts, workshops, and entertainment events around the globe.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => onNavigate('signup')} 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 transition transform duration-300"
            >
              Get Started
            </button>
            <button 
              onClick={() => onNavigate('events')} 
              className="border-2 border-cyan-400 text-cyan-400 px-10 py-4 rounded-full font-bold text-lg hover:bg-cyan-400/10 transition duration-300"
            >
              Browse Events
            </button>
          </div>
        </div>
      </header>

      {/* Feature Cards */}
      <section className="py-24 px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Why Choose EventSphere?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard 
            title="Instant Access" 
            image="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop" 
            desc="Receive your digital tickets immediately after booking via email." 
          />
          <FeatureCard 
            title="Secure Payments" 
            image="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=250&fit=crop" 
            desc="Your transactions are protected with military-grade encryption." 
          />
          <FeatureCard 
            title="Global Reach" 
            image="https://images.unsplash.com/photo-1524874694410-92386f1c4ab9?w=400&h=250&fit=crop" 
            desc="From local workshops to international festivals, we have it all." 
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
