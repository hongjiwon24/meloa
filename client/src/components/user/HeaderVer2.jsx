import React, { useContext } from "react";
import styled from "styled-components";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // ✅ 추가

export default function HeaderVer2({ title }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ✅ context에서 유저 정보 가져오기

  const handleMyPageClick = () => {
    if (user) {
      navigate("/mypage"); // 로그인 되어있으면 마이페이지로
    } else {
      navigate("/login"); // 아니면 로그인 페이지로
    }
  };

  return (
    <HeaderContainer>
      <PassLink to="/pass">
        <PassIconImg onClick={() => navigate("/pass")} src="/icons/header_pass.svg" alt="이용권" />
      </PassLink>
      <TitleName>{title}</TitleName>

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

const HeaderContainer = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;
`;

const TitleName = styled(Link)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
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

const PassLink = styled(Link)`
  cursor: pointer;

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