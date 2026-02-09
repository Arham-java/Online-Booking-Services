import React from 'react';
import { STYLES } from '../constants';

const COMPANY_VALUES = [
  { title: 'Excellence', description: 'We strive for excellence in every interaction' },
  { title: 'Community', description: 'We believe in building strong communities' },
  { title: 'Trust', description: 'Your trust is our most valuable asset' },
];

const About = ({ onNavigate }) => {
  return (
    <div className="py-20 px-8 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className={`text-5xl font-bold text-center mb-10 ${STYLES.gradientText}`}>
        About EventSphere
      </h1>
      <p className="text-center text-slate-400 text-lg mb-16 max-w-3xl mx-auto">
        Learn more about our journey, our vision, and what makes us the leading event booking platform.
      </p>
      
      {/* Story and Values Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Our Story */}
        <div className={`${STYLES.card} p-8`}>
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">Our Story</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Founded in 2020, EventSphere was born from a simple idea: everyone deserves access to extraordinary experiences. 
            We started as a small team passionate about live events and quickly grew into a global platform.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Today, we connect event organizers with attendees across 150+ countries, making it easier than ever to discover 
            and book unforgettable moments.
          </p>
        </div>

        {/* Our Values */}
        <div className={`${STYLES.card} p-8`}>
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">Our Values</h2>
          <ul className="space-y-4">
            {COMPANY_VALUES.map((value) => (
              <li key={value.title} className="flex items-start gap-3">
                <div>
                  <h3 className="font-bold text-white">{value.title}</h3>
                  <p className="text-slate-400 text-sm">{value.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 text-white p-12 rounded-2xl text-center backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-4">Join Millions of Event Lovers</h2>
        <p className="mb-8 text-lg text-slate-300">
          Start exploring amazing events today and create unforgettable memories.
        </p>
        <button 
          onClick={() => onNavigate('explore')} 
          className={STYLES.primaryBtn}
        >
          Explore Events Now
        </button>
      </div>
    </div>
  );
};

export default About;
