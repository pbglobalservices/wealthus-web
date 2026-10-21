import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const audienceKeys = [
    { title: 'aboutPage.salariedTitle', desc: 'aboutPage.salariedDesc' },
    { title: 'aboutPage.businessTitle', desc: 'aboutPage.businessDesc' },
    { title: 'aboutPage.familyTitle', desc: 'aboutPage.familyDesc' },
    { title: 'aboutPage.firstTimeTitle', desc: 'aboutPage.firstTimeDesc' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-24">
      {/* Top Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 max-w-4xl"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-[#14532d] mb-4">
          {t('aboutPage.subtitle')}
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-[#14532d] leading-tight mb-8">
          {t('aboutPage.heading')}
        </h1>
        <p className="text-xl text-[#0a0a0a] opacity-85 leading-relaxed">
          {t('aboutPage.mainText')}
        </p>
      </motion.div>

      {/* Target Audiences Grid */}
      <div className="mb-24">
        <h2 className="text-3xl font-serif text-[#14532d] mb-8">
          {t('aboutPage.whoWeHelpTitle')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {audienceKeys.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#e8f3e5] p-8 rounded-[2rem] flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-sans font-medium text-[#0a0a0a] mb-4">
                  {t(item.title)}
                </h3>
                <p className="text-base text-[#0a0a0a] opacity-80 leading-relaxed">
                  {t(item.desc)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team / Guidance Philosophy Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#14532d] text-white p-10 md:p-14 rounded-[3rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            {t('aboutPage.teamHeading')}
          </h2>
          <p className="text-lg opacity-90 leading-relaxed">
            {t('aboutPage.teamBody')}
          </p>
        </div>
        <Link to="/contact">
          <button className="border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-[#14532d] transition-colors font-medium whitespace-nowrap">
            {t('aboutPage.ctaContact')}
          </button>
        </Link>
      </motion.div>
    </div>
  );
}