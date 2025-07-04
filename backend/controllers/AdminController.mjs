import User from '../models/User.mjs';
import Product from '../models/Product.mjs';
import upload from '../middleware/upload.mjs';

export default class AdminController {
  // Создание администратора
  static async createAdmin(req, res) {
    try {
      const { telephone, password, name, surname } = req.body;

      // Проверка прав текущего пользователя
      if (req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Доступ запрещен' });
      }

      // Проверка существования пользователя
      const existingUser = await User.findOne({ telephone });
      if (existingUser) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
      }

      // Хеширование пароля
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Создание администратора
      const admin = new User({
        telephone,
        password: hashedPassword,
        name,
        surname,
        role: 'admin'
      });

      await admin.save();

      res.status(201).json({
        message: 'Администратор создан',
        admin: {
          _id: admin._id,
          telephone: admin.telephone,
          name: admin.name,
          role: admin.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }

  // Получение списка пользователей
  static async getUsers(req, res) {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }

  // Удаление товара
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      await Product.findByIdAndDelete(id);
      res.json({ message: 'Товар удален' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }

  // Создание компонента
  static async addComponent(req, res) {
    try {
      const { name, description, price, category, specs } = req.body;
      
      if (!req.file) {
        return res.status(400).json({ error: 'Изображение обязательно' });
      }

      const product = new Product({
        name,
        description,
        price: Number(price),
        category,
        specs: JSON.parse(specs || '{}'),
        image: `/uploads/components/${req.file.filename}`
      });

      await product.save();
      
      res.status(201).json({
        message: 'Комплектующее добавлено',
        product
      });
    } catch (error) {
      res.status(500).json({ 
        error: 'Ошибка при добавлении',
        details: error.message 
      });
    }
  }

  // Получение всех комплектующих
static async getComponents(req, res) {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

static async addBuild(req, res) {
  try {
    const { name, description, components, totalPrice } = req.body;
    
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Доступ запрещен' });
    }

    const build = new Product({
      name,
      description,
      price: Number(totalPrice),
      category: 'build',
      specs: {
        components: JSON.parse(components)
      },
      image: req.file ? `/uploads/builds/${req.file.filename}` : ''
    });

    await build.save();
    
    res.status(201).json({
      message: 'Сборка добавлена',
      build
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
}