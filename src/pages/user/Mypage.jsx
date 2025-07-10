import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import axios from "axios"; // ✅ 백엔드 연동 시 주석 해제

const Mypage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // ✅ 백엔드 연동 시 이 주석 해제
    /*
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/user/info");
        setUserInfo(res.data.user);
        setSubscription(res.data.subscription);
        setPurchases(res.data.purchases);
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
      }
    };
    fetchData();
    */

    // 사용자 정보, 구독정보는 임시 데이터로 유지
    setUserInfo({
      userId: "meloa_user",
      profileImage: "https://placehold.co/100x100",
    });

    setSubscription({
      name: "멜로아 프리미엄 정기결제",
      type: "PREMIUM",
      remainingDays: "남은 기간: 25일",
    });

    // 로컬스토리지에서 구매내역 불러오기
    const storedPurchases = JSON.parse(localStorage.getItem("purchased")) || [];

    // 구매내역이 없으면 임시 데이터 사용(옵션)
    if (storedPurchases.length > 0) {
      setPurchases(storedPurchases);
    } else {
      setPurchases([
        {
          id: 1,
          image: "https://placehold.co/80x80",
          title: "임시 앨범명",
          generation: "1기수",
        },
      ]);
    }
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

      <SectionTitle>구독중인 이용권</SectionTitle>
      {subscription ? (
        <SubscriptionCard>
          <SubName>
            {subscription.name}
            <SubType>{` ${subscription.type}`}</SubType>
          </SubName>
          <SubDays>{subscription.remainingDays}</SubDays>
        </SubscriptionCard>
      ) : (
        <EmptyText>구독중인 이용권이 없습니다.</EmptyText>
      )}

      <DividerLine />

      <ContentHeader>
        <h3>구매한 콘텐츠 목록</h3>
        <MoreBtn>{`>`}</MoreBtn>
      </ContentHeader>

      {purchases.length > 0 ? (
        <AlbumGrid>
          {purchases.map((item) => (
            <AlbumCard key={item.id}>
              <AlbumImg src={item.image} alt={item.title} />
              <AlbumTitle>{item.title}</AlbumTitle>
              {/* generation이 없으면 안보이게 */}
              {item.generation && <AlbumGen>{item.generation}</AlbumGen>}
            </AlbumCard>
          ))}
        </AlbumGrid>
      ) : (
        <EmptyText>구매한 콘텐츠가 없습니다.</EmptyText>
      )}
    </Container>
  );
};


// ※ styled-components 관련 스타일은 기존 파일 참고


const Container = styled.div`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
`;

const ProfileSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
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
`;

const SubName = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const SubType = styled.span`
  font-size: 12px;
  color: #F2DD00;
  margin-left: 6px;
`;

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
  margin-top: 12px;
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


export default Mypage;
