import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaPhone, FaArrowRight } from "react-icons/fa";
import useAuthStore from "../store/useAuthStore";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    patronymic: "",
    telephone: "",
    password: "",
    confirmPassword: "",
  });
  
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  
  const { register, loading, error, isAuthenticated, checkAuth } = useAuthStore();

  // Проверяем аутентификацию при загрузке
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Перенаправляем если уже авторизован
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Имя обязательно";
    if (!formData.surname.trim()) errors.surname = "Фамилия обязательна";
    if (!formData.telephone.trim()) errors.telephone = "Телефон обязателен";
    if (!formData.password) errors.password = "Пароль обязателен";
    if (formData.password.length < 6) errors.password = "Пароль должен быть не менее 6 символов";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Пароли не совпадают";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Очищаем ошибку при изменении поля
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) return;

    const data = {
      name: formData.name,
      surname: formData.surname,
      patronymic: formData.patronymic,
      telephone: formData.telephone,
      password: formData.password
    };

    try {
      await register(data);
      navigate('/login');
    } catch (error) {
      // Ошибка уже обработана в хранилище
    }
  };

  return (
    <div className="signup-page" style={{
      background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
      minHeight: "105vh",
      display: "flex",
      alignItems: "center",
      padding: "20px 0"
    }}>
      <style>
        {`
          .signup-card {
            background: rgba(30, 30, 30, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 255, 204, 0.3);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 255, 204, 0.1);
            padding: 2.5rem;
            margin-top: 1.5rem;
          }
          .form-label {
            color: #F0F0F0 !important;
            margin-bottom: 0.75rem;
            font-weight: 500;
          }
          .form-group {
            position: relative;
            margin-bottom: 1.5rem;
          }
          .form-row {
            margin-bottom: 1.5rem;
          }
          .form-control {
            background: rgba(50, 50, 50, 0.7);
            border: 1px solid #444;
            color: #FFFFFF;
            padding-left: 38px;
            height: 50px;
            font-weight: 400;
          }
          .form-control.is-invalid {
            border-color: #dc3545;
          }
          .form-control:focus {
            background: white;
            border-color: #00ffcc;
            box-shadow: 0 0 0 0.25rem rgba(0, 255, 204, 0.25);
            color: #4B0082;
          }
          .form-control::placeholder {
            color: #BBBBBB !important;
            font-weight: 300;
          }
          .signup-btn {
            background: linear-gradient(45deg, #00ffcc, #0099ff);
            border: none;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            transition: all 0.3s ease;
          }
          .signup-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 204, 0.4);
          }
          .signup-btn:disabled {
            background: #6c757d;
            cursor: not-allowed;
          }
          .input-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #00ffcc;
            z-index: 4;
          }
          .invalid-feedback {
            color: #ff6b6b;
            margin-top: 0.25rem;
          }
        `}
      </style>

      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="signup-card"
            >
              <div className="text-center mb-5">
                <h2 style={{ 
                  color: '#00ffcc', 
                  fontWeight: '800',
                  letterSpacing: '1px',
                  marginBottom: '1rem'
                }}>
                  СОЗДАЙ АККАУНТ
                </h2>
                <p style={{ color: '#DCDCDC' }}>Заполни форму и присоединяйся</p>
              </div>

              <Form onSubmit={handleSubmit} noValidate>
                <Row className="form-row">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Имя</Form.Label>
                      <div className="input-icon">
                        <FaUser size={15} />
                      </div>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Введите имя"
                        value={formData.name}
                        onChange={handleChange}
                        isInvalid={!!formErrors.name}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Фамилия</Form.Label>
                      <div className="input-icon">
                        <FaUser size={14} />
                      </div>
                      <Form.Control
                        type="text"
                        name="surname"
                        placeholder="Введите фамилию"
                        value={formData.surname}
                        onChange={handleChange}
                        isInvalid={!!formErrors.surname}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.surname}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Label>Отчество</Form.Label>
                  <div className="input-icon">
                    <FaUser size={14} />
                  </div>
                  <Form.Control
                    type="text"
                    name="patronymic"
                    placeholder="Введите отчество (необязательно)"
                    value={formData.patronymic}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Телефон</Form.Label>
                  <div className="input-icon">
                    <FaPhone size={14} />
                  </div>
                  <Form.Control
                    type="text"
                    name="telephone"
                    placeholder="Введите телефон"
                    value={formData.telephone}
                    onChange={handleChange}
                    isInvalid={!!formErrors.telephone}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.telephone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="form-row">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Пароль</Form.Label>
                      <div className="input-icon">
                        <FaLock size={14} />
                      </div>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Введите пароль"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!formErrors.password}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Подтвердите пароль</Form.Label>
                      <div className="input-icon">
                        <FaLock size={14} />
                      </div>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Подтвердите пароль"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!formErrors.confirmPassword}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <motion.div
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="mt-4"
                >
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 signup-btn py-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>СОЗДАНИЕ...</span>
                    ) : (
                      <>
                        СОЗДАТЬ АККАУНТ <FaArrowRight className="ms-2" />
                      </>
                    )}
                  </Button>
                </motion.div>

                <div className="text-center mt-5">
                  <p style={{ color: '#DCDCDC' }}>
                    Уже есть аккаунт?{' '}
                    <Link 
                      to="/login" 
                      style={{
                        color: '#00ffcc',
                        textDecoration: 'none',
                        fontWeight: '600'
                      }}
                    >
                      ВОЙДИ
                    </Link>
                  </p>
                </div>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;