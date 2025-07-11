import React from "react";
import styled from "styled-components";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderVer2({ title }) {
  const navigate = useNavigate();

  // 로그인 여부 체크 (임시)
  const isLoggedIn = false;

  const handleMyPageClick = () => {
    if (isLoggedIn) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };

  return (
    <HeaderContainer>
      <PassLink to="/PassP">이용권</PassLink>
      <TitleName>{title}</TitleName>

      <ButtonGroup>
        <IconButton onClick={() => navigate("/CartP")} title="장바구니">
          <FaShoppingCart size={20} />
        </IconButton>
        <IconButton onClick={handleMyPageClick} title="마이페이지">
          <FaUser size={20} />
        </IconButton>
      </ButtonGroup>
    </HeaderContainer>
  );
}

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

  &:hover {
    text-decoration: underline;
  }
`;

const TitleName = styled(Link)`
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
