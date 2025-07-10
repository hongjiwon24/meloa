import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUpload, FaListAlt, FaChartBar, FaClock } from "react-icons/fa";

export default function ABottomNav() {
  const navigate = useNavigate();

  return (
    <Nav>
      <NavList>
        {/* 인기차트 */}
        <NavItem onClick={() => navigate("/best")}>
          <FaChartBar size={20} />
          <span>인기차트</span>
        </NavItem>

        {/* 최신음악 */}
        <NavItem onClick={() => navigate("/latest")}>
          <FaClock size={20} />
          <span>최신음악</span>
        </NavItem>

        {/* 홈 (관리자 홈) */}
        <NavItem onClick={() => navigate("/admin")}>
          <FaHome size={20} />
          <span>홈</span>
        </NavItem>

        {/* 업로드 목록 */}
        <NavItem onClick={() => navigate("/admin/upload-list")}>
          <FaListAlt size={20} />
          <span>업로드 목록</span>
        </NavItem>

        {/* 업로드 */}
        <NavItem onClick={() => navigate("/admin/upload")}>
          <FaUpload size={20} />
          <span>업로드</span>
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
  background-color: #1f2937; /* 어두운 회색 배경 */
  border-top: 1px solid #374151;
  box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.3);
  z-index: 50;

`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  font-size: 13px;
  color: #9ca3af; /* 연한 회색 글씨 */
`;

const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: inherit;
  user-select: none;

  &:hover {
    color: #ff2c68; /* 멜로아 핑크로 변경 */
  }

  span {
    margin-top: 4px;
  }
`;
