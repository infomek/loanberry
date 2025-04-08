
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, User, FileText, Settings, CreditCard, LayoutDashboard } from 'lucide-react';

export const DesktopNav = ({ isAuthenticated }) => {
  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      <Link
        to="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      <Link
        to="/dashboard"
        className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
      >
        <LayoutDashboard className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        to="/applications"
        className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
      >
        <LayoutDashboard className="h-4 w-4" />
        Applications
      </Link>
      <Link
        to="/payments"
        className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
      >
        <CreditCard className="h-4 w-4" />
        Payments
      </Link>
      <Link
        to="/documents"
        className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
      >
        <FileText className="h-4 w-4" />
        Documents
      </Link>
      <Link
        to="/civil-score-check"
        className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
      >
        <Shield className="h-4 w-4" />
        Civil Score
      </Link>
      {isAuthenticated && (
        <>
          <Link
            to="/profile"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
          <Link
            to="/settings"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </>
      )}
    </nav>
  );
};
