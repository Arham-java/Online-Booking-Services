import React from 'react';
import { STYLES } from '../constants';

const COMPANY_VALUES = [
  { title: 'Excellence', description: 'We strive for excellence in every interaction' },
  { title: 'Community', description: 'We believe in building strong communities' },
  { title: 'Trust', description: 'Your trust is our most valuable asset' },
];

const About = ({ onNavigate }) => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative text-white py-32 px-8 text-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className={`text-5xl font-bold mb-6 ${STYLES.gradientText}`}>
            About EventSphere
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Learn more about our journey, our vision, and what makes us the leading event booking platform.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="py-20 px-8 max-w-6xl mx-auto bg-gradient-to-b from-blue-50 to-white">
      
      {/* Story and Values Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Our Story */}
        <div className={`${STYLES.card} p-8`}>
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded in 2020, EventSphere was born from a simple idea: everyone deserves access to extraordinary experiences. 
            We started as a small team passionate about live events and quickly grew into a global platform.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, we connect event organizers with attendees across 150+ countries, making it easier than ever to discover 
            and book unforgettable moments.
          </p>
        </div>

        {/* Our Values */}
        <div className={`${STYLES.card} p-8`}>
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Our Values</h2>
          <ul className="space-y-4">
            {COMPANY_VALUES.map((value) => (
              <li key={value.title} className="flex items-start gap-3">
                <div>
                  <h3 className="font-bold text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative text-white py-16 px-8 rounded-2xl text-center overflow-hidden mt-8"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511379938547-c1f69b13d835?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/70"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Join Millions of Event Lovers</h2>
          <p className="mb-8 text-lg text-gray-100">
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
      </div>
    </div>
  );
};

export default About;
