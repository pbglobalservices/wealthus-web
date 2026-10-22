import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Safety() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('scams');
  
  // Real functional state to track checklist progress
  const [scamChecks, setScamChecks] = useState([false, false, false]);
  const [advisorChecks, setAdvisorChecks] = useState([false, false, false]);

  const toggleScamCheck = (index) => {
    const newChecks = [...scamChecks];
    newChecks[index] = !newChecks[index];
    setScamChecks(newChecks);
  };

  const toggleAdvisorCheck = (index) => {
    const newChecks = [...advisorChecks];
    newChecks[index] = !newChecks[index];
    setAdvisorChecks(newChecks);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-24 min-h-screen">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 max-w-4xl"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-[#14532d] mb-4">
          {t('safetyPage.subtitle')}
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-[#14532d] leading-tight mb-8">
          {t('safetyPage.title')}
        </h1>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-300 pb-4">
        <button 
          onClick={() => setActiveTab('scams')}
          className={`px-6 py-2 rounded-full font-medium transition-colors border ${activeTab === 'scams' ? 'bg-[#14532d] text-white border-[#14532d]' : 'bg-transparent text-[#14532d] border-[#14532d]'}`}
        >
          {t('safetyPage.tabScams')}
        </button>
        <button 
          onClick={() => setActiveTab('advisors')}
          className={`px-6 py-2 rounded-full font-medium transition-colors border ${activeTab === 'advisors' ? 'bg-[#14532d] text-white border-[#14532d]' : 'bg-transparent text-[#14532d] border-[#14532d]'}`}
        >
          {t('safetyPage.tabAdvisors')}
        </button>
        <button 
          onClick={() => setActiveTab('risks')}
          className={`px-6 py-2 rounded-full font-medium transition-colors border ${activeTab === 'risks' ? 'bg-[#14532d] text-white border-[#14532d]' : 'bg-transparent text-[#14532d] border-[#14532d]'}`}
        >
          {t('safetyPage.tabRisks')}
        </button>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'scams' && (
          <motion.div 
            key="scams"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#f8f9fa] border border-[#e5e7eb] p-8 md:p-12 rounded-[2rem] max-w-4xl"
          >
            <h2 className="text-2xl font-sans font-medium text-[#14532d] mb-6">{t('safetyPage.scamHeader')}</h2>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((num, index) => (
                <label key={index} className="flex items-start gap-4 cursor-pointer p-4 bg-white rounded-xl border border-gray-200 hover:border-[#14532d] transition-colors">
                  <input 
                    type="checkbox" 
                    checked={scamChecks[index]} 
                    onChange={() => toggleScamCheck(index)}
                    className="mt-1 w-5 h-5 accent-[#14532d]"
                  />
                  <span className={`text-lg ${scamChecks[index] ? 'text-gray-500 line-through' : 'text-[#0a0a0a]'}`}>
                    {t(`safetyPage.scamCheck${num}`)}
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#0a0a0a] opacity-80">{t('safetyPage.checklistNote')}</p>
          </motion.div>
        )}

        {activeTab === 'advisors' && (
          <motion.div 
            key="advisors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#e8f3e5] border border-[#d1e6cc] p-8 md:p-12 rounded-[2rem] max-w-4xl"
          >
            <h2 className="text-2xl font-sans font-medium text-[#14532d] mb-6">{t('safetyPage.advisorHeader')}</h2>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((num, index) => (
                <label key={index} className="flex items-start gap-4 cursor-pointer p-4 bg-white rounded-xl border border-[#d1e6cc] hover:border-[#14532d] transition-colors">
                  <input 
                    type="checkbox" 
                    checked={advisorChecks[index]} 
                    onChange={() => toggleAdvisorCheck(index)}
                    className="mt-1 w-5 h-5 accent-[#14532d]"
                  />
                  <span className={`text-lg font-medium ${advisorChecks[index] ? 'text-[#14532d]' : 'text-[#0a0a0a]'}`}>
                    {t(`safetyPage.advisorCheck${num}`)}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'risks' && (
          <motion.div 
            key="risks"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-white p-8 rounded-[2rem] border border-gray-300">
              <h3 className="text-2xl font-semibold text-[#14532d] mb-4">{t('safetyPage.risk1Title')}</h3>
              <p className="text-[#0a0a0a] opacity-90 leading-relaxed">{t('safetyPage.risk1Desc')}</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-gray-300">
              <h3 className="text-2xl font-semibold text-[#14532d] mb-4">{t('safetyPage.risk2Title')}</h3>
              <p className="text-[#0a0a0a] opacity-90 leading-relaxed">{t('safetyPage.risk2Desc')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}