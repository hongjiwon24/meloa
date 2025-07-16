// src/components/user/BottomNav.jsx

import React from "react";
import styled from "styled-components";
import {
  FaHome,
  FaHeart,
  FaUser,
  FaChartLine,
  FaClock,
  FaListUl
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <Nav>
      <NavList>
        <NavItem onClick={() => navigate("/tracks/popular")}>
          <FaChartLine size={20} />
          <span>인기차트</span>
        </NavItem>

        <NavItem onClick={() => navigate("/tracks")}>
          <FaClock size={20} />
          <span>최신음악</span>
        </NavItem>

        <NavItem onClick={() => navigate("/")}>
          <FaHome size={20} />
          <span>홈</span>
        </NavItem>

        <NavItem onClick={() => navigate("/like")}>
          <FaHeart size={20} />
          <span>좋아요</span>
        </NavItem>

        <NavItem onClick={() => navigate("/list")}>
          <FaListUl size={20} />
          <span>플레이리스트</span>
        </NavItem>
      </NavList>
    </Nav>
  );
}

// 스타일
const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #e5e7eb;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
  z-index: 50;
  max-width: 600px;
  margin: 0 auto;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  font-size: 12px;
  color: #4b5563;
`;

const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #ff2c68;
  }
`;

