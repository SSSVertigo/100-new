import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCogs, FaDesktop, FaLaptopCode, FaServer, FaTools, FaShieldAlt } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaDesktop size={40} />,
      title: "Услуга 1",
      description: "Описание услуги 1",
      color: "#00ffcc"
    },
    {
      icon: <FaLaptopCode size={40} />,
      title: "Услуга 2",
      description: "Описание услуги 2",
      color: "#ff00cc"
    },
    {
      icon: <FaServer size={40} />,
      title: "Услуга 3",
      description: "Описание услуги 3",
      color: "#cc00ff"
    },
    {
      icon: <FaTools size={40} />,
      title: "Услуга 4",
      description: "Описание услуги 4",
      color: "#ffcc00"
    },
    {
      icon: <FaShieldAlt size={40} />,
      title: "Услуга 5",
      description: "Описание услуги 5",
      color: "#00ccff"
    },
    {
      icon: <FaCogs size={40} />,
      title: "Услуга 6",
      description: "Описание услуги 6",
      color: "#ff6600"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-dark text-white"
      style={{ minHeight: '100vh', paddingTop: '80px' }}
    >
      {/* Hero секция */}
      <section className="py-5">
        <Container> 
          <motion.h1 
            className="display-3 fw-bold mb-4 mt-4"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
          >
            Наши <span style={{ color: '#00ffcc' }}>услуги</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lead"
          >
            Краткое описание раздела услуг
          </motion.p>
        </Container>
      </section>

      {/* Услуги */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {services.map((service, index) => (
              <Col md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-0 h-100">
                    <Card.Body className="p-4 text-center">
                      <div className="mb-4" style={{ color: service.color }}>
                        {service.icon}
                      </div>
                      <h3>{service.title}</h3>
                      <p className="mt-3 text-muted">{service.description}</p>
                      <Button 
                        variant="outline-light" 
                        className="mt-3"
                      >
                        Подробнее
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA секция */}
      <section className="py-5">
        <Container className="text-center">
          <motion.h2
            className="display-5 fw-bold mb-4"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            Призыв к действию
          </motion.h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="primary" size="lg">
              Основная кнопка
            </Button>
          </motion.div>
        </Container>
      </section>
    </motion.div>
  );
};

export default Services;