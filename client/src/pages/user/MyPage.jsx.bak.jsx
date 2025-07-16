// src/pages/user/MyPage.jsx
// 스타일 입히기 전 코드, 스타일 없는 코드
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import HeaderVer2 from '../../components/user/HeaderVer2';
import BottomNav from '../../components/user/BottomNav';


function MyPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const subData = localStorage.getItem('subscription');
    if (subData) {
      setSubscription(JSON.parse(subData));
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
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
        {subscription ? (
          <div>
            <p>이용권명: {subscription.name}</p>
            <p>시작일: {subscription.startDate}</p>
            <p>종료일: {subscription.endDate}</p>
            {subscription.remainingDays && <p>{subscription.remainingDays}</p>}
            <p>타입: {subscription.type === 'recurring' ? '정기구독' : '기간제'}</p>
          </div>
        ) : (
          <p>현재 구독중인 이용권이 없습니다.</p>
        )}
      </div>
      <BottomNav />
    </>
  );
}

export default MyPage;
