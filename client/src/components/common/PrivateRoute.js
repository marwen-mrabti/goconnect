import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return !isAuthenticated ? <Navigate to="/" replace /> : children;
}

export default PrivateRoute;
