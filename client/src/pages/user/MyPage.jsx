// src/pages/user/MyPage.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import HeaderVer2 from '../../components/user/HeaderVer2';
import BottomNav from '../../components/user/BottomNav';

function MyPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // 로그아웃 처리
    navigate("/");     // 홈페이지로 이동
  };

  return (
    <>
    <HeaderVer2 title="마이페이지" />
    <div>
      <p>환영합니다, {user.username}님!</p>
      <button onClick={handleLogout}>로그아웃</button>
      <hr />
      <h3>🎧 구매한 콘텐츠</h3>
      <p>→ (추후 연결)</p>

      <h3>💳 구독중인 이용권</h3>
      <p>→ (추후 연결)</p>
    </div>
    <BottomNav />
    </>
  );
}

export default MyPage;
