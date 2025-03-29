
import React from 'react';
import { LoanApplicationForm } from '../components/loan/LoanApplication';
import { Layout } from '../components/Layout';
import { useRequireAuth } from '../hooks/useRequireAuth';

const LoanApplication = () => {
  const { isAuthenticated } = useRequireAuth();

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
