// Minimal mock data for dashboard features
export const userProfile = {
  name: 'Himesh Jaiswal',
  email: 'abc@gmail.com',
  phone: '+91 96081 20979',
};

export const events = [
  { id: 1, title: 'Comedy Night', category: 'Comedy', city: 'New York', date: '2026-02-06', time: '19:30', venue: 'Main Hall', price: 2000, poster: '' },
  { id: 2, title: 'Indie Concert', category: 'Concert', city: 'Los Angeles', date: '2026-02-07', time: '20:00', venue: 'Open Arena', price: 4500, poster: '' },
  { id: 3, title: 'Art Expo', category: 'Exhibition', city: 'Chicago', date: '2026-02-10', time: '11:00', venue: 'Gallery 2', price: 1000, poster: '' },
  { id: 4, title: 'Stand-up Special', category: 'Comedy', city: 'New York', date: '2026-02-14', time: '21:00', venue: 'Laugh Club', price: 2500, poster: '' },
  { id: 5, title: 'Rock Fest', category: 'Concert', city: 'Austin', date: '2026-03-03', time: '18:00', venue: 'River Park', price: 6000, poster: '' },
];

export const bookings = [
  { id: 'B001', eventId: 1, event: 'Comedy Night', date: '2026-02-06', venue: 'Main Hall', seats: 2, status: 'Confirmed' },
  { id: 'B002', eventId: 2, event: 'Indie Concert', date: '2026-02-07', venue: 'Open Arena', seats: 4, status: 'Pending' },
];

export const wishlist = [
  { id: 5, title: 'Rock Fest', date: '2026-03-03', city: 'Austin' },
];

export const notifications = [
  { id: 1, text: 'Your booking B001 is confirmed.' },
  { id: 2, text: 'New event: Spring Gala is live.' },
];

export const platformStats = {
  totalUsers: 4520,
  totalEvents: 312,
  totalBookings: 12480,
  totalRevenue: '₹1,245,000',
};
