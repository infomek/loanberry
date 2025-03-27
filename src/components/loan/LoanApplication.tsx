
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { submitLoanApplication } from '../../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoanEligibilityCheck } from './LoanEligibilityCheck';
import { LoanDetailsForm } from './LoanDetailsForm';

export const LoanApplicationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(36);
  const [purpose, setPurpose] = useState('');
  const [income, setIncome] = useState('');
  const [employment, setEmployment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !purpose || !employment) {
      toast.error("Please fill out all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const application = {
        amount,
        term,
        purpose,
        income: parseFloat(income),
        employment,
        name,
        email
      };
      
      const result = await submitLoanApplication(application);
      
      if (result.success) {
        toast.success("Application submitted successfully");
        navigate('/loan-offers', { state: { applicationId: result.applicationId } });
      } else {
        toast.error("Error submitting application");
      }
    } catch (error) {
      toast.error("Error submitting application");
    } finally {
      setIsSubmitting(false);
    }
  };

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
