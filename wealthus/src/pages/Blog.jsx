import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Blog() {
  const { t } = useLanguage();

  const articles = [
    {
      id: 'glossary',
      title: 'blogPage.glossaryTitle',
      desc: 'blogPage.glossaryDesc',
      category: 'Dictionary'
    },
    {
      id: 'scam-awareness',
      title: 'blogPage.scamTitle',
      desc: 'blogPage.scamDesc',
      category: 'Safety'
    },
    {
      id: 'investment-risks',
      title: 'blogPage.riskTitle',
      desc: 'blogPage.riskDesc',
      category: 'Learning'
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
          {t('blogPage.subtitle')}
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-[#14532d] leading-tight mb-8">
          {t('blogPage.heading')}
        </h1>
      </motion.div>

      {/* Guide Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.div 
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#e8f3e5] p-8 rounded-[2rem] flex flex-col justify-between h-full"
          >
            <div>
              <span className="inline-block bg-[#14532d] text-white text-xs px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
                {article.category}
              </span>
              <h2 className="text-2xl font-sans font-medium text-[#0a0a0a] mb-4">
                {t(article.title)}
              </h2>
              <p className="text-base text-[#0a0a0a] opacity-80 leading-relaxed mb-8">
                {t(article.desc)}
              </p>
            </div>
            <Link to={`/insights/${article.id}`}>
              <button className="border border-[#0a0a0a] text-[#0a0a0a] px-6 py-3 rounded-full hover:bg-[#0a0a0a] hover:text-white transition-colors text-sm font-medium w-full text-center">
                {t('blogPage.readBtn')}
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}