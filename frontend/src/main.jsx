import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App from './App.jsx';
import useAuthStore from './store/useAuthStore.js';

const Root = () => {
  const { isLoading, error, checkAuth } = useAuthStore();
  const [initialized, setInitialized] = useState(false);

  
  useEffect(() => {
    if (!initialized) {
      console.log('Checking authentication...');
      checkAuth?.().catch(err => {
        console.error('Authentication check failed:', err);
      });
      setInitialized(true);
    }
  }, [checkAuth, initialized]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center vh-100">
  //       <div className="alert alert-danger">
  //         Ошибка при проверке аутентификации: {error.message || String(error)}
  //       </div>
  //     </div>
  //   );
  // }

  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Root />
    </CookiesProvider>
  </StrictMode>
);