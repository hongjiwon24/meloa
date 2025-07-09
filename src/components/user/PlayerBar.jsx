import React from "react";
import styled from "styled-components";
import { FaStepBackward, FaPlay, FaStepForward, FaTimes } from "react-icons/fa";

export default function PlayerBar() {
  return (
    <BarContainer>
      <SongInfo>
        <Title>달빛의 노래</Title>
        <Artist>루나에코</Artist>
      </SongInfo>
      <Controls>
        <FaStepBackward />
        <FaPlay />
        <FaStepForward />
        <FaTimes />
      </Controls>
    </BarContainer>
  );
}

// 스타일 컴포넌트
const BarContainer = styled.div`
  position: fixed;
  bottom: 56px;
  left: 0;
  right: 0;
  padding: 8px 16px;
  background-color: #f3f4f6;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 40;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Artist = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #374151;
  font-size: 16px;
`;
