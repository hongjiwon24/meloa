// D:\team\meloa-main\src\pages\admin\AAdmin.jsx

import React from "react";
import styled from "styled-components";

export default function AAdmin() {
  // 임시 관리자 정보
  const admin = {
    id: "admin001",
    name: "Meloa 관리자",
    profileImage: "https://placehold.co/100x100?text=ADMIN", // 임시 프로필 이미지
  };

  return (
    <Wrapper>
      <ProfileSection>
        <ProfileImage src={admin.profileImage} alt="관리자 프로필" />
      </ProfileSection>
      <Divider />
      <InfoText>아이디: {admin.id}</InfoText>
      <Divider />
      <InfoText>이름: {admin.name}</InfoText>
    </Wrapper>
  );
}

// 스타일
const Wrapper = styled.div`
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  text-align: center;
  font-family: 'sans-serif';
`;

const ProfileSection = styled.div`
  margin-bottom: 16px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
`;

const Divider = styled.hr`
  margin: 24px 0;
  border: none;
  border-top: 1px solid #e5e7eb;
`;

const InfoText = styled.p`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;
