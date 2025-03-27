
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { NavLogo } from './navbar/NavLogo';
import { DesktopNav } from './navbar/DesktopNav';
import { NavActions } from './navbar/NavActions';
import { MobileMenu } from './navbar/MobileMenu';
import { UserDropdown } from './navbar/UserDropdown';

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
        <NavLogo />

        {!isMobile && <DesktopNav isAuthenticated={isAuthenticated} />}

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {isMobile ? (
                <MobileMenu 
                  open={open} 
                  setOpen={setOpen} 
                  handleLogout={handleLogout} 
                />
              ) : (
                <UserDropdown user={user} handleLogout={handleLogout} />
              )}
            </>
          ) : (
            <NavActions />
          )}
        </div>
      </div>
    </header>
  );
};
