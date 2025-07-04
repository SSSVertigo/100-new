import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Services from './pages/Services';
import About from './pages/About';
import useAuthStore from './store/useAuthStore';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Products from './pages/Products';
const App = () => {
  const { user } = useAuthStore();

  return (
    <Router>
      <CustomNavbar />
      <Routes>
        {/* Основные публичные маршруты */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />

        {/* Защищенные маршруты */}
        <Route path="/profile" element={
          <PrivateRoute>
            <div>Страница профиля</div> {/* Замените на ваш компонент */}
          </PrivateRoute>
        }/>

        {/* Админские маршруты */}
        <Route path="/admin/*" element={
          <PrivateRoute isAdminRoute={true}>
            <div>Админ панель</div> {/* Замените на ваш компонент */}
          </PrivateRoute>
        }/>

        {/* Редирект для несуществующих страниц */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default App;