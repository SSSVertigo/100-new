import express from 'express';
import ProductController from '../controllers/ProductController.mjs';
import upload from '../middleware/upload.mjs';
import { checkAuth, isAdmin } from '../middleware/auth.mjs';

const router = express.Router();

router.post('/',checkAuth,isAdmin,upload.fields([{ name: 'image', maxCount: 1 },{ name: 'modelGlb', maxCount: 1 }]),ProductController.create);

router.get('/', ProductController.getAll);

router.delete('/:id', checkAuth, isAdmin, ProductController.delete);

export default router;