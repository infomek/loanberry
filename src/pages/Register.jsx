
import React from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Layout } from '../components/Layout';

const Register = () => {
  return (
    <Layout>
      <div className="py-12 md:py-24">
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default Register;
