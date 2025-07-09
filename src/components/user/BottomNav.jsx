import React from "react";
import styled from "styled-components";
import { FaHome, FaHeart, FaUser, FaChartLine, FaClock } from "react-icons/fa";



export default function BottomNav() {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <FaChartLine size={20} />
          <span>인기차트</span>
        </NavItem>
        <NavItem>
          <FaClock size={20} />
          <span>최신음악</span>
        </NavItem>
        <NavItem>
          <FaHome size={20} />
          <span>홈</span>
        </NavItem>
        <NavItem>
          <FaHeart size={20} />
          <span>좋아요</span>
        </NavItem>
        <NavItem>
          <FaUser size={20} />
          <span>마이페이지</span>
        </NavItem>
      </NavList>
    </Nav>
  );
}

// 전체 네비게이션 바 스타일
const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  z-index: 50;
`;

// 리스트 스타일
const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  font-size: 12px;
  color: #4b5563;
`;

// 아이템 스타일
const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;