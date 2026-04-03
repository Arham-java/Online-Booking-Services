// Helper function for role button styling
export const getRoleButtonClass = (isActive, color = 'blue') => {
  const baseClass = 'flex-1 py-2 px-4 rounded-lg font-semibold transition';
  const activeClass = color === 'purple' 
    ? 'bg-orange-500 text-white' 
    : 'bg-blue-600 text-white';
  const inactiveClass = 'bg-gray-200 text-gray-600 hover:bg-gray-300';
  
  return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
};

// Reusable Tailwind CSS classes
export const STYLES = {
  // Card containers
  card: 'bg-white rounded-xl border border-gray-200 hover:shadow-lg transition duration-300',
  cardShadow: 'hover:shadow-xl',
  
  // Buttons
  primaryBtn: 'bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition duration-300',
  secondaryBtn: 'border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition duration-300',
  textBtn: 'text-blue-600 font-semibold px-4 py-2 hover:text-blue-700 transition duration-300',
  
  // Form inputs
  formInput: 'w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/30 text-gray-900 placeholder-gray-400 transition',
  formLabel: 'block mb-2 text-sm font-semibold text-gray-700',
  
  // Text gradients
  gradientText: 'bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent',
  
  // Containers
  section: 'py-16 px-8 max-w-6xl mx-auto',
  
  // Backgrounds
  darkBg: 'min-h-screen bg-white text-gray-900',
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
