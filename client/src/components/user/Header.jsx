// src/components/user/Header.jsx

import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; 


export default function Header() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const handleMyPageClick = () => {
    if (user) {
      navigate("/mypage");  // 로그인된 사용자만 마이페이지로 이동
    } else {
      navigate("/login");  // 로그인되지 않은 사용자에게는 로그인 페이지로 리디렉션
    }
  };

  return (
    <HeaderContainer>
      <PassLink to="/pass">
        <PassIconImg src="/icons/header_pass.svg" alt="이용권" />
      </PassLink>

      <LogoLink to="/">Meloa</LogoLink>

      <ButtonGroup>
        <IconButton onClick={() => navigate("/cart")} title="장바구니">
          <CartIconImg src="/icons/header_cart.svg" alt="장바구니" />
        </IconButton>
        <IconButton onClick={handleMyPageClick} title="마이페이지">
          <UserIconImg src="/icons/header_people.svg" alt="마이페이지" />
        </IconButton>
      </ButtonGroup>
    </HeaderContainer>
  );
}



// 스타일
const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;
`;

const PassLink = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #374151;
  cursor: pointer;

  &:hover {
    color: #ff2c68;
  }
`;

const PassIconImg = styled.img`
  width: 42px;
  vertical-align: middle;
`;
const CartIconImg = styled.img`
  width: 26px;
  vertical-align: middle;
`;

const UserIconImg = styled.img`
  width: 23px;
  vertical-align: middle;
`;


const LogoLink = styled(Link)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.05em;
  color: #FF2C68;
  text-decoration: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

