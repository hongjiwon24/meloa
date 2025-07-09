import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePlayer } from "../../components/user/Player";

const chartData = [
  { rank: 1, title: "첫 번째 노래", artist: "가수1", image: "https://placehold.co/60x60" },
  { rank: 2, title: "두 번째 노래", artist: "가수2", image: "https://placehold.co/60x60" },
  // ... 나머지 생략 ...
  { rank: 20, title: "스무 번째 노래", artist: "가수20", image: "https://placehold.co/60x60" },
];

const BestP = () => {
  const { setCurrentTrack } = usePlayer();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setCurrentTime(timeStr);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <Header>
        <Title>인기차트</Title>
        <Time>{currentTime}</Time>
      </Header>

      <List>
        {chartData.map((item) => (
          <ListItem
            key={item.rank}
            onClick={() => navigate(`/playlist/${item.rank}`)}
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") navigate(`/playlist/${item.rank}`);
            }}
          >
            <Rank>{item.rank}</Rank>
            <Thumbnail src={item.image} alt={`${item.title} 앨범 이미지`} />
            <Info>
              <SongTitle>{item.title}</SongTitle>
              <Artist>{item.artist}</Artist>
            </Info>
            <PlayButton
              onClick={(e) => {
                e.stopPropagation();
                setCurrentTrack(item);
              }}
            >
              <PlayIcon src="/img/icons/play.svg" alt="Play" />
            </PlayButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  max-width: 768px;
  margin: 0 auto;
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
`;

const Time = styled.span`
  font-size: 14px;
  color: #6b7280;
  user-select: none;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f9fafb;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #f3f4f6;
  }
`;

const Rank = styled.span`
  width: 32px;
  text-align: center;
  font-weight: bold;
  color: #4b5563;
`;

const Thumbnail = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
  margin: 0 16px;
  flex-shrink: 0;
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

const SongTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled.p`
  font-size: 14px;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 8px;
  cursor: pointer;
`;

const PlayIcon = styled.img`
  width: 28px;
  height: 28px;
`;


export default BestP;
