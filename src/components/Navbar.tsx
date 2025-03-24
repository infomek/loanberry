
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-lg">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link to="/" className="flex items-center">
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            LoanBerry
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="ml-auto hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            Home
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/dashboard') ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/loan-application"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/loan-application') ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                Apply for Loan
              </Link>
              <Button variant="outline" onClick={logout}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/login') ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                Login
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="ml-auto md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-background border-b shadow-sm animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                isActive('/') ? 'text-primary' : 'text-foreground/80'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                    isActive('/dashboard') ? 'text-primary' : 'text-foreground/80'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/loan-application"
                  className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                    isActive('/loan-application') ? 'text-primary' : 'text-foreground/80'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Apply for Loan
                </Link>
                <Button variant="outline" onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }} className="w-full">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-sm font-medium transition-colors hover:text-primary py-2 ${
                    isActive('/login') ? 'text-primary' : 'text-foreground/80'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
