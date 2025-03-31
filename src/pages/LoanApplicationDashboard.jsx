
import React from 'react';
import { LoanApplicationDashboard } from '../components/loan/LoanApplicationDashboard';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoanApplicationDashboardPage = () => {
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
      <div className="py-12">
        <LoanApplicationDashboard />
      </div>
    </Layout>
  );
};

export default LoanApplicationDashboardPage;
