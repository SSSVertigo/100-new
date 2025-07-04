import Build from '../models/Build.mjs';
import Product from '../models/Product.mjs';

export default class BuildController {
  // Создание новой сборки
  static async create(req, res) {
    try {
      const { name, description, products } = req.body;
      
      // Проверяем существование всех продуктов
      const existingProducts = await Product.find({ 
        _id: { $in: products.map(p => p.productId) } 
      });
      
      if (existingProducts.length !== products.length) {
        return res.status(400).json({ error: 'Некоторые товары не найдены' });
      }

      // Рассчитываем общую цену
      const totalPrice = products.reduce((total, item) => {
        const product = existingProducts.find(p => p._id.equals(item.productId));
        return total + (product.price * item.quantity);
      }, 0);

      const build = new Build({
        name,
        description,
        user: req.userId,
        products,
        totalPrice
      });

      await build.save();
      res.status(201).json(build);
    } catch (error) {
      res.status(500).json({ 
        error: 'Ошибка при создании сборки',
        details: error.message 
      });
    }
  }

  // Получение всех сборок пользователя
  static async getUserBuilds(req, res) {
    try {
      const builds = await Build.find({ user: req.userId })
        .populate('products.productId');
      res.json(builds);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

    static async getBuilds(req, res) {
   try {
    const builds = await Build.find()
      .populate('user', 'name email')
      .populate('products.productId', 'name category price');
    
    res.json(builds);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получение сборки по ID
  static async getById(req, res) {
    try {
      const build = await Build.findById(req.params.id)
        .populate('products.productId');
      
      if (!build) {
        return res.status(404).json({ error: 'Сборка не найдена' });
      }

      // Проверяем права доступа
      if (build.user.toString() !== req.userId && req.userRole !== 'admin') {
        return res.status(403).json({ error: 'Нет доступа' });
      }

      res.json(build);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Удаление сборки
  static async delete(req, res) {
    try {
      const build = await Build.findByIdAndDelete(req.params.id);
      
      if (!build) {
        return res.status(404).json({ error: 'Сборка не найдена' });
      }

      res.json({ message: 'Сборка успешно удалена' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}