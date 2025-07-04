import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import connectDB from './config/db.mjs';
import authRoutes from './routes/auth.mjs';
import adminRoutes from './routes/admin.mjs';
import productRoutes from './routes/products.mjs';
import buildRoutes from './routes/builds.mjs'
import cartRoutes from './routes/cart.mjs'
import mongoose from 'mongoose';

const app = express();

// База данных
mongoose.set('debug', true);
connectDB();

// Middleware

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Роуты
app.use('/public/uploads', express.static('public/uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/builds', buildRoutes);
app.use('/api/cart', cartRoutes);

// Запуск сервера
const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`);});