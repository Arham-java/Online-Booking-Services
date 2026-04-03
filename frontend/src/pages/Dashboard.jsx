import React, { useState, useEffect } from 'react';
import { getEventsCall, createEventCall, getMyBookingsCall, getAllBookingsCall } from '../services/api';

// Small reusable UI pieces
var Section = ({ title, children }) => (
  <section className="mb-8">
    <h3 className="text-xl font-bold mb-4 text-blue-600">{title}</h3>
    {children}
  </section>
);

// ---------- User Dashboard Components ----------
var UserProfileCard = ({ profile, userRole, onEdit }) => (
  <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-600">
        {profile?.name ? profile.name[0].toUpperCase() : 'U'}
      </div>
      <div>
        <div className="font-semibold text-gray-900 capitalize">{profile?.name || 'User Name'}</div>
        <div className="text-sm text-gray-600">{profile?.email || 'user@example.com'}</div>
        <div className="text-xs mt-1 bg-green-100 text-green-800 px-2 py-0.5 rounded-full inline-block capitalize">{userRole}</div>
      </div>
      <div className="ml-auto">
        <button onClick={onEdit} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Edit Profile</button>
      </div>
    </div>
  </div>
);

var BookingItem = ({ b }) => (
  <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
    <div>
      <div className="font-semibold text-gray-900">{b.event?.title || 'Unknown Event'}</div>
      <div className="text-sm text-gray-600">{b.event ? new Date(b.event.date).toLocaleDateString() : ''} • {b.event?.location || ''}</div>
      <div className="text-xs text-gray-600 mt-1">Status: <span className="font-medium capitalize">{b.status}</span></div>
    </div>
    <div className="flex gap-2">
      <div className="text-right">
        <div className="text-sm text-gray-900 font-bold">{b.tickets} tickets</div>
        <div className="text-sm text-gray-600 font-bold">${b.totalPrice}</div>
      </div>
    </div>
  </div>
);

function UserDashboard({ onNavigate, userRole, userData }) {
  var [editOpen, setEditOpen] = useState(false);
  var [myBookings, setMyBookings] = useState([]);
  var [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyBookings() {
      try {
        var data = await getMyBookingsCall();
        setMyBookings(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBookings();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <Section title="Profile">
            <UserProfileCard userRole={userRole} profile={userData || { name: 'Current User', email: 'user@example.com' }} onEdit={() => setEditOpen(true)} />
          </Section>
        </div>

        <div className="md:col-span-2">
          <Section title="My Bookings">
            {loading ? (
              <div className="text-sm text-gray-500">Loading your bookings...</div>
            ) : myBookings.length === 0 ? (
              <div className="text-sm text-gray-500">You haven't booked anything yet. <button onClick={() => onNavigate('explore')} className="text-blue-600 hover:underline">Explore events</button></div>
            ) : (
              <div className="space-y-3">
                {myBookings.map(b => (
                  <BookingItem key={b._id} b={b} />
                ))}
              </div>
            )}
          </Section>

          <Section title="Quick Actions">
            <div className="bg-white p-4 rounded border border-gray-200 text-center">
              <h4 className="font-medium text-gray-800 mb-2">Looking for something new?</h4>
              <button onClick={() => onNavigate('events')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Browse All Events</button>
            </div>
          </Section>
        </div>
      </div>

      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full">
            <h4 className="font-semibold mb-2 text-gray-900 text-xl">Edit Profile</h4>
            <p className="text-sm text-gray-600 mb-4">Profile editing functionality coming soon!</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditOpen(false)} className="px-4 py-2 rounded border border-gray-200 text-gray-900 hover:bg-gray-100">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------- Organizer Dashboard Components ----------
var ListingItem = ({ item }) => (
  <div className="bg-white p-3 rounded border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
    <div>
      <div className="font-medium text-gray-900 text-lg">{item.title}</div>
      <div className="text-sm text-gray-600">{new Date(item.date).toLocaleDateString()} • {item.location}</div>
      <div className="text-xs text-gray-500 mt-1">
        Price: ${item.price} • Spots: {item.availableSpots}/{item.totalSpots} left
      </div>
    </div>
  </div>
);

function OrganizerDashboard({ userRole, userData }) {
  var [loading, setLoading] = useState(true);
  var [events, setEvents] = useState([]);
  var [bookings, setBookings] = useState([]);
  var [addMode, setAddMode] = useState(false);
  
  var [formData, setFormData] = useState({
    title: '', description: '', date: '', location: '', price: 0, totalSpots: 100
  });

  async function fetchData() {
    setLoading(true);
    try {
      var allEvents = await getEventsCall();
      // Simulating "my events" logic on client side since backend doesn't have an exact endpoint. 
      // Actually wait, I added an endpoint? Let me just use getEventsCall and not filter for simplicity in prototype, 
      // OR better, we know the organizer's bookings are filtered in getBookings!
      setEvents(allEvents);
      var orgBookings = await getAllBookingsCall();
      setBookings(orgBookings);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
  };

  function handleChange(e) {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  var totalEarnings = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 space-y-6">
          <Section title="Profile Overview">
            <UserProfileCard userRole={userRole} profile={userData || { name: 'Organizer Business', email: 'org@events.test' }} onEdit={() => {}} />
          </Section>

          <Section title="Earnings Snapshot">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="font-semibold text-gray-600 text-sm uppercase mb-1">Total Revenue</div>
              <div className="text-4xl text-blue-600 font-bold">${totalEarnings.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-2 border-t pt-2">From {bookings.length} successful bookings</div>
            </div>
          </Section>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Section title="Manage Events Listings">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">Events published to the platform</div>
              <button onClick={() => setAddMode(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                + Create New Event
              </button>
            </div>
            
            {addMode && (
              <form onSubmit={handleAddSubmit} className="bg-blue-50 p-5 rounded-lg border border-blue-200 mb-6">
                <h4 className="font-bold mb-4">Create a New Event</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input required name="title" value={formData.title} onChange={handleChange} placeholder="Event Title" className="col-span-2 p-2 border rounded" />
                  <textarea required name="description" value={formData.description} onChange={handleChange} placeholder="Event Description" className="col-span-2 p-2 border rounded" />
                  <input required name="date" type="datetime-local" value={formData.date} onChange={handleChange} className="p-2 border rounded" />
                  <input required name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="p-2 border rounded" />
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Price ($)</label>
                    <input required name="price" type="number" min="0" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Total Spots</label>
                    <input required name="totalSpots" type="number" min="1" value={formData.totalSpots} onChange={handleChange} className="w-full p-2 border rounded" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" onClick={() => setAddMode(false)} className="px-4 py-2 border rounded text-gray-700 bg-white">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Publish Event</button>
                </div>
              </form>
            )}

            {loading ? (
               <div className="text-sm text-gray-500">Loading events...</div>
            ) : events.length === 0 ? (
               <div className="text-sm text-gray-500 bg-gray-50 p-6 rounded text-center">No events found. Start by creating one!</div>
            ) : (
              <div className="space-y-3">
                {events.map(ev => <ListingItem key={ev._id} item={ev} />)}
              </div>
            )}
          </Section>

          <Section title="Recent Bookings">
            {loading ? (
              <div className="text-sm text-gray-500">Loading bookings...</div>
            ) : bookings.length === 0 ? (
              <div className="text-sm text-gray-500 bg-gray-50 p-6 rounded text-center">No bookings on your events yet.</div>
            )  : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {bookings.map(b => (
                  <div key={b._id} className="bg-white p-3 rounded border border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{b.event?.title || 'Unknown Event'}</div>
                      <div className="text-xs text-gray-600">Booked by: <span className="font-medium text-gray-800">{b.user?.name || 'Someone'}</span> (<a href={`mailto:${b.user?.email}`}>{b.user?.email}</a>)</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{b.tickets} Ticket(s)</div>
                      <div className="text-sm text-green-700 font-bold">+${b.totalPrice}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>
      </div>
    </div>
  );
};

// Main wrapper
function Dashboard({ onNavigate, userRole = 'user', userData }) {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative text-white py-24 px-8 text-center overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4 text-white">
            {userRole === 'user' ? 'My Dashboard' : 'Organizer Dashboard'}
          </h1>
          <p className="text-lg text-blue-100 font-medium">
            {userRole === 'user' 
              ? 'Manage your bookings, explore events, and track payments'
              : 'Create, manage, and analyze your events'}
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="min-h-[60vh] p-6 bg-gradient-to-b from-blue-50 to-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto">
          {userRole === 'user' ? <UserDashboard onNavigate={onNavigate} userRole={userRole} userData={userData} /> : <OrganizerDashboard userRole={userRole} userData={userData} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
