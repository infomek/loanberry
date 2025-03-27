
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, User } from 'lucide-react';

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
      <Link
        to="/civil-score-check"
        className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
      >
        <Shield className="h-4 w-4" />
        Civil Score
      </Link>
      {isAuthenticated && (
        <Link
          to="/profile"
          className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
        >
          <User className="h-4 w-4" />
          My Profile
        </Link>
      )}
    </nav>
  );
};
