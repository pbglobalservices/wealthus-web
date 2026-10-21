import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-24">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-[#14532d] mb-6 leading-tight">
          {t('hero.title')}
        </h1>
        <p className="text-xl text-[#0a0a0a] opacity-80 mb-8 max-w-2xl">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/contact">
            <button className="bg-[#14532d] text-white px-8 py-3 rounded-full hover:bg-[#0f3f22] transition-colors font-medium">
              {t('hero.ctaConsultation')}
            </button>
          </Link>
          <Link to="/calculators">
            <button className="border border-[#14532d] text-[#14532d] px-8 py-3 rounded-full hover:bg-[#14532d] hover:text-white transition-colors font-medium">
              {t('hero.ctaTools')}
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        
        {/* Wealth Card (Light Green) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-6 bg-[#e8f3e5] p-10 rounded-[3rem] rounded-br-none flex flex-col justify-between min-h-[400px]"
        >
          <h2 className="text-4xl font-sans font-medium mb-6 text-[#0a0a0a]">
            {t('cards.wealthTitle')}
          </h2>
          <div>
            <p className="text-lg leading-relaxed mb-8 text-[#0a0a0a] opacity-90">
              {t('cards.wealthDesc')}
            </p>
            <Link to="/calculators">
              <button className="border border-[#0a0a0a] text-[#0a0a0a] px-6 py-3 rounded-full hover:bg-[#0a0a0a] hover:text-white transition-colors">
                {t('hero.ctaTools')}
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Center Decorative Arrow Card (Gray) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-2 bg-[#e5e7eb] p-10 rounded-[3rem] flex items-center justify-center min-h-[400px]"
        >
          <svg width="40" height="120" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="transform scale-y-150">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </motion.div>

        {/* Insurance/Protection Card (Dark Green) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="col-span-1 md:col-span-4 bg-[#14532d] p-10 rounded-[3rem] rounded-tl-none text-white flex flex-col justify-between min-h-[400px]"
        >
          <h2 className="text-4xl font-sans font-medium mb-6">
            {t('cards.insuranceTitle')}
          </h2>
          <div>
            <p className="text-lg leading-relaxed mb-8 opacity-90">
              {t('cards.insuranceDesc')}
            </p>
            <Link to="/insights">
              <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-[#14532d] transition-colors">
                {t('cards.readReport')}
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Story / About Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-32 max-w-4xl"
      >
        <p className="text-sm font-semibold mb-12 uppercase tracking-widest text-[#0a0a0a]">
          {t('story.tag')}
        </p>
        <h2 className="text-4xl md:text-6xl font-serif text-[#14532d] leading-tight mb-8">
          {t('story.heading')}
        </h2>
        <p className="text-xl text-[#0a0a0a] opacity-80 leading-relaxed">
          {t('story.body')}
        </p>
      </motion.div>
    </div>
  );
}