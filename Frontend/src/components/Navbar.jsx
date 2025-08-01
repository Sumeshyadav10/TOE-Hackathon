import React, { useState, useEffect } from 'react';
import GoogleTranslate from '../services/GoogleTranslate';
import { useTheme } from '../context/ThemeContext';
// --- Navbar Component ---

const Navbar = ({ onNavigate, onOpenSignUpModal, onOpenLoginModal }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state on mount and on storage change
  useEffect(() => {
    const checkAuth = () => {
      // You can replace this with a more robust check (e.g., check cookie or JWT)
      setIsLoggedIn(!!localStorage.getItem('isLoggedIn'));
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    // Remove login state (replace with real logout logic as needed)
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    // Optionally, call backend logout API here
    if (onNavigate) onNavigate('home');
  };

  // Inline SVG Icons
  const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
  const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </svg>
  );
  const UserPlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
    </svg>
  );
  const LogInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/>
    </svg>
  );

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md transition-colors duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" onClick={() => handleNavLinkClick('home')} className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          <span className="text-indigo-600 dark:text-indigo-400">Pro</span>duct
        </a>

        <div className="hidden md:flex space-x-8 items-center">
          <button onClick={() => handleNavLinkClick('home')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium">
            <HomeIcon /> Home
          </button>
          <button onClick={() => handleNavLinkClick('about')} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium">
            <InfoIcon /> About Us
          </button>
          {!isLoggedIn && (
            <button onClick={onOpenSignUpModal} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium">
              <UserPlusIcon /> Sign Up
            </button>
          )}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 font-medium">
              <LogInIcon /> Logout
            </button>
          ) : (
            <button onClick={onOpenLoginModal} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 font-medium">
              <LogInIcon /> Login
            </button>
          )}
          <div className="ml-2 flex items-center">
            <GoogleTranslate />
          </div>

        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h1M3 12H2m15.325-4.575l-.707-.707M6.343 17.657l-.707.707M17.657 6.343l.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        {/* Mobile Google Translate */}
        <div className="px-4 mt-2">
          <GoogleTranslate />
        </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 pb-4 border-t border-gray-200 dark:border-gray-700">
          <button onClick={() => handleNavLinkClick('home')} className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center">
            <HomeIcon /> Home
          </button>
          <button onClick={() => handleNavLinkClick('about')} className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center">
            <InfoIcon /> About Us
          </button>
          {!isLoggedIn && (
            <button onClick={() => { onOpenSignUpModal(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center">
              <UserPlusIcon /> Sign Up
            </button>
          )}
          {isLoggedIn ? (
            <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-700 transition-colors duration-200 flex items-center">
              <LogInIcon /> Logout
            </button>
          ) : (
            <button onClick={() => { onOpenLoginModal(); setIsMobileMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center">
              <LogInIcon /> Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;