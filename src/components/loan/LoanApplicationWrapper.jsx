
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoanEligibilityCheck } from './LoanEligibilityCheck';
import { LoanDetailsForm } from './LoanDetailsForm';
import { useLoanApplication } from '../../hooks/useLoanApplication';

export const LoanApplicationForm = () => {
  const {
    step,
    amount,
    term,
    purpose,
    income,
    employment,
    name,
    email,
    isSubmitting,
    setStep,
    setAmount,
    setTerm,
    setPurpose,
    setIncome,
    setEmployment,
    setName,
    setEmail,
    handleSubmit
  } = useLoanApplication();

  return (
    <Card className="w-full max-w-3xl mx-auto glass">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Loan Application</CardTitle>
        <CardDescription className="text-center">
          {step === 1 ? "Let's check your eligibility first" : "Complete your application"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <LoanEligibilityCheck
            amount={amount}
            setAmount={setAmount}
            term={term}
            setTerm={setTerm}
            income={income}
            setIncome={setIncome}
            onEligibilityConfirmed={() => setStep(2)}
          />
        ) : (
          <LoanDetailsForm
            purpose={purpose}
            setPurpose={setPurpose}
            employment={employment}
            setEmployment={setEmployment}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            onBack={() => setStep(1)}
          />
        )}
      </CardContent>
    </Card>
  );
};
