
import React, { useState, useEffect } from 'react';
import { Container, Table, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true,
});

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('AdminPanel rendered, users:', users); // Отладочный лог

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await instance.get('/admin/users');
        console.log('fetchUsers response:', response.data); // Отладочный лог
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          toast.error('Ошибка: Неверный формат данных');
        }
      } catch (error) {
        console.error('fetchUsers error:', error);
        toast.error(error.response?.data?.message || 'Ошибка при загрузке пользователей');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Container className="mt-4">
      <h1 style={{ color: '#00ffcc' }}>Админ-панель: Пользователи</h1>
      {loading ? (
        <Alert variant="info">Загрузка...</Alert>
      ) : users.length === 0 ? (
        <Alert variant="warning">Нет пользователей</Alert>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Телефон</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Роль</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.telephone}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.role === 'admin' ? 'Администратор' : 'Пользователь'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}