// hooks/useAuth.jsx
import { useState, useEffect, useContext, createContext } from 'react';
import api from '../services/api';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token with backend (example implementation)
          const { data } = await api.get('/auth/verify-auth');
          if (data?.data) setUser(data.data);
          else localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password, role = 'JOBSEEKER') => {
    try {
      const { data } = await api.post('/auth/login', { email, password, role });
      const token = data?.data?.token;
      const userData = data?.data?.user;
      if (token && userData) {
        localStorage.setItem('token', token);
        setUser(userData);
        return { success: true };
      }
      return { success: false, error: 'Invalid response' };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;

