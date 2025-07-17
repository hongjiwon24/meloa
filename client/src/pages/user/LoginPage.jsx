// src/pages/user/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HeaderVer2 from '../../components/user/HeaderVer2';
import BottomNav from '../../components/user/BottomNav';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // 로그인 전 가려던 경로와 데이터 받기 (없으면 기본 '/mypage')
  const from = location.state?.from || '/mypage';
  const passItem = location.state?.passItem || null;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) {
        login(data.user); // context 저장 + localStorage

        // 로그인 후 원래 가려던 경로로 이동 + passItem이 있으면 state로 넘김
        if (passItem) {
          navigate(from, {
            state: {
              items: passItem,
              method: 'subscription',
            },
          });
        } else {
          navigate(from);
        }
      } else {
        setError(data.message || '로그인 실패');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      setError('서버 오류');
    }
  };

  

  return (
    <>
      <HeaderVer2 title="로그인" />
      <LoginContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type="submit">로그인</LoginButton>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <BottomLinks>
          <span onClick={() => navigate('/register')}>회원가입</span>
          <Divider />
          <span onClick={() => alert('아이디 찾기')}>아이디 찾기</span>
          <span>|</span>
          <span onClick={() => alert('비밀번호 찾기')}>비밀번호 찾기</span>
          <Bar />
          <span onClick={() => navigate('/admin-login')}>관리자모드</span>
        </BottomLinks>
      </LoginContainer>
      <BottomNav />
    </>
  );
}

export default LoginPage;



const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const LoginButton = styled.button`
  padding: 16px;
  font-size: 16px;
  background-color: #FF2C68;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
`;

// 하단 도움 버튼
const BottomLinks = styled.div`
  margin-top: 16px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  color: #666;
  cursor: pointer;
`;

const Divider = styled.span`
  margin: 0 12px;
`;

const Bar = styled.span`
  margin-left: 8px;
  margin-right: 8px;
`;
