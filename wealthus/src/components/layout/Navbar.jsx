import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, currentLanguage, changeLanguage, supportedLanguages } = useLanguage();
  const { currentUser } = useAuth();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full bg-[#f8f9fa] sticky top-0 z-40">
        
        {/* Left Side: Brand Logo & Desktop Links */}
        <div className="flex items-center gap-8">
          
          {/* Brand Logo: Left on mobile, Centered on desktop */}
          <div className="flex flex-col items-start md:items-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <Link to="/" onClick={closeMenu}>
              <img 
                src="https://i.postimg.cc/VNG3TFwH/wp-removebg-preview.png" 
                alt="Wealthus" 
                className="h-10 md:h-12 w-auto object-contain"
                onError={(e) => {
                  // Graceful fallback to logo.svg if named differently
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/logo.svg";
                }}
              />
            </Link>
          </div>

          {/* Desktop Links (Hidden on mobile) */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-[#0a0a0a]">
            <Link to="/solutions" className="hover:text-[#14532d] transition-colors">{t('nav.solutions')}</Link>
            <Link to="/about" className="hover:text-[#14532d] transition-colors">{t('nav.about')}</Link>
            <Link to="/insights" className="hover:text-[#14532d] transition-colors">{t('nav.insights')}</Link>
            <Link to="/contact" className="hover:text-[#14532d] transition-colors">{t('nav.contact')}</Link>
            <Link to="/calculators" className="hover:text-[#14532d] transition-colors">{t('nav.calculators')}</Link>
          </div>
        </div>

        {/* Right Side: Language & Auth */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <select 
              onChange={handleLanguageChange} 
              value={currentLanguage}
              className="bg-transparent text-sm cursor-pointer outline-none font-medium text-[#14532d] border border-[#14532d] rounded px-2 py-1"
            >
              {supportedLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>

            {currentUser ? (
              <Link to="/dashboard" className="bg-[#14532d] text-white px-4 py-2 rounded-full hover:bg-[#0f3f22] transition-colors">
                {t('nav.dashboard')}
              </Link>
            ) : (
              <Link to="/login" className="bg-transparent border border-[#14532d] text-[#14532d] px-4 py-2 rounded-full hover:bg-[#14532d] hover:text-white transition-colors">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Two-Line Hamburger Button */}
          <button 
            className="md:hidden z-50 p-1 flex items-center justify-center focus:outline-none" 
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <svg 
              className="w-8 h-8 text-[#14532d]" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#14532d] z-50 flex flex-col p-8 text-white overflow-y-auto"
          >
            <div className="flex justify-end mb-12">
              <button onClick={closeMenu} aria-label="Close menu">
                <X className="w-8 h-8 text-white font-light" />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 text-4xl font-serif">
              <Link to="/solutions" onClick={closeMenu} className="hover:text-[#f2a93b]">{t('nav.solutions')}</Link>
              <Link to="/about" onClick={closeMenu} className="hover:text-[#f2a93b]">{t('nav.about')}</Link>
              <Link to="/insights" onClick={closeMenu} className="hover:text-[#f2a93b]">{t('nav.insights')}</Link>
              <Link to="/contact" onClick={closeMenu} className="hover:text-[#f2a93b]">{t('nav.contact')}</Link>
              <Link to="/calculators" onClick={closeMenu} className="hover:text-[#f2a93b]">{t('nav.calculators')}</Link>
            </div>

            <div className="mt-12 flex flex-col gap-6 border-t border-white/20 pt-8">
              <select 
                onChange={handleLanguageChange} 
                value={currentLanguage}
                className="bg-transparent text-xl cursor-pointer outline-none font-medium text-white border border-white rounded p-2"
              >
                {supportedLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="text-black">
                    {lang.label}
                  </option>
                ))}
              </select>

              {currentUser ? (
                <Link to="/dashboard" onClick={closeMenu} className="bg-white text-[#14532d] px-6 py-3 rounded-full text-center text-xl font-medium">
                  {t('nav.dashboard')}
                </Link>
              ) : (
                <Link to="/login" onClick={closeMenu} className="border border-white text-white px-6 py-3 rounded-full text-center text-xl font-medium">
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}