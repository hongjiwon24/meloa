// src/components/admin/AdminHeader.jsx

import React, { useContext } from "react";
import styled from "styled-components";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; 

export default function Header() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const handleMyPageClick = () => {
    if (loading) return; // 아직 로딩 중이면 클릭 막음

    if (user) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };


  return (
    <HeaderContainer>
      <LogoLink to="/admin">Meloa</LogoLink>
      <TitleText>관리자 모드</TitleText>
      
      <ButtonGroup>
        {/* <IconButton onClick={handleMyPageClick} title="마이페이지">
          <FaUser size={20} />
        </IconButton> */}
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

const IconButton = styled.button`
  background: none;
  border: none;
  color: #374151;
  cursor: pointer;

  &:hover {
    color: #ff2c68;
  }
`;
