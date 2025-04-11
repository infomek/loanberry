
import React from 'react';
import { Link } from 'react-router-dom';

interface DesktopNavProps {
  isAuthenticated: boolean;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ isAuthenticated }) => {
  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      <Link
        to="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        to="/loan-application-dashboard"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Loans
      </Link>
    </nav>
  );
};
