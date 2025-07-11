// src/pages/user/LoginP.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";

const dummyUser = {
  userId: "meloa",
  password: "1234",
};

export default function LoginP() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUserLogin = () => {
    setError("");

    // TODO: 아래 백엔드 연동으로 교체 예정
    // axios.post("/api/login", { userId, password })
    //   .then(response => login("user"))

    if (userId === dummyUser.userId && password === dummyUser.password) {
      login("user");
      navigate("/mypage");
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <LoginContainer>
      <Title>로그인</Title>
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
          if (e.key === "Enter") handleUserLogin();
        }}
      />
      <LoginButton onClick={handleUserLogin}>로그인</LoginButton>
      {error && <ErrorText>{error}</ErrorText>}
    </LoginContainer>
  );
}

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
