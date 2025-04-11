
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';
import { User } from '../types/api';
import { toast } from "sonner";

// Define role-based permissions
type UserRole = 'User' | 'HR' | 'Recruiter' | 'Admin';

interface RolePermissions {
  dashboard: boolean;
  jobs: boolean;
  applications: boolean; 
  users: boolean;
  settings: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: { fullName: string; email: string; password: string; mobileNumber?: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  canAccessAdmin: boolean;
  userRole: UserRole | null;
  hasPermission: (feature: keyof RolePermissions) => boolean;
  rolePermissions: RolePermissions | null;
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define role permissions for each user type
const rolePermissionsMap: Record<UserRole, RolePermissions> = {
  Admin: {
    dashboard: true,
    jobs: true,
    applications: true,
    users: true,
    settings: true
  },
  HR: {
    dashboard: true,
    jobs: true,
    applications: true,
    users: true,
    settings: false
  },
  Recruiter: {
    dashboard: true,
    jobs: true,
    applications: true,
    users: false,
    settings: false
  },
  User: {
    dashboard: false,
    jobs: false,
    applications: false,
    users: false,
    settings: false
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [canAccessAdmin, setCanAccessAdmin] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [rolePermissions, setRolePermissions] = useState<RolePermissions | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);


  // Function to check user permissions for specific features
  const hasPermission = (feature: keyof RolePermissions): boolean => {
    if (!rolePermissions) return false;
    return rolePermissions[feature];
  };

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('currentUser');
    
      if (storedToken && storedUser) {
        const user = JSON.parse(storedUser) as User;
    
        setToken(storedToken);
        setCurrentUser(user);
        setIsAuthenticated(true);
        setUserRole(user.role as UserRole);
        setCanAccessAdmin(['Admin', 'HR', 'Recruiter'].includes(user.role));
        setRolePermissions(rolePermissionsMap[user.role as UserRole]);
      }
    
      // Set loading false once checked
      setLoading(false);
    }, []);
    

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authApi.login(email, password);
      
      // Store token and user data
      const { token, user } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      setToken(token);
      setCurrentUser(user);
      setIsAuthenticated(true);
      setUserRole(user.role as UserRole);
      
      const hasAdminAccess = 
        user.role === 'Admin' || 
        user.role === 'HR' || 
        user.role === 'Recruiter';
        
      setCanAccessAdmin(hasAdminAccess);
      setRolePermissions(rolePermissionsMap[user.role as UserRole]);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: { fullName: string; email: string; password: string; mobileNumber?: string }): Promise<boolean> => {
    try {
      await authApi.register(
        userData.fullName, 
        userData.email, 
        userData.password, 
        userData.mobileNumber || ''
      );
      
      // After successful registration, log the user in
      const loginResult = await login(userData.email, userData.password);
      return loginResult;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCanAccessAdmin(false);
    setUserRole(null);
    setRolePermissions(null);
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      register, 
      logout, 
      isAuthenticated,
      canAccessAdmin,
      userRole,
      hasPermission,
      rolePermissions,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
