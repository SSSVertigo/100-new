import express from 'express';
import BuildController from '../controllers/BuildController.mjs';
import {checkAuth} from '../middleware/auth.mjs'

const router = express.Router();

// Создание сборки
router.post('/', checkAuth, BuildController.create);

// Получение сборок пользователя
router.get('/my', checkAuth, BuildController.getUserBuilds);

router.get('/', BuildController.getBuilds);

// Получение конкретной сборки
router.get('/:id', checkAuth, BuildController.getById);

// Удаление сборки
router.delete('/:id', checkAuth, BuildController.delete);

export default router;