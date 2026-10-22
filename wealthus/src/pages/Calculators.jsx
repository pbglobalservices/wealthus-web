import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import Chart from '../components/ui/Chart';
import { 
  calculateSIP, 
  calculateGoalGap, 
  calculateCompoundInterest, 
  calculateStepUpSIP, 
  calculateInflationCost, 
  calculateDebtRepayment 
} from '../utils/calculations';
import { formatRupees } from '../utils/formatters';

export default function Calculators() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('sip');

  // Existing States
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipYears, setSipYears] = useState(10);
  const [sipRate, setSipRate] = useState(12);

  const [goalTarget, setGoalTarget] = useState(1000000);
  const [goalYears, setGoalYears] = useState(10);
  const [goalRate, setGoalRate] = useState(12);

  // New States for Priority 1 Calculators
  const [compAmount, setCompAmount] = useState(100000);
  const [compYears, setCompYears] = useState(10);
  const [compRate, setCompRate] = useState(12);

  const [stepUpAmount, setStepUpAmount] = useState(5000);
  const [stepUpPercent, setStepUpPercent] = useState(10);
  const [stepUpYears, setStepUpYears] = useState(10);
  const [stepUpRate, setStepUpRate] = useState(12);

  const [infCost, setInfCost] = useState(100000);
  const [infYears, setInfYears] = useState(10);
  const [infRate, setInfRate] = useState(6);

  const [debtAmount, setDebtAmount] = useState(500000);
  const [debtYears, setDebtYears] = useState(5);
  const [debtRate, setDebtRate] = useState(10);

  // Calculations
  const sipResult = calculateSIP(Number(sipAmount) || 0, Number(sipYears) || 0, Number(sipRate) || 0);
  const goalResult = calculateGoalGap(Number(goalTarget) || 0, Number(goalYears) || 0, Number(goalRate) || 0);
  const compResult = calculateCompoundInterest(Number(compAmount) || 0, Number(compYears) || 0, Number(compRate) || 0);
  const stepUpResult = calculateStepUpSIP(Number(stepUpAmount) || 0, Number(stepUpPercent) || 0, Number(stepUpYears) || 0, Number(stepUpRate) || 0);
  const infResult = calculateInflationCost(Number(infCost) || 0, Number(infYears) || 0, Number(infRate) || 0);
  const debtResult = calculateDebtRepayment(Number(debtAmount) || 0, Number(debtRate) || 0, Number(debtYears) || 0);

  // Chart Data
  const sipChartData = [
    { name: 'Invested', value: sipResult.totalMoneyPutIn },
    { name: 'Extra', value: sipResult.extraMoneyEarned }
  ];
  const compChartData = [
    { name: 'Invested', value: compResult.totalMoneyPutIn },
    { name: 'Extra', value: compResult.extraMoneyEarned }
  ];
  const stepUpChartData = [
    { name: 'Invested', value: stepUpResult.totalMoneyPutIn },
    { name: 'Extra', value: stepUpResult.extraMoneyEarned }
  ];
  const debtChartData = [
    { name: 'Principal', value: debtResult.loanAmount },
    { name: 'Interest', value: debtResult.totalInterestToPay }
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

      {/* Calculator Navigation Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {[
          { id: 'sip', label: t('calculators.sipTitle') },
          { id: 'stepup', label: t('calculators.stepUpTitle') },
          { id: 'compound', label: t('calculators.compoundTitle') },
          { id: 'goal', label: t('calculators.goalTitle') },
          { id: 'inflation', label: t('calculators.inflationTitle') },
          { id: 'debt', label: t('calculators.debtTitle') }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-full font-medium transition-colors border text-sm ${activeTab === tab.id ? 'bg-[#14532d] text-white border-[#14532d]' : 'bg-transparent text-[#14532d] border-[#14532d]'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[#f8f9fa] border border-[#e5e7eb] rounded-[2rem] p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Form Inputs Column */}
        <div className="flex flex-col gap-6 fade-in min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              
              {activeTab === 'sip' && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.monthlyLabel')}</label>
                    <input type="number" value={sipAmount} onChange={(e) => setSipAmount(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.yearsLabel')}</label>
                    <input type="number" value={sipYears} onChange={(e) => setSipYears(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.returnLabel')}</label>
                    <input type="number" value={sipRate} onChange={(e) => setSipRate(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                </>
              )}

              {activeTab === 'stepup' && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.monthlyLabel')}</label>
                    <input type="number" value={stepUpAmount} onChange={(e) => setStepUpAmount(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.stepUpPercentLabel')}</label>
                    <input type="number" value={stepUpPercent} onChange={(e) => setStepUpPercent(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.yearsLabel')}</label>
                    <input type="number" value={stepUpYears} onChange={(e) => setStepUpYears(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.returnLabel')}</label>
                    <input type="number" value={stepUpRate} onChange={(e) => setStepUpRate(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                </>
              )}

              {activeTab === 'compound' && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.oneTimeLabel')}</label>
                    <input type="number" value={compAmount} onChange={(e) => setCompAmount(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.yearsLabel')}</label>
                    <input type="number" value={compYears} onChange={(e) => setCompYears(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.returnLabel')}</label>
                    <input type="number" value={compRate} onChange={(e) => setCompRate(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                </>
              )}

              {activeTab === 'goal' && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.targetLabel')}</label>
                    <input type="number" value={goalTarget} onChange={(e) => setGoalTarget(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.yearsLabel')}</label>
                    <input type="number" value={goalYears} onChange={(e) => setGoalYears(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.returnLabel')}</label>
                    <input type="number" value={goalRate} onChange={(e) => setGoalRate(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                </>
              )}

              {activeTab === 'inflation' && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.currentCostLabel')}</label>
                    <input type="number" value={infCost} onChange={(e) => setInfCost(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.yearsLabel')}</label>
                    <input type="number" value={infYears} onChange={(e) => setInfYears(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.inflationRateLabel')}</label>
                    <input type="number" value={infRate} onChange={(e) => setInfRate(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                </>
              )}

              {activeTab === 'debt' && (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.loanAmountLabel')}</label>
                    <input type="number" value={debtAmount} onChange={(e) => setDebtAmount(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.yearsLabel')}</label>
                    <input type="number" value={debtYears} onChange={(e) => setDebtYears(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#0a0a0a]">{t('calculators.interestRateLabel')}</label>
                    <input type="number" value={debtRate} onChange={(e) => setDebtRate(e.target.value)} className="border border-gray-300 rounded-lg p-3 outline-none focus:border-[#14532d] bg-white text-lg font-medium" />
                  </div>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Real-Time Results Column */}
        <div className="bg-[#e8f3e5] p-8 rounded-[1.5rem] flex flex-col justify-center items-center fade-in">
          
          {(activeTab === 'sip' || activeTab === 'stepup' || activeTab === 'compound') && (
            <>
              <div className="text-center w-full mb-8">
                <p className="text-[#0a0a0a] mb-2">{t('calculators.finalValue')}</p>
                <p className="text-4xl md:text-5xl font-serif text-[#14532d]">
                  {formatRupees(
                    activeTab === 'sip' ? sipResult.expectedFinalMoney : 
                    activeTab === 'stepup' ? stepUpResult.expectedFinalMoney : 
                    compResult.expectedFinalMoney
                  )}
                </p>
              </div>
              <div className="flex justify-between w-full text-sm font-medium text-[#0a0a0a] border-t border-gray-300 pt-6">
                <div className="flex flex-col gap-1">
                  <span className="opacity-80">{t('calculators.totalInvested')}</span>
                  <span className="text-lg">
                    {formatRupees(
                      activeTab === 'sip' ? sipResult.totalMoneyPutIn : 
                      activeTab === 'stepup' ? stepUpResult.totalMoneyPutIn : 
                      compResult.totalMoneyPutIn
                    )}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="opacity-80">{t('calculators.totalProfit')}</span>
                  <span className="text-lg text-[#f2a93b]">
                    {formatRupees(
                      activeTab === 'sip' ? sipResult.extraMoneyEarned : 
                      activeTab === 'stepup' ? stepUpResult.extraMoneyEarned : 
                      compResult.extraMoneyEarned
                    )}
                  </span>
                </div>
              </div>
              <Chart data={
                activeTab === 'sip' ? sipChartData : 
                activeTab === 'stepup' ? stepUpChartData : 
                compChartData
              } />
            </>
          )}

          {activeTab === 'goal' && (
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

          {activeTab === 'inflation' && (
            <>
              <div className="text-center w-full mb-8">
                <p className="text-[#0a0a0a] mb-2">{t('calculators.futureCostLabel')}</p>
                <p className="text-4xl md:text-5xl font-serif text-[#14532d]">
                  {formatRupees(infResult.futureCost)}
                </p>
              </div>
              <div className="text-center w-full text-sm font-medium text-[#0a0a0a] border-t border-gray-300 pt-6">
                <span className="opacity-80 block mb-1">{t('calculators.currentCostLabel')}</span>
                <span className="text-xl">{formatRupees(infResult.currentCost)}</span>
              </div>
            </>
          )}

          {activeTab === 'debt' && (
            <>
              <div className="text-center w-full mb-8">
                <p className="text-[#0a0a0a] mb-2">{t('calculators.monthlyEMI')}</p>
                <p className="text-4xl md:text-5xl font-serif text-[#14532d]">
                  {formatRupees(debtResult.monthlyEMI)}
                </p>
              </div>
              <div className="flex justify-between w-full text-sm font-medium text-[#0a0a0a] border-t border-gray-300 pt-6">
                <div className="flex flex-col gap-1">
                  <span className="opacity-80">{t('calculators.loanAmountLabel')}</span>
                  <span className="text-lg">{formatRupees(debtResult.loanAmount)}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="opacity-80">{t('calculators.totalInterestToPay')}</span>
                  <span className="text-lg text-[#f2a93b]">{formatRupees(debtResult.totalInterestToPay)}</span>
                </div>
              </div>
              <div className="mt-6 w-full text-center border-t border-gray-300 pt-4">
                <span className="opacity-80 text-sm font-medium block">{t('calculators.totalMoneyToPay')}</span>
                <span className="text-xl font-bold text-[#14532d]">{formatRupees(debtResult.totalMoneyToPay)}</span>
              </div>
              <Chart data={debtChartData} />
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