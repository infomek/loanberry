
import React from 'react';
import { UserProfile } from '../components/profile/UserProfile';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProfilePage = () => {
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
        <div className="container px-4 md:px-6">
          <UserProfile />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
