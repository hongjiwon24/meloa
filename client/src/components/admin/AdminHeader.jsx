// src/components/admin/AdminHeader.jsx

import React, { useContext } from "react";
import styled from "styled-components";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; 

export default function Header() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/admin-login';
  };


  return (
    <HeaderContainer>
      <LogoLink to="/admin">Meloa</LogoLink>
      <TitleText>관리자 모드</TitleText>
      
      <ButtonGroup>
        {isAdmin && (
          <IconButton onClick={handleLogout} title="로그아웃">
            로그아웃
          </IconButton>
        )}
      </ButtonGroup>
    </HeaderContainer>
  );
}

// 스타일
const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;
  gap: 10px;
`;

const TitleText = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoLink = styled(Link)`
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

const IconButton = styled.button`
  background: none;
  border: none;
  color: #374151;
  cursor: pointer;

  &:hover {
    color: #ff2c68;
  }
`;
