import React from "react";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <HeaderContainer>
      <TicketButton>이용권</TicketButton>
      <Logo>🎵 로고</Logo>
      <CartButton>
        <FaShoppingCart size={20} />
      </CartButton>
    </HeaderContainer>
  );
}

// 스타일 정의
const HeaderContainer = styled.header`
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

const Logo = styled.h1`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 0.05em;
`;

const CartButton = styled.button`
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
`;
