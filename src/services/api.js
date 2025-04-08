
// Mock API service for the loan application
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Authentication
const login = async (email, password) => {
  await delay(1000);
  // Mock login - in a real app, this would call a real API
  if (email === 'user@example.com' && password === 'password') {
    const user = {
      id: '1',
      name: 'John Doe',
      email: 'user@example.com',
      civilScore: 750
    };
    localStorage.setItem('user', JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, error: 'Invalid email or password' };
};

const register = async (name, email, password) => {
  await delay(1000);
  // Mock registration
  const user = {
    id: '1',
    name,
    email,
    civilScore: 750
  };
  localStorage.setItem('user', JSON.stringify(user));
  return { success: true, user };
};

const logout = () => {
  localStorage.removeItem('user');
  return { success: true };
};

// Loan Application
const submitLoanApplication = async (data) => {
  await delay(1500);
  return {
    success: true,
    applicationId: 'APP-' + Math.floor(Math.random() * 10000),
    message: 'Loan application submitted successfully'
  };
};

// Civil Score
const checkCivilScore = async () => {
  await delay(1000);
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    score: user?.civilScore || Math.floor(Math.random() * 300) + 550,
    factors: [
      { name: 'Payment History', score: 'Excellent', impact: 'High' },
      { name: 'Credit Utilization', score: 'Good', impact: 'Medium' },
      { name: 'Length of Credit History', score: 'Fair', impact: 'Medium' },
      { name: 'New Credit Inquiries', score: 'Excellent', impact: 'Low' },
      { name: 'Types of Credit', score: 'Good', impact: 'Low' }
    ],
    recommendations: [
      'Continue making payments on time',
      'Reduce credit card balances',
      'Avoid opening multiple new accounts'
    ]
  };
};

// Loan Calculator
const calculateLoan = async (amount, term, interestRate) => {
  await delay(500);
  const monthlyInterest = interestRate / 100 / 12;
  const payments = term;
  const monthlyPayment = (amount * monthlyInterest) / (1 - Math.pow(1 / (1 + monthlyInterest), payments));
  const totalPayment = monthlyPayment * payments;
  const totalInterest = totalPayment - amount;
  
  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    totalPayment: totalPayment.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    apr: (interestRate + 0.5).toFixed(2)
  };
};

// Loan Offers
const getLoanOffers = async (amount, term, creditScore) => {
  await delay(1500);
  
  const baseRate = 5.99;
  const score = creditScore || 750;
  
  // Adjust rate based on credit score
  let rateAdjustment = 0;
  if (score < 650) rateAdjustment = 5;
  else if (score < 700) rateAdjustment = 3;
  else if (score < 750) rateAdjustment = 1;
  else if (score > 800) rateAdjustment = -1;
  
  const offers = [
    {
      id: 'OFFER-1',
      name: 'Standard Loan',
      rate: (baseRate + rateAdjustment).toFixed(2),
      term: term || 36,
      amount: amount || 10000,
      monthlyPayment: calculateMonthlyPayment(amount || 10000, term || 36, baseRate + rateAdjustment).toFixed(2),
      featured: false
    },
    {
      id: 'OFFER-2',
      name: 'Premier Loan',
      rate: (baseRate + rateAdjustment - 0.5).toFixed(2),
      term: term || 36,
      amount: amount || 10000,
      monthlyPayment: calculateMonthlyPayment(amount || 10000, term || 36, baseRate + rateAdjustment - 0.5).toFixed(2),
      featured: true
    },
    {
      id: 'OFFER-3',
      name: 'Economy Loan',
      rate: (baseRate + rateAdjustment + 1).toFixed(2),
      term: term || 36,
      amount: amount || 10000,
      monthlyPayment: calculateMonthlyPayment(amount || 10000, term || 36, baseRate + rateAdjustment + 1).toFixed(2),
      featured: false
    }
  ];
  
  return offers;
};

// Helper function for calculating monthly payment
const calculateMonthlyPayment = (principal, term, rate) => {
  const monthlyRate = rate / 100 / 12;
  return (principal * monthlyRate) / (1 - Math.pow(1 / (1 + monthlyRate), term));
};

// Accept a loan offer
const acceptLoanOffer = async (offerId) => {
  await delay(1000);
  return {
    success: true,
    message: 'Congratulations! Your loan has been approved.',
    loanId: 'LOAN-' + Math.floor(Math.random() * 10000),
    details: {
      offerId,
      status: 'Approved',
      nextSteps: [
        'Complete identity verification',
        'Sign loan agreement',
        'Set up automatic payments'
      ]
    }
  };
};

// Loan eligibility check
const checkEligibility = async (income, expenses, creditScore) => {
  await delay(1500);
  
  // Simple eligibility logic
  const score = creditScore || 750;
  const debtToIncomeRatio = expenses / income;
  
  let approved = true;
  const reasons = [];
  
  if (score < 600) {
    approved = false;
    reasons.push('Credit score below minimum requirement');
  }
  
  if (debtToIncomeRatio > 0.5) {
    approved = false;
    reasons.push('Debt-to-income ratio too high');
  }
  
  if (income < 30000) {
    approved = false;
    reasons.push('Income below minimum requirement');
  }
  
  return {
    approved,
    maxLoanAmount: approved ? income * 0.8 : 0,
    reasons,
    recommendedProducts: approved 
      ? ['Personal Loan', 'Debt Consolidation'] 
      : ['Credit Builder', 'Secured Card']
  };
};

// User profile
const getUserProfile = async () => {
  await delay(1000);
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return { error: 'User not found' };
  }
  
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, CA 12345',
    civilScore: user.civilScore || 750,
    kycStatus: 'Verified',
    bankAccounts: [
      {
        id: 'BA1',
        name: 'Primary Checking',
        bankName: 'Chase Bank',
        accountNumber: '****4321',
        isPrimary: true
      }
    ],
    loanPreferences: {
      communicationFrequency: 'Weekly',
      paymentDate: '15th',
      autoPayEnabled: true
    }
  };
};

const getUserLoans = async () => {
  await delay(1000);
  
  return [
    {
      id: 'LOAN-1234',
      type: 'Personal Loan',
      amount: 10000,
      remainingAmount: 8500,
      term: 36,
      interestRate: 5.99,
      monthlyPayment: 305.25,
      nextPaymentDate: '2025-05-15',
      status: 'Active',
      startDate: '2025-02-15',
      progress: 15
    },
    {
      id: 'LOAN-5678',
      type: 'Auto Loan',
      amount: 25000,
      remainingAmount: 22750,
      term: 60,
      interestRate: 4.49,
      monthlyPayment: 466.71,
      nextPaymentDate: '2025-05-01',
      status: 'Active',
      startDate: '2024-12-01',
      progress: 10
    }
  ];
};

// Bank account
const addBankDetails = async (accountInfo) => {
  await delay(1000);
  
  return {
    success: true,
    account: {
      id: 'BA' + Math.floor(Math.random() * 1000),
      name: accountInfo.name,
      bankName: accountInfo.bankName,
      accountNumber: '****' + accountInfo.accountNumber.slice(-4),
      isPrimary: accountInfo.isPrimary
    }
  };
};

export {
  login,
  register,
  logout,
  submitLoanApplication,
  checkCivilScore,
  calculateLoan,
  getLoanOffers,
  acceptLoanOffer,
  checkEligibility,
  getUserProfile,
  getUserLoans,
  addBankDetails
};
