import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveMenu = () => {
    if (location.pathname.startsWith("/tracks/popular")) return "popular";
    if (location.pathname.startsWith("/tracks")) return "latest";
    if (location.pathname === "/") return "home";
    if (location.pathname.startsWith("/like")) return "like";
    if (location.pathname.startsWith("/list")) return "playlist";
    return "";
  };

  const activeMenu = getActiveMenu();

  return (
    <Nav>
      <NavList>
          <NavItem onClick={() => navigate("/")}>
          <Icon 
            src={
              activeMenu === "home"
                ? "/UserIcons/home_fill.svg"
                : "/UserIcons/home.svg"
            }
          />
          <Label active={activeMenu === "home"}>홈</Label>
        </NavItem>

        <NavItem onClick={() => navigate("/tracks/popular")}>
          <Icon
            src={
              activeMenu === "popular"
                ? "/UserIcons/fire_fill.svg"
                : "/UserIcons/fire.svg"
            }
          />
          <Label active={activeMenu === "popular"}>인기차트</Label>
        </NavItem>

        <NavItem onClick={() => navigate("/tracks")}>
          <Icon
            src={
              activeMenu === "latest"
                ? "/UserIcons/clock_fill.svg"
                : "/UserIcons/clock.svg"
            }
          />
          <Label active={activeMenu === "latest"}>최신음악</Label>
        </NavItem>

        <NavItem onClick={() => navigate("/list")}>
          <Icon
            src={
              activeMenu === "playlist"
                ? "/UserIcons/cd_fill.svg"
                : "/UserIcons/cd.svg"
            }
          />
          <Label active={activeMenu === "playlist"}>테마</Label>
        </NavItem>

        <NavItem onClick={() => navigate("/like")}>
          <Icon
            src={
              activeMenu === "like"
                ? "/UserIcons/heart_fill.svg"
                : "/UserIcons/heart_border.svg"
            }
          />
          <Label active={activeMenu === "like"}>좋아요</Label>
        </NavItem>
      </NavList>
    </Nav>
  );
}

// 스타일
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
