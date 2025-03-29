
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation (in a real app, this would be handled by the backend)
      if (email === "user@example.com" && password === "password") {
        const user = { id: "1", name: "John Doe", email };
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successful");
        return true;
      } else {
        toast.error("Invalid credentials");
        return false;
      }
    } catch (error) {
      toast.error("Login failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration (in a real app, this would be handled by the backend)
      const user = { id: "2", name, email };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Registration successful");
      return true;
    } catch (error) {
      toast.error("Registration failed");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
