// src/pages/user/MyPage.jsx
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import HeaderVer2 from "../../components/user/HeaderVer2";
import BottomNav from "../../components/user/BottomNav";
import styled from "styled-components";

function MyPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // 로그인 여부 확인
    if (!user) {
      navigate("/login"); // 로그인하지 않았다면 로그인 페이지로 리디렉션
    }

    const subData = localStorage.getItem("subscription");
    if (subData) {
      try {
        setSubscription(JSON.parse(subData));
      } catch {
        setSubscription(null);
      }
    }

    const storedPurchases = localStorage.getItem("purchased");
    if (storedPurchases) {
      try {
        const allItems = JSON.parse(storedPurchases);
        const onlyContents = allItems.filter((item) => !item.premium);
        setPurchases(onlyContents);
      } catch {
        setPurchases([]);
      }
    }
  }, [user, navigate]); // user 상태가 변경될 때마다 확인

  const handleLogout = () => {
    logout();
    navigate("/");
  };


  return (
    <>
      <HeaderVer2 title="마이페이지" />
      <Container>
        <ProfileSection>
          <ProfileImg
            src={user?.profileImage || "https://placehold.co/100x100"}
            alt="프로필 이미지"
          />
          <Line />
          <IdRow>
            <UserIdLabel>아이디</UserIdLabel>
            <UserId>{user?.username || ""}</UserId>
          </IdRow>
          <Line />
          <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
        </ProfileSection>

        {/* 구독권 */}
        {subscription && typeof subscription === "object" ? (
          <>
            <SectionTitle>구독중인 이용권</SectionTitle>
            <SubscriptionCard>
              <SubName>
                {subscription.name}
                <SubType> PREMIUM</SubType>
              </SubName>

              {subscription.remainingDays && (
                <SubDays>{subscription.remainingDays}</SubDays>
              )}

              <SubInfo>
                시작일: {subscription.startDate}
                <br />
                종료일: {subscription.endDate}
                <br />
                타입: {subscription.type === "recurring" ? "정기구독" : "기간제"}
              </SubInfo>
            </SubscriptionCard>
          </>
        ) : (
          <EmptyText>구독중인 이용권이 없습니다.</EmptyText>
        )}

        <DividerLine />

        {/* 구매한 콘텐츠 */}
        {Array.isArray(purchases) && purchases.length > 0 ? (
          <>
            <ContentHeader>
              <SectionTitle>구매한 콘텐츠 목록</SectionTitle>
              <MoreBtn>{`>`}</MoreBtn>
            </ContentHeader>

            <AlbumGrid>
              {purchases.map((item, index) => (
                <AlbumCard key={item.id || `purchase-${index}`}>
                  <AlbumImg src={item.image} alt={item.title} />
                  <AlbumTitle>{item.title}</AlbumTitle>
                  {item.generation && <AlbumGen>{item.generation}</AlbumGen>}
                </AlbumCard>
              ))}
            </AlbumGrid>
          </>
        ) : (
          <EmptyText>구매한 콘텐츠가 없습니다.</EmptyText>
        )}
      </Container>
      <BottomNav />
    </>
  );
}

export default MyPage;


// styled-components

const Container = styled.div`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
`;

const ProfileSection = styled.div`
  text-align: center;
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 12px;
`;

const Line = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`;

const IdRow = styled.div`
  text-align: left;
  padding: 0 10px;
`;

const UserIdLabel = styled.div`
  font-size: 13px;
  color: #888;
  margin-bottom: 4px;
`;

const UserId = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #111;
`;

const LogoutBtn = styled.button`
  margin-top: 16px;
  padding: 10px 18px;
  background-color: #ff2c68;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const SubscriptionCard = styled.div`
  background-color: #272727;
  color: white;
  border-radius: 10px;
  padding: 30px;
  width: 80%;
  height: 140px;
  margin: 0 auto 24px;
  text-align: left;
`;

const SubName = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const SubType = styled.span`
  font-size: 12px;
  color: #f2dd00;
  margin-left: 6px;
`;

const SubDays = styled.div`
  font-size: 13px;
  color: #d1d1d1;
  margin-bottom: 12px;
`;

const SubInfo = styled.div`
  font-size: 13px;
  color: #d1d1d1;
  line-height: 1.4;
`;

const DividerLine = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 30px 0 16px;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MoreBtn = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const AlbumGrid = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

const AlbumCard = styled.div`
  width: 30%;
  text-align: center;
  margin-bottom: 12px;
`;

const AlbumImg = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
  max-height: 150px;
  min-height: 150px;
  object-position: top;
`;

const AlbumTitle = styled.div`
  font-size: 13px;
  margin-top: 4px;
  font-weight: 600;
`;

const AlbumGen = styled.div`
  font-size: 12px;
  color: #888;
`;

const EmptyText = styled.div`
  text-align: center;
  color: #999;
  padding: 32px 0;
`;
