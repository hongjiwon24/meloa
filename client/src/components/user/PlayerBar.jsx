// 📁 src/components/user/PlayerBar.jsx
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { FaStepBackward, FaPlay, FaPause, FaStepForward, FaTimes } from "react-icons/fa";
import { usePlayer } from "../../context/Player";

export default function PlayerBar() {
  const { currentTrack, isPlaying, setIsPlaying, setCurrentTrack } = usePlayer();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  if (!currentTrack) return null;

  const handleClose = () => {
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  // 재생 중일 때는 FaPause, 아닐 때는 FaPlay 아이콘 표시
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <BarContainer className={isPlaying ? "show" : ""}>
      <SongInfo>
        <Title>{currentTrack.title}</Title>
        <Artist>{currentTrack.artist}</Artist>
      </SongInfo>
      <Controls>
        <FaStepBackward />
        {isPlaying ? (
          <FaPause onClick={togglePlay} style={{ cursor: "pointer" }} />
        ) : (
          <FaPlay onClick={togglePlay} style={{ cursor: "pointer" }} />
        )}
        <FaStepForward />
        <FaTimes onClick={handleClose} style={{ cursor: "pointer" }} />
      </Controls>
      <audio ref={audioRef} src={currentTrack.src} />
    </BarContainer>
  );
}

const BarContainer = styled.div`
  position: fixed;
  bottom: -100px;
  left: 0;
  right: 0;
  padding: 8px 16px;
  background-color: #f3f4f6;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 40;
  max-width: 572px;
  margin: 0 auto;
  transition: bottom 0.3s ease-in-out;

  &.show {
    bottom: 77px;
  }
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

  svg {
    cursor: pointer;
  }
`;
