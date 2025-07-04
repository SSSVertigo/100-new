import React, { Suspense, useRef } from 'react';
import { Container, Button, Row, Col, Card, Carousel, Spinner } from 'react-bootstrap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';

// Error Boundary (базовый обработчик ошибок)
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-3 bg-warning text-dark rounded">
          <p>⚠️ Компонент временно недоступен</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Анимированная кнопка (шаблон)
const AnimatedButton = ({ children, ...props }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Button {...props}>{children}</Button>
  </motion.div>
);

// Главный компонент
const Home = () => {
  return (
    <div className="bg-dark text-white" style={{ minHeight: '100vh' }}>
      {/* Hero секция */}
      <section className="hero-section" style={{ height: '100vh' }}>
        <Container className="h-100">
          <Row className="align-items-center h-100">
            <Col md={6}>
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="display-3 fw-bold mb-4"
              >
                Заголовок страницы
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="lead mb-4"
              >
                Описание под заголовком
              </motion.p>
              
              <div className="d-flex gap-3">
                <AnimatedButton 
                  variant="primary" 
                  size="lg"
                  className="fw-bold"
                >
                  Основная кнопка
                </AnimatedButton>
                <AnimatedButton 
                  variant="outline-light" 
                  size="lg"
                >
                  Вторая кнопка
                </AnimatedButton>
              </div>
            </Col>
            
            <Col md={6} className="d-none d-md-block">
              <ErrorBoundary>
                <Suspense fallback={<Spinner animation="border" variant="light" />}>
                  <Canvas style={{ height: '500px' }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls enableZoom={false} />
                    <Environment preset="city" />
                  </Canvas>
                </Suspense>
              </ErrorBoundary>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Преимущества */}
      <section className="py-5 bg-gradient-dark">
        <Container>
          <motion.h2 
            className="text-center mb-5 display-4 fw-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Наши преимущества
          </motion.h2>
          
          <Row>
            {[1, 2, 3, 4].map((item, i) => (
              <Col md={3} key={i} className="mb-4">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 bg-gray-900 text-center h-100">
                    <Card.Body className="p-4">
                      <div className="mb-3" style={{ fontSize: '3rem' }}>
                        {/* Иконка будет здесь */}
                      </div>
                      <h3>Преимущество {i+1}</h3>
                      <p className="text-muted">Описание преимущества</p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Отзывы */}
      <section className="py-5 bg-black">
        <Container>
          <h2 className="text-center mb-5 display-4 fw-bold">
            Отзывы клиентов
          </h2>
          
          <ErrorBoundary>
            <Carousel indicators={false} interval={3000} variant="dark">
              {[1, 2, 3].map((_, i) => (
                <Carousel.Item key={i}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center px-5 py-4"
                  >
                    <div className="bg-dark p-4 rounded">
                      <p className="fs-4 mb-4">"Текст отзыва"</p>
                      <footer className="d-flex justify-content-center gap-3">
                        <span className="fw-bold">Имя клиента</span>
                      </footer>
                    </div>
                  </motion.div>
                </Carousel.Item>
              ))}
            </Carousel>
          </ErrorBoundary>
        </Container>
      </section>
    </div>
  );
};

export default Home;