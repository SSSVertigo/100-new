import { create } from 'zustand';
import apiClient from '../api/api';

const useBuildStore = create((set) => ({
  builds: [],
  currentBuild: null,
  isLoading: false,
  error: null,

  // Получение всех сборок
  getAllBuilds: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/builds');
      set({ 
        builds: response.data,
        isLoading: false 
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Ошибка при загрузке сборок';
      set({ 
        error: errorMessage,
        isLoading: false 
      });
    }
  },

  // Создание новой сборки
  createBuild: async (buildData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post('/builds', {
        name: buildData.name,
        description: buildData.description,
        products: buildData.products.map(p => ({
          productId: p.productId,
          quantity: p.quantity
        }))
      });
      
      set(state => ({
        builds: [...state.builds, response.data],
        isLoading: false
      }));
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Ошибка при создании сборки';
      set({ error: errorMessage, isLoading: false });
      throw errorMessage;
    }
  },

  // Получение сборок текущего пользователя
  getUserBuilds: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/builds/user');
      set({ 
        builds: response.data,
        isLoading: false 
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Ошибка при загрузке сборок';
      set({ 
        error: errorMessage,
        isLoading: false 
      });
    }
  },

  // Получение конкретной сборки
  getBuildById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get(`/builds/${id}`);
      set({ 
        currentBuild: response.data,
        isLoading: false 
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Ошибка при загрузке сборки';
      set({ 
        error: errorMessage,
        isLoading: false 
      });
      throw errorMessage;
    }
  },

  // Удаление сборки
  deleteBuild: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.delete(`/builds/${id}`);
      set(state => ({
        builds: state.builds.filter(build => build._id !== id),
        currentBuild: state.currentBuild?._id === id ? null : state.currentBuild,
        isLoading: false
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Ошибка при удалении сборки';
      set({ 
        error: errorMessage,
        isLoading: false 
      });
      throw errorMessage;
    }
  },

  // Дополнительные методы
  resetError: () => set({ error: null }),
  clearCurrentBuild: () => set({ currentBuild: null })
}));

export default useBuildStore;