
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Shield, User, FileText, Settings, CreditCard, LayoutDashboard } from 'lucide-react';

export const MobileMenu = ({
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
            className="hover:text-primary flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/applications"
            className="hover:text-primary flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard className="h-5 w-5" />
            Applications
          </Link>
          <Link
            to="/payments"
            className="hover:text-primary flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <CreditCard className="h-5 w-5" />
            Payments
          </Link>
          <Link
            to="/documents"
            className="hover:text-primary flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <FileText className="h-5 w-5" />
            Documents
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
          <Link
            to="/settings"
            className="hover:text-primary flex items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <Settings className="h-5 w-5" />
            Settings
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
