import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let basePath = 'public/uploads/';
    if (file.fieldname === 'image') basePath += 'products/';
    if (file.fieldname.startsWith('model')) basePath += 'models3d/';
    cb(null, basePath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedImage = /jpeg|jpg|png|webp/;
  const allowedModels = /glb|gltf/;
  
  if (file.fieldname === 'image') {
    const validExt = allowedImage.test(path.extname(file.originalname));
    const validMime = allowedImage.test(file.mimetype);
    if (validExt && validMime) cb(null, true);
    else cb(new Error('Недопустимый тип изображения'), false);
  } 
  else if (file.fieldname.startsWith('model')) {
    const ext = path.extname(file.originalname).substring(1);
    if (allowedModels.test(ext)) cb(null, true);
    else cb(new Error('Разрешены только GLB и GLTF'), false);
  }
  else {
    cb(new Error('Недопустимое поле'), false);
  }
};

export default multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});