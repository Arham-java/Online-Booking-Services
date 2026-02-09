import React from 'react';
import { STYLES } from '../../constants';

// Feature card component for homepage
export const FeatureCard = ({ icon, title, image, desc }) => (
  <div className={`${STYLES.card} ${STYLES.cardShadow} overflow-hidden flex flex-col`}>
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
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
  <div className={`${STYLES.card} ${STYLES.cardShadow} overflow-hidden flex flex-col`}>
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 mb-2 flex items-center gap-2">
        <span>📅</span> {date}
      </p>
      <p className="text-slate-400 mb-4 flex items-center gap-2">
        <span>📍</span> {location}
      </p>
      <button className={`${STYLES.primaryBtn} mt-auto`}>
        Book Now
      </button>
    </div>
  </div>
);

// Event category card for browsing by type
export const EventCategoryCard = ({ category, icon, image, description }) => (
  <div className={`${STYLES.card} ${STYLES.cardShadow} text-center group flex flex-col overflow-hidden`}>
    <div className="relative h-32 overflow-hidden">
      <img src={image} alt={category} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
        <div className="text-4xl group-hover:scale-110 transition duration-300">{icon}</div>
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-lg font-bold mb-2 text-white">{category}</h3>
      <p className="text-slate-400 mb-4 flex-1">{description}</p>
      <button className={STYLES.primaryBtn}>
        Explore
      </button>
    </div>
  </div>
);

// Contact information card for contact page
export const ContactCard = ({ icon, title, details, subtext }) => (
  <div className={`${STYLES.card} p-8 text-center`}>
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-cyan-400">{title}</h3>
    <p className="text-white mb-2">{details}</p>
    <p className="text-slate-400 text-sm">{subtext}</p>
  </div>
);

// Reusable form input component (improved)
export const FormInput = ({ label, placeholder, type = 'text', value, onChange, required = true }) => (
  <div>
    <label className={STYLES.formLabel}>{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={STYLES.formInput}
    />
  </div>
);
