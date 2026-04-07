import React, { useState, useEffect } from 'react';
import { getEventsCall, createEventCall, getMyBookingsCall, getAllBookingsCall } from '../services/api';

/* ===== Small Section Wrapper ===== */
function Section({ title, icon, children }) {
  return (
    <section style={{ marginBottom: '32px' }}>
      <h3 style={{
        fontSize: '1.1rem', fontWeight: '700', color: '#1e293b',
        marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <span style={{
          width: '32px', height: '32px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', color: 'white',
        }}>{icon || '📌'}</span>
        {title}
      </h3>
      {children}
    </section>
  );
}

/* ===== Profile Card ===== */
function UserProfileCard({ profile, userRole, onEdit }) {
  var initial = profile && profile.name ? profile.name[0].toUpperCase() : 'U';
  return (
    <div style={{
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      borderRadius: '20px',
      padding: '28px',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative circle */}
      <div style={{
        position: 'absolute', top: '-30px', right: '-30px',
        width: '120px', height: '120px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}>
        <div style={{
          width: '64px', height: '64px',
          background: 'rgba(255,255,255,0.2)',
          border: '3px solid rgba(255,255,255,0.4)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '26px', fontWeight: '800',
          color: 'white',
        }}>
          {initial}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '800', fontSize: '1.1rem', textTransform: 'capitalize' }}>
            {profile?.name || 'User Name'}
          </div>
          <div style={{ fontSize: '13px', opacity: '0.85', marginTop: '3px' }}>
            {profile?.email || 'user@example.com'}
          </div>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '20px', padding: '3px 12px',
            fontSize: '11px', fontWeight: '700',
            textTransform: 'uppercase', letterSpacing: '0.5px',
            marginTop: '8px',
          }}>
            {userRole}
          </div>
        </div>
        <button
          onClick={onEdit}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: 'white',
            fontWeight: '600', fontSize: '13px',
            padding: '8px 16px', borderRadius: '12px',
            cursor: 'pointer',
          }}
        >
          Edit ✏️
        </button>
      </div>
    </div>
  );
}

/* ===== Booking Item ===== */
function BookingItem({ b }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '18px 22px',
      border: '1px solid #e2e8f0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      gap: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '42px', height: '42px',
          background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px',
        }}>
          🎫
        </div>
        <div>
          <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '15px' }}>
            {b.event?.title || 'Unknown Event'}
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
            {b.event ? new Date(b.event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''} • {b.event?.location || ''}
          </div>
          <div style={{
            display: 'inline-block',
            background: b.status === 'confirmed' ? '#d1fae5' : '#fef3c7',
            color: b.status === 'confirmed' ? '#065f46' : '#92400e',
            fontSize: '11px', fontWeight: '700',
            padding: '2px 10px', borderRadius: '20px',
            marginTop: '6px', textTransform: 'capitalize',
          }}>
            {b.status || 'confirmed'}
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
        <div style={{ fontWeight: '800', color: '#6366f1', fontSize: '16px' }}>₹{b.totalPrice}</div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{b.tickets} ticket(s)</div>
      </div>
    </div>
  );
}

/* ===== USER DASHBOARD ===== */
function UserDashboard({ onNavigate, userRole, userData }) {
  var [editOpen, setEditOpen] = useState(false);
  var [myBookings, setMyBookings] = useState([]);
  var [loading, setLoading] = useState(true);

  useEffect(function() {
    async function fetchMyBookings() {
      try {
        var data = await getMyBookingsCall();
        setMyBookings(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMyBookings();
  }, []);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

        {/* Left column */}
        <div>
          <Section title="My Profile" icon="👤">
            <UserProfileCard
              userRole={userRole}
              profile={userData || { name: 'Current User', email: 'user@example.com' }}
              onEdit={() => setEditOpen(true)}
            />
          </Section>

          {/* Quick actions */}
          <Section title="Quick Actions" icon="⚡">
            <div style={{ display: 'grid', gap: '12px' }}>
              <button
                onClick={() => onNavigate('explore')}
                style={{
                  background: 'linear-gradient(135deg, #f0f0ff, #e0e7ff)',
                  border: '1px solid #c7d2fe',
                  borderRadius: '14px', padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: '14px',
                  cursor: 'pointer', textAlign: 'left',
                }}
                onMouseEnter={function(e) { e.currentTarget.style.background = 'linear-gradient(135deg, #e0e7ff, #c7d2fe)'; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = 'linear-gradient(135deg, #f0f0ff, #e0e7ff)'; }}
              >
                <span style={{ fontSize: '28px' }}>🎪</span>
                <div>
                  <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '14px' }}>Explore Events</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Discover events across India</div>
                </div>
              </button>
              <button
                onClick={() => onNavigate('events')}
                style={{
                  background: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
                  border: '1px solid #fed7aa',
                  borderRadius: '14px', padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: '14px',
                  cursor: 'pointer', textAlign: 'left',
                }}
                onMouseEnter={function(e) { e.currentTarget.style.background = 'linear-gradient(135deg, #ffedd5, #fed7aa)'; }}
                onMouseLeave={function(e) { e.currentTarget.style.background = 'linear-gradient(135deg, #fff7ed, #ffedd5)'; }}
              >
                <span style={{ fontSize: '28px' }}>🎟️</span>
                <div>
                  <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '14px' }}>Browse All Events</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>View all available events</div>
                </div>
              </button>
            </div>
          </Section>
        </div>

        {/* Right column */}
        <div>
          <Section title="My Bookings" icon="📋">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div className="loading-spinner" />
                <p style={{ color: '#64748b', marginTop: '16px', fontSize: '14px' }}>Loading your bookings...</p>
              </div>
            ) : myBookings.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '40px',
                background: 'white', borderRadius: '20px',
                border: '1px dashed #c7d2fe',
              }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎭</div>
                <h4 style={{ color: '#1e293b', fontWeight: '700', marginBottom: '8px' }}>No Bookings Yet</h4>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
                  You haven't booked anything yet — let's change that!
                </p>
                <button
                  onClick={() => onNavigate('explore')}
                  className="btn-primary"
                  style={{ padding: '12px 24px', fontSize: '14px' }}
                >
                  <span>Explore Events</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {myBookings.map(function(b) {
                  return <BookingItem key={b._id} b={b} />;
                })}
              </div>
            )}
          </Section>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {editOpen && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '20px',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{
            background: 'white', borderRadius: '24px',
            padding: '36px', maxWidth: '420px', width: '100%',
            boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
          }}>
            <h4 style={{ fontWeight: '800', fontSize: '1.4rem', color: '#1e293b', marginBottom: '8px' }}>
              Edit Profile ✏️
            </h4>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '28px' }}>
              Profile editing functionality coming soon! We're working on it.
            </p>
            <button
              onClick={() => setEditOpen(false)}
              className="btn-primary"
              style={{ width: '100%', padding: '14px' }}
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== LISTING ITEM ===== */
function ListingItem({ item }) {
  return (
    <div style={{
      background: 'white', borderRadius: '16px',
      padding: '18px 22px', border: '1px solid #e2e8f0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      gap: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: '42px', height: '42px',
          background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px',
        }}>
          🎪
        </div>
        <div>
          <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '15px' }}>{item.title}</div>
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
            {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {item.location}
          </div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
            ₹{item.price} • {item.availableSpots}/{item.totalSpots} spots left
          </div>
        </div>
      </div>
      <div style={{
        background: item.availableSpots > 0 ? '#d1fae5' : '#fee2e2',
        color: item.availableSpots > 0 ? '#065f46' : '#dc2626',
        fontSize: '11px', fontWeight: '700',
        padding: '4px 12px', borderRadius: '20px',
        whiteSpace: 'nowrap',
      }}>
        {item.availableSpots > 0 ? '✅ Active' : '❌ Sold Out'}
      </div>
    </div>
  );
}

/* ===== ORGANIZER DASHBOARD ===== */
function OrganizerDashboard({ userRole, userData }) {
  var [loading, setLoading] = useState(true);
  var [events, setEvents] = useState([]);
  var [bookings, setBookings] = useState([]);
  var [addMode, setAddMode] = useState(false);

  var [formData, setFormData] = useState({
    title: '', description: '', date: '', location: '', price: 0, totalSpots: 100,
  });

  async function fetchData() {
    setLoading(true);
    try {
      var allEvents = await getEventsCall();
      setEvents(allEvents);
      var orgBookings = await getAllBookingsCall();
      setBookings(orgBookings);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(function() {
    fetchData();
  }, []);

  async function handleAddSubmit(e) {
    e.preventDefault();
    try {
      await createEventCall(formData);
      alert('Event created successfully!');
      setAddMode(false);
      setFormData({ title: '', description: '', date: '', location: '', price: 0, totalSpots: 100 });
      fetchData();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || 'Failed to create event');
    }
  }

  function handleChange(e) {
    setFormData(function(prev) { return Object.assign({}, prev, { [e.target.name]: e.target.value }); });
  }

  var totalEarnings = bookings.reduce(function(sum, b) { return sum + (b.totalPrice || 0); }, 0);

  return (
    <div>
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="stat-card">
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📅</div>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: '#6366f1', fontFamily: 'Poppins, sans-serif' }}>{events.length}</div>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', marginTop: '4px' }}>Events Created</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎫</div>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: '#8b5cf6', fontFamily: 'Poppins, sans-serif' }}>{bookings.length}</div>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', marginTop: '4px' }}>Total Bookings</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>💰</div>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: '#10b981', fontFamily: 'Poppins, sans-serif' }}>₹{totalEarnings.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', marginTop: '4px' }}>Total Revenue</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>

        {/* Left */}
        <div>
          <Section title="Profile Overview" icon="👤">
            <UserProfileCard
              userRole={userRole}
              profile={userData || { name: 'Event Organizer', email: 'org@eventsphere.in' }}
              onEdit={function() {}}
            />
          </Section>
        </div>

        {/* Right */}
        <div>
          {/* Events */}
          <Section title="Manage Events" icon="🎪">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', color: '#64748b' }}>{events.length} events published</span>
              <button
                onClick={() => setAddMode(true)}
                className="btn-primary"
                style={{ padding: '10px 20px', fontSize: '13px', borderRadius: '12px' }}
              >
                <span>+ Create Event</span>
              </button>
            </div>

            {/* Create form */}
            {addMode && (
              <form onSubmit={handleAddSubmit} style={{
                background: 'linear-gradient(135deg, #f0f0ff, #ede9fe)',
                borderRadius: '20px', padding: '24px',
                border: '1px solid #c7d2fe', marginBottom: '20px',
              }}>
                <h4 style={{ fontWeight: '800', color: '#1e293b', marginBottom: '20px', fontSize: '1.1rem' }}>
                  🆕 Create New Event
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <input required name="title" value={formData.title} onChange={handleChange}
                    placeholder="Event Title (e.g. Sunburn Goa 2026)"
                    className="form-control" style={{ gridColumn: '1 / -1' }}
                  />
                  <textarea required name="description" value={formData.description} onChange={handleChange}
                    placeholder="Event Description"
                    className="form-control" rows="3" style={{ gridColumn: '1 / -1', resize: 'vertical' }}
                  />
                  <input required name="date" type="datetime-local" value={formData.date} onChange={handleChange}
                    className="form-control"
                  />
                  <input required name="location" value={formData.location} onChange={handleChange}
                    placeholder="Location (e.g. Wankhede Stadium, Mumbai)"
                    className="form-control"
                  />
                  <div>
                    <label className="form-label">Price (₹)</label>
                    <input required name="price" type="number" min="0" value={formData.price} onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div>
                    <label className="form-label">Total Spots</label>
                    <input required name="totalSpots" type="number" min="1" value={formData.totalSpots} onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                  <button type="button" onClick={() => setAddMode(false)} style={{
                    flex: 1, padding: '12px', borderRadius: '12px',
                    background: 'white', border: '1px solid #e2e8f0',
                    color: '#64748b', fontWeight: '600', cursor: 'pointer',
                  }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" style={{ flex: 2, padding: '12px', borderRadius: '12px' }}>
                    <span>🚀 Publish Event</span>
                  </button>
                </div>
              </form>
            )}

            {loading ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div className="loading-spinner" />
              </div>
            ) : events.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '16px', border: '1px dashed #c7d2fe' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
                <p style={{ color: '#64748b', fontSize: '14px' }}>No events yet. Create your first event!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {events.map(function(ev) { return <ListingItem key={ev._id} item={ev} />; })}
              </div>
            )}
          </Section>

          {/* Recent Bookings */}
          <Section title="Recent Bookings" icon="📊">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div className="loading-spinner" />
              </div>
            ) : bookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px', background: 'white', borderRadius: '16px', border: '1px dashed #c7d2fe' }}>
                <p style={{ color: '#64748b', fontSize: '14px' }}>No bookings on your events yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '360px', overflowY: 'auto' }}>
                {bookings.map(function(b) {
                  return (
                    <div key={b._id} style={{
                      background: 'white', borderRadius: '14px',
                      padding: '16px 20px', border: '1px solid #e2e8f0',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <div>
                        <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '14px' }}>
                          {b.event?.title || 'Unknown Event'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '3px' }}>
                          Booked by: <strong style={{ color: '#1e293b' }}>{b.user?.name || 'Someone'}</strong>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '700', color: '#6366f1' }}>₹{b.totalPrice}</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px' }}>{b.tickets} ticket(s)</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ===== MAIN DASHBOARD WRAPPER ===== */
function Dashboard({ onNavigate, userRole, userData }) {
  if (!userRole) userRole = 'user';

  return (
    <div className="page-wrapper">

      {/* Hero */}
      <div
        style={{
          position: 'relative',
          color: 'white',
          padding: '70px 32px 80px',
          textAlign: 'center',
          overflow: 'hidden',
          minHeight: '380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(15,12,41,0.9) 0%, rgba(48,43,99,0.85) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '700px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '30px',
            padding: '8px 22px',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '24px',
          }}>
            {userRole === 'user' ? '👤 User Portal' : '🏢 Organizer Portal'}
          </div>
          <h1 className="animate-fade-in-up" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '900', fontFamily: 'Poppins, sans-serif', marginBottom: '16px' }}>
            {userRole === 'user' ? '🎫 My Dashboard' : '🎪 Organizer Dashboard'}
          </h1>
          <p className="animate-fade-in-up delay-200" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.82)', lineHeight: '1.7' }}>
            {userRole === 'user'
              ? 'Manage your bookings, explore events, and track your payments.'
              : 'Create, manage, and analyze your events and bookings.'}
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div style={{ padding: '48px 32px', background: 'linear-gradient(180deg, #f8faff 0%, #f0f4ff 100%)', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {userRole === 'user'
            ? <UserDashboard onNavigate={onNavigate} userRole={userRole} userData={userData} />
            : <OrganizerDashboard userRole={userRole} userData={userData} />
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
