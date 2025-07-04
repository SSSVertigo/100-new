import express from 'express';
import AdminController from '../controllers/AdminController.mjs';
import { checkAuth, isAdmin } from '../middleware/auth.mjs';
import upload from '../middleware/upload.mjs';

const router = express.Router();

router.post('/create-admin', checkAuth, isAdmin, AdminController.createAdmin);
router.get('/users', checkAuth, isAdmin, AdminController.getUsers);
router.delete('/products/:id', checkAuth, isAdmin, AdminController.deleteProduct);
router.post('/components', checkAuth, isAdmin, upload.single('image'), AdminController.addComponent);
router.get('/components', checkAuth, isAdmin, AdminController.getComponents);
router.post('/builds', checkAuth, isAdmin, upload.single('image'), AdminController.addBuild);
// router.get('/builds', checkAuth, isAdmin, AdminController.getBuilds);

export default router;