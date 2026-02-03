import React from 'react';

const About = ({ onNavigate }) => {
  return (
    <div className="py-20 px-8 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">About EventSphere</h1>
      <p className="text-center text-slate-400 text-lg mb-16 max-w-3xl mx-auto">
        Learn more about our journey, our vision, and what makes us the leading event booking platform.
      </p>
      
      {/* Story and Values */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">Our Story</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Founded in 2020, EventSphere was born from a simple idea: everyone deserves access to extraordinary experiences. We started as a small team passionate about live events and quickly grew into a global platform.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Today, we connect event organizers with attendees across 150+ countries, making it easier than ever to discover and book unforgettable moments.
          </p>
        </div>
        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">Our Values</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div>
                <h3 className="font-bold text-white">Excellence</h3>
                <p className="text-slate-400 text-sm">We strive for excellence in every interaction</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div>
                <h3 className="font-bold text-white">Community</h3>
                <p className="text-slate-400 text-sm">We believe in building strong communities</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div>
                <h3 className="font-bold text-white">Trust</h3>
                <p className="text-slate-400 text-sm">Your trust is our most valuable asset</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 text-white p-12 rounded-2xl text-center backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-4">Join Millions of Event Lovers</h2>
        <p className="mb-8 text-lg text-slate-300">Start exploring amazing events today and create unforgettable memories.</p>
        <button 
          onClick={() => onNavigate('explore')} 
          className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300"
        >
          Explore Events Now
        </button>
      </div>
    </div>
  );
};

export default About;
