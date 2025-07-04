import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.mjs';

export default class AuthController {
  // Регистрация
  static async register(req, res) {
    try {
      const { telephone, password, name, surname, patronymic } = req.body;

      // Проверка существования пользователя
      const existingUser = await User.findOne({ telephone });
      if (existingUser) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
      }

      // Хеширование пароля
      const hashedPassword = await bcrypt.hash(password, 5);

      // Создание пользователя
      const newUser = new User({
        telephone,
        password: hashedPassword,
        name,
        surname,
        patronymic,
        role: 'user'
      });

      await newUser.save();

      // Генерация JWT токена
      const token = jwt.sign(
        { userId: newUser._id, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 дней
      });

      res.status(201).json({
        message: 'Пользователь зарегистрирован',
        user: {
          _id: newUser._id,
          telephone: newUser.telephone,
          name: newUser.name,
          role: newUser.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }

  // Авторизация
  static async login(req, res) {
    try {
      const { telephone, password } = req.body;

      // Поиск пользователя
      const user = await User.findOne({ telephone });
      if (!user) {
        return res.status(401).json({ message: 'Неверные учетные данные' });
      }

      // Проверка пароля
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Неверные учетные данные' });
      }

      // Генерация токена
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
      });

      res.json({
        message: 'Авторизация успешна',
        user: {
          _id: user._id,
          telephone: user.telephone,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка сервера', error: error.message });
    }
  }

  // Выход
  static async logout(req, res) {
    res.clearCookie('token');
    res.json({ message: 'Вы успешно вышли' });
  }

  // Получение текущего пользователя
static async getMe(req, res) {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json({       user: {
        _id: user._id,
        telephone: user.telephone,
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
        role: user.role,
        createdAt: user.createdAt
      } });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
}
}