
import React from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import useAuthStore from '../store/useAuthStore';
import AdminBuilds from '../components/AdminBuilds';

export default function AdminLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  console.log('AdminLayout user:', user); // Отладочный лог

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh', paddingTop: '80px' }}>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top" style={{minHeight: "75px"}}>
        <Container>
          <Navbar.Brand as={NavLink} to="/admin">
            Админ-панель
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-nav" />
          <Navbar.Collapse id="admin-nav">
            <Nav className="me-auto">
              {user?.role === 'admin' ? (
                <>
                  <Nav.Link as={NavLink} to="/admin/users" end>
                    Пользователи
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/admin/products" end>
                    Товары
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/admin/builds" end>
                    Сборки
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link disabled>Пользователи (только для админов)</Nav.Link>
                  <Nav.Link disabled>Товары (только для админов)</Nav.Link>
                </>
              )}
            </Nav>
            <Nav>
              <NavDropdown title={user?.name || 'Профиль'} id="profile-nav">
                <NavDropdown.Item as={NavLink} to="/profile">
                  Личный кабинет
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Выйти</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}