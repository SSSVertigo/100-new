import React, { useEffect } from 'react';
import { 
  Container, Table, Button, Alert, 
  Spinner, Row, Col, Card 
} from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTrash, FaTimes } from 'react-icons/fa';
import useCartStore from '../store/useCartStore';

const CartPage = () => {
  const { 
    cart, 
    fetchCart, 
    removeFromCart, 
    clearCart,
    getTotalPrice,
    isLoading 
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const styles = {
    page: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      minHeight: '100vh',
      color: '#f8f8f8',
      paddingTop: '80px'
    },
    title: {
      color: '#00ffcc',
      textShadow: '0 0 10px rgba(0, 255, 204, 0.3)'
    },
    card: {
      background: 'rgba(45, 45, 45, 0.8)',
      border: '1px solid #444',
      borderRadius: '12px',
      color: '#f8f8f8'
    },
    table: {
      backgroundColor: 'rgba(50, 50, 50, 0.9)',
      color: '#fff',
      overflow: 'hidden'
    },
    tableHeader: {
      background: 'rgba(0, 255, 204, 0.1)',
      borderColor: '#00ffcc'
    },
    price: {
      color: '#00ffcc',
      fontWeight: 'bold'
    },
    buttonGroup: {
      background: 'rgba(40, 40, 40, 0.8)',
      border: '1px solid #00ffcc',
      borderRadius: '12px',
      padding: '20px'
    }
  };

  return (
    <div style={styles.page}>
      <Container className="py-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-center mb-4" style={styles.title}>
            <FaShoppingCart className="me-2" />
            Ваша корзина
          </h2>

          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-white">Загрузка корзины...</p>
            </div>
          ) : cart?.items?.length === 0 ? (
            <Alert variant="info" className="text-center">
              Корзина пуста
            </Alert>
          ) : (
            <>
              <div style={styles.table}>
                <Table striped bordered hover variant="dark">
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th>Товар</th>
                      <th>Цена</th>
                      <th>Количество</th>
                      <th>Сумма</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.items?.map(item => (
                      <motion.tr
                        key={item._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <td>
                          {item.itemType === 'Build' 
                            ? `Сборка: ${item.item.name}` 
                            : item.item.name}
                        </td>
                        <td style={styles.price}>
                          {item.itemType === 'Build' 
                            ? item.item.totalPrice?.toLocaleString('ru-RU')
                            : item.item.price?.toLocaleString('ru-RU')} ₽
                        </td>
                        <td>{item.quantity}</td>
                        <td style={styles.price}>
                          {(item.itemType === 'Build' 
                            ? item.item.totalPrice * item.quantity 
                            : item.item.price * item.quantity)?.toLocaleString('ru-RU')} ₽
                        </td>
                        <td className="text-center">
                          <Button 
                            variant="link" 
                            onClick={() => removeFromCart(item.item._id, item.itemType)}
                            className="text-danger"
                          >
                            <FaTimes size={20} />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <Row className="mt-4 justify-content-end">
                <Col md={6}>
                  <Card style={styles.buttonGroup}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="mb-0" style={styles.price}>
                        Итого: {getTotalPrice()?.toLocaleString('ru-RU')} ₽
                      </h4>
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-danger" 
                          onClick={clearCart}
                          className="d-flex align-items-center"
                        >
                          <FaTrash className="me-2" />
                          Очистить
                        </Button>
                        <Button 
                          variant="success"
                          style={{ 
                            background: '#00ffcc', 
                            borderColor: '#00ffcc', 
                            color: '#000' 
                          }}
                        >
                          Оформить
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default CartPage;