// \client\src\pages\AAdmin.jsx

import React from "react";
import styled from "styled-components";
import AdminHeader from "../components/admin/AdminHeader";
import AdminBottomNav from "../components/admin/AdminBottomNav";

export default function AAdmin() {

  // 임시 관리자 정보
  const admin = {
    id: "admin001",
    name: "Meloa 관리자",
    profileImage: "https://placehold.co/100x100?text=ADMIN",
  };

  return (
    <Container>
      <AdminHeader />

      <Wrapper>
        <ProfileSection>
          <ProfileImage src={admin.profileImage} alt="관리자 프로필" />
        </ProfileSection>
        <Divider />
        <InfoText>아이디: {admin.id}</InfoText>
        <Divider />
        <InfoText>이름: {admin.name}</InfoText>
        <Divider />
      </Wrapper>

      <AdminBottomNav />
    </Container>
  );
}

// Styled-components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  background-color: #f9f9f9;
`;

const Wrapper = styled.div`
  flex-grow: 1;
  padding: 100px 20px 80px; /* 상단과 하단 nav 고려한 패딩 */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileSection = styled.div`
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const Divider = styled.hr`
  width: 80%;
  margin: 20px 0;
  border: 1px solid #ccc;
`;

const InfoText = styled.p`
  font-size: 18px;
  color: #333;
`;
