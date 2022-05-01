import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated && user.role === 'ADMIN') {
    return children;
  } else if (isAuthenticated && user.role === 'USER') {
    return <Navigate to="/dashboard" replace />;
  } else if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
}

export default AdminRoute;
