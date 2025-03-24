
import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { Layout } from '../components/Layout';

const Login = () => {
  return (
    <Layout>
      <div className="py-12 md:py-24">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
