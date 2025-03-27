
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { submitLoanApplication } from '../services/api';

export interface LoanApplicationState {
  step: number;
  amount: number;
  term: number;
  purpose: string;
  income: string;
  employment: string;
  name: string;
  email: string;
  isSubmitting: boolean;
}

export function useLoanApplication() {
  const [state, setState] = useState<LoanApplicationState>({
    step: 1,
    amount: 10000,
    term: 36,
    purpose: '',
    income: '',
    employment: '',
    name: '',
    email: '',
    isSubmitting: false
  });
  const navigate = useNavigate();

  const updateState = (updates: Partial<LoanApplicationState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, email, purpose, employment } = state;
    
    if (!name || !email || !purpose || !employment) {
      toast.error("Please fill out all fields");
      return;
    }

    updateState({ isSubmitting: true });
    try {
      const application = {
        amount: state.amount,
        term: state.term,
        purpose,
        income: parseFloat(state.income),
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
      updateState({ isSubmitting: false });
    }
  };

  const setStep = (step: number) => updateState({ step });
  const setAmount = (amount: number) => updateState({ amount });
  const setTerm = (term: number) => updateState({ term });
  const setPurpose = (purpose: string) => updateState({ purpose });
  const setIncome = (income: string) => updateState({ income });
  const setEmployment = (employment: string) => updateState({ employment });
  const setName = (name: string) => updateState({ name });
  const setEmail = (email: string) => updateState({ email });

  return {
    ...state,
    setStep,
    setAmount,
    setTerm,
    setPurpose,
    setIncome,
    setEmployment,
    setName,
    setEmail,
    handleSubmit
  };
}
