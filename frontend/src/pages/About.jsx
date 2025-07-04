import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaUsers, FaAward, FaMicrochip, FaTools, FaLaptop } from 'react-icons/fa';

const About = () => {
  // Статистика компании
  const stats = [
    { value: "10+", label: "Лет опыта", icon: <FaAward size={30} /> },
    { value: "1000+", label: "Довольных клиентов", icon: <FaLaptop size={30} /> },
    { value: "100%", label: "Гарантия качества", icon: <FaTools size={30} /> }
  ];

  // Наши преимущества
  const features = [
    {
      title: "Индивидуальный подход",
      description: "Каждому клиенту уделяем персональное внимание",
      icon: <FaUsers size={30} />
    },
    {
      title: "Качественные материалы",
      description: "Используем только проверенные компоненты",
      icon: <FaMicrochip size={30} />
    },
    {
      title: "Профессионализм",
      description: "Опытные специалисты с многолетним стажем",
      icon: <FaTools size={30} />
    }
  ];

  // Изображения для галереи
  const galleryImages = [
    "https://example.com/photo1.jpg",
    "https://example.com/photo2.jpg",
    "https://example.com/photo3.jpg"
  ];

  return (
    <div className="bg-dark text-white">
      {/* Hero секция */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <motion.h1 
                className="display-3 fw-bold mb-4"
                initial={{ x: -50 }}
                animate={{ x: 0 }}
              >
                О <span className="text-primary">нас</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="lead"
              >
                Краткое описание вашей компании
              </motion.p>
              <Button variant="primary" size="lg" className="mt-4">
                Наши работы
              </Button>
            </Col>
            <Col md={6} className="d-none d-md-block">
              <Image 
                src={galleryImages[0]} 
                alt="О компании"
                fluid
                rounded
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Галерея */}
      <section className="py-5 bg-secondary">
        <Container>
          <h2 className="text-center display-5 fw-bold mb-5">
            Наша <span className="text-primary">работа</span>
          </h2>
          <Row className="g-4">
            {galleryImages.map((img, index) => (
              <Col md={4} key={index}>
                <Image 
                  src={img} 
                  alt={`Пример работы ${index + 1}`}
                  fluid
                  rounded
                  className="mb-3"
                />
                <h5 className="text-center">Пример {index + 1}</h5>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Статистика */}
      <section className="py-5">
        <Container>
          <Row className="g-4 justify-content-center">
            {stats.map((stat, index) => (
              <Col md={4} key={index}>
                <Card className="border-0 text-center h-100">
                  <Card.Body className="p-4">
                    <div className="mb-3">
                      {stat.icon}
                    </div>
                    <h2 className="fw-bold">{stat.value}</h2>
                    <p className="lead mb-0">{stat.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* О компании */}
      <section className="py-5 bg-light text-dark">
        <Container>
          <Row className="align-items-center g-4">
            <Col md={6}>
              <h2 className="display-5 fw-bold mb-4">
                Наша <span className="text-primary">философия</span>
              </h2>
              <p className="lead">
                Основные принципы вашей работы
              </p>
              <p>
                Подробное описание подхода к работе и ценностей компании
              </p>
            </Col>
            <Col md={6}>
              <Image 
                src={galleryImages[1]} 
                alt="Философия компании"
                fluid
                rounded
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Наши преимущества */}
      <section className="py-5">
        <Container>
          <h2 className="text-center display-5 fw-bold mb-5">
            Наши <span className="text-primary">преимущества</span>
          </h2>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={4} key={index}>
                <Card className="border-0 h-100">
                  <Card.Body className="p-4">
                    <div className="mb-3">
                      {feature.icon}
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Призыв к действию */}
      <section className="py-5 bg-primary text-white">
        <Container className="text-center">
          <h2 className="display-5 fw-bold mb-4">
            Готовы начать сотрудничество?
          </h2>
          <Button variant="light" size="lg" className="px-5 py-3 fw-bold">
            Связаться с нами
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default About;