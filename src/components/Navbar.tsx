
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { Shield, CreditCard, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text"
          >
            LoanBerry
          </Link>
        </div>

        {!isMobile && (
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
        )}

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {isMobile ? (
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Toggle Menu"
                      className="lg:hidden"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                      </svg>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[280px]">
                    <nav className="grid gap-6 text-lg font-medium">
                      <Link
                        to="/"
                        className="hover:text-primary"
                        onClick={() => setOpen(false)}
                      >
                        Home
                      </Link>
                      <Link
                        to="/dashboard"
                        className="hover:text-primary"
                        onClick={() => setOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/loan-application-dashboard"
                        className="hover:text-primary"
                        onClick={() => setOpen(false)}
                      >
                        Apply for Loan
                      </Link>
                      <Link
                        to="/civil-score-check"
                        className="hover:text-primary flex items-center gap-2"
                        onClick={() => setOpen(false)}
                      >
                        <Shield className="h-5 w-5" />
                        Check Civil Score
                      </Link>
                      <Link
                        to="/profile"
                        className="hover:text-primary flex items-center gap-2"
                        onClick={() => setOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        My Profile
                      </Link>
                      <Button
                        variant="outline"
                        className="mt-2"
                        onClick={() => {
                          handleLogout();
                          setOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </nav>
                  </SheetContent>
                </Sheet>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/avatar.jpg" alt={user?.name || 'User'} />
                        <AvatarFallback>
                          {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/civil-score-check" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Check Civil Score
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Log In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
