
import React from 'react';
import { LoanApplicationForm } from '../components/loan/LoanApplication';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoanApplication = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="py-12 md:py-24">
        <LoanApplicationForm />
      </div>
    </Layout>
  );
};

export default LoanApplication;
