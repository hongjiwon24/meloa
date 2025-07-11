import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { auth } = useAuth();

  if (!auth.isLoggedIn) {
    // 로그인 안 된 경우 유저 로그인 페이지로 이동
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(auth.role)) {
    // 권한 없는 경우 유저 홈으로 이동
    return <Navigate to="/" replace />;
  }

  return children;
}
