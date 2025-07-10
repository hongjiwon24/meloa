// D:\team\meloa-main\src\pages\user\LoginP.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import axios from 'axios'; // 백엔드 연동 시 사용 예정

const LoginP = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 임시 사용자 데이터
  const dummyUser = {
    userId: 'meloa123',
    password: '1234',
    nickname: 'meloa',
  };

  const handleLogin = async () => {
    setError('');

    if (userId === dummyUser.userId && password === dummyUser.password) {
      navigate('/mypage');
    } else {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
    }

    // 백엔드 연동용
    /*
    try {
      const response = await axios.post('/api/login', { userId, password });
      if (response.data.success) {
        navigate('/mypage');
      } else {
        setError('로그인 실패: ' + response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError('서버 오류가 발생했습니다.');
    }
    */
  };

  return (
    <LoginContainer>
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
      />
      <LoginButton onClick={handleLogin}>로그인</LoginButton>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <BottomLinks>
        <span onClick={() => navigate('/signupp')}>회원가입</span>
        <Divider />
        <span onClick={() => alert("아이디 찾기")}>아이디 찾기</span>
        <Bar />
        <span onClick={() => alert("비밀번호 찾기")}>비밀번호 찾기</span>
      </BottomLinks>
    </LoginContainer>
  );
};

export default LoginP;

// 스타일
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const LoginButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
`;

const BottomLinks = styled.div`
  margin-top: 16px;
  font-size: 14px;
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
