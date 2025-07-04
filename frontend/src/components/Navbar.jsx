import React from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faSignOutAlt, 
  faCog,
  faListAlt
} from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '../store/useAuthStore';

const CustomNavbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar 
      variant="dark" 
      expand="lg" 
      fixed="top" 
      className="py-3" 
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.95)', // Чистый черный с небольшой прозрачностью
        backdropFilter: 'blur(10px)', // Эффект размытия фона
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // Тонкая граница снизу
        width: '100%',
        padding: '0 5%' // Увеличиваем боковые отступы
      }}
    >
      <Container fluid style={{ maxWidth: '1600px' }}> {/* Увеличиваем максимальную ширину */}
        <Navbar.Brand as={Link} to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          ВашЛоготип
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ gap: '1rem' }}> {/* Добавляем отступы между пунктами */}
            <Nav.Link as={Link} to="/" style={{ fontSize: '1.1rem' }}>Главная</Nav.Link>
            <Nav.Link as={Link} to="/services" style={{ fontSize: '1.1rem' }}>Услуги</Nav.Link>
            <Nav.Link as={Link} to="/products" style={{ fontSize: '1.1rem' }}>Товары</Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ fontSize: '1.1rem' }}>О нас</Nav.Link>
          </Nav>

          {user ? (
            <Dropdown align="end" className="ms-4"> {/* Увеличиваем отступ */}
              <Dropdown.Toggle 
                variant="outline-light" 
                id="dropdown-user"
                style={{ 
                  fontSize: '1.1rem',
                  padding: '0.5rem 1rem',
                  borderWidth: '2px'
                }}
              >
                <FontAwesomeIcon icon={faUser} className="me-2" />
                {user?.name || "Профиль"}
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-dark" style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <Dropdown.Item 
                  as={Link} 
                  to="/profile"
                  style={{ fontSize: '1rem' }}
                >
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Профиль
                </Dropdown.Item>
                
                <Dropdown.Item 
                  as={Link} 
                  to="/orders"
                  style={{ fontSize: '1rem' }}
                >
                  <FontAwesomeIcon icon={faListAlt} className="me-2" />
                  Заказы
                </Dropdown.Item>

                {user?.role === 'admin' && (
                  <>
                    <Dropdown.Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Dropdown.Item 
                      as={Link} 
                      to="/admin"
                      style={{ fontSize: '1rem' }}
                    >
                      <FontAwesomeIcon icon={faCog} className="me-2" />
                      Админка
                    </Dropdown.Item>
                  </>
                )}

                <Dropdown.Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                <Dropdown.Item 
                  onClick={handleLogout}
                  style={{ fontSize: '1rem' }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  Выход
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="d-flex ms-4" style={{ gap: '1rem' }}> {/* Увеличиваем отступы */}
              <Button
                as={Link}
                to="/login"
                variant="outline-light"
                style={{
                  fontSize: '1.1rem',
                  padding: '0.5rem 1.5rem',
                  borderWidth: '2px'
                }}
              >
                Вход
              </Button>
              <Button
                as={Link}
                to="/signup"
                variant="primary"
                style={{
                  fontSize: '1.1rem',
                  padding: '0.5rem 1.5rem'
                }}
              >
                Регистрация
              </Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;