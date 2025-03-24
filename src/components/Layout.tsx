
import React from 'react';
import { Navbar } from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div 
          key={location.pathname}
          className="animate-fade-in p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
      <footer className="bg-secondary py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} LoanBerry. All rights reserved.</p>
            <p className="mt-1">This is a demo application. No real loans are being issued.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
