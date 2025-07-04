import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="h-100"
    >
      <Card className="h-100 border-0 shadow-sm">
        <div className="position-relative">
          <Card.Img 
            variant="top" 
            src={product.image} 
            alt={product.name}
            style={{ height: '200px', objectFit: 'contain', padding: '1rem' }}
          />
          {product.isNew && (
            <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
              NEW
            </Badge>
          )}
          <Button 
            variant="outline-secondary" 
            size="sm" 
            className="position-absolute top-0 end-0 m-2 rounded-circle"
            style={{ width: '34px', height: '34px' }}
          >
            <FaHeart />
          </Button>
        </div>
        
        <Card.Body className="d-flex flex-column">
          <Card.Title className="mb-2">{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {product.category}
          </Card.Subtitle>
          
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0 text-primary">{product.price} ₽</h5>
              {product.stock > 0 ? (
                <Badge bg="success">В наличии</Badge>
              ) : (
                <Badge bg="secondary">Под заказ</Badge>
              )}
            </div>
            
            <Button variant="primary" className="w-100">
              <FaShoppingCart className="me-2" />
              В корзину
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ProductCard;