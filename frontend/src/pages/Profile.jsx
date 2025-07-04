import React, { useState } from "react";
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  ListGroup, 
  Alert,
  Image,
  Tab,
  Tabs,
  Button,
  Badge
} from "react-bootstrap";
import { motion } from "framer-motion";
import { 
  FaUser, 
  FaPhone, 
  FaCalendarAlt,
  FaTools,
  FaReceipt,
  FaEdit,
  FaSignOutAlt,
  FaBolt,
  FaCrown,
  FaUserCog,
  FaMoneyBillWave,
  FaClipboardCheck
} from "react-icons/fa";
import useAuthStore from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Цветовая схема
  const colors = {
    primary: '#2c7be5',       // Синий (основной)
    secondary: '#6c757d',     // Серый
    success: '#00d97e',       // Зеленый
    danger: '#e63757',        // Красный
    light: '#f8f9fa',         // Светлый
    dark: '#12263f',          // Темный
    text: '#495057',          // Основной текст
    textLight: '#f8f9fa',     // Текст на темном
    background: '#4B0082',    // Фон
    cardBg: '#ffffff',        // Фон карточек
    border: '#e3ebf6'         // Границы
  };

  const profileStats = [
    { value: user.orders?.length || 0, label: "Заказов", icon: <FaReceipt size={20} color={colors.primary} /> },
    { value: `${user.discount || 0}%`, label: "Скидка", icon: <FaMoneyBillWave size={20} color={colors.primary} /> }
  ];

  return (
    <div style={{ 
      backgroundColor: colors.background,
      minHeight: "100vh",
      color: colors.text,
      marginTop:'70px',
    }}>
      {/* Hero секция профиля */}
      <section className="py-5" style={{ 
        background: ` #4B0082  100%)`,
        color: colors.textLight
      }}>
        <Container>
          <Row className="align-items-center">
            <Col md={4}>
              <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <Card className="border-0 shadow-lg" style={{ backgroundColor: colors.cardBg }}>
                  <Card.Body className="text-center">
                    {user.picture && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                      >
                        <Image 
                          src={`${import.meta.env.VITE_API}${user.picture}`} 
                          roundedCircle 
                          width={150}
                          height={150}
                          className="mb-3 border border-3"
                          style={{
                            transform: isHovered ? "scale(1.05)" : "scale(1)",
                            transition: "all 0.3s ease",
                            borderColor: colors.primary
                          }}
                        />
                      </motion.div>
                    )}
                    
                    <motion.h3 
                      className="fw-bold mb-2"
                      style={{ color: colors.primary }}
                    >
                      {user.name} {user.surname}
                    </motion.h3>
                    
                    <Badge bg="light" className="mb-3" style={{ color: colors.primary }}>
                      <FaUserCog className="me-1" />
                      Личный кабинет
                    </Badge>
                    
                    <ListGroup variant="flush" className="text-start">
                      <ListGroup.Item className="d-flex align-items-center">
                        <FaUser className="me-2" style={{ color: colors.primary }} />
                        <span>{user.patronymic || "Отчество не указано"}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex align-items-center">
                        <FaPhone className="me-2" style={{ color: colors.primary }} />
                        <span>{user.telephone}</span>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Tabs 
                  defaultActiveKey="profile" 
                  className="mb-3"
                  style={{ borderBottomColor: colors.primary }}
                >
                  <Tab 
                    eventKey="profile" 
                    title={
                      <motion.span whileHover={{ scale: 1.05 }} className="d-flex align-items-center">
                        <FaUser className="me-1" />
                        Профиль
                      </motion.span>
                    }
                  >
                    <Card className="border-0 shadow" style={{ backgroundColor: colors.cardBg }}>
                      <Card.Body>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Card.Title className="fw-bold" style={{ color: colors.primary }}>
                            Личная информация
                          </Card.Title>
                          
                          <Row className="g-3 mt-3">
                            {profileStats.map((stat, index) => (
                              <Col md={4} key={index}>
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.4 + index * 0.1 }}
                                >
                                  <Card className="border-0 text-center h-100" 
                                    style={{ 
                                      backgroundColor: colors.cardBg,
                                      border: `1px solid ${colors.border}`
                                    }}>
                                    <Card.Body>
                                      <div className="mb-2">
                                        {stat.icon}
                                      </div>
                                      <h4 style={{ color: colors.primary }}>{stat.value}</h4>
                                      <p className="mb-0" style={{ color: colors.text }}>{stat.label}</p>
                                    </Card.Body>
                                  </Card>
                                </motion.div>
                              </Col>
                            ))}
                          </Row>
                          
                          <motion.div
                            className="d-flex gap-3 mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            <Button 
                              variant="outline-primary" 
                              className="d-flex align-items-center"
                              onClick={() => navigate('/edit-profile')}
                              style={{ 
                                borderColor: colors.primary, 
                                color: colors.primary 
                              }}
                            >
                              <FaEdit className="me-2" />
                              Редактировать
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              className="d-flex align-items-center"
                              onClick={() => {
                                logout();
                                navigate('/login');
                              }}
                              style={{ 
                                borderColor: colors.danger, 
                                color: colors.danger 
                              }}
                            >
                              <FaSignOutAlt className="me-2" />
                              Выйти
                            </Button>
                          </motion.div>
                        </motion.div>
                      </Card.Body>
                    </Card>
                  </Tab>

                  <Tab 
                    eventKey="orders" 
                    title={
                      <motion.span whileHover={{ scale: 1.05 }} className="d-flex align-items-center">
                        <FaReceipt className="me-1" />
                        Мои заказы
                      </motion.span>
                    }
                  >
                    {user.orders?.length > 0 ? (
                      user.orders.map((order, index) => (
                        <motion.div
                          key={order._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="mb-3 border-0 shadow-sm" style={{ backgroundColor: colors.cardBg }}>
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-center">
                                <Card.Title className="mb-0">
                                  <FaBolt className="me-2" style={{ color: colors.primary }} />
                                  <span style={{ color: colors.primary }}>
                                    Заказ №{order._id.slice(-6).toUpperCase()}
                                  </span>
                                </Card.Title>
                                <Badge bg="light" style={{ color: colors.primary }}>
                                  {new Date(order.appointment_date).toLocaleDateString()}
                                </Badge>
                              </div>
                              
                              <ListGroup variant="flush" className="mt-3">
                                <ListGroup.Item className="d-flex align-items-center">
                                  <FaCalendarAlt className="me-2" style={{ color: colors.primary }} />
                                  <strong>Дата записи:</strong> 
                                  <span className="ms-2">
                                    {new Date(order.appointment_date).toLocaleString()}
                                  </span>
                                </ListGroup.Item>
                                
                                <ListGroup.Item>
                                  <div className="d-flex align-items-center">
                                    <FaTools className="me-2" style={{ color: colors.primary }} />
                                    <strong>Услуги:</strong>
                                  </div>
                                  <ul className="mt-2 ps-4">
                                    {order.services.map((service) => (
                                      <li key={service._id} className="mb-1">
                                        <span style={{ color: colors.primary }}>►</span> {service.name} - 
                                        <span className="fw-bold" style={{ color: colors.primary }}> {service.cost} руб.</span>
                                      </li>
                                    ))}
                                  </ul>
                                </ListGroup.Item>
                                
                                <ListGroup.Item className="d-flex align-items-center">
                                  <strong>Общая стоимость:</strong> 
                                  <span className="ms-2 fw-bold" style={{ color: colors.success }}>
                                    {order.amount} руб.
                                  </span>
                                </ListGroup.Item>
                                
                                <ListGroup.Item className="d-flex align-items-center">
                                  <strong>Статус:</strong> 
                                  <Badge bg="light" className="ms-2" style={{ color: colors.primary }}>
                                    <FaClipboardCheck className="me-1" />
                                    {order.status || "В обработке"}
                                  </Badge>
                                </ListGroup.Item>
                              </ListGroup>
                            </Card.Body>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Alert variant="light" className="text-center border-0 shadow">
                          <h5 style={{ color: colors.primary }}>У вас пока нет заказов 😕</h5>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="mt-3"
                          >
                            <Link 
                              to="/services" 
                              className="btn btn-primary"
                              style={{ 
                                backgroundColor: colors.primary, 
                                borderColor: colors.primary
                              }}
                            >
                              Начать собирать свой ПК
                            </Link>
                          </motion.div>
                        </Alert>
                      </motion.div>
                    )}
                  </Tab>
                </Tabs>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Profile;