import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Chart from '../components/ui/Chart';
import { calculateSIP, calculateGoalGap } from '../utils/calculations';
import { formatRupees } from '../utils/formatters';

export default function Calculators() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('sip');

  const [sipAmount, setSipAmount] = useState(5000);
  const [sipYears, setSipYears] = useState(10);
  const [sipRate, setSipRate] = useState(12);

  const [goalTarget, setGoalTarget] = useState(1000000);
  const [goalYears, setGoalYears] = useState(10);
  const [goalRate, setGoalRate] = useState(12);

  const sipResult = calculateSIP(Number(sipAmount) || 0, Number(sipYears) || 0, Number(sipRate) || 0);
  const goalResult = calculateGoalGap(Number(goalTarget) || 0, Number(goalYears) || 0, Number(goalRate) || 0);

  const sipChartData = [
    { name: 'Invested', value: sipResult.totalMoneyPutIn },
    { name: 'Extra', value: sipResult.extraMoneyEarned }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-serif text-[#14532d] leading-tight mb-8">
          {t('nav.calculators')}
        </h1>
      </motion.div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('sip')}
          className={`px-8 py-3 rounded-full font-medium transition-colors border ${activeTab === 'sip' ? 'bg-[#14532d] text-white border-[#14532d]' : 'bg-transparent text-[#14532d] border-[#14532d]'}`}
        >
          {t('calculators.sipTitle')}
        </button>
        <button 
          onClick={() => setActiveTab('goal')}
          className={`px-8 py-3 rounded-full font-medium transition-colors border ${activeTab === 'goal' ? 'bg-[#14532d] text-white border-[#14532d]' : 'bg-transparent text-[#14532d] border-[#14532d]'}`}
        >
          {t('calculators.goalTitle')}
        </button>
      </div>

      <div className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-[2rem] p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Form Inputs Column */}
        <div className="flex flex-col gap-6 fade-in">
          {activeTab === 'sip' ? (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.monthlyLabel')}</label>
                <input 
                  type="number" 
                  value={sipAmount}
                  onChange={(e) => setSipAmount(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.yearsLabel')}</label>
                <input 
                  type="number" 
                  value={sipYears}
                  onChange={(e) => setSipYears(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.returnLabel')}</label>
                <input 
                  type="number" 
                  value={sipRate}
                  onChange={(e) => setSipRate(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.targetLabel')}</label>
                <input 
                  type="number" 
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.yearsLabel')}</label>
                <input 
                  type="number" 
                  value={goalYears}
                  onChange={(e) => setGoalYears(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.returnLabel')}</label>
                <input 
                  type="number" 
                  value={goalRate}
                  onChange={(e) => setGoalRate(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium"
                />
              </div>
            </>
          )}
        </div>

        {/* Real-Time Results Column */}
        <div className="bg-[#e8f3e5] p-8 rounded-[1.5rem] flex flex-col justify-center items-center fade-in">
          {activeTab === 'sip' ? (
            <>
              <div className="text-center w-full mb-8">
                <p className="text-[#0a0a0a] mb-2">{t('calculators.finalValue')}</p>
                <p className="text-4xl md:text-5xl font-serif text-[#14532d]">
                  {formatRupees(sipResult.expectedFinalMoney)}
                </p>
              </div>
              <div className="flex justify-between w-full text-sm font-medium text-[#0a0a0a] border-t border-gray-300 pt-6">
                <div className="flex flex-col gap-1">
                  <span className="opacity-80">{t('calculators.totalInvested')}</span>
                  <span className="text-lg">{formatRupees(sipResult.totalMoneyPutIn)}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="opacity-80">{t('calculators.totalProfit')}</span>
                  <span className="text-lg text-[#f2a93b]">{formatRupees(sipResult.extraMoneyEarned)}</span>
                </div>
              </div>
              <Chart data={sipChartData} />
            </>
          ) : (
            <>
              <div className="text-center w-full mb-8">
                <p className="text-[#0a0a0a] mb-2">{t('calculators.monthlyNeeded')}</p>
                <p className="text-4xl md:text-5xl font-serif text-[#14532d]">
                  {formatRupees(goalResult.requiredMonthlySavings)}
                </p>
              </div>
              <div className="text-center w-full text-sm font-medium text-[#0a0a0a] border-t border-gray-300 pt-6">
                <span className="opacity-80 block mb-1">{t('calculators.targetLabel')}</span>
                <span className="text-xl">{formatRupees(goalResult.targetMoneyNeeded)}</span>
              </div>
            </>
          )}
        </div>
        
      </div>
      <p className="text-xs text-[#0a0a0a] opacity-60 mt-6 text-center">
        {t('calculators.disclaimer')}
      </p>
    </div>
  );
}