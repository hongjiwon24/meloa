// src/components/AdminRoute.jsx
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // ✅ 인증 확인

  return isAdmin ? children : <Navigate to="/admin-login" replace />;
}

export default AdminRoute;
