// D:\team\meloa-main\src\components\home\Section2.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../components/user/Player";
import styled from "styled-components";

const SectionContainer = styled.div`
  width: 100%;
  padding: 16px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const TitleButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const MoreButton = styled.button`
  font-size: 20px;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #1f2937;
  }
`;

const TrackList = styled.div`
  border-top: 1px solid #e5e7eb;
`;

const TrackItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
`;

const Rank = styled.span`
  width: 24px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #6b7280;
`;

const AlbumImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
  margin: 0 8px;
`;

const TrackInfo = styled.div`
  flex: 1;
`;

const TrackTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TrackArtist = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayButton = styled.button`
  margin-left: 8px;
  background: none;
  border: none;
  cursor: pointer;
`;

const PlayIcon = styled.img`
  width: 24px;
  height: 24px;
`;

// ▶ Section2 컴포넌트 정의

const Section2 = () => {
  const navigate = useNavigate();
  const { setCurrentTrack } = usePlayer(); // 전역 상태에서 현재 재생 곡 설정 함수 사용

  // 임시 트랙 데이터
  const mockData = [
    {
      rank: 1,
      title: "첫 번째 노래",
      artist: "가수1",
      image: "https://placehold.co/60x60",
    },
    {
      rank: 2,
      title: "두 번째 노래",
      artist: "가수2",
      image: "https://placehold.co/60x60",
    },
    {
      rank: 3,
      title: "세 번째 노래",
      artist: "가수3",
      image: "https://placehold.co/60x60",
    },
  ];

  // 인기차트 페이지로 이동
  const goToBestPage = () => {
    navigate("/best");
  };

  return (
    <SectionContainer>
      {/* 제목과 '>' 버튼 */}
      <HeaderRow>
        <TitleButton onClick={goToBestPage}>인기차트</TitleButton>
        <MoreButton onClick={goToBestPage} aria-label="Go to Best Chart Page">
          &gt;
        </MoreButton>
      </HeaderRow>

      {/* 트랙 리스트 */}
      <TrackList>
        {mockData.map((item, idx) => (
          <TrackItem key={idx}>
            <Rank>{item.rank}</Rank>
            <AlbumImage src={item.image} alt={item.title} />
            <TrackInfo>
              <TrackTitle>{item.title}</TrackTitle>
              <TrackArtist>{item.artist}</TrackArtist>
            </TrackInfo>
            {/* ▶ 플레이 버튼 누르면 현재 곡 재생 상태로 변경 */}
            <PlayButton onClick={() => setCurrentTrack(item)}>
              <PlayIcon src="/img/icons/play.svg" alt="Play" />
            </PlayButton>
          </TrackItem>
        ))}
      </TrackList>
    </SectionContainer>
  );
};

export default Section2;
