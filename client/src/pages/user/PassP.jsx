//\client\src\pages\user\PassP.jsx
import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import HeaderVer2 from '../../components/user/HeaderVer2';
import BottomNav from '../../components/user/BottomNav';


const PassP = () => {
  const [passes, setPasses] = useState([]); // ✅ 실시간 데이터 상태
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { user } = useContext(AuthContext); // 로그인 정보 가져오기

  useEffect(() => {
    const fetchPasses = async () => {
      try {
        const res = await axios.get("/api/passes");

        // 응답 데이터가 배열인지 확인
        if (Array.isArray(res.data)) {
          setPasses(res.data);
        } else {
          throw new Error("응답 데이터가 배열이 아닙니다");
        }
      } catch (err) {
        console.error("❌ 이용권 데이터를 불러오는 데 실패했습니다:", err);

        // 백업용 임시 데이터
        const fallbackPasses = [
          {
            id: "monthly",
            title: "멜로아 프리미엄 정기결제",
            desc: "무제한 듣기 · 오프라인 재생",
            price: 10900,
            premium: true,
            image: "https://placehold.co/60x60?text=정기",
            info: "무제한 듣기 · 오프라인 재생",
          },
          {
            id: "30day",
            title: "멜로아 프리미엄 30일",
            desc: "무제한 듣기 · 오프라인 재생",
            price: 11400,
            premium: true,
            image: "https://placehold.co/60x60?text=30일",
            info: "무제한 듣기 · 오프라인 재생",
          },
        ];
        setPasses(fallbackPasses);
      }
    };
    fetchPasses();
  }, []);

const handlePayment = () => {
  const selectedPass = passes.find((p) => p.id === selectedId);
  if (!selectedPass) return;

  if (!user) {
    // 확인만 있는 알림 팝업 후 바로 이동
    alert("로그인이 필요한 서비스입니다.");
    navigate("/login", {
      state: {
        from: "/pay",
        passItem: selectedPass,
      },
    });
    return;
  }

  // 로그인 되어 있으면 결제 페이지로 이동
  navigate("/pay", {
    state: {
      items: [selectedPass],
      method: "subscription",
    },
  });
};




  return (
    <>
    <HeaderVer2 title="이용권" />
    <Wrapper>
      <Section>
        <SectionTitle>무제한 듣기 · 오프라인 재생</SectionTitle>
        {passes.map((pass) => {
          const isSelected = selectedId === pass.id;
          return (
            <PassCard
              key={pass.id}
              selected={isSelected}
              onClick={() => setSelectedId(pass.id)}
            >
              <TopRow>
                <PassTitle>{pass.title}</PassTitle>
                {pass.premium && <PremiumTag>PREMIUM</PremiumTag>}
              </TopRow>
              <PassDesc selected={isSelected}>{pass.desc}</PassDesc>
              <Price>{pass.price.toLocaleString()}원</Price>
            </PassCard>
          );
        })}
      </Section>

      <Section>
        <SectionTitle>개별 곡 다운로드</SectionTitle>
        <StaticCard>
          <StaticTopRow>
            <PassTitle>MP3 1곡</PassTitle>
            <StaticDesc>
              월정액 이용권 없이도 1곡씩{"\n"}다운로드 가능합니다.
            </StaticDesc>
          </StaticTopRow>
          <StaticPrice>700원</StaticPrice>
        </StaticCard>
      </Section>

      {selectedId && <PayButton onClick={handlePayment}>결제하기</PayButton>}
    </Wrapper>
    <BottomNav></BottomNav>
    </>
  );
};

export default PassP;


const Wrapper = styled.div`
  padding: 16px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

// 섹션 제목
const SectionTitle = styled.h2`
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
  font-weight: bold;

`;

// 프리미엄 이용권 그룹
const PassCard = styled.div`
  background: ${({ selected }) => (selected ? "#333" : "#E6E7EA")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 12px;
  ${({ selectable }) =>
    selectable === false
      ? `
        cursor: default;
        pointer-events: none;
        opacity: 1;
      `
      : `
        cursor: pointer;
      `}
`;


// 프리미엄 이용권 이름
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PassTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

// 프리미엄 태그
const PremiumTag = styled.span`
  font-size: 10px;
  background: gold;
  color: #222;
  padding: 2px 6px;
  border-radius: 4px;
`;

// 프리미엄 이용권 부가 설명
const PassDesc = styled.div`
  font-size: 12px;
  color: ${({ selected }) => (selected ? "#fff" : "#666c6d")};
  margin-top: 4px;
`;

// 프리미엄 가격
const Price = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-top: 7px;
  text-align: end;
`;

// 개별 곡 다운로드 그룹
const StaticCard = styled.div`
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StaticDesc = styled.div`
  font-size: 12px;
  color: #666c6d;
  white-space: pre-line;
`;

const StaticTopRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
`;

const StaticPrice = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #000;
  white-space: nowrap;
`;

// 결제하기 버튼
const PayButton = styled.button`
  background: #ff2c68;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #e02458;
  }
`;
