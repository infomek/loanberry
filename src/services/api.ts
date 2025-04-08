
// Mock API service for the loan application
const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

interface User {
  id: string;
  name: string;
  email: string;
  civilScore: number;
}

interface LoginResponse {
  success: boolean;
  user?: User;
  error?: string;
}

interface RegisterResponse {
  success: boolean;
  user: User;
}

interface LoanApplicationResponse {
  success: boolean;
  applicationId: string;
  message: string;
}

interface CivilScoreFactor {
  name: string;
  score: string;
  impact: string;
}

interface CivilScoreResponse {
  score: number;
  factors: CivilScoreFactor[];
  recommendations: string[];
}

interface LoanCalculationResponse {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  apr: string;
  interestRate: number;
}

interface LoanOffer {
  id: string;
  name: string;
  rate: string;
  term: number;
  amount: number;
  monthlyPayment: string;
  totalPayment: number;
  featured: boolean;
}

interface AcceptLoanOfferResponse {
  success: boolean;
  message: string;
  loanId: string;
  details: {
    offerId: string;
    status: string;
    nextSteps: string[];
  };
}

interface EligibilityResponse {
  approved: boolean;
  maxLoanAmount: number;
  reasons: string[];
  recommendedProducts: string[];
}

interface BankAccount {
  id: string;
  name: string;
  bankName: string;
  accountNumber: string;
  isPrimary: boolean;
}

interface LoanPreferences {
  communicationFrequency: string;
  paymentDate: string;
  autoPayEnabled: boolean;
}

interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  civilScore: number;
  kycStatus: string;
  bankAccounts: BankAccount[];
  loanPreferences: LoanPreferences;
  error?: string;
}

interface UserLoan {
  id: string;
  type: string;
  amount: number;
  remainingAmount: number;
  term: number;
  interestRate: number;
  monthlyPayment: number;
  nextPaymentDate: string;
  status: string;
  startDate: string;
  progress: number;
  payments: Payment[];
  totalPayment: number;
  remainingPayments: number;
  paymentsMade: number;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
}

interface BankDetailsResponse {
  success: boolean;
  account: BankAccount;
  message?: string;
}

interface BankDetailsInput {
  name: string;
  bankName: string;
  accountNumber: string;
  isPrimary: boolean;
  ifscCode?: string;
  accountName?: string;
}

// Authentication
export const login = async (email: string, password: string): Promise<LoginResponse> => {
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

export const register = async (name: string, email: string, password: string): Promise<RegisterResponse> => {
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

export const logout = (): { success: boolean } => {
  localStorage.removeItem('user');
  return { success: true };
};

// Loan Application
export const submitLoanApplication = async (data: any): Promise<LoanApplicationResponse> => {
  await delay(1500);
  return {
    success: true,
    applicationId: 'APP-' + Math.floor(Math.random() * 10000),
    message: 'Loan application submitted successfully'
  };
};

// Civil Score
export const checkCivilScore = async (
  userId?: string, 
  fullName?: string, 
  email?: string, 
  phone?: string, 
  panNumber?: string
): Promise<any> => {
  await delay(1000);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const score = user?.civilScore || Math.floor(Math.random() * 300) + 550;
  
  let status: 'excellent' | 'good' | 'fair' | 'poor';
  if (score >= 750) status = 'excellent';
  else if (score >= 700) status = 'good';
  else if (score >= 650) status = 'fair';
  else status = 'poor';
  
  let message = '';
  switch (status) {
    case 'excellent':
      message = 'You have an excellent score that qualifies you for the best rates';
      break;
    case 'good':
      message = 'You have a good score that qualifies you for competitive rates';
      break;
    case 'fair':
      message = 'You have a fair score. Some improvement could help you get better rates';
      break;
    case 'poor':
      message = 'Your score needs improvement. Consider taking steps to improve it';
      break;
  }

  return {
    score,
    status,
    message,
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
export const calculateLoan = async (amount: number, term: number, interestRate?: number): Promise<LoanCalculationResponse> => {
  await delay(500);
  const rate = interestRate || 5.99;
  const monthlyInterest = rate / 100 / 12;
  const payments = term;
  const monthlyPayment = (amount * monthlyInterest) / (1 - Math.pow(1 / (1 + monthlyInterest), payments));
  const totalPayment = monthlyPayment * payments;
  const totalInterest = totalPayment - amount;
  
  // Return numeric values, not strings
  return {
    monthlyPayment: monthlyPayment,
    totalPayment: totalPayment,
    totalInterest: totalInterest,
    apr: (rate + 0.5).toFixed(2),
    interestRate: rate
  };
};

// Loan Offers
export const getLoanOffers = async (applicationId?: string, amount?: number, term?: number, creditScore?: number): Promise<LoanOffer[]> => {
  await delay(1500);
  
  const baseRate = 5.99;
  const score = creditScore || 750;
  const loanAmount = amount || 10000;
  const loanTerm = term || 36;
  
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
      term: loanTerm,
      amount: loanAmount,
      monthlyPayment: calculateMonthlyPayment(loanAmount, loanTerm, baseRate + rateAdjustment).toFixed(2),
      totalPayment: calculateMonthlyPayment(loanAmount, loanTerm, baseRate + rateAdjustment) * loanTerm,
      featured: false
    },
    {
      id: 'OFFER-2',
      name: 'Premier Loan',
      rate: (baseRate + rateAdjustment - 0.5).toFixed(2),
      term: loanTerm,
      amount: loanAmount,
      monthlyPayment: calculateMonthlyPayment(loanAmount, loanTerm, baseRate + rateAdjustment - 0.5).toFixed(2),
      totalPayment: calculateMonthlyPayment(loanAmount, loanTerm, baseRate + rateAdjustment - 0.5) * loanTerm,
      featured: true
    },
    {
      id: 'OFFER-3',
      name: 'Economy Loan',
      rate: (baseRate + rateAdjustment + 1).toFixed(2),
      term: loanTerm,
      amount: loanAmount,
      monthlyPayment: calculateMonthlyPayment(loanAmount, loanTerm, baseRate + rateAdjustment + 1).toFixed(2),
      totalPayment: calculateMonthlyPayment(loanAmount, loanTerm, baseRate + rateAdjustment + 1) * loanTerm,
      featured: false
    }
  ];
  
  return offers;
};

// Helper function for calculating monthly payment
const calculateMonthlyPayment = (principal: number, term: number, rate: number): number => {
  const monthlyRate = rate / 100 / 12;
  return (principal * monthlyRate) / (1 - Math.pow(1 / (1 + monthlyRate), term));
};

// Accept a loan offer
export const acceptLoanOffer = async (offerId: string): Promise<AcceptLoanOfferResponse> => {
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
export const checkEligibility = async (income: number, expenses: number, creditScore?: number): Promise<EligibilityResponse> => {
  await delay(1500);
  
  // Simple eligibility logic
  const score = creditScore || 750;
  const debtToIncomeRatio = expenses / income;
  
  let approved = true;
  const reasons: string[] = [];
  
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
export const getUserProfile = async (): Promise<UserProfileResponse> => {
  await delay(1000);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user) {
    return { error: 'User not found' } as any;
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

export const getUserLoans = async (): Promise<UserLoan[]> => {
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
      progress: 15,
      remainingPayments: 30,
      paymentsMade: 6,
      totalPayment: 10989,
      payments: [
        {
          id: 'PAY-001',
          date: '2025-03-15',
          amount: 305.25,
          status: 'paid'
        },
        {
          id: 'PAY-002',
          date: '2025-04-15',
          amount: 305.25,
          status: 'paid'
        },
        {
          id: 'PAY-003',
          date: '2025-05-15',
          amount: 305.25,
          status: 'pending'
        }
      ]
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
      progress: 10,
      remainingPayments: 55,
      paymentsMade: 5,
      totalPayment: 28002.60,
      payments: [
        {
          id: 'PAY-101',
          date: '2025-01-01',
          amount: 466.71,
          status: 'paid'
        },
        {
          id: 'PAY-102',
          date: '2025-02-01',
          amount: 466.71,
          status: 'paid'
        },
        {
          id: 'PAY-103',
          date: '2025-03-01',
          amount: 466.71,
          status: 'paid'
        },
        {
          id: 'PAY-104',
          date: '2025-04-01',
          amount: 466.71,
          status: 'paid'
        },
        {
          id: 'PAY-105',
          date: '2025-05-01',
          amount: 466.71,
          status: 'pending'
        }
      ]
    }
  ];
};

// Bank account
export const addBankDetails = async (userId: string, accountInfo: BankDetailsInput): Promise<BankDetailsResponse> => {
  await delay(1000);
  
  return {
    success: true,
    account: {
      id: 'BA' + Math.floor(Math.random() * 1000),
      name: accountInfo.accountName || accountInfo.name,
      bankName: accountInfo.bankName,
      accountNumber: '****' + accountInfo.accountNumber.slice(-4),
      isPrimary: accountInfo.isPrimary
    },
    message: 'Bank account added successfully'
  };
};
