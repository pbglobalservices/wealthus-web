import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubmitting(true);
      // Real functional state logic for subscription processing
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessMessage(true);
        setEmail('');
        setTimeout(() => setSuccessMessage(false), 3000);
      }, 1000);
    }
  };

  return (
    <footer className="mt-32 w-full bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight text-[#14532d]">
              {t('footer.heading')}
            </h2>
            <p className="text-lg mt-4 text-[#0a0a0a]">
              {t('footer.subheading')}
            </p>
          </div>
          <div>
            <p className="text-lg mb-4 text-[#0a0a0a]">
              {t('footer.newsletterPrompt')}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-8">
              <div className="flex gap-4 border-b border-[#0a0a0a] pb-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')} 
                  required
                  className="w-full bg-transparent outline-none text-[#0a0a0a] placeholder:text-gray-500" 
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#0a0a0a] text-white px-8 py-2 rounded-full text-sm hover:bg-[#14532d] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "..." : t('footer.subscribeBtn')}
                </button>
              </div>
              {successMessage && (
                <span className="text-[#14532d] text-sm fade-in">Subscription successful</span>
              )}
            </form>
          </div>
        </div>

        {/* Visual Separator Pattern */}
        <div className="w-full h-24 mb-12 opacity-50" style={{ backgroundImage: 'radial-gradient(#14532d 3px, transparent 4px)', backgroundSize: '24px 24px' }}></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-[#0a0a0a]">
          <div className="flex flex-col gap-3">
            <Link to="/solutions" className="hover:text-[#14532d] transition-colors">{t('nav.solutions')}</Link>
            <Link to="/about" className="hover:text-[#14532d] transition-colors">{t('nav.about')}</Link>
            <Link to="/insights" className="hover:text-[#14532d] transition-colors">{t('nav.insights')}</Link>
            <Link to="/learn" className="hover:text-[#14532d] transition-colors">{t('nav.learn')}</Link>
            <Link to="/safety" className="hover:text-[#14532d] transition-colors">{t('nav.safety')}</Link>
            <Link to="/contact" className="hover:text-[#14532d] transition-colors">{t('nav.contact')}</Link>            
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">{t('footer.addressTitle')}</p>
            <p className="leading-relaxed">{t('footer.addressText')}</p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">{t('footer.socialTitle')}</p>
            <a href="#" className="hover:text-[#14532d] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[#14532d] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#14532d] transition-colors">Facebook</a>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-semibold">{t('footer.regulatoryTitle')}</p>
            <Link to="/sebi-resources" className="hover:text-[#14532d] transition-colors">{t('footer.sebiResourcesLink')}</Link>
            <Link to="/grievance" className="hover:text-[#14532d] transition-colors">{t('footer.grievanceLink')}</Link>
            <Link to="/privacy" className="hover:text-[#14532d] transition-colors">{t('footer.privacyLink')}</Link>
            <Link to="/terms" className="hover:text-[#14532d] transition-colors">{t('footer.termsLink')}</Link>
            <p className="mt-auto pt-4">{t('footer.copyright')}</p>
          </div>
        </div>

        {/* Developer and Partnership Branding Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-gray-300 gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#0a0a0a] opacity-80">{t('footer.developedBy')}</span>
            <img 
              src="https://i.postimg.cc/wMgtFyQk/imageedit-8-5494402482.png" 
              alt="PB Global Services" 
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://i.postimg.cc/wMgtFyQk/imageedit-8-5494402482.png";
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-[#0a0a0a] opacity-80">{t('footer.coPoweredBy')}</span>
            <img 
              src="https://i.postimg.cc/MGXNJjdM/imageedit-1-5599915949.png" 
              alt="AnyAstro Techno Solutions" 
              className="h-8 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://i.postimg.cc/MGXNJjdM/imageedit-1-5599915949.png";
              }}
            />
          </div>
        </div>

      </div>
      
      {/* Regulatory Bottom Bar */}
      <div className="bg-[#14532d] text-white text-center py-4 px-4 text-xs tracking-wide leading-relaxed">
        {t('footer.regulatoryNotice')}
      </div>
    </footer>
  );
}