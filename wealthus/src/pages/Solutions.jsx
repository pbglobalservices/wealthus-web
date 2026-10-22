import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Solutions() {
  const { t } = useLanguage();

  const services = [
    { 
      title: 'solutionsPage.mfTitle', 
      desc: 'solutionsPage.mfDesc',
      includes: 'solutionsPage.mfIncludes',
      excludes: 'solutionsPage.mfExcludes',
      who: 'solutionsPage.mfWho',
      timeline: 'solutionsPage.mfTimeline'
    },
    { 
      title: 'solutionsPage.sipTitle', 
      desc: 'solutionsPage.sipDesc',
      includes: 'solutionsPage.sipIncludes',
      excludes: 'solutionsPage.sipExcludes',
      who: 'solutionsPage.sipWho',
      timeline: 'solutionsPage.sipTimeline'
    },
    { 
      title: 'solutionsPage.aifTitle', 
      desc: 'solutionsPage.aifDesc',
      includes: 'solutionsPage.aifIncludes',
      excludes: 'solutionsPage.aifExcludes',
      who: 'solutionsPage.aifWho',
      timeline: 'solutionsPage.aifTimeline'
    },
    { 
      title: 'solutionsPage.pmsTitle', 
      desc: 'solutionsPage.pmsDesc',
      includes: 'solutionsPage.pmsIncludes',
      excludes: 'solutionsPage.pmsExcludes',
      who: 'solutionsPage.pmsWho',
      timeline: 'solutionsPage.pmsTimeline'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-24">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 max-w-4xl"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-[#14532d] mb-4">
          {t('solutionsPage.subtitle')}
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-[#14532d] leading-tight mb-8">
          {t('solutionsPage.heading')}
        </h1>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
        {services.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#e8f3e5] p-8 md:p-10 rounded-[2rem] flex flex-col justify-between h-full border border-[#d1e6cc]"
          >
            <div>
              <h2 className="text-3xl font-sans font-medium text-[#0a0a0a] mb-4">
                {t(item.title)}
              </h2>
              <p className="text-lg text-[#0a0a0a] opacity-80 leading-relaxed mb-6 pb-6 border-b border-[#d1e6cc]">
                {t(item.desc)}
              </p>
              
              <div className="flex flex-col gap-4 text-sm">
                <div>
                  <span className="font-semibold text-[#14532d] block mb-1">{t('solutionsPage.whoLabel')}:</span>
                  <span className="text-[#0a0a0a] opacity-90">{t(item.who)}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#14532d] block mb-1">{t('solutionsPage.includesLabel')}:</span>
                  <span className="text-[#0a0a0a] opacity-90">{t(item.includes)}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#14532d] block mb-1">{t('solutionsPage.excludesLabel')}:</span>
                  <span className="text-[#0a0a0a] opacity-90">{t(item.excludes)}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#14532d] block mb-1">{t('solutionsPage.timelineLabel')}:</span>
                  <span className="text-[#0a0a0a] opacity-90">{t(item.timeline)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#f2a93b] text-[#0a0a0a] p-10 md:p-14 rounded-[3rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            {t('solutionsPage.ctaContact')}
          </h2>
        </div>
        <Link to="/contact">
          <button className="bg-[#0a0a0a] text-white px-8 py-3 rounded-full hover:bg-[#14532d] transition-colors font-medium whitespace-nowrap">
            {t('nav.contact')}
          </button>
        </Link>
      </motion.div>
    </div>
  );
}