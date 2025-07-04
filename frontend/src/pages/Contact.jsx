import React, { useRef } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTelegram, FaVk } from 'react-icons/fa';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';

// 3D Маркер для карты
function MapMarker() {
  return (
    <mesh position={[0, 0.5, 0]}>
      <coneGeometry args={[0.5, 1, 32]} />
      <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.5} />
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </mesh>
  );
}

const Contact = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Сообщение отправлено! Мы скоро свяжемся с вами.');
    formRef.current.reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-dark text-white"
      style={{ minHeight: '100vh', paddingTop: '120px' }}
    >
      {/* Hero секция */}
      <section className="py-5" style={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)',
        marginTop: '-80px', /* Компенсируем общий padding-top */
        paddingTop: '80px' /* Возвращаем отступ для контента */
      }}>
        <Container>
          <motion.h1 
            className="display-4 fw-bold mb-4"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
          >
            Наши <span style={{ color: '#0ff' }}>контакты</span>
          </motion.h1>
          <p className="lead">Свяжитесь с нами любым удобным способом</p>
        </Container>
      </section>

      {/* Основной контент */}
      <Container className="py-5">
        <Row className="g-4">
          {/* Контактная информация */}
          <Col md={4}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 bg-gray-800 h-100">
                <Card.Body className="p-4">
                  <h3 className="mb-4" style={{ color: '#0ff' }}>Контактные данные</h3>
                  
                  <div className="d-flex align-items-center mb-3">
                    <FaPhone className="me-3" size={20} color="#0ff" />
                    <div>
                      <h5>Телефон</h5>
                      <p className="mb-0" style={{ color: '#eee' }}>+7 (123) 456-78-90</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <FaEnvelope className="me-3" size={20} color="#0ff" />
                    <div>
                      <h5>Email</h5>
                      <p className="mb-0" style={{ color: '#eee' }}>info@pcbuilder.pro</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <FaMapMarkerAlt className="me-3" size={20} color="#0ff" />
                    <div>
                      <h5>Адрес</h5>
                      <p className="mb-0" style={{ color: '#eee' }}>г. Москва, ул. Техническая, 42</p>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <h5 className="mb-3" style={{ color: '#0ff' }}>Мы в соцсетях:</h5>
                  <div className="d-flex gap-3">
                    <Button variant="outline-primary">
                      <FaTelegram size={20} />
                    </Button>
                    <Button variant="outline-danger">
                      <FaVk size={20} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* 3D Карта */}
          <Col md={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="h-100"
              style={{ 
                borderRadius: '10px', 
                overflow: 'hidden',
                height: 'calc(100vh - 250px)' /* Динамическая высота с учетом отступов */
              }}
            >
              <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <MapMarker />
                <OrbitControls enableZoom={false} autoRotate />
                <Environment preset="city" />
              </Canvas>
            </motion.div>
          </Col>

          {/* Форма обратной связи */}
          <Col md={4}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 bg-gray-800">
                <Card.Body className="p-4">
                  <h3 className="mb-4" style={{ color: '#0ff' }}>Обратная связь</h3>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ваше имя</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Иван Иванов" 
                        required 
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="ivan@example.com" 
                        required 
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Сообщение</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={4} 
                        placeholder="Ваш вопрос или предложение..." 
                        required 
                      />
                    </Form.Group>

                    <Button 
                      variant="primary" 
                      type="submit"
                      className="w-100 mt-3"
                    >
                      Отправить
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* График работы */}
      <section className="py-5" style={{ background: 'rgba(20, 20, 20, 0.9)' }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h3 className="mb-4" style={{ color: '#0ff' }}>График работы</h3>
              <div className="d-flex justify-content-around flex-wrap">
                {[
                  { day: 'Пн-Пт', time: '10:00 - 20:00', highlight: false },
                  { day: 'Суббота', time: '11:00 - 18:00', highlight: true },
                  { day: 'Воскресенье', time: '12:00 - 16:00', highlight: false }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="m-3"
                  >
                    <Card 
                      className="border-0" 
                      style={{ 
                        minWidth: '150px',
                        background: item.highlight ? 'rgba(0, 200, 200, 0.15)' : 'rgba(50, 50, 50, 0.7)',
                        border: '1px solid rgba(0, 255, 255, 0.1)'
                      }}
                    >
                      <Card.Body>
                        <h5 style={{ color: '#fff' }}>{item.day}</h5>
                        <p className="mb-0" style={{ color: '#eee' }}>
                          {item.time}
                        </p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </motion.div>
  );
};

export default Contact;