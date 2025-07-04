
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../admin/AdminLayout';
import AdminPanel from '../pages/AdminPanel';
import AdminProducts from '../pages/AdminProducts';
import AdminBuilds from '../components/AdminBuilds';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminPanel />} />
        <Route path="users" element={<AdminPanel />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="builds" element={<AdminBuilds />} />
      </Route>
    </Routes>
  );
};
export default AdminRoutes;
