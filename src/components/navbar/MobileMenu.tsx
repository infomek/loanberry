
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Shield, User } from 'lucide-react';

interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleLogout: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  open,
  setOpen,
  handleLogout,
}) => {
  return (
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
  );
};
