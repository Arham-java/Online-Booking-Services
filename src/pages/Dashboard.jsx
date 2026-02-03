import React from 'react';

const StatsCard = ({ title, value, hint }) => (
  <div className="bg-white/90 text-slate-900 p-5 rounded-2xl shadow-sm border">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="text-2xl font-bold mt-2">{value}</div>
    {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
  </div>
);

const BookingRow = ({ booking }) => (
  <div className="flex items-center justify-between gap-4 p-3 bg-white/90 rounded-lg border">
    <div>
      <div className="font-semibold text-slate-900">{booking.event}</div>
      <div className="text-xs text-gray-500">{booking.date} • {booking.venue}</div>
    </div>
    <div className="text-right">
      <div className="font-medium text-slate-900">{booking.seats} seats</div>
      <div className="text-sm text-gray-500">{booking.status}</div>
    </div>
  </div>
);

const Dashboard = ({ onNavigate }) => {
  const stats = [
    { title: 'Total Events', value: 128 },
    { title: 'Bookings Today', value: 24 },
    { title: 'Revenue (24h)', value: '$3,450' },
  ];

  const bookings = [
    { event: 'Comedy Night', date: 'Feb 6, 2026', venue: 'Main Hall', seats: 3, status: 'Confirmed' },
    { event: 'Indie Concert', date: 'Feb 7, 2026', venue: 'Open Arena', seats: 2, status: 'Pending' },
    { event: 'Art Expo', date: 'Feb 10, 2026', venue: 'Gallery 2', seats: 1, status: 'Confirmed' },
  ];

  return (
    <div className="min-h-[60vh] p-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <div className="space-x-2">
            <button onClick={() => onNavigate('explore')} className="text-sm text-purple-600 hover:underline">Explore Events</button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stats.map((s) => (
            <StatsCard key={s.title} title={s.title} value={s.value} />
          ))}
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Recent Bookings</h2>
          <div className="space-y-3">
            {bookings.map((b, i) => (
              <BookingRow booking={b} key={i} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Recent Activity</h2>
          <ul className="space-y-2">
            <li className="text-sm text-gray-600">You added a new event: <b className="text-slate-900">Spring Gala</b></li>
            <li className="text-sm text-gray-600">3 bookings confirmed in the last hour</li>
            <li className="text-sm text-gray-600">Payment settlement succeeded for yesterday's payout</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
