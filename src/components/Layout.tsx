
import React from 'react';
import { Navbar } from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow">
        <div 
          key={location.pathname}
          className="animate-fade-in w-full">
          {children}
        </div>
      </main>
      <footer className="bg-secondary py-8 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-medium mb-4">LoanBerry</h3>
              <p className="text-sm text-muted-foreground">
                Providing fast and reliable personal loans with competitive rates.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Products</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Personal Loans</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Auto Loans</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Debt Consolidation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Home Improvement</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/20 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} LoanBerry. All rights reserved.</p>
            <p className="mt-1">This is a demo application. No real loans are being issued.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
