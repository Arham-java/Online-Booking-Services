// Reusable Tailwind CSS classes
export const STYLES = {
  // Card containers
  card: 'bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition duration-300',
  cardShadow: 'hover:shadow-lg hover:shadow-cyan-500/10',
  
  // Buttons
  primaryBtn: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300',
  secondaryBtn: 'border-2 border-cyan-400 text-cyan-400 px-6 py-3 rounded-full font-bold hover:bg-cyan-400/10 transition duration-300',
  textBtn: 'text-cyan-400 font-semibold px-4 py-2 hover:bg-cyan-400/10 rounded-lg transition duration-300',
  
  // Form inputs
  formInput: 'w-full px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-500 transition',
  formLabel: 'block mb-2 text-sm font-semibold text-cyan-400',
  
  // Text gradients
  gradientText: 'bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent',
  
  // Containers
  section: 'py-16 px-8 max-w-6xl mx-auto',
  
  // Backgrounds
  darkBg: 'min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white',
};

// Navigation items
export const NAVIGATION_ITEMS = [
  { label: 'Home', view: 'home' },
  { label: 'Explore', view: 'explore' },
  { label: 'Events', view: 'events' },
  { label: 'About Us', view: 'about' },
  { label: 'Contact Us', view: 'contactus' },
];

// Event categories
export const EVENT_CATEGORIES = [
  { name: 'Concerts', icon: '🎵' },
  { name: 'Sports', icon: '⚽' },
  { name: 'Movies', icon: '🎬' },
  { name: 'Comedy', icon: '😂' },
  { name: 'Workshops', icon: '📚' },
];
