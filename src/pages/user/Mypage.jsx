import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Mypage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // 백엔드 연동시 아래 주석 풀기
      // try {
      //     const res = await axios.get("/api/user/info");
      //     setUserInfo(res.data.user);
      //     setSubscription(res.data.subscription);
      //     setPurchases(res.data.purchases);
      //   } catch (err) {
      //     console.warn("❗ 서버 데이터 불러오기 실패, 로컬 데이터 사용:", err);
      // }

      // 로컬 임시 사용자 정보만 설정
      setUserInfo({
        userId: "meloa_user",
        profileImage: "https://placehold.co/100x100",
      });

      // 로컬 구독 정보 불러오기 (있을 때만)
      const storedSubscription = localStorage.getItem("subscription");
      if (storedSubscription) {
        try {
          setSubscription(JSON.parse(storedSubscription));
        } catch (err) {
          console.warn("❗ 구독정보 파싱 실패:", err);
        }
      }

      // 로컬 구매 목록 불러오기 (있을 때만)
      const storedPurchases = localStorage.getItem("purchased");
      if (storedPurchases) {
        try {
          const allItems = JSON.parse(storedPurchases);
          const onlyContents = allItems.filter((item) => !item.premium); // 👈 여기 한 줄 추가!
          setPurchases(onlyContents);
        } catch (err) {
          console.warn("❗ 구매 목록 파싱 실패:", err);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <ProfileSection>
        <ProfileImg src={userInfo?.profileImage} alt="프로필 이미지" />
        <Line />
        <IdRow>
          <UserIdLabel>아이디</UserIdLabel>
          <UserId>{userInfo?.userId || ""}</UserId>
        </IdRow>
        <Line />
      </ProfileSection>

      {/* 구독권 있을 때만 SectionTitle + 카드 렌더링, 없으면 EmptyText만 */}
      {subscription && typeof subscription === "object" ? (
        <>
          <SectionTitle>구독중인 이용권</SectionTitle>
          <SubscriptionCard>
            <SubName>
              {subscription.name}
              <SubType> PREMIUM</SubType> {/* 항상 노출 */}
            </SubName>

            {/* 남은 기간이 있을 때만 표시 */}
            {subscription.remainingDays && (
              <SubDays>{subscription.remainingDays}</SubDays>
            )}
          </SubscriptionCard>
        </>
      ) : (
        <EmptyText>구독중인 이용권이 없습니다.</EmptyText>
      )}

      <DividerLine />

      {/* 콘텐츠 있을 때만 Header + 목록 렌더링, 없으면 EmptyText만 */}
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
  );
};

export default Mypage;



// ※ styled-components 관련 스타일은 기존 파일 참고


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
  margin: 0 auto;
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
`;

// 이용권 이름
const SubName = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 16px;
`;

// 이용권 PREMIUM
const SubType = styled.span`
  font-size: 12px;
  color: #F2DD00;
  margin-left: 6px;
`;

// 이용권 만료일
const SubDays = styled.div`
  font-size: 13px;
  color: #d1d1d1;
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
`;

const AlbumCard = styled.div`
  width: 30%;
  text-align: center;
`;

const AlbumImg = styled.img`
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
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

