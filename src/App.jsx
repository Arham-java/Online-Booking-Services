import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

function App() {
  const [view, setView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans text-white">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
        onNavigate={setView} 
      />

      <main>
        {view === 'home' && <Home onNavigate={setView} />}
        {view === 'explore' && <Explore onNavigate={setView} />}
        {view === 'events' && <Events onNavigate={setView} />}
        {view === 'about' && <About onNavigate={setView} />}
        {view === 'aboutus' && <About onNavigate={setView} />}
        {view === 'contactus' && <Contact onNavigate={setView} />}
        {view === 'dashboard' && <Dashboard onNavigate={setView} />}
        {view === 'login' && <Login switchToSignup={() => setView('signup')} />}
        {view === 'signup' && <Signup switchToLogin={() => setView('login')} />}
      </main>

      <Footer />
    </div>
  );
}

export default App;