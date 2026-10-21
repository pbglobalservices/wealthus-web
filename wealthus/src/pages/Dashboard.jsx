import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { formatRupees } from '../utils/formatters';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        // Fetch Real Goals Data
        const goalsQuery = query(collection(db, 'goals'), where('userId', '==', currentUser.uid));
        const goalsSnapshot = await getDocs(goalsQuery);
        const goalsList = goalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Fetch Real Consultation History Data
        const consultationsQuery = query(collection(db, 'consultations'), where('userId', '==', currentUser.uid));
        const consultationsSnapshot = await getDocs(consultationsQuery);
        const consultationsList = consultationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setGoals(goalsList);
        setConsultations(consultationsList);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-xl font-medium text-[#14532d]">Loading account details...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-24">
      {/* Dashboard Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 border-b border-gray-300 pb-8"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#14532d] mb-2">
            {t('dashboardPage.title')}
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#14532d] leading-tight">
            {t('dashboardPage.welcome')}, {currentUser?.email?.split('@')[0]}
          </h1>
        </div>
        <button 
          onClick={handleLogout}
          className="border border-[#14532d] text-[#14532d] px-6 py-2 rounded-full hover:bg-[#14532d] hover:text-white transition-colors font-medium"
        >
          {t('dashboardPage.logoutBtn')}
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Saved Goals Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-8 flex flex-col gap-6"
        >
          <h2 className="text-3xl font-serif text-[#0a0a0a]">{t('dashboardPage.goalsTitle')}</h2>
          
          {goals.length === 0 ? (
            <div className="bg-[#f8f9fa] border border-[#e5e7eb] p-10 rounded-[2rem]">
              <p className="text-[#0a0a0a] opacity-80">{t('dashboardPage.noGoals')}</p>
            </div>
          ) : (
            goals.map((goal) => {
              const progressPercentage = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
              return (
                <div key={goal.id} className="bg-[#e8f3e5] p-8 rounded-[2rem]">
                  <h3 className="text-xl font-medium text-[#0a0a0a] mb-4">{goal.goalName}</h3>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-[#14532d]">{t('dashboardPage.savedLabel')}: {formatRupees(goal.currentAmount)}</span>
                    <span className="text-[#0a0a0a] opacity-80">{t('dashboardPage.neededLabel')}: {formatRupees(goal.targetAmount)}</span>
                  </div>
                  {/* Real Functional Progress Bar */}
                  <div className="w-full bg-white rounded-full h-3">
                    <div 
                      className="bg-[#14532d] h-3 rounded-full transition-all duration-1000" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })
          )}
        </motion.div>

        {/* Consultation History Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-4 flex flex-col gap-6"
        >
          <h2 className="text-3xl font-serif text-[#0a0a0a]">{t('dashboardPage.consultationsTitle')}</h2>
          
          {consultations.length === 0 ? (
            <div className="bg-[#f8f9fa] border border-[#e5e7eb] p-10 rounded-[2rem]">
              <p className="text-[#0a0a0a] opacity-80">{t('dashboardPage.noConsultations')}</p>
            </div>
          ) : (
            consultations.map((meeting) => (
              <div key={meeting.id} className="bg-white border border-[#e5e7eb] p-6 rounded-[2rem]">
                <p className="text-sm font-semibold text-[#14532d] uppercase tracking-wide mb-2">{meeting.status}</p>
                <p className="text-[#0a0a0a] font-medium mb-1">{meeting.date}</p>
                <p className="text-sm text-[#0a0a0a] opacity-80">{meeting.notes}</p>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}