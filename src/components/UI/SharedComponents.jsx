import React from 'react';

// Feature card component for homepage
export const FeatureCard = ({ icon, title, image, desc }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 transition duration-300 group flex flex-col">
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover img-hover-zoom" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed flex-1">{desc}</p>
    </div>
  </div>
);

// Event card component displaying event details
export const EventCard = ({ title, image, date, location }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 transition duration-300 flex flex-col">
    <div className="relative h-48 overflow-hidden group">
      <img src={image} alt={title} className="w-full h-full object-cover img-hover-zoom" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 mb-2 flex items-center gap-2">
        <span className="text-cyan-400">📅</span> {date}
      </p>
      <p className="text-slate-400 mb-4 flex items-center gap-2">
        <span className="text-cyan-400">📍</span> {location}
      </p>
      <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300 mt-auto">
        Book Now
      </button>
    </div>
  </div>
);

// Event category card for browsing by type
export const EventCategoryCard = ({ category, icon, image, description }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 transition duration-300 text-center group flex flex-col">
    <div className="relative h-32 overflow-hidden">
      <img src={image} alt={category} className="w-full h-full object-cover img-hover-zoom" />
      <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
        <div className="text-4xl group-hover:scale-110 transition duration-300">{icon}</div>
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-lg font-bold mb-2 text-white">{category}</h3>
      <p className="text-slate-400 mb-4 flex-1">{description}</p>
      <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">
        Explore
      </button>
    </div>
  </div>
);

// Contact information card for contact page
export const ContactCard = ({ icon, title, details, subtext }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 text-center transition duration-300">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-cyan-400">{title}</h3>
    <p className="text-white mb-2">{details}</p>
    <p className="text-slate-400 text-sm">{subtext}</p>
  </div>
);

// Reusable form input component
export const FormInput = ({ label, placeholder, type }) => (
  <div>
    <label className="block text-sm font-semibold text-cyan-400 mb-2">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="w-full px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-500 transition" 
    />
  </div>
);
