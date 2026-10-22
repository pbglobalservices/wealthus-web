import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Learn() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('roadmap');

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
          {t('learnPage.subtitle')}
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-[#14532d] leading-tight mb-8">
          {t('learnPage.title')}
        </h1>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-4 mb-12 border-b border-gray-300 pb-4">
        <button 
          onClick={() => setActiveTab('roadmap')}
          className={`px-6 py-2 rounded-full font-medium transition-colors border ${activeTab === 'roadmap' ? 'bg-[#14532d] text-white border-[#14532d]' : 'bg-transparent text-[#14532d] border-[#14532d]'}`}
        >
          {t('learnPage.tabRoadmap')}
        </button>
        <button 
          onClick={() => setActiveTab('glossary')}
          className={`px-6 py-2 rounded-full font-medium transition-colors border ${activeTab === 'glossary' ? 'bg-[#14532d] text-white border-[#14532d]' : 'bg-transparent text-[#14532d] border-[#14532d]'}`}
        >
          {t('learnPage.tabGlossary')}
        </button>
        <button 
          onClick={() => setActiveTab('risk')}
          className={`px-6 py-2 rounded-full font-medium transition-colors border ${activeTab === 'risk' ? 'bg-[#14532d] text-white border-[#14532d]' : 'bg-transparent text-[#14532d] border-[#14532d]'}`}
        >
          {t('learnPage.tabRisk')}
        </button>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'roadmap' && (
          <motion.div 
            key="roadmap"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-[#e8f3e5] p-8 rounded-[2rem] border border-[#d1e6cc]">
              <span className="text-[#14532d] font-bold text-xl mb-4 block">01</span>
              <h2 className="text-2xl font-sans font-medium text-[#0a0a0a] mb-4">{t('learnPage.roadmapStep1Title')}</h2>
              <p className="text-[#0a0a0a] opacity-80 leading-relaxed">{t('learnPage.roadmapStep1Desc')}</p>
            </div>
            <div className="bg-[#e8f3e5] p-8 rounded-[2rem] border border-[#d1e6cc]">
              <span className="text-[#14532d] font-bold text-xl mb-4 block">02</span>
              <h2 className="text-2xl font-sans font-medium text-[#0a0a0a] mb-4">{t('learnPage.roadmapStep2Title')}</h2>
              <p className="text-[#0a0a0a] opacity-80 leading-relaxed">{t('learnPage.roadmapStep2Desc')}</p>
            </div>
            <div className="bg-[#e8f3e5] p-8 rounded-[2rem] border border-[#d1e6cc]">
              <span className="text-[#14532d] font-bold text-xl mb-4 block">03</span>
              <h2 className="text-2xl font-sans font-medium text-[#0a0a0a] mb-4">{t('learnPage.roadmapStep3Title')}</h2>
              <p className="text-[#0a0a0a] opacity-80 leading-relaxed">{t('learnPage.roadmapStep3Desc')}</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'glossary' && (
          <motion.div 
            key="glossary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-white p-8 rounded-[2rem] border border-gray-300">
              <h3 className="text-2xl font-semibold text-[#14532d] mb-2">{t('learnPage.termMutualFund')}</h3>
              <p className="text-[#0a0a0a] opacity-90">{t('learnPage.descMutualFund')}</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-gray-300">
              <h3 className="text-2xl font-semibold text-[#14532d] mb-2">{t('learnPage.termSIP')}</h3>
              <p className="text-[#0a0a0a] opacity-90">{t('learnPage.descSIP')}</p>
            </div>
            <div className="bg-white p-8 rounded-[2rem] border border-gray-300">
              <h3 className="text-2xl font-semibold text-[#14532d] mb-2">{t('learnPage.termInflation')}</h3>
              <p className="text-[#0a0a0a] opacity-90">{t('learnPage.descInflation')}</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'risk' && (
          <motion.div 
            key="risk"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-[#f8f9fa] p-8 rounded-[2rem] border border-gray-300">
              <h3 className="text-2xl font-semibold text-[#14532d] mb-4">{t('learnPage.riskMarketTitle')}</h3>
              <p className="text-[#0a0a0a] opacity-90 leading-relaxed">{t('learnPage.riskMarketDesc')}</p>
            </div>
            <div className="bg-[#f8f9fa] p-8 rounded-[2rem] border border-gray-300">
              <h3 className="text-2xl font-semibold text-[#14532d] mb-4">{t('learnPage.riskInflationTitle')}</h3>
              <p className="text-[#0a0a0a] opacity-90 leading-relaxed">{t('learnPage.riskInflationDesc')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}