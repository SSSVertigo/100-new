import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Не авторизован' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Не авторизован' });
  }
};

export const isAdmin = (req, res, next) => {
  console.log('isAdmin middleware - userRole:', req.userRole);
  if (req.userRole !== 'admin') {
    console.log('Access denied - not admin');
    return res.status(403).json({ message: 'Нет доступа' });
  }
  next();
};