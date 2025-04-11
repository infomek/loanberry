
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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
            to="/loan-application-dashboard"
            className="hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Loans
          </Link>
          <Link
            to="/payments"
            className="hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Payments
          </Link>
          <Link
            to="/settings"
            className="hover:text-primary"
            onClick={() => setOpen(false)}
          >
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
