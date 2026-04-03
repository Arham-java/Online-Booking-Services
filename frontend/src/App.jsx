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
import CategoryEvents from './pages/CategoryEvents';
import { STYLES } from './constants';
import { logoutCall } from './services/api';

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
  category: CategoryEvents,
};

function App() {
  const [view, setView] = useState('home');
  const [viewData, setViewData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleNavigate = (newView, data = null) => {
    setView(newView);
    setViewData(data);
  };

  const handleLogout = async () => {
    try {
      await logoutCall();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setIsLoggedIn(false);
    setUserData(null);
    setView('home');
  };

  const handleLogin = (data) => {
    // data can be role string or full user object
    const role = typeof data === 'string' ? data : data.role;
    setUserData(typeof data === 'object' ? data : { name: role, email: 'student@college.edu', role });
    setIsLoggedIn(true);
    handleNavigate('dashboard');
  };

  const handleSignup = (data) => {
    const role = typeof data === 'string' ? data : data.role;
    setUserData(typeof data === 'object' ? data : { name: role, email: 'student@college.edu', role });
    setIsLoggedIn(true);
    handleNavigate('dashboard');
  };

  const CurrentComponent = VIEW_COMPONENTS[view];

  // If user is logged in, show dashboard or other pages
  if (isLoggedIn) {
    return (
      <div className={STYLES.darkBg}>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} onNavigate={handleNavigate} />
        <main>
          {view === 'dashboard' ? (
            <Dashboard onNavigate={handleNavigate} userRole={userData?.role} userData={userData} />
          ) : (
            CurrentComponent && <CurrentComponent onNavigate={handleNavigate} viewData={viewData} />
          )}
        </main>
        <Footer />
      </div>
    );
  }

  // If user is not logged in, show public pages or auth forms
  return (
    <div className={STYLES.darkBg}>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} onNavigate={handleNavigate} />
      <main>
        {view === 'login' && (
          <Login switchToSignup={() => handleNavigate('signup')} onLogin={handleLogin} />
        )}
        {view === 'signup' && (
          <Signup switchToLogin={() => handleNavigate('login')} onSignup={handleSignup} />
        )}
        {view !== 'login' && view !== 'signup' && CurrentComponent && (
          <CurrentComponent onNavigate={handleNavigate} viewData={viewData} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;