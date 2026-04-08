import React, { useState } from 'react';

/*PAYMENT MODAL*/
function PaymentModal(props) {
  if (props.isOpen === false) return null;

  function handleFormSubmit(e) {
    e.preventDefault();
    props.onConfirm();
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(8px)',
      padding: '20px',
    }}>
      <div className="animate-fade-in-up" style={{
        background: 'white',
        borderRadius: '28px',
        boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
        maxWidth: '480px', width: '100%',
        padding: '0',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          padding: '24px 28px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          color: 'white',
        }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '4px', fontFamily: 'Poppins, sans-serif' }}>
              🎫 Secure Checkout
            </h2>
            <p style={{ opacity: '0.85', fontSize: '13px' }}>Complete your booking safely</p>
          </div>
          <button
            onClick={props.onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white', borderRadius: '10px',
              width: '36px', height: '36px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: '18px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Event Info */}
        <div style={{ padding: '24px 28px 0' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f0f0ff, #ede9fe)',
            border: '1px solid #c7d2fe',
            borderRadius: '16px', padding: '18px 20px',
            marginBottom: '24px',
          }}>
            <p style={{ color: '#6366f1', fontWeight: '700', fontSize: '12px', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              📅 Booking Event
            </p>
            <p style={{ fontWeight: '800', color: '#1e293b', fontSize: '1rem', marginBottom: '8px' }}>
              {props.title}
            </p>
            {props.price !== undefined && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '1.6rem', fontWeight: '900', color: '#6366f1',
                  fontFamily: 'Poppins, sans-serif',
                }}>
                  ₹{props.price}
                </span>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>total</span>
              </div>
            )}
          </div>

          {/* Card Form */}
          <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="form-label">Cardholder Name</label>
              <input
                type="text"
                required
                placeholder="Rahul Sharma"
                className="form-control"
              />
            </div>
            <div>
              <label className="form-label">Card Number</label>
              <input
                type="text"
                required
                pattern="\d{16}"
                title="Enter 16-digit card number"
                placeholder="0000 0000 0000 0000"
                className="form-control"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  className="form-control"
                />
              </div>
              <div>
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  required
                  pattern="\d{3,4}"
                  title="3 or 4 digit CVV"
                  placeholder="123"
                  className="form-control"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '16px', fontSize: '16px', borderRadius: '14px', marginTop: '4px' }}
            >
              <span>Pay & Confirm Booking</span>
            </button>

            <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
              256-bit SSL encrypted. Your payment is 100% secure.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

/* EVENT CARD*/
function EventCard(props) {
  var [showPayment, setShowPayment] = useState(false);

  var priceToUse = props.price;
  if (priceToUse === undefined) priceToUse = 500;

  var fallbackImage = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=350&fit=crop&auto=format';

  var imageToUse = props.image;
  if (!imageToUse) imageToUse = fallbackImage;

  function handleImgError(e) {
    e.target.src = fallbackImage;
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

  var isSoldOut = props.availableSpots === 0;

  return (
    <>
      <div
        className="card-premium"
        style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          <img
            src={imageToUse}
            alt={props.title}
            onError={handleImgError}
            className="img-hover-zoom"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Price Badge */}
          <div style={{
            position: 'absolute', top: '14px', right: '14px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: 'white', fontWeight: '800', fontSize: '13px',
            padding: '5px 14px', borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
            zIndex: 5,
          }}>
            ₹{priceToUse}
          </div>
          {/* Sold Out overlay */}
          {isSoldOut && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.55)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                background: '#ef4444', color: 'white',
                fontWeight: '800', fontSize: '16px',
                padding: '10px 28px', borderRadius: '30px',
                letterSpacing: '1px',
              }}>
                SOLD OUT
              </div>
            </div>
          )}
          {/* Gradient overlay at bottom */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
            background: 'linear-gradient(to top, rgba(15,12,41,0.5), transparent)',
          }} />
        </div>

        {/* Content */}
        <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#1e293b', marginBottom: '12px', lineHeight: '1.4' }}>
            {props.title}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '16px' }}>
            <span style={{ color: '#6366f1', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📅 {props.date ? new Date(props.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'TBD'}
            </span>
            <span style={{ color: '#475569', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📍 {props.location}
            </span>
            {props.availableSpots !== undefined && (
              <span style={{
                fontSize: '13px',
                color: props.availableSpots > 10 ? '#10b981' : props.availableSpots > 0 ? '#f97316' : '#ef4444',
                fontWeight: '600',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                🎫 {props.availableSpots > 0 ? props.availableSpots + ' spots left' : 'Sold out!'}
              </span>
            )}
          </div>

          <button
            onClick={handleBookClick}
            disabled={isSoldOut}
            className={isSoldOut ? '' : 'btn-primary'}
            style={{
              marginTop: 'auto',
              width: '100%', padding: '12px',
              borderRadius: '12px', fontSize: '14px',
              fontWeight: '700', cursor: isSoldOut ? 'not-allowed' : 'pointer',
              border: 'none',
              background: isSoldOut ? '#e2e8f0' : undefined,
              color: isSoldOut ? '#94a3b8' : undefined,
            }}
          >
            {isSoldOut ? 'Sold Out' : <span>Book Now</span>}
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

/* ===== EVENT CATEGORY CARD ===== */
function EventCategoryCard(props) {
  var catImage = props.image || 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=200&fit=crop&auto=format';

  return (
    <div
      className="card-premium"
      style={{ overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s ease' }}
      onClick={props.onClick}
    >
      <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={catImage}
          alt={props.name}
          className="img-hover-zoom"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(15,12,41,0.7), rgba(0,0,0,0.15))',
        }}>
        </div>
      </div>
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <h3 style={{ fontWeight: '700', color: '#1e293b', fontSize: '1rem', marginBottom: '12px' }}>
          {props.name}
        </h3>
        <button
          className="btn-primary"
          style={{ width: '100%', padding: '10px', fontSize: '13px', borderRadius: '12px' }}
        >
          <span>Explore</span>
        </button>
      </div>
    </div>
  );
}

/* ===== CONTACT CARD ===== */
function ContactCard(props) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '32px',
      textAlign: 'center',
      border: '1px solid #e2e8f0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={function(e) {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = '0 16px 40px rgba(99,102,241,0.15)';
    }}
    onMouseLeave={function(e) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
    }}
    >
      <div style={{
        width: '64px', height: '64px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        borderRadius: '18px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '30px', margin: '0 auto 16px',
        boxShadow: '0 8px 20px rgba(99,102,241,0.3)',
      }}>
        {props.icon}
      </div>
      <h3 style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1e293b', marginBottom: '10px' }}>
        {props.title}
      </h3>
      <p style={{ color: '#374151', fontWeight: '500', marginBottom: '6px' }}>{props.details}</p>
      <p style={{ color: '#94a3b8', fontSize: '13px' }}>{props.subtext}</p>
    </div>
  );
}

/* ===== FEATURE CARD ===== */
function FeatureCard(props) {
  var fallback = 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&h=300&fit=crop&auto=format';
  function handleImgError(e) { e.target.src = fallback; }

  return (
    <div className="card-premium" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img
          src={props.image || fallback}
          alt={props.title}
          onError={handleImgError}
          className="img-hover-zoom"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, white 0%, transparent 60%)',
        }} />
      </div>
      <div style={{ padding: '24px' }}>
        <div style={{ fontSize: '36px', marginBottom: '12px' }}>{props.icon}</div>
        <h3 style={{ fontWeight: '700', color: '#6366f1', fontSize: '1.1rem', marginBottom: '10px' }}>{props.title}</h3>
        <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '14px' }}>{props.desc}</p>
      </div>
    </div>
  );
}

/* ===== FORM INPUT ===== */
function FormInput(props) {
  var typeToUse = props.type || 'text';
  var isRequired = props.required !== undefined ? props.required : true;

  return (
    <div>
      <label className="form-label">{props.label}</label>
      <input
        type={typeToUse}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required={isRequired}
        className="form-control"
      />
    </div>
  );
}

export { FeatureCard, PaymentModal, EventCard, ContactCard, FormInput, EventCategoryCard };
