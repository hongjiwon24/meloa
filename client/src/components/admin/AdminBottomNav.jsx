// 최종본(07-17, 15:44)
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
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveMenu = () => {
    if (location.pathname === "/admin") return "home";
    if (location.pathname.startsWith("/admin/files")) return "files";
    if (location.pathname.startsWith("/admin/upload")) return "upload";
    if (location.pathname === "/") return "switch";
    if (location.pathname.startsWith("/admin-info")) return "info";
    return "";
  };

  const activeMenu = getActiveMenu();

  return (
    <Nav>
      <NavList>
          <NavItem onClick={() => navigate("/admin")}>
          <Icon 
            src={
              activeMenu === "home"
                ? "/AdminIcons/home_fill.svg"
                : "/AdminIcons/home.svg"
            }
          />
          <Label active={activeMenu === "home"}>홈</Label>
        </NavItem>

        <NavItem onClick={() => navigate("/admin/files")}>
          <Icon 
            src={
              activeMenu === "files"
                ? "/AdminIcons/list_fill.svg"
                : "/AdminIcons/list.svg"
            }
          />
          <Label active={activeMenu === "files"}>리스트</Label>
        </NavItem>

        <NavItem onClick={() => navigate("/admin/upload")}>
          <Icon 
            src={
              activeMenu === "upload"
                ? "/AdminIcons/upload_fill.svg"
                : "/AdminIcons/upload.svg"
            }
          />
          <Label active={activeMenu === "upload"}>업로드</Label>
        </NavItem>

        <NavItem onClick={() => navigate("/")}>
          <Icon 
            src={
              activeMenu === "switch"
                ? "/AdminIcons/mode_change_fill.svg"
                : "/AdminIcons/mode_change.svg"
            }
          />
          <Label active={activeMenu === "switch"}>모드전환</Label>
        </NavItem>

        <NavItem onClick={() => navigate("/admin-info")}>
          <Icon 
            src={
              activeMenu === "info"
                ? "/AdminIcons/people_fill.svg"
                : "/AdminIcons/people.svg"
            }
          />
          <Label active={activeMenu === "info"}>프로필</Label>
        </NavItem>
      </NavList>
    </Nav>
  );
}

const Nav = styled.nav`
  height: 70px;
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
  justify-content: space-between;
  padding: 0px 18px;
  margin: 10px 0;
  font-size: 12px;
  color: #4b5563;
`;

const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  width: 40px;

  &:hover {
    color: #ff2c68;
  }
`;

const Icon = styled.img`
  width: 28px;
  height: 28px;
  padding-top: 3px;
`;

const Label = styled.span`
  font-size: 10px;
  color: ${(props) => (props.active ? '#ff2c68' : '#969696')};
  line-height: 1;
  font-weight: ${(props) => (props.active ? '600' : 'normal')};
`;


