import React from "react";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <HeaderContainer>
      <TicketButton>이용권</TicketButton>
      <LogoLink to="/">Meloa</LogoLink>
      <CartButton>
        <FaShoppingCart size={20} />
      </CartButton>
    </HeaderContainer>
  );
}

// 스타일 정의
const HeaderContainer = styled.header`
  position: relative; /* ✅ 기준 컨테이너 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;
`;

const TicketButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #2563eb;
  background: none;
  border: none;
  cursor: pointer;
`;

const LogoLink = styled(Link)`
  position: absolute; /* ✅ 부모 기준으로 중앙 배치 */
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.05em;
  color: #FF2C68;
`;

const CartButton = styled.button`
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
`;
