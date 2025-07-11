import React, { useEffect, useState, useRef  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const banks = ["국민은행", "신한은행", "우리은행", "하나은행"];

export default function PayP() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedItem = location.state;

  const [items, setItems] = useState([]);
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [selectedBank, setSelectedBank] = useState(""); // ← 공백 기본값
  const [depositorName, setDepositorName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedCard, setSavedCard] = useState(null);
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [password, setPassword] = useState("");
  

  const cardNumberRef = useRef();
  const expiryRef = useRef();
  const cvcRef = useRef();
  const passwordRef = useRef();
  

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (selectedItem?.items) {
          setItems(selectedItem.items);
        } else if (selectedItem?.id) {
          const res = await axios.get(`/api/music/${selectedItem.id}`);
          setItems([res.data]);
        } else {
          const res = await axios.get('/api/music');
          setItems(res.data);
        }
      } catch (err) {
        console.error("❌ 음악 데이터를 불러오는 데 실패했습니다:", err);
        setItems([
          {
            id: "fallback1",
            image: "https://placehold.co/60x60",
            title: "임시 상품 1",
            artist: "임시 아티스트 1",
            price: 700,
          },
          {
            id: "fallback2",
            image: "https://placehold.co/60x60",
            title: "임시 상품 2",
            artist: "임시 아티스트 2",
            price: 700,
          },
          {
            id: "fallback3",
            image: "https://placehold.co/60x60",
            title: "임시 상품 3",
            artist: "임시 아티스트 3",
            price: 700,
          },
        ]);
      }
    };

    fetchItems();
  }, [selectedItem]);

  const totalPrice = Array.isArray(items)
    ? items.reduce((acc, item) => acc + item.price, 0)
    : 0;

  // 카드 임시 정보
  const handleCardRegister = () => {
    setSavedCard({
      image: "https://placehold.co/70x30?text=MeloaCard",
      name: "Meloa Card"
    });
    setCardModalOpen(false);
  };

  const handlePayment = async () => {
    try {
      // 실제 서버 호출을 주석처리
      /*
      await axios.post("/api/payment", {
        items,
        method: selectedPayment,
        bank: selectedPayment === "bank" ? selectedBank : null,
        depositor: selectedPayment === "bank" ? depositorName : null,
        total: totalPrice,
      });
      */

      // 바로 성공 모달 띄우기
      setIsModalOpen(true);
    } catch (err) {
      console.error("❌ 결제 실패:", err);
      alert("결제에 실패했습니다. 다시 시도해주세요.");
    }
  };


const handleModalConfirm = () => {
  setIsModalOpen(false);

  // 이용권 아닌 것만 필터링
  const contentItems = items.filter(item => !item.premium);

  // 기존 구매 목록과 병합 (중복 제거)
  const purchasedItems = JSON.parse(localStorage.getItem("purchased")) || [];  // 기존 구매 목록 불러오기
  const uniqueItems = Array.from( // 기존 + 새로 산 거 병합 (중복 제거)
    new Map([...purchasedItems, ...contentItems].map((item) => [item.id, item])).values()
  );
  localStorage.setItem("purchased", JSON.stringify(uniqueItems));

  // 이용권이면 따로 subscription으로 저장
  if (selectedItem?.method === "subscription") {
    const passItem = selectedItem.items?.[0];

    const today = new Date(); // 오늘 날짜
    const startDate = today.toISOString().split("T")[0].replace(/-/g, "."); // YYYY.MM.DD 형식

    const end = new Date(today);
    end.setDate(end.getDate() + 30); // 오늘로부터 30일 뒤
    const endDate = end.toISOString().split("T")[0].replace(/-/g, ".");

    // 남은 날짜 계산
    const diffInMs = end.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    localStorage.setItem(
      "subscription",
      JSON.stringify({
        name: passItem.title || "이용권",
        type: passItem.id || "monthly" ? "recurring" : "fixed",
        startDate,
        endDate,
        ...(passItem.id !== "monthly" && { remainingDays: "남은 기간: 30일" }),
      })
    );
  }

  localStorage.removeItem("cart");
  navigate("/mypage");
};
 
  const isCardValid = selectedPayment === "card" && savedCard !== null; // 카드 등록 여부가 있어야 유효한 카드 결제로 인정
  const isBankInfoValid = selectedPayment === "bank" && depositorName.trim() !== "" && selectedBank !== ""; // 무통장입금 유효성 검사, 은행이 실제 선택된 경우만 통과

  // 버튼 활성화 조건
  const isButtonEnabled =
    (selectedPayment === "card" && isCardValid) ||
    (selectedPayment === "bank" && isBankInfoValid);
    

  // 카드 등록 모달
  const [cardModalOpen, setCardModalOpen] = useState(false);

  // 글자 입력 시 자동으로 넘어가게
  const handleAutoFocus = (e, nextRef, maxLen) => {
    if (e.target.value.length >= maxLen) {
      nextRef.current?.focus();
    }
  };

  // 카드 번호 입력 시 자동으로 '-' 추가
  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '') // 숫자만 남기기
      .slice(0, 16) // 최대 16자리
      .match(/.{1,4}/g) // 4자리씩 나누기
      ?.join(' - ') || '';
  };
  const [cardNumber, setCardNumber] = useState("");

  // 카드 번호 상태와 핸들러
  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);

    // 자동 포커스 이동
    const rawLength = formatted.replace(/\D/g, '').length;
    if (rawLength === 16) {
      expiryRef.current?.focus();
    }
  };

  // 카드 정보 모든 입력 유효성 검사
  const isCardFormValid =
  cardNumber.replace(/\D/g, '').length === 16 &&
  expiry.length === 4 &&
  cvc.length === 3 &&
  password.length === 2;

  
  return (
    <Container>
      <Title>
        구매목록
        <ToggleButton
          onClick={() => {
            if (items.length > 1) setIsListOpen(!isListOpen);
          }}
          disabled={items.length === 1}
        >
          {isListOpen ? "∧" : "∨"}
        </ToggleButton>
      </Title>

      {/* 토글 닫힌 상태 */}
      {!isListOpen && items.length > 0 && (
        <AlbumItem>
          <AlbumImage src={items[0].image} alt={items[0].title} />
          <AlbumInfo>
            {items.length > 1 ? (
              <>
                <AlbumTitle>총 {items.length}개</AlbumTitle>
                <AlbumDetail>
                  {items
                    .map((item) => item.title || item.info || "")
                    .filter(Boolean)
                    .join(", ")
                    .slice(0, 30)}
                  {items
                    .map((item) => item.title || item.info || "")
                    .join(", ").length > 30 && "..."}
                </AlbumDetail>
              </>
            ) : (
              <>
                <AlbumTitle>{items[0].title}</AlbumTitle>
                <AlbumDetail>{items[0].artist || items[0].info}</AlbumDetail>
              </>
            )}
          </AlbumInfo>

          {/* ✅ 상품이 1개일 때만 가격 표시 */}
          {items.length === 1 && (
            <PriceText>{items[0].price.toLocaleString()}원</PriceText>
          )}
        </AlbumItem>
      )}

      {/* 토글 펼친 상태 */}
      {isListOpen &&
        items.map((item) => (
          <AlbumItem key={item.id}>
            <AlbumImage src={item.image} alt={item.title} />
            <AlbumInfo>
              <AlbumTitle>{item.title}</AlbumTitle>
              <AlbumDetail>{item.artist || item.info}</AlbumDetail>
            </AlbumInfo>
            <PriceText>{item.price.toLocaleString()}원</PriceText>
          </AlbumItem>
      ))}

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

        {savedCard ? (
          <CardBox>
            <img src={savedCard.image} alt="등록된 카드" width="200" />
            <span>{savedCard.name}</span>
          </CardBox>
        ) : (
          <CardBox onClick={() => setCardModalOpen(true)}>
            <AddIcon src="/icons/add_button.svg" alt="카드 추가" />
            카드 등록하기
          </CardBox>
        )}
      </PaymentOption>


      {cardModalOpen && (
        <ModalOverlay>
          <CardModalContent>
            <ModalTitle>카드 정보</ModalTitle>
            <CloseButton onClick={() => setCardModalOpen(false)}>×</CloseButton>

            {/* 카드 번호 */}
            <InputGroup>
              <InputLabel>카드 번호</InputLabel>
              <InputFull
                placeholder="0000 - 0000 - 0000 - 0000"
                value={cardNumber}
                onChange={handleCardNumberChange}
                ref={cardNumberRef}
              />
            </InputGroup>

            {/* 유효기간 & CVC */}
            <FlexRow>
              <InputGroup>
                <InputLabel>유효기간</InputLabel>
                <InputHalf
                  placeholder="MMYY"
                  maxLength={4}
                  ref={expiryRef}
                  value={expiry}
                  onChange={(e) => {
                    setExpiry(e.target.value);
                    handleAutoFocus(e, cvcRef, 4);
                  }}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>CVC</InputLabel>
                <InputHalf
                  placeholder="카드 뒷면 3자리 숫자"
                  maxLength={3}
                  ref={cvcRef}
                  value={cvc}
                  onChange={(e) => {
                    setCvc(e.target.value);
                    handleAutoFocus(e, passwordRef, 3);
                  }}
                />
              </InputGroup>
            </FlexRow>


            {/* 카드 비밀번호 */}
            <InputGroup>
              <InputLabel>카드 비밀번호</InputLabel>
              <InputFull
                placeholder="비밀번호 앞 2자리 숫자"
                maxLength={2}
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            <ConfirmButton
              onClick={handleCardRegister}
              disabled={!isCardFormValid}
            >
              확인
            </ConfirmButton>
          </CardModalContent>
        </ModalOverlay>
      )}

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

        <BankSection>
          <FieldWrapper>
            <Label>입금은행*</Label>
            <BankSelect
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="">선택</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </BankSelect>
          </FieldWrapper>

          <FieldWrapper>
            <Label>입금자명*</Label>
            <Input
              type="text"
              placeholder="입금자명*"
              value={depositorName}
              onChange={(e) => setDepositorName(e.target.value)}
            />
          </FieldWrapper>
        </BankSection>
      </PaymentOption>

      <TotalPrice>
        <span>총 결제 금액</span>
        <TotalAmount>{totalPrice.toLocaleString()}원</TotalAmount>
      </TotalPrice>
      
      <PayButton onClick={handlePayment} disabled={!isButtonEnabled}>
        {totalPrice.toLocaleString()}원 결제하기
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

// 전체 페이지 컨테이너
const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  font-family: sans-serif;
`;

// 상단 제목(구매목록)과 토글 버튼 묶음
const Title = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 8px;
`;

// 목록 펼치기/닫기 토글 버튼
const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  margin-left: 10px;
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
  color: ${({ disabled }) => (disabled ? "#aaa" : "#000")};
`;


// 개별 앨범/상품 아이템 래퍼
const AlbumItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
`;

// 앨범 썸네일 이미지
const AlbumImage = styled.img`
  width: 60px;
  height: 60px;
`;

// 앨범 텍스트 정보 영역 (제목, 아티스트 등)
const AlbumInfo = styled.div`
  overflow: hidden;
  margin-left: 12px;
  flex: 1;
`;

// 앨범 제목
const AlbumTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 85%;
`;

// 앨범 부가 설명 (아티스트 or info)
const AlbumDetail = styled.div`
  margin-top: 2px;
  font-size: 13px;
  color: #666c6d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 85%;
`;

// 가격 텍스트 (오른쪽 끝)
const PriceText = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #000;
  white-space: nowrap;
`;

// 결제수단 제목
const PaymentTitle = styled.h3`
  margin-top: 24px;
  font-weight: bold;
`;

// 결제수단 영역 묶음 (카드/무통장)
const PaymentOption = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
`;

// 카드 추가 박스
const CardBox = styled.div`
  width: 100%;
  height: 150px;
  margin-top: 8px;
  background-color: #dfe1e5;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
`;

// 카드 추가 버튼
const AddIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-top: 20px;
`;

// 카드 추가 모달
const CardModalContent = styled.div`
  position: relative;
  background-color: white;
  padding: 24px 20px;
  border-radius: 10px;
  max-width: 350px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 16px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #555;
  text-align: left;
  margin-bottom: 4px;
`;

const InputFull = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 14px;
  // border: 1px solid #ccc;
  background-color: #F3F4F8;
  border-radius: 8px;
  font-size: 15px;
`;

const InputHalf = styled(InputFull)`
  
`;

const FlexRow = styled.div`
  display: flex;
  gap: 12px;
`;

// 무통장입금 선택 시 입력영역 묶음
const BankSection = styled.div`
  background-color: #f2f3f5;
  padding: 16px;
  border-radius: 12px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
`;

// 묶음 이름
const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

// 은행 선택 드롭다운
const BankSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 14px;
`;
// 입금자명 인풋
const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 14px;
`;

// 총 결제 금액 표시
const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 12px 0;
  font-size: 16px;
  font-weight: 500;
  border-top: 1px solid #ddd;
  color: #111;
`;

const TotalAmount = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #ff2c68;
`;

// 결제하기 버튼
const PayButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 13px 0;
  background-color: ${({ disabled }) => (disabled ? '#E6E7EA' : '#ff2c68')};
  color: ${({ disabled }) => (disabled ? '#868B91' : 'white')};
  border: none;
  border-radius: 4px;
  font-size: 17px;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};


  // (선택) 추가적인 안정성 보장
  &:disabled {
    background-color: #E6E7EA;
    color: #868B91;
    cursor: not-allowed;
  }
`;


// 카드등록 모달 오버레이 (배경 어둡게)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 카드등록 모달 콘텐츠 영역
const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
  text-align: center;
`;

// 카드등록 모달 확인 버튼
const ConfirmButton = styled.button`
  margin-top: 12px;
  padding: 13px 16px;
  background-color: #ff2c68;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 17px;
  font-weight: bold;

  &:disabled {
    background-color: #E6E7EA;
    color: #868B91;
    cursor: not-allowed;
  }
`;

