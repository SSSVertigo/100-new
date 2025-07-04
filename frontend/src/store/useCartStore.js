import { create } from 'zustand';
import apiClient from '../api/api';

const useCartStore = create((set) => ({
  cart: null,
  isLoading: false,
  error: null,

  // Получение корзины
  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/cart');
      set({ cart: response.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message || 'Ошибка загрузки корзины',
        isLoading: false 
      });
    }
  },

  // Добавление элемента (продукта или сборки)
  addToCart: async (itemId, itemType, quantity = 1) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.post('/cart', { 
        itemId, 
        itemType, 
        quantity 
      });
      const response = await apiClient.get('/cart');
      set({ cart: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message || 'Ошибка добавления в корзину',
        isLoading: false 
      });
      throw error;
    }
  },

  // Добавление сборки как набора продуктов
addBuildToCart: async (build) => {
  set({ isLoading: true, error: null });
  try {
    await apiClient.post('/cart/build', { build });
    const response = await apiClient.get('/api/cart');
    set({ cart: response.data, isLoading: false });
    return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message || 'Ошибка добавления сборки',
        isLoading: false 
      });
      throw error;
    }
  },

  // Изменение количества элемента
  updateQuantity: async (itemId, itemType, quantity) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.put(`/cart/${itemId}`, { 
        quantity, 
        itemType 
      });
      const response = await apiClient.get('/cart');
      set({ cart: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message || 'Ошибка обновления количества',
        isLoading: false 
      });
      throw error;
    }
  },

  // Удаление элемента из корзины
  removeFromCart: async (itemId, itemType) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.delete(`/cart/${itemId}`, { 
        data: { itemType } 
      });
      const response = await apiClient.get('/cart');
      set({ cart: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message || 'Ошибка удаления из корзины',
        isLoading: false 
      });
      throw error;
    }
  },

  // Очистка корзины
  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.delete('/cart');
      set({ cart: null, isLoading: false });
      return null;
    } catch (error) {
      set({ 
        error: error.response?.data?.message || error.message || 'Ошибка очистки корзины',
        isLoading: false 
      });
      throw error;
    }
  },

  // Сброс ошибок
  resetError: () => set({ error: null }),

  // Вычисление общего количества элементов в корзине
  getTotalItems: () => {
    const cart = useCartStore.getState().cart;
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  },

  // Вычисление общей суммы
  getTotalPrice: () => {
    const cart = useCartStore.getState().cart;
    if (!cart?.total) return 0;
    return cart.total;
  }
}));

export default useCartStore;