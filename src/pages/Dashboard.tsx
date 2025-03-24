
import React from 'react';
import { DashboardContent } from '../components/dashboard/Dashboard';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
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
      <div className="py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
          <p className="text-muted-foreground">
            Here's an overview of your loans and upcoming payments
          </p>
        </div>
        <DashboardContent />
      </div>
    </Layout>
  );
};

export default Dashboard;
