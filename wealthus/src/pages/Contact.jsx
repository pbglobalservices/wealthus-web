import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // 1. Push directly to Firestore
      await addDoc(collection(db, 'contacts'), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp()
      });

      // 2. Open WhatsApp directly with the details
      const waMessage = `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
      const waUrl = `https://wa.me/919822810603?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, '_blank');

      setStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Error submitting contact form: ", error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 max-w-4xl"
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-[#14532d] mb-4">
          {t('contactPage.subtitle')}
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-[#14532d] leading-tight mb-8">
          {t('contactPage.heading')}
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-[#e8f3e5] p-10 rounded-[2rem] h-full flex flex-col gap-12">
            <div>
              <h3 className="text-2xl font-serif text-[#14532d] mb-4">{t('contactPage.addressTitle')}</h3>
              <p className="text-lg text-[#0a0a0a] leading-relaxed">
                Office No. 20, 4th Floor, Onyx Bizmark 52, Tilekar Nagar, Kondhwa Budruk, Pune, Maharashtra 411048
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-serif text-[#14532d] mb-4">{t('contactPage.phoneTitle')}</h3>
              <p className="text-lg text-[#0a0a0a] font-medium tracking-wide">
                +91 98228 10603
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-[#f8f9fa] border border-[#e5e7eb] p-10 rounded-[2rem]">
            <h2 className="text-3xl font-serif text-[#14532d] mb-8">{t('contactPage.formTitle')}</h2>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0a0a0a]">{t('contactPage.nameLabel')}</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0a0a0a]">{t('contactPage.phoneLabel')}</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0a0a0a]">{t('contactPage.emailLabel')}</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0a0a0a]">{t('contactPage.messageLabel')}</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="mt-4 bg-[#14532d] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0f3f22] transition-colors disabled:opacity-50"
              >
                {status === 'submitting' ? t('contactPage.submittingBtn') : t('contactPage.submitBtn')}
              </button>

              {status === 'success' && (
                <p className="text-[#14532d] text-sm mt-2 font-medium">{t('contactPage.successMsg')}</p>
              )}
              {status === 'error' && (
                <p className="text-red-600 text-sm mt-2 font-medium">{t('contactPage.errorMsg')}</p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}