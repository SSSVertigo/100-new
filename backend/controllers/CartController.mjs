import User from '../models/User.mjs';
import Product from '../models/Product.mjs';
import Build from '../models/Build.mjs';

export default class CartController {
  // Добавление товара или сборки в корзину
  static async addToCart(req, res) {
    try {
      const { itemId, quantity = 1, itemType } = req.body;
      
      // Проверка типа элемента
      let model;
      if (itemType === 'Product') {
        model = Product;
      } else if (itemType === 'Build') {
        model = Build;
      } else {
        return res.status(400).json({ error: 'Неверный тип элемента. Допустимые значения: Product, Build' });
      }

      // Проверка существования элемента
      const item = await model.findById(itemId);
      if (!item) {
        return res.status(404).json({ error: 'Элемент не найден' });
      }

      const user = await User.findById(req.userId);
      const existingItem = user.cart.find(i => 
        i.item.toString() === itemId && i.itemType === itemType
      );

      if (existingItem) {
        existingItem.quantity += Number(quantity);
      } else {
        user.cart.push({ 
          item: itemId, 
          itemType, 
          quantity: Number(quantity) 
        });
      }

      await user.save();
      res.json(await CartController.getFormattedCart(user));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получение корзины пользователя
  static async getCart(req, res) {
    try {
      const user = await User.findById(req.userId);
      res.json(await CartController.getFormattedCart(user));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Изменение количества товара/сборки в корзине
  static async updateQuantity(req, res) {
    try {
      const { itemId } = req.params;
      const { quantity, itemType } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({ error: 'Некорректное количество' });
      }

      const user = await User.findById(req.userId);
      const item = user.cart.find(i => 
        i.item.toString() === itemId && i.itemType === itemType
      );

      if (!item) {
        return res.status(404).json({ error: 'Элемент не найден в корзине' });
      }

      item.quantity = Number(quantity);
      await user.save();
      res.json(await CartController.getFormattedCart(user));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Удаление товара/сборки из корзины
  static async removeFromCart(req, res) {
    try {
      const { itemId } = req.params;
      const { itemType } = req.body;

      const user = await User.findById(req.userId);
      user.cart = user.cart.filter(i => 
        !(i.item.toString() === itemId && i.itemType === itemType)
      );

      await user.save();
      res.json(await this.getFormattedCart(user));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Очистка корзины
  static async clearCart(req, res) {
    try {
      const user = await User.findById(req.userId);
      user.cart = [];
      await user.save();
      res.json({ items: [], total: 0 });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Унифицированный метод для форматирования корзины
  static async getFormattedCart(user) {
    if (!user?.cart) return { items: [], total: 0 };

    await user.populate({
      path: 'cart.item',
      model: ['Product', 'Build']
    });

    const items = user.cart.map(item => ({
      _id: item._id,
      item: item.item,
      itemType: item.itemType,
      quantity: item.quantity,
      price: item.itemType === 'Product' 
        ? item.item.price 
        : item.item.totalPrice,
      total: (item.itemType === 'Product' 
        ? item.item.price 
        : item.item.totalPrice) * item.quantity
    }));

    const total = items.reduce((sum, item) => sum + item.total, 0);

    return { items, total };
  }

  // Добавление сборки как набора продуктов
static async addBuildToCart(req, res) {
  try {
    const { build } = req.body; // Получаем всю сборку из тела запроса
    
    // Проверяем обязательные поля
    if (!build?.products || !Array.isArray(build.products)) {
      return res.status(400).json({ error: 'Неверный формат сборки' });
    }

    const user = await User.findById(req.userId);

    // Добавляем каждый продукт из сборки в корзину
    for (const product of build.products) {
      // Проверяем существование продукта
      const dbProduct = await Product.findById(product.productId);
      if (!dbProduct) {
        return res.status(404).json({ error: `Продукт ${product.productId} не найден` });
      }

      const existingItem = user.cart.find(i => 
        i.item.toString() === product.productId && 
        i.itemType === 'Product'
      );

      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      } else {
        user.cart.push({
          item: product.productId,
          itemType: 'Product',
          quantity: product.quantity || 1
        });
      }
    }

    await user.save();
    res.json(await this.getFormattedCart(user));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
}