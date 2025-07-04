import express from 'express';
import AuthController from '../controllers/AuthController.mjs'
import { checkAuth } from '../middleware/auth.mjs';
const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/me', checkAuth,AuthController.getMe);

export default router;