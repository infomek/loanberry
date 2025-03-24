
import React from 'react';
import { LoanOffers } from '../components/loan/LoanOffers';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
      <div className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Loan Offers</h1>
            <Link to="/loan-application-dashboard">
              <Button variant="outline">Back to Application</Button>
            </Link>
          </div>
          <LoanOffers />
        </div>
      </div>
    </Layout>
  );
};

export default LoanOffersPage;
