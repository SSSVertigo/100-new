import { create } from 'zustand';
import apiClient from '../api/api';

const useAdminStore = create((set) => ({
  users: [],
  components: [],
  isLoading: false,
  error: null,

  getUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/admin/users');
      set({ users: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message, isLoading: false });
    }
  },

  createAdmin: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post('/admin/create-admin', userData);
      set(state => ({
        users: [...state.users, response.data.admin],
        isLoading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message, isLoading: false });
      throw error;
    }
  },

  getComponents: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/admin/components');
      set({ components: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message, isLoading: false });
    }
  },

  addComponent: async (componentData, image) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append('name', componentData.name);
      formData.append('description', componentData.description);
      formData.append('price', componentData.price);
      formData.append('category', componentData.category);
      formData.append('specs', JSON.stringify(componentData.specs));
      formData.append('image', image);

      const response = await apiClient.post('/admin/components', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      set(state => ({
        components: [...state.components, response.data.product],
        isLoading: false
      }));
      
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message, isLoading: false });
      throw error;
    }
  }
}));

export default useAdminStore;