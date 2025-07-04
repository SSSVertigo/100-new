import Product from '../models/Product.mjs';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class ProductController {
  static async create(req, res) {
    try {
      const { files } = req;
      
      // Проверка наличия всех файлов
      // if (!files?.image || !files?.modelGlb || !files?.modelGltf) {
      //   return res.status(400).json({ error: 'Необходимо загрузить все файлы' });
      // }

      // Извлекаем первый файл из каждого поля
      const imageFile = files.image[0];
      const glbFile = files.modelGlb[0];

      // Проверка наличия файлов после извлечения
      if (!imageFile || !glbFile ) {
        return res.status(400).json({ error: 'Ошибка обработки файлов' });
      }

      const product = new Product({
        ...req.body,
        price: Number(req.body.price),
        image: `/uploads/products/${imageFile.filename}`,
        model3D: {
          glb: `/uploads/models3d/${glbFile.filename}`
        },
        specs: JSON.parse(req.body.specs || '{}')
      });

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
      
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Продукт не найден' });
      }

      const publicPath = path.join(__dirname, '../public');

      // Асинхронное удаление файлов с обработкой ошибок
      const deleteOperations = [];
      
      if (deletedProduct.image) {
        const imagePath = path.join(publicPath, deletedProduct.image);
        deleteOperations.push(
          fs.unlink(imagePath).catch(error => 
            console.log('Ошибка удаления изображения:', error.message))
        );
      }

      if (deletedProduct.model3D?.glb) {
        const modelPath = path.join(publicPath, deletedProduct.model3D.glb);
        deleteOperations.push(
          fs.unlink(modelPath).catch(error => 
            console.log('Ошибка удаления 3D модели:', error.message))
        );
      }

      // Ожидаем завершения всех операций удаления
      await Promise.all(deleteOperations);

      res.json({ message: 'Продукт успешно удален' });
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      res.status(500).json({ error: 'Ошибка при удалении продукта' });
    }
  }
}