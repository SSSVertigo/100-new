import express from 'express';
import CartController from '../controllers/CartController.mjs';
import { checkAuth } from '../middleware/auth.mjs';

const router = express.Router();

// Добавить товар в корзину
router.post('/', checkAuth, CartController.addToCart);

// Добавить сборку в корзину
router.post('/build', checkAuth, CartController.addBuildToCart);

// Получить корзину пользователя
router.get('/', checkAuth, CartController.getCart);

// Обновить количество товара
router.put('/:itemId', checkAuth, CartController.updateQuantity);

// Удалить товар из корзины
router.delete('/:itemId', checkAuth, CartController.removeFromCart);

// Очистить корзину
router.delete('/', checkAuth, CartController.clearCart);

export default router;