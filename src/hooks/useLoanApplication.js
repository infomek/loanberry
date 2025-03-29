
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { submitLoanApplication } from '../services/api';

export function useLoanApplication() {
  const [state, setState] = useState({
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

  const updateState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e) => {
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

  const setStep = (step) => updateState({ step });
  const setAmount = (amount) => updateState({ amount });
  const setTerm = (term) => updateState({ term });
  const setPurpose = (purpose) => updateState({ purpose });
  const setIncome = (income) => updateState({ income });
  const setEmployment = (employment) => updateState({ employment });
  const setName = (name) => updateState({ name });
  const setEmail = (email) => updateState({ email });

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
