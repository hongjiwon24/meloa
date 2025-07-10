import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios";

const albumsMock = [
  { id: 1, image: "https://placehold.co/60x60", title: "노래제목1", artist: "가수명1", price: 10000 },
  { id: 2, image: "https://placehold.co/60x60", title: "노래제목2", artist: "가수명2", price: 12000 },
  { id: 3, image: "https://placehold.co/60x60", title: "노래제목3", artist: "가수명3", price: 15000 },
];

const banks = ["국민은행", "신한은행", "우리은행", "하나은행"];

export default function PayP() {
  const navigate = useNavigate();
  const [isListOpen, setIsListOpen] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [selectedBank, setSelectedBank] = useState(banks[0]);
  const [depositorName, setDepositorName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = albumsMock.reduce((acc, album) => acc + album.price, 0);

  // 결제 버튼 클릭 시 모달 오픈
  const handlePayment = () => {
    // 실제 결제 API 호출은 여기서
    setIsModalOpen(true);
  };

  // 모달 확인 버튼 클릭 시 동작
  const handleModalConfirm = () => {
    setIsModalOpen(false);

    // 기존 구매내역 불러오기
    const purchasedItems = JSON.parse(localStorage.getItem("purchased")) || [];
    // 이번에 구매한 앨범 추가 (중복 가능성 필요시 처리)
    const newPurchases = [...purchasedItems, ...albumsMock];
    localStorage.setItem("purchased", JSON.stringify(newPurchases));

    // 장바구니 비우기
    localStorage.removeItem("cart");

    // 마이페이지로 이동
    navigate("/mypage");
  };

  return (
    <Container>
      <Title>
        구매목록
        <ToggleButton onClick={() => setIsListOpen(!isListOpen)}>
          {isListOpen ? "∧" : "∨"}
        </ToggleButton>
      </Title>

      {isListOpen && (
        <AlbumList>
          {albumsMock.map((album) => (
            <AlbumItem key={album.id}>
              <AlbumImage src={album.image} alt={album.title} />
              <AlbumInfo>
                <div>{album.title}</div>
                <div>{album.artist}</div>
              </AlbumInfo>
            </AlbumItem>
          ))}
        </AlbumList>
      )}

      <PaymentTitle>결제수단</PaymentTitle>

      <PaymentOption>
        <label>
          <input
            type="radio"
            name="payment"
            value="card"
            checked={selectedPayment === "card"}
            onChange={(e) => setSelectedPayment(e.target.value)}
          />
          신용카드
        </label>
        <CardBox>+ 카드추가</CardBox>
      </PaymentOption>

      <PaymentOption>
        <label>
          <input
            type="radio"
            name="payment"
            value="bank"
            checked={selectedPayment === "bank"}
            onChange={(e) => setSelectedPayment(e.target.value)}
          />
          무통장입금
        </label>

        {/* 무통장 입금 관련 섹션 */}
        <BankSection>
          <BankSelect
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            {banks.map((bank) => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </BankSelect>
          <Input
            type="text"
            placeholder="입금자명*"
            value={depositorName}
            onChange={(e) => setDepositorName(e.target.value)}
          />
        </BankSection>
      </PaymentOption>

      <TotalPrice>총금액: {totalPrice.toLocaleString()} 원</TotalPrice>
      <PayButton onClick={handlePayment}>
        {totalPrice.toLocaleString()} 결제하기
      </PayButton>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <p>결제가 완료되었습니다.</p>
            <ConfirmButton onClick={handleModalConfirm}>확인</ConfirmButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}

// ---------------------- 스타일 컴포넌트 ----------------------

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
`;

const Title = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToggleButton = styled.button`
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;

const AlbumList = styled.ul`
  list-style: none;
  padding: 0;
`;

const AlbumItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 8px;
`;

const AlbumImage = styled.img`
  width: 60px;
  height: 60px;
`;

const AlbumInfo = styled.div`
  margin-left: 12px;
  div:first-child {
    font-weight: bold;
  }
  div:last-child {
    color: #666;
  }
`;

const PaymentTitle = styled.h3`
  margin-top: 24px;
`;

const PaymentOption = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
`;

const CardBox = styled.div`
  margin-top: 8px;
  background-color: #DFE1E5;
  padding: 8px;
  text-align: center;
  border-radius: 4px;
  width: 100px;
  font-size: 14px;
  color: #333;
`;

const BankSection = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BankSelect = styled.select`
  padding: 6px;
`;

const Input = styled.input`
  padding: 6px;
  width: 100%;
`;

const TotalPrice = styled.div`
  margin-top: 20px;
  font-weight: bold;
  font-size: 18px;
  color: #FF2C68;
`;

const PayButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background-color: #FF2C68;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
  text-align: center;
`;

const ConfirmButton = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  background-color: #FF2C68;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
