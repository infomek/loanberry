// // Mock API service - This would connect to a real backend in a production app

// interface LoanApplication {
//   amount: number;
//   term: number;
//   purpose: string;
//   income: number;
//   employment: string;
//   name: string;
//   email: string;
//   creditScore?: number;
// }

// interface LoanOffer {
//   id: string;
//   amount: number;
//   term: number;
//   interestRate: number;
//   monthlyPayment: number;
//   totalPayment: number;
// }

// interface Payment {
//   id: string;
//   date: string;
//   amount: number;
//   status: 'paid' | 'pending' | 'overdue';
// }

// interface Loan {
//   id: string;
//   amount: number;
//   term: number;
//   interestRate: number;
//   monthlyPayment: number;
//   totalPayment: number;
//   status: 'approved' | 'pending' | 'active' | 'completed' | 'rejected';
//   startDate: string;
//   nextPaymentDate: string;
//   remainingPayments: number;
//   paymentsMade: number;
//   payments: Payment[];
// }

// // Simulate API delay
// const apiDelay = () => new Promise(resolve => setTimeout(resolve, 1000));

// // Check eligibility based on input
// export const checkEligibility = async (
//   amount: number,
//   term: number,
//   income: number
// ): Promise<{ eligible: boolean; maxAmount?: number; reason?: string }> => {
//   await apiDelay();
  
//   // Mock eligibility logic
//   const debtToIncomeRatio = amount / (income * term);
  
//   if (income < 30000) {
//     return { eligible: false, reason: "Income below minimum requirement" };
//   }
  
//   if (debtToIncomeRatio > 0.4) {
//     const maxAmount = income * term * 0.4;
//     return { eligible: false, maxAmount, reason: "Loan amount too high for income" };
//   }
  
//   return { eligible: true };
// };

// // Submit loan application
// export const submitLoanApplication = async (
//   application: LoanApplication
// ): Promise<{ success: boolean; applicationId?: string }> => {
//   await apiDelay();
  
//   // Mock application submission
//   // In a real app, this would send data to the backend
//   return {
//     success: true,
//     applicationId: Math.random().toString(36).substring(2, 10)
//   };
// };

// // Get loan offers based on application
// export const getLoanOffers = async (applicationId: string): Promise<LoanOffer[]> => {
//   await apiDelay();
  
//   // Mock loan offers
//   return [
//     {
//       id: "offer-1",
//       amount: 10000,
//       term: 36,
//       interestRate: 5.99,
//       monthlyPayment: 304.17,
//       totalPayment: 10950.12
//     },
//     {
//       id: "offer-2",
//       amount: 10000,
//       term: 48,
//       interestRate: 4.99,
//       monthlyPayment: 229.85,
//       totalPayment: 11032.80
//     },
//     {
//       id: "offer-3",
//       amount: 10000,
//       term: 60,
//       interestRate: 3.99,
//       monthlyPayment: 184.17,
//       totalPayment: 11050.20
//     }
//   ];
// };

// // Accept a loan offer
// export const acceptLoanOffer = async (offerId: string): Promise<{ success: boolean; loanId?: string }> => {
//   await apiDelay();
  
//   // Mock loan acceptance
//   return {
//     success: true,
//     loanId: Math.random().toString(36).substring(2, 10)
//   };
// };

// // Get user loans
// export const getUserLoans = async (): Promise<Loan[]> => {
//   await apiDelay();
  
//   // Generate mock payments for the past 3 months
//   const generatePayments = (): Payment[] => {
//     const payments: Payment[] = [];
//     const today = new Date();
    
//     for (let i = 1; i <= 3; i++) {
//       const date = new Date();
//       date.setMonth(today.getMonth() - i);
      
//       payments.push({
//         id: `payment-${i}`,
//         date: date.toISOString().split('T')[0],
//         amount: 304.17,
//         status: 'paid'
//       });
//     }
    
//     // Add upcoming payment
//     const nextDate = new Date();
//     nextDate.setMonth(today.getMonth() + 1);
//     payments.push({
//       id: `payment-next`,
//       date: nextDate.toISOString().split('T')[0],
//       amount: 304.17,
//       status: 'pending'
//     });
    
//     return payments;
//   };
  
//   // Mock loans
//   return [
//     {
//       id: "loan-1",
//       amount: 10000,
//       term: 36,
//       interestRate: 5.99,
//       monthlyPayment: 304.17,
//       totalPayment: 10950.12,
//       status: 'active',
//       startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//       nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//       remainingPayments: 33,
//       paymentsMade: 3,
//       payments: generatePayments()
//     }
//   ];
// };

// // Calculate loan information for the calculator
// export const calculateLoan = async (
//   amount: number,
//   term: number
// ): Promise<{
//   monthlyPayment: number;
//   totalPayment: number;
//   interestRate: number;
//   totalInterest: number;
// }> => {
//   await apiDelay();
  
//   // Mock loan calculation
//   const interestRate = 5.99;
//   const monthlyRate = interestRate / 100 / 12;
//   const monthlyPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1);
//   const totalPayment = monthlyPayment * term;
//   const totalInterest = totalPayment - amount;
  
//   return {
//     monthlyPayment,
//     totalPayment,
//     interestRate,
//     totalInterest
//   };
// };

// // Check civil score
// export const checkCivilScore = async (
//   userId: string,
//   fullName: string,
//   email: string,
//   phone: string,
//   panNumber: string
// ): Promise<{ score: number; status: 'excellent' | 'good' | 'fair' | 'poor'; message: string }> => {
//   await apiDelay();
  
//   // Mock civil score calculation
//   // In a real app, this would call a credit bureau API
//   const randomScore = Math.floor(Math.random() * 300) + 500; // Random score between 500-800
  
//   let status: 'excellent' | 'good' | 'fair' | 'poor';
//   let message: string;
  
//   if (randomScore >= 750) {
//     status = 'excellent';
//     message = 'Your credit score is excellent. You qualify for our best rates!';
//   } else if (randomScore >= 700) {
//     status = 'good';
//     message = 'Your credit score is good. You qualify for competitive rates.';
//   } else if (randomScore >= 650) {
//     status = 'fair';
//     message = 'Your credit score is fair. You may qualify for standard rates.';
//   } else {
//     status = 'poor';
//     message = 'Your credit score needs improvement. Limited loan options available.';
//   }
  
//   return {
//     score: randomScore,
//     status,
//     message
//   };
// };

// // Add user bank details
// export const addBankDetails = async (
//   userId: string,
//   bankDetails: {
//     accountNumber: string;
//     ifscCode: string;
//     accountName: string;
//     bankName: string;
//   }
// ): Promise<{ success: boolean; message: string }> => {
//   await apiDelay();
  
//   // Mock bank details validation
//   // In a real app, this would validate with a banking API
//   if (bankDetails.ifscCode.length !== 11) {
//     return { 
//       success: false, 
//       message: 'Invalid IFSC code. Please enter a valid 11-character IFSC code.' 
//     };
//   }
  
//   if (bankDetails.accountNumber.length < 9 || bankDetails.accountNumber.length > 18) {
//     return { 
//       success: false, 
//       message: 'Invalid account number. Please enter a valid account number.' 
//     };
//   }
  
//   // Store bank details (mock implementation)
//   return {
//     success: true,
//     message: 'Bank details added successfully'
//   };
// };

// // Get user profile
// export const getUserProfile = async (): Promise<{
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   civilScore?: number;
//   bankDetails?: {
//     accountNumber: string;
//     ifscCode: string;
//     accountName: string;
//     bankName: string;
//   }
// }> => {
//   await apiDelay();
  
//   // Mock user profile data
//   return {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "9876543210",
//     address: "123 Main Street, Mumbai, Maharashtra",
//     civilScore: 750,
//     bankDetails: {
//       accountNumber: "XXXX5678",
//       ifscCode: "SBIN0001234",
//       accountName: "John Doe",
//       bankName: "State Bank of India"
//     }
//   };
// };
