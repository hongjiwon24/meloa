// src/components/user/Header.jsx
import React from "react";
import styled from "styled-components";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();

  const authPages = ["/login", "/signup", "/find-id", "/find-password"];
  const isAuthPage = authPages.includes(location.pathname);

  const handleMyPageClick = () => {
    if (auth.isLoggedIn) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };

  return (
    <HeaderContainer>
      <PassLink to="/Pass">이용권</PassLink>
      <LogoLink to="/">Meloa</LogoLink>

      <ButtonGroup>
        <IconButton onClick={() => navigate("/cart")} title="장바구니">
          <FaShoppingCart size={20} />
        </IconButton>


        {isAuthPage ? (
          <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
        ) : (
          <IconButton onClick={handleMyPageClick} title="마이페이지">
            <FaUser size={20} />
          </IconButton>
        )}
      </ButtonGroup>
    </HeaderContainer >
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
  color: #ff2c68;
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
  color: #ff2c68;
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
  color: #ff2c68;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #cc2454;
  }
`;

const LoginButton = styled.button`
  padding: 6px 12px;
  background-color: #ff2c68;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #cc2454;
  }
`;
