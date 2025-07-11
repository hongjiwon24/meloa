// src/pages/admin/admin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";

const dummyAdmin = {
  userId: "admin",
  password: "admin123",
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = () => {
    setError("");

    // TODO: 추후 백엔드 연동 (예: axios.post("/api/admin/login"))
    if (userId === dummyAdmin.userId && password === dummyAdmin.password) {
      login("admin");
      navigate("/admin");
    } else {
      setError("관리자 아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <LoginContainer>
      <Title>관리자 로그인</Title>
      <Input
        type="text"
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdminLogin();
        }}
      />
      <LoginButton onClick={handleAdminLogin}>로그인</LoginButton>
      {error && <ErrorText>{error}</ErrorText>}
    </LoginContainer>
  );
};

export default AdminLogin;

const LoginContainer = styled.div`
  padding: 32px;
  max-width: 400px;
  margin: 100px auto;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fafafa;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ff2c68;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ErrorText = styled.div`
  margin-top: 12px;
  color: red;
  font-size: 14px;
`;
