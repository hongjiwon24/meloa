// src/components/admin/AdminBottomNav.jsx

import React from "react";
import styled from "styled-components";
import {
  FaListUl,
  FaUpload,
  FaHome,
  FaExchangeAlt,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <Nav>
      <NavList>
        <NavItem onClick={() => navigate("/admin/files")}>
          <FaListUl size={20} />
          <span>업로드 리스트</span>
        </NavItem>

        <NavItem onClick={() => navigate("/admin/upload")}>
          <FaUpload size={20} />
          <span>업로드</span>
        </NavItem>   

        <NavItem onClick={() => navigate("/admin")}>
          <FaHome size={20} />
          <span>홈</span>
        </NavItem>             

        <NavItem onClick={() => navigate("/")}>
          <FaExchangeAlt size={20} />
          <span>모드전환</span>
        </NavItem>

        <NavItem onClick={() => navigate("/admin-info")}>
          <FaUser size={20} />
          <span>관리자정보</span>
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
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 0px 5px;
  margin: 10px 0;
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
