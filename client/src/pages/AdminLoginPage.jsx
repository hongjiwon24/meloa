import { useState, useRef } from 'react';
import styled from 'styled-components';
import AdminHeader from '../components/admin/AdminHeader';
import AdminBottomNav from '../components/admin/AdminBottomNav';

function AdminLoginPage() {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [message, setMessage] = useState('');
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // 숫자 1자리만 허용

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    // 다음 인풋으로 자동 이동
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }

    // 이전 인풋으로 이동 (백스페이스)
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
        window.location.href = '/admin';
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
              type="password"         // ★ 별표(*) 마스킹
              inputMode="numeric"     // ★ 모바일 키패드 숫자 전용
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
`;

const Message = styled.p`
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #444;
`;
