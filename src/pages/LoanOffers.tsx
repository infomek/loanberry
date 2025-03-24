
import React from 'react';
import { LoanOffers } from '../components/loan/LoanOffers';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoanOffersPage = () => {
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
        <LoanOffers />
      </div>
    </Layout>
  );
};

export default LoanOffersPage;
