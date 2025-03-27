
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const NavActions: React.FC = () => {
  return (
    <>
      <Button variant="ghost" asChild>
        <Link to="/login">Log In</Link>
      </Button>
      <Button asChild>
        <Link to="/register">Sign Up</Link>
      </Button>
    </>
  );
};
