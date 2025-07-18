import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HeaderVer2 from '../../components/user/HeaderVer2';
import BottomNav from '../../components/user/BottomNav';

const CartP = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [scrollNeeded, setScrollNeeded] = useState({});
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const cartKey = user ? `cartItems_${user.id}` : "cartItems";

  const isAllSelected =
    cartItems.length > 0 && selectedItems.length === cartItems.length;

  const toggleSelectAll = () => {
    setSelectedItems(
      isAllSelected ? [] : cartItems.map((item) => item.id)
    );
  };

  // 1. 로그인 후 게스트 장바구니 병합용 useEffect
  useEffect(() => {
    if (!user) return;

    const guestKey = "cartItems";
    const userKey = `cartItems_${user.id}`;

    const guestCart = JSON.parse(localStorage.getItem(guestKey)) || [];
    const userCart = JSON.parse(localStorage.getItem(userKey)) || [];

    const combined = [...userCart];
    guestCart.forEach((item) => {
      if (!combined.some((i) => i.id === item.id)) {
        combined.push(item);
      }
    });

    localStorage.setItem(userKey, JSON.stringify(combined));
    localStorage.removeItem(guestKey);
  }, []);

  // 2. 장바구니 불러오기용 useEffect
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCartItems(storedItems);
    setSelectedItems(storedItems.map((item) => item.id));
  }, [cartKey]);

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const deleteItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    localStorage.setItem(cartKey, JSON.stringify(updated));
    setCartItems(updated);
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    setScrollNeeded((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const handleDeleteSelected = () => {
    const updated = cartItems.filter((item) => !selectedItems.includes(item.id));
    localStorage.setItem(cartKey, JSON.stringify(updated));
    setCartItems(updated);
    setSelectedItems([]);
    setScrollNeeded({});
  };

  const handlePayment = () => {
    const selectedCartItems = cartItems.filter(item =>
      selectedItems.includes(item.id)
    );

    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login", {
        state: {
          from: "/pay", // 로그인 후 돌아올 경로
          passItem: selectedCartItems, // 선택한 아이템 전달
        },
      });
      return;
    }

    navigate("/pay", { state: { items: selectedCartItems } });
  };

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const textRefs = useRef({});

  useEffect(() => {
    const checkOverflow = () => {
      cartItems.forEach(({ id }) => {
        const el = textRefs.current[id];
        if (el) {
          const isOverflowing = el.scrollWidth > el.clientWidth;
          setScrollNeeded((prev) => ({ ...prev, [id]: isOverflowing }));
        }
      });
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [cartItems]);

  return (
    <>
      <HeaderVer2 title="장바구니" />
      <Container>
        <Notice>
          구매한 MP3 음원은 Meloa &gt; 마이페이지 &gt; 구매한 콘텐츠에서 확인하실 수 있습니다. <br />
          MP3 다운로드 상품은 디지털 콘텐츠 특성상 청약철회(환불)가 불가합니다.
        </Notice>
        <Divider />

        {cartItems.length === 0 ? (
          <EmptyMessage>음원을 담아주세요</EmptyMessage>
        ) : (
          <>
            <ListHeader>
              <CheckboxWrapper>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </CheckboxWrapper>
              <HeaderText>노래 제목 · 아티스트</HeaderText>
              <HeaderText>가격</HeaderText>
              <HeaderDeleteButton onClick={handleDeleteSelected}>
                선택삭제
              </HeaderDeleteButton>
            </ListHeader>

            {cartItems.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              const needScroll = scrollNeeded[item.id];
              const scrollWidth = textRefs.current[item.id]?.scrollWidth || 0;

              return (
                <CartItem key={item.id}>
                  <CheckboxContainer>
                    <StyledCheckbox
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(item.id)}
                    />
                  </CheckboxContainer>
                  <AlbumImage src={item.image} alt="album" />
                  <TextGroup>
                    <ScrollingTextWrapper
                      ref={(el) => (textRefs.current[item.id] = el)}
                      $scroll={needScroll}
                      $scrollWidth={scrollWidth}
                      title={`${item.title} · ${item.artist}`}
                    >
                      {item.title}
                    </ScrollingTextWrapper>
                    <Art>{item.artist}</Art>
                  </TextGroup>
                  <PriceContainer>
                    <Price>{item.price.toLocaleString()}원</Price>
                  </PriceContainer>
                  <DeleteButton onClick={() => deleteItem(item.id)}>✕</DeleteButton>
                </CartItem>
              );
            })}

            <TotalSection>
              <TotalText>총 {totalPrice.toLocaleString()}원</TotalText>
            </TotalSection>
            <PayButton
              disabled={selectedItems.length === 0}
              onClick={handlePayment}
            >
              결제하기
            </PayButton>
          </>
        )}
      </Container>
      <BottomNav />
    </>
  );
};

export default CartP;


// ⬇ styled-components

const scrollAnim = (scrollWidth) => keyframes`
  0%, 25% { transform: translateX(0); }
  75%, 100% { transform: translateX(-${scrollWidth + 20}px); }
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  background: white;
`;

const Notice = styled.div`
  font-size: 12px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const Divider = styled.div`
  height: 1px;
  background: #e0e0e0;
  margin-top: 16px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #999;
  margin: 60px 0;
`;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const CheckboxWrapper = styled.label`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #ff2c68;
  }
`;

const HeaderText = styled.div`
  font-size: 14px;
  color: #666;

  &:first-child {
    // flex: 1;
    margin-left: 65px;
  }

  &:nth-child(2) {
    width: 50%;
  }
`;

const HeaderDeleteButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    background: #f5f5f5;
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  gap: 8px;
`;

const CheckboxContainer = styled.div`
  width: 20px;
  display: flex;
  justify-content: center;
`;

const StyledCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #ff2c68;
`;

const AlbumImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 4px;
  object-fit: cover;
  margin-left: 7px;
`;

const TextGroup = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 8px;
`;

const ScrollingTextWrapper = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
`;

const Art = styled.div`
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PriceContainer = styled.div`
  width: 60px;
  text-align: center;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #ff2c68;
  }
`;

const TotalSection = styled.div`
  text-align: right;
  padding: 20px 0;
  margin-top: 16px;
`;

const TotalText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #333;
`;

const PayButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #ff2c68;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 16px;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;
