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
    <div 
      className="relative w-full min-h-screen pt-12 pb-24"
      style={{
        backgroundImage: 'url(/l3.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Overlay for text readability */}
      <div className="absolute inset-0 bg-[#f8f9fa] bg-opacity-90 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
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

        {/* Masonry Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 flex justify-center items-center h-48"
          >
            <img src="/logo.svg" alt="Wealthus Brand Logo" className="max-h-full max-w-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#14532d] p-8 rounded-3xl shadow-sm flex justify-center items-center h-64 md:-mt-8"
          >
            <img src="/logo2.svg" alt="Wealthus Secondary Logo" className="max-h-full max-w-full object-contain filter brightness-0 invert" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 flex justify-center items-center h-48"
          >
            <img src="https://i.postimg.cc/TY23V9Tz/l53zeorva11g37bgwkgt.jpg" alt="SDK Investments" className="max-h-full max-w-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </motion.div>
        </div>

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
                className="bg-white bg-opacity-80 p-8 rounded-[2rem] flex flex-col justify-between border border-gray-200"
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

        {/* Company Leadership & Regulatory Information */}
        <div className="mb-24 bg-white rounded-[3rem] p-8 md:p-14 shadow-sm border border-gray-200">
          
          <div className="border-b border-gray-200 pb-12 mb-12">
            <h2 className="text-3xl font-serif text-[#14532d] mb-4">{t('aboutPage.founderTitle')}</h2>
            <p className="text-lg text-[#0a0a0a] opacity-90 leading-relaxed mb-4">
              {t('aboutPage.founderDesc')}
            </p>
            <p className="text-sm font-medium text-[#14532d] bg-[#e8f3e5] inline-block px-4 py-2 rounded-full">
              {t('aboutPage.cinLabel')}: U66190PN2026PTC258102
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-serif text-[#14532d] mb-8">{t('aboutPage.boardTitle')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden border-4 border-[#e8f3e5]">
                  <img src="/g4il7rq7y9sbchocuutz.jpg" alt="Siddappa Dhondappa Karenavar" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <h3 className="text-lg font-semibold text-[#0a0a0a]">Siddappa Dhondappa Karenavar</h3>
                <p className="text-sm text-[#14532d]">{t('aboutPage.ceoRole')}</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden border-4 border-[#e8f3e5]">
                  <img src="/z5va5pok8gripz9686pu.jpg" alt="Atharv Dharyappa Karenavar" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <h3 className="text-lg font-semibold text-[#0a0a0a]">Atharv Dharyappa Karenavar</h3>
                <p className="text-sm text-[#14532d]">{t('aboutPage.directorRole')}</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 overflow-hidden border-4 border-[#e8f3e5]">
                  <img src="/adhcedlexo4theubxum3.jpg" alt="Anandkumar Parashuram Salagare" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                </div>
                <h3 className="text-lg font-semibold text-[#0a0a0a]">Anandkumar Parashuram Salagare</h3>
                <p className="text-sm text-[#14532d]">{t('aboutPage.directorRole')}</p>
              </div>

            </div>
          </div>

          <div className="bg-[#f8f9fa] p-8 rounded-3xl border border-gray-200">
            <h2 className="text-2xl font-serif text-[#14532d] mb-6">{t('aboutPage.licensesTitle')}</h2>
            <ul className="space-y-4 text-[#0a0a0a] opacity-90">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#f2a93b] mt-2"></div>
                <p><strong>{t('aboutPage.licMfTitle')}:</strong> {t('aboutPage.licMfDesc')} (ARN: 369276)</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#f2a93b] mt-2"></div>
                <p><strong>{t('aboutPage.licPmsTitle')}:</strong> {t('aboutPage.licPmsDesc')} (APRN: APRN06843)</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#f2a93b] mt-2"></div>
                <p><strong>{t('aboutPage.licAifTitle')}:</strong> {t('aboutPage.licAifDesc')}</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-[#f2a93b] mt-2"></div>
                <p><strong>{t('aboutPage.licPlanTitle')}:</strong> {t('aboutPage.licPlanDesc')}</p>
              </li>
            </ul>
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
    </div>
  );
}