export const calculateSIP = (monthlyAmount, years, yearlyReturnPercent) => {
  const totalMonths = years * 12;
  const monthlyReturnRate = yearlyReturnPercent / 12 / 100;
  
  const totalMoneyPutIn = monthlyAmount * totalMonths;
  
  const expectedFinalMoney = monthlyAmount * ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) / monthlyReturnRate) * (1 + monthlyReturnRate);
  const extraMoneyEarned = expectedFinalMoney - totalMoneyPutIn;

  return {
    totalMoneyPutIn: Math.round(totalMoneyPutIn),
    expectedFinalMoney: Math.round(expectedFinalMoney),
    extraMoneyEarned: Math.round(extraMoneyEarned)
  };
};

export const calculateCompoundInterest = (oneTimeAmount, years, yearlyReturnPercent) => {
  const rate = yearlyReturnPercent / 100;
  const expectedFinalMoney = oneTimeAmount * Math.pow(1 + rate, years);
  const extraMoneyEarned = expectedFinalMoney - oneTimeAmount;

  return {
    totalMoneyPutIn: Math.round(oneTimeAmount),
    expectedFinalMoney: Math.round(expectedFinalMoney),
    extraMoneyEarned: Math.round(extraMoneyEarned)
  };
};

export const calculateInflationCost = (currentCost, years, inflationPercent) => {
  const rate = inflationPercent / 100;
  const futureCost = currentCost * Math.pow(1 + rate, years);
  
  return {
    currentCost: Math.round(currentCost),
    futureCost: Math.round(futureCost)
  };
};

export const calculateGoalGap = (targetMoneyNeeded, years, yearlyReturnPercent) => {
  const totalMonths = years * 12;
  const monthlyReturnRate = yearlyReturnPercent / 12 / 100;
  
  const requiredMonthlySavings = (targetMoneyNeeded * monthlyReturnRate) / ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) * (1 + monthlyReturnRate));
  
  return {
    targetMoneyNeeded: Math.round(targetMoneyNeeded),
    requiredMonthlySavings: Math.round(requiredMonthlySavings)
  };
};