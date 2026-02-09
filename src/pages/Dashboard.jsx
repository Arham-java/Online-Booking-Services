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
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    {children}
  </section>
);

// ---------- User Dashboard Components ----------
const UserProfileCard = ({ profile, onEdit }) => (
  <div className="card-var p-4 rounded-lg shadow">
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 bg-slate-200/10 rounded-full flex items-center justify-center text-xl font-bold">{profile.name[0]}</div>
      <div>
        <div className="font-semibold">{profile.name}</div>
        <div className="text-sm text-muted">{profile.email}</div>
        <div className="text-sm text-muted">{profile.phone}</div>
      </div>
      <div className="ml-auto">
        <button onClick={onEdit} className="btn-primary-var px-3 py-1 rounded">Edit Profile</button>
      </div>
    </div>
  </div>
);

const BookingItem = ({ b, onCancel, onReschedule }) => (
  <div className="card-var p-3 rounded-lg border flex items-center justify-between">
    <div>
      <div className="font-semibold">{b.event}</div>
      <div className="text-sm text-muted">{b.date} • {b.venue}</div>
      <div className="text-xs text-muted mt-1">Status: <span className="font-medium">{b.status}</span></div>
    </div>
    <div className="flex gap-2">
      <button onClick={() => onReschedule(b)} className="btn-outline-var px-3 py-1 rounded">Reschedule</button>
      <button onClick={() => onCancel(b)} className="px-3 py-1 bg-red-500 text-white rounded">Cancel</button>
    </div>
  </div>
);

const PaymentsList = ({ payments, onDownload }) => (
  <div className="space-y-3">
    {payments.map(p => (
      <div key={p.id} className="card-var p-3 rounded-lg border flex items-center justify-between">
        <div>
          <div className="font-medium">{p.description}</div>
          <div className="text-sm text-muted">{p.date} • {p.method}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-semibold">{p.amount}</div>
          <button onClick={() => onDownload(p)} className="btn-primary-var px-3 py-1 rounded">Download</button>
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
                <div key={n.id} className="card-var p-2 rounded text-sm">{n.text}</div>
              ))}
            </div>
          </Section>
        </div>

        <div className="lg:col-span-2">
          <Section title="Search & Browse Services">
            <div className="flex gap-2 mb-4">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events, city..." className="flex-1 p-3 rounded border bg-transparent text-inherit" />
              <button onClick={() => setQuery('')} className="btn-outline-var px-4 py-2 rounded">Clear</button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {filteredEvents.map(ev => (
                <div key={ev.id} className="card-var p-3 rounded border">
                  <div className="font-semibold">{ev.title}</div>
                  <div className="text-sm text-muted">{ev.city} • {ev.date}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="My Bookings">
            <div className="space-y-3">
              <div className="text-sm text-muted mb-2">Upcoming</div>
              {upcoming.length ? upcoming.map(b => <BookingItem key={b.id} b={b} onCancel={handleCancel} onReschedule={handleReschedule} />) : <div className="text-sm text-muted">No upcoming bookings</div>}

              <div className="text-sm text-muted mt-4 mb-2">Past</div>
              {past.length ? past.map(b => <BookingItem key={b.id} b={b} onCancel={handleCancel} onReschedule={handleReschedule} />) : <div className="text-sm text-muted">No past bookings</div>}
            </div>
          </Section>

          <Section title="Payments & Invoices">
            <PaymentsList payments={mockPayments} onDownload={handleDownload} />
          </Section>

          <Section title="Support & Help">
            <div className="card-var p-4 rounded border">
              <div className="mb-2">FAQ: Check our help center for common questions.</div>
              <button onClick={() => alert('Open chat (mock)')} className="btn-primary-var px-4 py-2 rounded">Chat Support</button>
            </div>
          </Section>
        </div>
      </div>

      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="card-var p-6 rounded shadow max-w-md w-full">
            <h4 className="font-semibold mb-3">Edit Profile (mock)</h4>
            <p className="text-sm text-muted mb-4">This is a mock profile editor. Implement real form to persist changes.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditOpen(false)} className="px-4 py-2 rounded border">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------- Organizer Dashboard Components ----------
const OrganizerProfileCard = ({ profile, business, verified }) => (
  <div className="bg-white text-slate-900 p-4 rounded shadow border">
    <div className="font-semibold">{business.name}</div>
    <div className="text-sm text-slate-600">{business.email}</div>
    <div className="text-sm text-slate-600">Status: {verified ? 'Verified' : 'Unverified'}</div>
  </div>
);

const ListingItem = ({ item, onEdit, onDelete }) => (
  <div className="bg-white p-3 rounded border flex items-center justify-between">
    <div>
      <div className="font-medium">{item.title}</div>
      <div className="text-sm text-slate-600">{item.date} • {item.city}</div>
    </div>
    <div className="flex gap-2">
      <button onClick={() => onEdit(item)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
      <button onClick={() => onDelete(item)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
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
            <div className="bg-white p-3 rounded border">
              <div className="font-semibold">Total Earnings</div>
              <div className="text-2xl mt-2">{earnings.total}</div>
              <div className="text-sm text-slate-600 mt-1">Pending: {earnings.pending}</div>
            </div>
          </Section>
        </div>

        <div className="lg:col-span-2">
          <Section title="Create & Manage Listings">
            <div className="flex justify-between mb-3">
              <div className="text-sm text-slate-400">Your listings</div>
              <div>
                <button onClick={handleAdd} className="px-3 py-1 bg-cyan-600 text-white rounded">Add Listing</button>
              </div>
            </div>
            <div className="space-y-3">
              {listings.map(l => <ListingItem key={l.id} item={l} onEdit={handleEdit} onDelete={handleDelete} />)}
            </div>
          </Section>

          <Section title="Booking Management">
            <div className="space-y-3">
              {mockBookings.map(b => (
                <div key={b.id} className="bg-white p-3 rounded border flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{b.event}</div>
                    <div className="text-sm text-slate-600">{b.date} • {b.venue}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => alert(`Approve ${b.id} (mock)`)} className="px-3 py-1 bg-green-500 text-white rounded">Approve</button>
                    <button onClick={() => alert(`Reject ${b.id} (mock)`)} className="px-3 py-1 bg-red-500 text-white rounded">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Analytics & Reports">
            <div className="bg-white p-4 rounded border">
              <div className="text-sm text-slate-600">Total bookings: {platformStats.totalBookings}</div>
              <div className="text-sm text-slate-600">Total revenue (platform): {platformStats.totalRevenue}</div>
              <div className="mt-3 text-sm text-slate-500">(Graphs/Charts can be added here)</div>
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
    <div className="min-h-[70vh] p-6 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="text-sm text-slate-400">Logged in as: <span className="font-semibold capitalize">{userRole}</span></div>
        </div>

        {userRole === 'user' ? <UserDashboard onNavigate={onNavigate} /> : <OrganizerDashboard onNavigate={onNavigate} />}
      </div>
    </div>
  );
};

export default Dashboard;
