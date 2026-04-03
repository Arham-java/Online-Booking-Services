import React, { useState } from 'react';
import { STYLES } from '../../constants';

// Feature card component for homepage
function FeatureCard(props) {
  return (
    <div className={STYLES.card + ' ' + STYLES.cardShadow + ' overflow-hidden flex flex-col'}>
      <div className="relative h-48 overflow-hidden">
        <img src={props.image} alt={props.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-4xl mb-3">{props.icon}</div>
        <h3 className="text-xl font-bold mb-3 text-blue-600">{props.title}</h3>
        <p className="text-gray-600 leading-relaxed flex-1">{props.desc}</p>
      </div>
    </div>
  );
}

// Payment Modal Component
function PaymentModal(props) {
  if (props.isOpen == false) {
    return null;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    props.onConfirm();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button onClick={props.onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600 font-semibold mb-1">Booking Event</p>
          <p className="font-bold text-gray-900">{props.title}</p>
          {props.price !== undefined && (
            <p className="mt-2 text-xl font-bold text-blue-600">Total: ${props.price}</p>
          )}
        </div>

        <form onSubmit={handleFormSubmit}>
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
}

// Event card component
function EventCard(props) {
  var [showPayment, setShowPayment] = useState(false);
  var priceToUse = props.price;
  if (priceToUse === undefined) {
    priceToUse = 50;
  }

  function handleBookClick() {
    if (props.availableSpots > 0 && props.onBook != null) {
      setShowPayment(true);
    }
  }

  function handleConfirmPayment() {
    setShowPayment(false);
    if (props.onBook != null) {
      props.onBook(props.id);
    }
  }

  var buttonClass = STYLES.primaryBtn + ' mt-auto';
  if (props.availableSpots === 0) {
    buttonClass = buttonClass + ' opacity-50 cursor-not-allowed';
  }

  var imageToUse = props.image;
  if (!imageToUse) {
    imageToUse = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=400&q=80';
  }

  return (
    <>
      <div className={STYLES.card + ' ' + STYLES.cardShadow + ' overflow-hidden flex flex-col relative'}>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-gray-900 z-10 shadow-sm border border-white/20">
            ${priceToUse}
        </div>
        <div className="relative h-48 overflow-hidden">
          <img src={imageToUse} alt={props.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-3 text-blue-600">{props.title}</h3>
          <p className="text-gray-600 mb-2 flex items-center gap-2">
            <span>📅</span> {new Date(props.date).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-2 flex items-center gap-2">
            <span>📍</span> {props.location}
          </p>
          {props.availableSpots !== undefined && (
            <p className="text-gray-600 mb-4 flex items-center gap-2 font-medium">
              <span>🎫</span> {props.availableSpots > 0 ? props.availableSpots + ' spots left' : 'Sold out!'}
            </p>
          )}
          <button 
            onClick={handleBookClick} 
            disabled={props.availableSpots === 0}
            className={buttonClass}
          >
            {props.availableSpots === 0 ? 'Sold Out' : 'Book Now'}
          </button>
        </div>
      </div>
      <PaymentModal 
        isOpen={showPayment} 
        onClose={function() { setShowPayment(false); }} 
        onConfirm={handleConfirmPayment}
        price={priceToUse}
        title={props.title}
      />
    </>
  );
}

// Event category card
function EventCategoryCard(props) {
  function handleExplore() {
    if (props.onExplore != null) {
      props.onExplore(props.category);
    }
  }

  return (
    <div className={STYLES.card + ' ' + STYLES.cardShadow + ' text-center group flex flex-col overflow-hidden'}>
      <div className="relative h-32 overflow-hidden">
        <img src={props.image} alt={props.category} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
          <div className="text-4xl group-hover:scale-110 transition duration-300">{props.icon}</div>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold mb-2 text-blue-600">{props.category}</h3>
        <p className="text-gray-600 mb-4 flex-1">{props.description}</p>
        <button onClick={handleExplore} className={STYLES.primaryBtn}>
          Explore
        </button>
      </div>
    </div>
  );
}

// Contact information card
function ContactCard(props) {
  return (
    <div className={STYLES.card + ' p-8 text-center'}>
      <div className="text-5xl mb-4">{props.icon}</div>
      <h3 className="text-xl font-bold mb-2 text-blue-600">{props.title}</h3>
      <p className="text-gray-900 mb-2">{props.details}</p>
      <p className="text-gray-600 text-sm">{props.subtext}</p>
    </div>
  );
}

// Form input component
function FormInput(props) {
  var typeToUse = props.type;
  if (typeToUse === undefined) {
    typeToUse = 'text';
  }
  
  var isRequired = props.required;
  if (isRequired === undefined) {
    isRequired = true;
  }

  return (
    <div>
      <label className={STYLES.formLabel}>{props.label}</label>
      <input 
        type={typeToUse} 
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required={isRequired}
        className={STYLES.formInput}
      />
    </div>
  );
}

export { FeatureCard, PaymentModal, EventCard, EventCategoryCard, ContactCard, FormInput };
