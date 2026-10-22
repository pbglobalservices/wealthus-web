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

export const calculateStepUpSIP = (initialMonthlyAmount, stepUpPercent, years, yearlyReturnPercent) => {
  const totalMonths = years * 12;
  const monthlyReturnRate = yearlyReturnPercent / 12 / 100;
  let expectedFinalMoney = 0;
  let totalMoneyPutIn = 0;
  let currentMonthlyAmount = initialMonthlyAmount;

  for (let month = 1; month <= totalMonths; month++) {
    totalMoneyPutIn += currentMonthlyAmount;
    expectedFinalMoney = (expectedFinalMoney + currentMonthlyAmount) * (1 + monthlyReturnRate);

    // Increase the savings amount after every 12 months (1 year)
    if (month % 12 === 0) {
      currentMonthlyAmount = currentMonthlyAmount * (1 + (stepUpPercent / 100));
    }
  }

  const extraMoneyEarned = expectedFinalMoney - totalMoneyPutIn;

  return {
    totalMoneyPutIn: Math.round(totalMoneyPutIn),
    expectedFinalMoney: Math.round(expectedFinalMoney),
    extraMoneyEarned: Math.round(extraMoneyEarned)
  };
};

export const calculateDebtRepayment = (loanAmount, yearlyInterestPercent, years) => {
  const totalMonths = years * 12;
  const monthlyInterestRate = yearlyInterestPercent / 12 / 100;
  let monthlyEMI = 0;
  
  if (monthlyInterestRate === 0) {
    monthlyEMI = loanAmount / totalMonths;
  } else {
    monthlyEMI = loanAmount * monthlyInterestRate * (Math.pow(1 + monthlyInterestRate, totalMonths)) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
  }

  const totalMoneyToPay = monthlyEMI * totalMonths;
  const totalInterestToPay = totalMoneyToPay - loanAmount;

  return {
    loanAmount: Math.round(loanAmount),
    monthlyEMI: Math.round(monthlyEMI),
    totalInterestToPay: Math.round(totalInterestToPay),
    totalMoneyToPay: Math.round(totalMoneyToPay)
  };
};