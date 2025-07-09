import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePlayer } from "../../components/user/Player";

const chartData = [
  { rank: 1, title: "첫 번째 노래", artist: "가수1", image: "https://placehold.co/50x50" },
  { rank: 2, title: "두 번째 노래", artist: "가수2", image: "https://placehold.co/50x50" },
  { rank: 3, title: "세 번째 노래", artist: "가수3", image: "https://placehold.co/50x50" },
  { rank: 4, title: "네 번째 노래", artist: "가수4", image: "https://placehold.co/50x50" },
  { rank: 5, title: "다섯 번째 노래", artist: "가수5", image: "https://placehold.co/50x50" },
  { rank: 6, title: "여섯 번째 노래", artist: "가수6", image: "https://placehold.co/50x50" },
  { rank: 7, title: "일곱 번째 노래", artist: "가수7", image: "https://placehold.co/50x50" },
  { rank: 8, title: "여덟 번째 노래", artist: "가수8", image: "https://placehold.co/50x50" },
  { rank: 9, title: "아홉 번째 노래", artist: "가수9", image: "https://placehold.co/50x50" },
  { rank: 10, title: "열 번째 노래", artist: "가수10", image: "https://placehold.co/50x50" },
  { rank: 11, title: "열한 번째 노래", artist: "가수11", image: "https://placehold.co/50x50" },
  { rank: 12, title: "열두 번째 노래", artist: "가수12", image: "https://placehold.co/50x50" },
  { rank: 13, title: "열세 번째 노래", artist: "가수13", image: "https://placehold.co/50x50" },
  { rank: 14, title: "열네 번째 노래", artist: "가수14", image: "https://placehold.co/50x50" },
  { rank: 15, title: "열다섯 번째 노래", artist: "가수15", image: "https://placehold.co/50x50" },
  { rank: 16, title: "열여섯 번째 노래", artist: "가수16", image: "https://placehold.co/50x50" },
  { rank: 17, title: "열일곱 번째 노래", artist: "가수17", image: "https://placehold.co/50x50" },
  { rank: 18, title: "열여덟 번째 노래", artist: "가수18", image: "https://placehold.co/50x50" },
  { rank: 19, title: "열아홉 번째 노래", artist: "가수19", image: "https://placehold.co/50x50" },
  { rank: 20, title: "스무 번째 노래", artist: "가수20", image: "https://placehold.co/50x50" },
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
  padding: 16px;
  max-width: 550px;
  margin: 0 auto;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
`;

const Time = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const List = styled.div`
  border-top: 1px solid #e5e7eb;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }
`;

const Rank = styled.span`
  width: 24px;
  font-size: 14px;
  text-align: center;
  color: #6b7280;
`;

const Thumbnail = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
  margin: 0 12px;
`;

const Info = styled.div`
  flex: 1;
  overflow: hidden;
`;

const SongTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 2px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  margin-left: 8px;
  cursor: pointer;
`;

const PlayIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 20px;
`;

export default BestP;
