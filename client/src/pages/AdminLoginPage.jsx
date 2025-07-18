// 최종본
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminHeader from '../components/admin/AdminHeader';
import AdminBottomNav from '../components/admin/AdminBottomNav';

function AdminLoginPage() {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [message, setMessage] = useState('');
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  // ✅ 관리자 인증 되어 있으면 자동 이동
  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
      navigate('/admin');
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // 다음 인풋으로 이동
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }

    // 백스페이스로 이전 인풋 이동
    if (!value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleLogin = async () => {
    const password = digits.join('');

    try {
      const res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('isAdmin', 'true');
        setMessage('인증 성공! 관리자 페이지로 이동중...');
        navigate('/admin'); // ✅ navigate 사용
      } else {
        setMessage('❌ 인증 실패');
      }
    } catch (err) {
      console.error('로그인 오류:', err);
      setMessage('⚠️ 서버 오류');
    }
  };

  return (
    <>
      <AdminHeader />
      <Wrapper>
        <Title>관리자 로그인</Title>
        <InputContainer>
          {digits.map((digit, i) => (
            <DigitInput
              key={i}
              type="password"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, i)}
              ref={(el) => (inputsRef.current[i] = el)}
            />
          ))}
        </InputContainer>
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
        <Message>{message}</Message>
      </Wrapper>
      <AdminBottomNav />
    </>
  );
}

export default AdminLoginPage;

// ---------------- styled components ----------------

const Wrapper = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.7rem;
`;

const DigitInput = styled.input`
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 6px;

  &:focus {
    outline: none;
    border-color: #ff2b77;
    box-shadow: 0 0 0 2px #ffe3ec;
  }
`;

const LoginButton = styled.button`
  padding: 16px 0;
  background-color: #ff2b77;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  width: 91%;

  &:hover {
    background-color: #e02458;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #444;
`;
