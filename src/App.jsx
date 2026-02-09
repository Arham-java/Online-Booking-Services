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

// Map views to their corresponding components
const VIEWS = {
  home: Home,
  explore: Explore,
  events: Events,
  about: About,
  aboutus: About, // Alias for about
  contact: Contact,
  contactus: Contact, // Alias for contact
  dashboard: Dashboard,
  login: Login,
  signup: Signup,
};

function App() {
  const [view, setView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'user' or 'organizer'

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setView('home'); // Go back to home page
  };

  // Handle successful login
  const handleLogin = (role) => {
    setUserRole(role); // Set user role
    setIsLoggedIn(true);
    setView('dashboard');
  };

  // Handle successful signup
  const handleSignup = (role) => {
    setUserRole(role); // Set organizer role
    setIsLoggedIn(true);
    setView('dashboard');
  };

  // Get the component for the current view
  const ViewComponent = VIEWS[view];

  return (
    <div className={STYLES.darkBg}>
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
        onNavigate={setView} 
      />

      <main>
        {isLoggedIn ? (
          view === 'dashboard' ? (
            <Dashboard onNavigate={setView} userRole={userRole} />
          ) : (
            ViewComponent && <ViewComponent onNavigate={setView} />
          )
        ) : (
          <>
            {/* Show login/signup forms when not logged in */}
            {view === 'login' && (
              <Login 
                switchToSignup={() => setView('signup')} 
                onLogin={handleLogin} 
              />
            )}
            {view === 'signup' && (
              <Signup 
                switchToLogin={() => setView('login')} 
                onSignup={handleSignup} 
              />
            )}
            {/* Show other public pages */}
            {view !== 'login' && view !== 'signup' && ViewComponent && (
              <ViewComponent onNavigate={setView} />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;