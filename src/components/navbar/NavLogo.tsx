
import React from 'react';
import { Link } from 'react-router-dom';

export const NavLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        to="/"
        className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text"
      >
        LoanBerry
      </Link>
    </div>
  );
};
