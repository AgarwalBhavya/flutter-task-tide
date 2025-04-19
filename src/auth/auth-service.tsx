
import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface UserType {
  id: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This simulates authentication for demonstration
// In a real app, you'd integrate with Supabase here
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("taskTideUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Mock login functionality (replace with Supabase)
  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would validate with Supabase
    // For demo purposes, we'll simulate successful login
    if (email && password) {
      const mockUser = { id: "user-123", email };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem("taskTideUser", JSON.stringify(mockUser));
      return;
    }
    
    throw new Error("Invalid credentials");
  };

  // Mock signup functionality (replace with Supabase)
  const signup = async (email: string, password: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would create an account with Supabase
    // For demo purposes, we'll simulate successful signup
    const mockUser = { id: "user-" + Date.now(), email };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem("taskTideUser", JSON.stringify(mockUser));
  };

  // Logout functionality
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("taskTideUser");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
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

// Add a component for protected routes
export const RequireAuth: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = window.location.pathname;

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Custom Navigate component
function Navigate({ to, state, replace = false }: { to: string; state?: any; replace?: boolean }) {
  React.useEffect(() => {
    window.location.href = to;
  }, [to]);
  return null;
}
