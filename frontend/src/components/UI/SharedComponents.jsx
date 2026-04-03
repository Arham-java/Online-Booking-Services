import React, { useState } from 'react';
import { STYLES } from '../../constants';

// Feature card component for homepage
export const FeatureCard = ({ icon, title, image, desc }) => (
  <div className={`${STYLES.card} ${STYLES.cardShadow} overflow-hidden flex flex-col`}>
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-blue-600">{title}</h3>
      <p className="text-gray-600 leading-relaxed flex-1">{desc}</p>
    </div>
  </div>
);

// Payment Modal Component
export const PaymentModal = ({ isOpen, onClose, onConfirm, price, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600 font-semibold mb-1">Booking Event</p>
          <p className="font-bold text-gray-900">{title}</p>
          {price !== undefined && (
            <p className="mt-2 text-xl font-bold text-blue-600">Total: ${price}</p>
          )}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onConfirm(); }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input type="text" required pattern="\d{16}" title="16 digit card number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input type="text" required placeholder="MM/YY" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input type="text" required pattern="\d{3,4}" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="123" />
              </div>
            </div>
          </div>
          
          <button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 shadow-lg hover:shadow-xl">
            Pay & Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

// Event card component
export const EventCard = ({ id, title, image, date, location, price = 50, onBook, availableSpots }) => {
  const [showPayment, setShowPayment] = useState(false);

  const handleBookClick = () => {
    if (availableSpots > 0 && onBook) {
      setShowPayment(true);
    }
  };

  const handleConfirmPayment = () => {
    setShowPayment(false);
    if (onBook) onBook(id);
  };

  return (
    <>
      <div className={`${STYLES.card} ${STYLES.cardShadow} overflow-hidden flex flex-col relative`}>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-gray-900 z-10 shadow-sm border border-white/20">
            ${price}
        </div>
        <div className="relative h-48 overflow-hidden">
          <img src={image || 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=400&q=80'} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-3 text-blue-600">{title}</h3>
          <p className="text-gray-600 mb-2 flex items-center gap-2">
            <span>📅</span> {new Date(date).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-2 flex items-center gap-2">
            <span>📍</span> {location}
          </p>
          {availableSpots !== undefined && (
            <p className="text-gray-600 mb-4 flex items-center gap-2 font-medium">
              <span>🎫</span> {availableSpots > 0 ? `${availableSpots} spots left` : 'Sold out!'}
            </p>
          )}
          <button 
            onClick={handleBookClick} 
            disabled={availableSpots === 0}
            className={`${STYLES.primaryBtn} mt-auto ${availableSpots === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {availableSpots === 0 ? 'Sold Out' : 'Book Now'}
          </button>
        </div>
      </div>
      <PaymentModal 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)} 
        onConfirm={handleConfirmPayment}
        price={price}
        title={title}
      />
    </>
  );
};

// Event category card
export const EventCategoryCard = ({ category, icon, image, description, onExplore }) => (
  <div className={`${STYLES.card} ${STYLES.cardShadow} text-center group flex flex-col overflow-hidden`}>
    <div className="relative h-32 overflow-hidden">
      <img src={image} alt={category} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
        <div className="text-4xl group-hover:scale-110 transition duration-300">{icon}</div>
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-lg font-bold mb-2 text-blue-600">{category}</h3>
      <p className="text-gray-600 mb-4 flex-1">{description}</p>
      <button onClick={() => onExplore && onExplore(category)} className={STYLES.primaryBtn}>
        Explore
      </button>
    </div>
  </div>
);

// Contact information card
export const ContactCard = ({ icon, title, details, subtext }) => (
  <div className={`${STYLES.card} p-8 text-center`}>
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-blue-600">{title}</h3>
    <p className="text-gray-900 mb-2">{details}</p>
    <p className="text-gray-600 text-sm">{subtext}</p>
  </div>
);

// Form input component
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
