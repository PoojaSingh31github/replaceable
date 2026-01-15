import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = authService.getCurrentUser();
    if (storedUser && authService.isAuthenticated()) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      await authService.login(email, password);
      const user = authService.getCurrentUser();
      setUser(user);
      return { success: true };
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const register = async (email, password, fullName) => {
    try {
      setError(null);
      setLoading(true);
      await authService.register(email, password, fullName);
      return { success: true };
    } catch (err) {
      let errorMessage = "Registration failed. Please try again.";
      
      // Handle validation error array format
      if (err.response?.data?.detail && Array.isArray(err.response.data.detail)) {
        const validationError = err.response.data.detail[0];
        if (validationError?.msg) {
          errorMessage = validationError.msg;
          // Clean up message - remove "Value error, " prefix if present
          if (errorMessage.startsWith('Value error, ')) {
            errorMessage = errorMessage.replace('Value error, ', '');
          }
        }
      } else if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
