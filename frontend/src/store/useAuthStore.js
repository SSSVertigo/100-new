import { create } from 'zustand';
import apiClient from '../api/api';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,

  checkAuth: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get('/auth/me');
      set({ 
        isAuthenticated: true,
        user: response.data.user,
        loading: false 
      });
      return response.data.user;
    } catch (error) {
      set({ 
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error.response?.data?.message || error.message
      });
      return null;
    }
  },

register: async (formData) => {
  set({ loading: true, error: null });
  try {
    const response = await apiClient.post('/auth/register', formData);
      
      set({ 
        isAuthenticated: true,
        user: response.data.user,
        loading: false 
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      set({ error: errorMessage, loading: false });
      throw errorMessage;
    }
  },

  login: async (telephone, password) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post('/auth/login', { telephone, password });
      set({ 
        isAuthenticated: true,
        user: response.data.user,
        loading: false 
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      set({ error: errorMessage, loading: false });
      throw errorMessage;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await apiClient.post('/auth/logout');
      set({ 
        isAuthenticated: false,
        user: null,
        loading: false 
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  }
}));

export default useAuthStore;