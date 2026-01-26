import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

function App() {
  // State to track which page to show: 'home', 'login', or 'signup'
  const [view, setView] = useState('home');
  
  // State to simulate a logged-in user
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Helper to handle mock login/logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* --- NAVIGATION BAR --- */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white shadow-sm sticky top-0 z-50">
        <div 
          className="text-2xl font-black text-indigo-600 cursor-pointer tracking-tighter uppercase"
          onClick={() => setView('home')}
        >
          Event<span className="text-purple-600">Sphere</span>
        </div>

        <div className="hidden md:flex space-x-8 font-medium text-gray-600">
          <button onClick={() => setView('home')} className="hover:text-indigo-600 transition">Home</button>
          <button className="hover:text-indigo-600 transition">Explore</button>
          <button className="hover:text-indigo-600 transition">About</button>
        </div>

        <div className="space-x-4">
          {!isLoggedIn ? (
            <>
              <button 
                onClick={() => setView('login')}
                className="text-indigo-600 font-semibold px-4 py-2 hover:bg-indigo-50 rounded-lg transition"
              >
                Login
              </button>
              <button 
                onClick={() => setView('signup')}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button 
              onClick={handleLogout}
              className="border border-red-500 text-red-500 px-5 py-2 rounded-lg font-semibold hover:bg-red-50 transition"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main>
        {/* VIEW: HOME PAGE */}
        {view === 'home' && (
          <div>
            {/* Hero Section */}
            <header className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white py-24 px-8 text-center">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in">
                Unforgettable Experiences <br /> Start Here
              </h1>
              <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed">
                Book tickets for the most exclusive concerts, workshops, and entertainment events around the globe.
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => setView('signup')}
                  className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform"
                >
                  Get Started
                </button>
                <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 transition">
                  Browse Events
                </button>
              </div>
            </header>

            {/* Feature Cards Section */}
            <section className="py-20 px-8 max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-16">Why Choose EventSphere?</h2>
              <div className="grid md:grid-cols-3 gap-10">
                <FeatureCard 
                  icon="⚡" 
                  title="Instant Access" 
                  desc="Receive your digital tickets immediately after booking via email." 
                />
                <FeatureCard 
                  icon="🔒" 
                  title="Secure Payments" 
                  desc="Your transactions are protected with military-grade encryption." 
                />
                <FeatureCard 
                  icon="🌍" 
                  title="Global Reach" 
                  desc="From local workshops to international festivals, we have it all." 
                />
              </div>
            </section>
          </div>
        )}

        {/* VIEW: LOGIN PAGE */}
        {view === 'login' && (
          <Login switchToSignup={() => setView('signup')} />
        )}

        {/* VIEW: SIGNUP PAGE */}
        {view === 'signup' && (
          <Signup switchToLogin={() => setView('login')} />
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-gray-200 py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500">
          <div className="font-bold text-indigo-600 text-xl mb-4 md:mb-0">EventSphere</div>
          <p className="text-sm">© 2026 EventSphere Platform. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-600 transition">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
    <div className="text-4xl mb-6">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default App;