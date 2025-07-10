import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function AHeader() {
  const navigate = useNavigate();

  const handleMyPageClick = () => {
    navigate("/admin/info"); // 관리자 정보 페이지로 이동
  };

  return (
    <HeaderContainer>
      <LogoGroup to="/admin">
        <MainText>Meloa</MainText>
        <SubText>관리자버전</SubText>
      </LogoGroup>

      <IconButton onClick={handleMyPageClick} title="관리자 정보">
        <FaUser size={20} />
      </IconButton>
    </HeaderContainer>
  );
}

// 스타일

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  font-family: 'Noto Sans', sans-serif;
`;

const LogoGroup = styled(Link)`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  gap: 6px;
  text-decoration: none;
`;

const MainText = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #ff2c68;
`;

const SubText = styled.span`
  font-size: 14px;
  color: black;
  align-self: flex-end;
  padding-bottom: 2px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #374151;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #ff2c68;
  }
`;
