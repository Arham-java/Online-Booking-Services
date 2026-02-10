import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Events from './pages/Events';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import { STYLES } from './constants';

// Map all view names to components
const VIEW_COMPONENTS = {
  home: Home,
  explore: Explore,
  events: Events,
  about: About,
  aboutus: About,
  contact: Contact,
  contactus: Contact,
  dashboard: Dashboard,
  login: Login,
  signup: Signup,
};

function App() {
  const [view, setView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setView('home');
  };

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setView('dashboard');
  };

  const handleSignup = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setView('dashboard');
  };

  const CurrentComponent = VIEW_COMPONENTS[view];

  // If user is logged in, show dashboard or other pages
  if (isLoggedIn) {
    return (
      <div className={STYLES.darkBg}>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} onNavigate={setView} />
        <main>
          {view === 'dashboard' ? (
            <Dashboard onNavigate={setView} userRole={userRole} />
          ) : (
            CurrentComponent && <CurrentComponent onNavigate={setView} />
          )}
        </main>
        <Footer />
      </div>
    );
  }

  // If user is not logged in, show public pages or auth forms
  return (
    <div className={STYLES.darkBg}>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} onNavigate={setView} />
      <main>
        {view === 'login' && (
          <Login switchToSignup={() => setView('signup')} onLogin={handleLogin} />
        )}
        {view === 'signup' && (
          <Signup switchToLogin={() => setView('login')} onSignup={handleSignup} />
        )}
        {view !== 'login' && view !== 'signup' && CurrentComponent && (
          <CurrentComponent onNavigate={setView} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;