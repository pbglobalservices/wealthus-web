export const formatRupees = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₹0';
  }

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  });

  return formatter.format(amount);
};

export const formatNumberIndian = (number) => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }

  const formatter = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  });

  return formatter.format(number);
};