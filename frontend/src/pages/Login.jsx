import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaArrowRight } from "react-icons/fa";
import useAuthStore from "../store/useAuthStore";

const Login = () => {
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  
  const { login, loading, error, isAuthenticated, checkAuth } = useAuthStore();

  // Проверяем аутентификацию при загрузке компонента
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
    if (!telephone) errors.telephone = "Телефон обязателен";
    if (!password) errors.password = "Пароль обязателен";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    try {
      await login(telephone, password);
      // После успешного входа перенаправление произойдет благодаря useEffect
    } catch (error) {
      // Ошибка уже обработана в хранилище
    }
  };

  return (
    <div className="login-page" style={{
      background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%)",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    }}>
      <style>
        {`
          .login-card {
            background: rgba(30, 30, 30, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 255, 204, 0.3);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 255, 204, 0.1);
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
          .form-control::placeholder {
            color: #BBBBBB !important;
            font-weight: 300;
          }
          .form-control:focus {
            background: white;
            border-color: #00ffcc;
            box-shadow: 0 0 0 0.25rem rgba(0, 255, 204, 0.25);
            color: #4B0082;
          }
          .form-label {
            color: #F0F0F0 !important;
            margin-bottom: 0.75rem;
            font-weight: 500;
          }
          .login-btn {
            background: linear-gradient(45deg, #00ffcc, #0099ff);
            border: none;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
          }
          .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 255, 204, 0.4);
          }
          .login-btn:disabled {
            background: #6c757d;
            cursor: not-allowed;
          }
          .input-icon {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #00ffcc;
          }
          .form-group {
            position: relative;
            margin-bottom: 1.5rem;
          }
          .text-muted {
            color: #F0F0F0 !important;
          }
          .invalid-feedback {
            color: #ff6b6b;
            margin-top: 0.5rem;
          }
        `}
      </style>

      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="login-card p-4"
            >
              <div className="text-center mb-4">
                <h2 style={{ 
                  color: '#00ffcc', 
                  fontWeight: '800',
                  letterSpacing: '1px'
                }}>
                  ВХОД В АККАУНТ
                </h2>
                <p className="text-muted">Введи свои данные для доступа</p>
              </div>

              {/* {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )} */}

              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-4">
                  <div className="input-icon">
                    <FaUser />
                  </div>
                  <Form.Control
                    type="text"
                    placeholder="Твой телефон"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    isInvalid={!!formErrors.telephone}
                    required
                    className="py-2"
                  />
                  {formErrors.telephone && (
                    <Form.Control.Feedback type="invalid">
                      {formErrors.telephone}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-4">
                  <div className="input-icon">
                    <FaLock />
                  </div>
                  <Form.Control
                    type="password"
                    placeholder="Твой пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!formErrors.password}
                    required
                    className="py-2"
                  />
                  {formErrors.password && (
                    <Form.Control.Feedback type="invalid">
                      {formErrors.password}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <motion.div
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                >
                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 login-btn py-2 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>ЗАГРУЗКА...</span>
                    ) : (
                      <>
                        ВОЙТИ <FaArrowRight className="ms-2" />
                      </>
                    )}
                  </Button>
                </motion.div>

                <div className="text-center mt-4">
                  <p className="text-muted mb-2">
                    Еще нет аккаунта?{' '}
                    <Link 
                      to="/signup" 
                      style={{
                        color: '#00ffcc',
                        textDecoration: 'none',
                        fontWeight: '600'
                      }}
                    >
                      ЗАРЕГИСТРИРУЙСЯ
                    </Link>
                  </p>
                  <Link 
                    to="/forgot-password" 
                    style={{
                      color: '#aaa',
                      textDecoration: 'none',
                      fontSize: '0.9rem'
                    }}
                  >
                    Забыл пароль?
                  </Link>
                </div>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;