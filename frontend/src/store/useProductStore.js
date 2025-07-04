import { create } from 'zustand';
import apiClient from '../api/api';

const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  // Получение всех продуктов
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/products');
      set({ products: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch products', isLoading: false });
    }
  },

  // Создание продукта с изображением и 3D моделями
  createProduct: async (productData, imageFile, modelGlbFile, modelGltfFile) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      
      // Добавляем текстовые данные
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('category', productData.category);
      formData.append('specs', JSON.stringify(productData.specs || {}));
      
      // Добавляем файлы
      formData.append('image', imageFile);
      formData.append('modelGlb', modelGlbFile);
      formData.append('modelGltf', modelGltfFile);

      const response = await apiClient.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      set(state => ({
        products: [...state.products, response.data],
        isLoading: false
      }));
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Failed to create product';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // Обновление продукта
  updateProduct: async (id, productData, files) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      
      // Добавляем текстовые данные
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('category', productData.category);
      formData.append('specs', JSON.stringify(productData.specs || {}));
      
      // Добавляем файлы, если они есть
      if (files?.image) formData.append('image', files.image);
      if (files?.modelGlb) formData.append('modelGlb', files.modelGlb);

      const response = await apiClient.put(`/admin/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      set(state => ({
        products: state.products.map(p => 
          p._id === id ? response.data : p
        ),
        isLoading: false
      }));
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Failed to update product';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  // Удаление продукта
deleteProduct: async (id) => {
  set({ isLoading: true, error: null });
  try {
    await apiClient.delete(`/products/${id}`);
    set(state => ({
      products: state.products.filter(p => p._id !== id),
      isLoading: false
    }));
  } catch (error) {
    const errorMessage = error.response?.data?.error || 
                       error.message || 
                       'Ошибка при удалении продукта';
    set({ error: errorMessage, isLoading: false });
    throw errorMessage;
  }
},


  // Получение продукта по ID
  getProductById: (id) => {
    return useProductStore.getState().products.find(p => p._id === id);
  },

  // Сброс ошибок
  resetError: () => set({ error: null })
}));

export default useProductStore;