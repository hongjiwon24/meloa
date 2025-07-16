import { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminBottomNav from '../components/admin/AdminBottomNav';

function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
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
        // 예: 관리자 페이지로 이동
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
      <AdminHeader></AdminHeader>
      <div>
        <h2>관리자 로그인</h2>
        <input
          type="password"
          value={password}
          placeholder="비밀번호 입력"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>로그인</button>
        <p>{message}</p>
      </div>
      <AdminBottomNav></AdminBottomNav>
    </>
  );
}

export default AdminLoginPage;
