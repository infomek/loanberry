
import React, { useState } from 'react';
import { LoanDetailsForm } from './LoanDetailsForm';
import { LoanEligibilityCheck } from './LoanEligibilityCheck';
import { LoanOffers } from './LoanOffers';
import { useNavigate } from 'react-router-dom';

export const LoanApplicationWrapper: React.FC = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(5000);
  const [term, setTerm] = useState(12);
  const [income, setIncome] = useState('');
  const navigate = useNavigate();

  const handleEligibilityConfirmed = () => {
    setStep(3);
  };

  const handleDetailsSubmitted = () => {
    setStep(2);
  };

  const handleOfferAccepted = () => {
    // Navigate to dashboard after accepting an offer
    navigate('/dashboard');
  };

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <div className="steps mb-10">
        <div className="flex justify-between">
          <div className={`step-item ${step >= 1 ? 'active' : ''}`}>Loan Details</div>
          <div className={`step-item ${step >= 2 ? 'active' : ''}`}>Eligibility Check</div>
          <div className={`step-item ${step >= 3 ? 'active' : ''}`}>Offers</div>
        </div>
      </div>

      {step === 1 && (
        <LoanDetailsForm 
          onSubmit={handleDetailsSubmitted}
          amount={amount}
          setAmount={setAmount}
          term={term}
          setTerm={setTerm}
          income={income}
          setIncome={setIncome}
        />
      )}

      {step === 2 && (
        <LoanEligibilityCheck 
          amount={amount}
          term={term}
          income={income}
          onEligibilityConfirmed={handleEligibilityConfirmed} 
        />
      )}

      {step === 3 && (
        <LoanOffers
          amount={amount}
          term={term}
          onOfferAccepted={handleOfferAccepted}
        />
      )}
    </div>
  );
};
