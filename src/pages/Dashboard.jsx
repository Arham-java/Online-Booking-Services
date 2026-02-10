import React, { useState, useMemo } from 'react';
import {
  events as allEvents,
  bookings as mockBookings,
  wishlist as mockWishlist,
  notifications as mockNotifications,
  userProfile,
  platformStats,
} from '../services/mockData';

// Small reusable UI pieces
const Section = ({ title, children }) => (
  <section className="mb-8">
    <h3 className="text-xl font-bold mb-4 text-blue-600">{title}</h3>
    {children}
  </section>
);

// ---------- User Dashboard Components ----------
const UserProfileCard = ({ profile, onEdit }) => (
  <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-600">{profile.name[0]}</div>
      <div>
        <div className="font-semibold text-gray-900">{profile.name}</div>
        <div className="text-sm text-gray-600">{profile.email}</div>
        <div className="text-sm text-gray-600">{profile.phone}</div>
      </div>
      <div className="ml-auto">
        <button onClick={onEdit} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Edit Profile</button>
      </div>
    </div>
  </div>
);

const BookingItem = ({ b, onCancel, onReschedule }) => (
  <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
    <div>
      <div className="font-semibold text-gray-900">{b.event}</div>
      <div className="text-sm text-gray-600">{b.date} • {b.venue}</div>
      <div className="text-xs text-gray-600 mt-1">Status: <span className="font-medium">{b.status}</span></div>
    </div>
    <div className="flex gap-2">
      <button onClick={() => onReschedule(b)} className="border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50">Reschedule</button>
      <button onClick={() => onCancel(b)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
    </div>
  </div>
);

const PaymentsList = ({ payments, onDownload }) => (
  <div className="space-y-3">
    {payments.map(p => (
      <div key={p.id} className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between">
        <div>
          <div className="font-medium text-gray-900">{p.description}</div>
          <div className="text-sm text-gray-600">{p.date} • {p.method}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-semibold text-gray-900">{p.amount}</div>
          <button onClick={() => onDownload(p)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Download</button>
        </div>
      </div>
    ))}
  </div>
);

const UserDashboard = ({ onNavigate }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [query, setQuery] = useState('');

  const upcoming = mockBookings.filter(b => b.status !== 'Past');
  const past = mockBookings.filter(b => b.status === 'Past');

  const mockPayments = [
    { id: 'P001', description: 'Comedy Night - B001', date: '2026-02-01', amount: '₹2,000', method: 'Card' },
    { id: 'P002', description: 'Indie Concert - B002', date: '2026-02-07', amount: '₹4,500', method: 'Netbanking' },
  ];

  const handleCancel = (b) => {
    alert(`Cancel booking ${b.id} (mock)`);
  };
  const handleReschedule = (b) => {
    alert(`Reschedule booking ${b.id} (mock)`);
  };
  const handleDownload = (p) => { alert(`Download invoice ${p.id} (mock)`); };

  const filteredEvents = allEvents.filter(e => {
    if (!query) return true;
    const q = query.toLowerCase();
    return e.title.toLowerCase().includes(q) || e.city.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <Section title="Profile">
            <UserProfileCard profile={userProfile} onEdit={() => setEditOpen(true)} />
          </Section>

          <Section title="Notifications">
            <div className="space-y-2">
              {mockNotifications.map(n => (
                <div key={n.id} className="bg-white p-2 rounded text-sm border border-gray-200 text-gray-900">{n.text}</div>
              ))}
            </div>
          </Section>
        </div>

        <div className="lg:col-span-2">
          <Section title="Search & Browse Services">
            <div className="flex gap-2 mb-4">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events, city..." className="flex-1 p-3 rounded border border-gray-200 bg-white text-gray-900" />
              <button onClick={() => setQuery('')} className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">Clear</button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {filteredEvents.map(ev => (
                <div key={ev.id} className="bg-white p-3 rounded border border-gray-200">
                  <div className="font-semibold text-gray-900">{ev.title}</div>
                  <div className="text-sm text-gray-600">{ev.city} • {ev.date}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="My Bookings">
            <div className="space-y-3">
              <div className="text-sm text-gray-600 mb-2">Upcoming</div>
              {upcoming.length ? upcoming.map(b => <BookingItem key={b.id} b={b} onCancel={handleCancel} onReschedule={handleReschedule} />) : <div className="text-sm text-gray-600">No upcoming bookings</div>}

              <div className="text-sm text-gray-600 mt-4 mb-2">Past</div>
              {past.length ? past.map(b => <BookingItem key={b.id} b={b} onCancel={handleCancel} onReschedule={handleReschedule} />) : <div className="text-sm text-gray-600">No past bookings</div>}
            </div>
          </Section>

          <Section title="Payments & Invoices">
            <PaymentsList payments={mockPayments} onDownload={handleDownload} />
          </Section>

          <Section title="Support & Help">
            <div className="bg-white p-4 rounded border border-gray-200">
              <div className="mb-2 text-gray-900">FAQ: Check our help center for common questions.</div>
              <button onClick={() => alert('Open chat (mock)')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Chat Support</button>
            </div>
          </Section>
        </div>
      </div>

      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h4 className="font-semibold mb-3 text-gray-900">Edit Profile (mock)</h4>
            <p className="text-sm text-gray-600 mb-4">This is a mock profile editor. Implement real form to persist changes.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditOpen(false)} className="px-4 py-2 rounded border border-gray-200 text-gray-900 hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------- Organizer Dashboard Components ----------
const OrganizerProfileCard = ({ profile, business, verified }) => (
  <div className="bg-white text-gray-900 p-4 rounded shadow border border-gray-200">
    <div className="font-semibold">{business.name}</div>
    <div className="text-sm text-gray-600">{business.email}</div>
    <div className="text-sm text-gray-600">Status: {verified ? 'Verified' : 'Unverified'}</div>
  </div>
);

const ListingItem = ({ item, onEdit, onDelete }) => (
  <div className="bg-white p-3 rounded border border-gray-200 flex items-center justify-between">
    <div>
      <div className="font-medium text-gray-900">{item.title}</div>
      <div className="text-sm text-gray-600">{item.date} • {item.city}</div>
    </div>
    <div className="flex gap-2">
      <button onClick={() => onEdit(item)} className="px-3 py-1 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500">Edit</button>
      <button onClick={() => onDelete(item)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
    </div>
  </div>
);

const OrganizerDashboard = ({ onNavigate }) => {
  const [listings, setListings] = useState(allEvents.slice(0, 3));

  const handleAdd = () => {
    const id = Math.floor(Math.random() * 10000);
    const newItem = { id, title: `New Listing ${id}`, city: 'Unknown', date: 'TBA' };
    setListings(prev => [newItem, ...prev]);
  };
  const handleEdit = (it) => { alert(`Edit ${it.title} (mock)`); };
  const handleDelete = (it) => { setListings(prev => prev.filter(p => p.id !== it.id)); };

  const earnings = {
    total: platformStats.totalRevenue || '₹0',
    pending: '₹5,000',
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <Section title="Organizer Profile">
            <OrganizerProfileCard profile={userProfile} business={{ name: 'My Business', email: userProfile.email }} verified={true} />
          </Section>

          <Section title="Payment & Earnings">
            <div className="bg-white p-3 rounded border border-gray-200">
              <div className="font-semibold text-gray-900">Total Earnings</div>
              <div className="text-2xl mt-2 text-blue-600">{earnings.total}</div>
              <div className="text-sm text-gray-600 mt-1">Pending: {earnings.pending}</div>
            </div>
          </Section>
        </div>

        <div className="lg:col-span-2">
          <Section title="Create & Manage Listings">
            <div className="flex justify-between mb-3">
              <div className="text-sm text-gray-600">Your listings</div>
              <div>
                <button onClick={handleAdd} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Add Listing</button>
              </div>
            </div>
            <div className="space-y-3">
              {listings.map(l => <ListingItem key={l.id} item={l} onEdit={handleEdit} onDelete={handleDelete} />)}
            </div>
          </Section>

          <Section title="Booking Management">
            <div className="space-y-3">
              {mockBookings.map(b => (
                <div key={b.id} className="bg-white p-3 rounded border border-gray-200 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{b.event}</div>
                    <div className="text-sm text-gray-600">{b.date} • {b.venue}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => alert(`Approve ${b.id} (mock)`)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
                    <button onClick={() => alert(`Reject ${b.id} (mock)`)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Analytics & Reports">
            <div className="bg-white p-4 rounded border border-gray-200">
              <div className="text-sm text-gray-600">Total bookings: {platformStats.totalBookings}</div>
              <div className="text-sm text-gray-600">Total revenue (platform): {platformStats.totalRevenue}</div>
              <div className="mt-3 text-sm text-gray-500">(Graphs/Charts can be added here)</div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

// Main wrapper that shows either User or Organizer dashboard depending on role
const Dashboard = ({ onNavigate, userRole = 'user' }) => {
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
          <h1 className="text-5xl font-bold mb-4 text-white">
            {userRole === 'user' ? 'My Dashboard' : 'Organizer Dashboard'}
          </h1>
          <p className="text-lg text-gray-100">
            {userRole === 'user' 
              ? 'Manage your bookings, explore events, and track payments'
              : 'Create, manage, and analyze your events'}
          </p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="min-h-[70vh] p-6 bg-gradient-to-b from-blue-50 to-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <div className="text-sm text-gray-600">Logged in as: <span className="font-semibold capitalize">{userRole}</span></div>
          </div>

          {userRole === 'user' ? <UserDashboard onNavigate={onNavigate} /> : <OrganizerDashboard onNavigate={onNavigate} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
