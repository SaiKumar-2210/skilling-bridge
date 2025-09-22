// Real authentication service connecting to MongoDB backend

const API_BASE_URL = 'http://localhost:5000/api';

interface User {
  id: string;
  email: string;
  role: 'student' | 'faculty' | 'industry' | 'admin';
  profile: {
    firstName: string;
    lastName: string;
    college?: string;
    department?: string;
    studentId?: string;
    phone?: string;
    avatar?: string;
    company?: string;
    designation?: string;
    yearOfStudy?: string;
  };
  isVerified: boolean;
  lastLogin?: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

// API helper function
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('auth-token');
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API call failed');
  }

  return data;
};

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (data.success && data.token) {
        localStorage.setItem('auth-token', data.token);
      }

      return data;
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed',
      };
    }
  },

  async register(userData: {
    email: string;
    password: string;
    role: 'student' | 'faculty' | 'industry' | 'admin';
    profile: {
      firstName: string;
      lastName: string;
      college?: string;
      department?: string;
      studentId?: string;
      phone?: string;
      company?: string;
      designation?: string;
      yearOfStudy?: string;
    };
  }): Promise<RegisterResponse> {
    try {
      const data = await apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (data.success && data.token) {
        localStorage.setItem('auth-token', data.token);
      }

      return data;
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Registration failed',
      };
    }
  },

  async getCurrentUser(token?: string): Promise<User | null> {
    try {
      const data = await apiCall('/auth/me');
      return data.user || null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  async updateProfile(profileData: Partial<User['profile']>): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const data = await apiCall('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify({ profile: profileData }),
      });
      return data;
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Profile update failed',
      };
    }
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      const data = await apiCall('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      return data;
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Password change failed',
      };
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem('auth-token');
  },
};

