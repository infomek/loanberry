
import React from 'react';
import { CivilScoreCheck } from '../components/loan/CivilScoreCheck';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CivilScoreCheckPage = () => {
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
          <CivilScoreCheck />
        </div>
      </div>
    </Layout>
  );
};

export default CivilScoreCheckPage;
