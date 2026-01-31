// I have not used BrowserRouter, HashRouter, or MemoryRouter. I used state-based conditional rendering instead.
// You used useState
// ROUTER  DOM :- 1. Browser Router   2. Hash Router    3. Memeory Router

import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

function App() {
  // State management
  const [view, setView] = useState('home'); // Track current page view
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  // Handle logout functionality
  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans text-white">
      {/* NAVIGATION BAR */}
      <nav className="flex items-center justify-between px-8 py-5 bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-50">
        {/* Logo */}
        <div 
          className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer tracking-tighter uppercase"
          onClick={() => setView('home')}
        >
          Event<span className="from-blue-400 to-purple-500 bg-gradient-to-r bg-clip-text">Sphere</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 font-medium text-slate-300">
          {['Home', 'Explore', 'About Us', 'Contact Us'].map((item) => (
            <button key={item} onClick={() => setView(item === 'About Us' ? 'about' : item === 'Contact Us' ? 'contactus' : item.toLowerCase())} className="hover:text-cyan-400 transition duration-300">
              {item}
            </button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="space-x-4">
          {!isLoggedIn ? (
            <>
              <button onClick={() => setView('login')} className="text-cyan-400 font-semibold px-4 py-2 hover:bg-cyan-400/10 rounded-lg transition duration-300">Login</button>
              <button onClick={() => setView('signup')} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">Sign Up</button>
            </>
          ) : (
            <button onClick={handleLogout} className="border border-red-500/50 text-red-400 px-5 py-2 rounded-lg font-semibold hover:bg-red-500/10 transition duration-300">Logout</button>
          )}
        </div>
      </nav>

      <main>
        {/* HOME PAGE */}
        {view === 'home' && (
          <div>
            {/* Hero Section */}
            <header className="bg-gradient-to-b from-cyan-600/20 via-transparent to-transparent text-white py-28 px-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="relative z-10">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Unforgettable Experiences <br /> Start Here
                </h1>
                <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-slate-300 leading-relaxed">
                  Book tickets for the most exclusive concerts, workshops, and entertainment events around the globe.
                </p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setView('signup')} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 transition transform duration-300">Get Started</button>
                  <button onClick={() => setView('events')} className="border-2 border-cyan-400 text-cyan-400 px-10 py-4 rounded-full font-bold text-lg hover:bg-cyan-400/10 transition duration-300">Browse Events</button>
                </div>
              </div>
            </header>

            {/* Feature Cards */}
            <section className="py-24 px-8 max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Why Choose EventSphere?</h2>
              <div className="grid md:grid-cols-3 gap-10">
                <FeatureCard title="Instant Access" image="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop" desc="Receive your digital tickets immediately after booking via email." />
                <FeatureCard title="Secure Payments" image="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=400&h=250&fit=crop" desc="Your transactions are protected with military-grade encryption." />
                <FeatureCard title="Global Reach" image="https://images.unsplash.com/photo-1524874694410-92386f1c4ab9?w=400&h=250&fit=crop" desc="From local workshops to international festivals, we have it all." />
              </div>
            </section>
          </div>
        )}

        {/* EXPLORE PAGE */}
        {view === 'explore' && (
          <div className="py-20 px-8 max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Explore Events</h1>
            <p className="text-center text-slate-400 text-lg mb-16 max-w-3xl mx-auto">
              Discover thousands of amazing events happening around the world.
            </p>
            
            {/* Search Section */}
            <div className="mb-16 bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20">
              <h2 className="text-2xl font-bold mb-6 text-cyan-400">Search Events</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <input type="text" placeholder="Search by event name..." className="px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-500 transition" />
                <select className="px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-white transition">
                  <option className="bg-slate-900">All Categories</option>
                  <option className="bg-slate-900">Concerts</option>
                  <option className="bg-slate-900">Sports</option>
                  <option className="bg-slate-900">Movies</option>
                  <option className="bg-slate-900">Comedy</option>
                </select>
                <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">Search</button>
              </div>
            </div>

            {/* Categories Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Browse by Category</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                <EventCategoryCard category="Concerts" image="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop" description="Live music performances" />
                <EventCategoryCard category="Sports" image="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop" description="Sports events" />
                <EventCategoryCard category="Movies" image="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=300&fit=crop" description="Movie screenings" />
                <EventCategoryCard category="Comedy" image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop" description="Stand-up shows" />
                <EventCategoryCard category="Workshops" image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=300&fit=crop" description="Educational events" />
              </div>
            </section>
            
            {/* Featured Events Section */}
            <section>
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Featured Events</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <EventCard title="Summer Music Festival" image="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop" date="July 15, 2026" location="Central Park, NY" />
                <EventCard title="Tech Conference 2026" image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" date="August 20, 2026" location="San Francisco, CA" />
                <EventCard title="Art Exhibition" image="https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=300&fit=crop" date="September 5, 2026" location="Los Angeles, CA" />
                <EventCard title="International Film Festival" image="https://images.unsplash.com/photo-1489599849228-ed4dc14caf23?w=400&h=300&fit=crop" date="October 10, 2026" location="Toronto, Canada" />
                <EventCard title="Marathon Championship" image="https://images.unsplash.com/photo-1552674612-5f6015be9edf?w=400&h=300&fit=crop" date="November 3, 2026" location="Boston, MA" />
                <EventCard title="Winter Music Fest" image="https://images.unsplash.com/photo-1514989940723-e8d76fb8727b?w=400&h=300&fit=crop" date="December 20, 2026" location="Miami, FL" />
              </div>
            </section>
          </div>
        )}

        {/* EVENTS PAGE */}
        {view === 'events' && (
          <div className="py-20 px-8 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Browse Events</h1>
            <p className="text-center text-slate-400 mb-16">Discover and book tickets for amazing events around the world.</p>
            
            {/* Recommended Events */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-center mb-8 text-cyan-400">Recommended Events</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <EventCategoryCard category="Movies" image="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=300&fit=crop" description="Book movie tickets" />
                <EventCategoryCard category="Stand-ups" image="https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&h=300&fit=crop" description="Comedy shows" />
                <EventCategoryCard category="Concerts" image="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop" description="Live music events" />
                <EventCategoryCard category="Sports" image="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop" description="Sports matches" />
              </div>
            </section>
            
            {/* All Events */}
            <h2 className="text-2xl font-bold text-center mb-8 text-cyan-400">All Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <EventCard title="Summer Music Festival" image="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop" date="July 15, 2026" location="Central Park, NY" />
              <EventCard title="Tech Conference 2026" image="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop" date="August 20, 2026" location="San Francisco, CA" />
              <EventCard title="Art Exhibition" image="https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=400&h=300&fit=crop" date="September 5, 2026" location="Los Angeles, CA" />
            </div>
          </div>
        )}

        {/* LOGIN & SIGNUP PAGES */}
        {view === 'login' && <Login switchToSignup={() => setView('signup')} />}
        {view === 'signup' && <Signup switchToLogin={() => setView('login')} />}

        {/* ABOUT PAGE */}
        {(view === 'about' || view === 'aboutus') && (
          <div className="py-20 px-8 max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">About EventSphere</h1>
            <p className="text-center text-slate-400 text-lg mb-16 max-w-3xl mx-auto">
              Learn more about our journey, our vision, and what makes us the leading event booking platform.
            </p>
            
            {/* Story and Values */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20">
                <h2 className="text-2xl font-bold mb-6 text-cyan-400">Our Story</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Founded in 2020, EventSphere was born from a simple idea: everyone deserves access to extraordinary experiences. We started as a small team passionate about live events and quickly grew into a global platform.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Today, we connect event organizers with attendees across 150+ countries, making it easier than ever to discover and book unforgettable moments.
                </p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20">
                <h2 className="text-2xl font-bold mb-6 text-cyan-400">Our Values</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div>
                      <h3 className="font-bold text-white">Excellence</h3>
                      <p className="text-slate-400 text-sm">We strive for excellence in every interaction</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div>
                      <h3 className="font-bold text-white">Community</h3>
                      <p className="text-slate-400 text-sm">We believe in building strong communities</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div>
                      <h3 className="font-bold text-white">Trust</h3>
                      <p className="text-slate-400 text-sm">Your trust is our most valuable asset</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 text-white p-12 rounded-2xl text-center backdrop-blur-sm">
              <h2 className="text-3xl font-bold mb-4">Join Millions of Event Lovers</h2>
              <p className="mb-8 text-lg text-slate-300">Start exploring amazing events today and create unforgettable memories.</p>
              <button onClick={() => setView('explore')} className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">
                Explore Events Now
              </button>
            </div>
          </div>
        )}

        {/* CONTACT US PAGE */}
        {view === 'contactus' && (
          <div className="py-20 px-8 max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Contact Us</h1>
            <p className="text-center text-slate-400 text-lg mb-16 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you.
            </p>

            {/* Contact Information Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <ContactCard title="Email" details="himeshjaiswal12@gmail.com helloarham596@gmail.com" subtext="We respond within 24 hours" />
              <ContactCard title="Phone" details="+91 9608456717 +91 9552012347" subtext="Monday - Friday, 9AM - 6PM EST" />
              <ContactCard title="Address" details="Bhubaneswar" subtext="Odisha, India" />
            </div>

            {/* Contact Form */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-12 rounded-2xl border border-cyan-500/20 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-cyan-400">Send us a Message</h2>
              <form className="space-y-6">
                <FormInput label="Full Name" placeholder="Your Name" type="text" />
                <FormInput label="Email Address" placeholder="mail@gmail.com" type="email" />
                <FormInput label="Subject" placeholder="How can we help?" type="text" />
                <div>
                  <label className="block text-sm font-semibold text-cyan-400 mb-2">Message</label>
                  <textarea placeholder="Your message..." rows="5" className="w-full px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-500 transition"></textarea>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900/80 border-t border-cyan-500/20 py-12 px-8 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-400">
          <div className="font-bold text-lg mb-4 md:mb-0 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">EventSphere</div>
          <p className="text-sm">© 2026 EventSphere Platform. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-cyan-400 transition duration-300">Terms</a>
            <a href="#" className="hover:text-cyan-400 transition duration-300">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============= REUSABLE COMPONENTS =============

// Feature card component for homepage
const FeatureCard = ({ icon, title, image, desc }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 transition duration-300 group flex flex-col">
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover img-hover-zoom" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 leading-relaxed flex-1">{desc}</p>
    </div>
  </div>
);

// Event card component displaying event details
const EventCard = ({ title, image, date, location }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 transition duration-300 flex flex-col">
    <div className="relative h-48 overflow-hidden group">
      <img src={image} alt={title} className="w-full h-full object-cover img-hover-zoom" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-400 mb-2 flex items-center gap-2">
        <span className="text-cyan-400">📅</span> {date}
      </p>
      <p className="text-slate-400 mb-4 flex items-center gap-2">
        <span className="text-cyan-400">📍</span> {location}
      </p>
      <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300 mt-auto">
        Book Now
      </button>
    </div>
  </div>
);

// Event category card for browsing by type
const EventCategoryCard = ({ category, icon, image, description }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 overflow-hidden hover:shadow-lg hover:shadow-cyan-500/10 transition duration-300 text-center group flex flex-col">
    <div className="relative h-32 overflow-hidden">
      <img src={image} alt={category} className="w-full h-full object-cover img-hover-zoom" />
      <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
        <div className="text-4xl group-hover:scale-110 transition duration-300">{icon}</div>
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-lg font-bold mb-2 text-white">{category}</h3>
      <p className="text-slate-400 mb-4 flex-1">{description}</p>
      <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition duration-300">
        Explore
      </button>
    </div>
  </div>
);

// Contact information card for contact page
const ContactCard = ({ icon, title, details, subtext }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 text-center transition duration-300">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-cyan-400">{title}</h3>
    <p className="text-white mb-2">{details}</p>
    <p className="text-slate-400 text-sm">{subtext}</p>
  </div>
);

// Reusable form input component
const FormInput = ({ label, placeholder, type }) => (
  <div>
    <label className="block text-sm font-semibold text-cyan-400 mb-2">{label}</label>
    <input type={type} placeholder={placeholder} className="w-full px-4 py-3 bg-slate-900 border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 text-white placeholder-slate-500 transition" />
  </div>
);

export default App; 