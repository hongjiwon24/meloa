//D:\my\my-music-app\client\src\context\AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Context 생성
export const AuthContext = createContext();

// Provider 컴포넌트
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);  // 로그인한 사용자 정보 저장
  const [loading, setLoading] = useState(true); // 초기 로딩 상태

  // 예: 새로고침해도 로그인 유지 (localStorage에서 토큰 또는 user정보 가져오기)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // 로딩 완료 후 상태 업데이트
  }, []);

  // 로그인 처리 함수
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // 로그아웃 처리 함수
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
