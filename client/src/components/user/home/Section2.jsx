import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { usePlayer } from "../../../context/Player";

const Section2 = () => {
  const navigate = useNavigate();
  const { setCurrentTrack, setIsPlaying } = usePlayer(); // 플레이바 추가
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await axios.get("/api/tracks");
        if (response.data.success) {
          const sorted = [...response.data.tracks].sort((a, b) => b.likes - a.likes);
          setTopTracks(sorted.slice(0, 3)); // 상위 3개만
        } else {
          setTopTracks([]);
        }
      } catch (error) {
        console.error("인기 트랙 데이터를 불러오는데 실패했습니다:", error);
        setTopTracks([]);
      }
    };

    fetchTopTracks();
  }, []);


  const displayTracks = [...topTracks];
  while (displayTracks.length < 3) {
    displayTracks.push({});
  }

  const goToBestPage = () => {
    navigate("/tracks/popular");
  };

  const goToMusicDetail = (track) => {
    if (!track._id) return;
    navigate(`/tracks/${track._id}`, { state: track });
  };

  return (
    <SectionContainer>
      <HeaderRow>
        <TitleButton onClick={goToBestPage}>인기차트</TitleButton>
        <MoreButton onClick={goToBestPage} aria-label="Go to Best Chart Page">
          &gt;
        </MoreButton>
      </HeaderRow>

      <TrackList>
        {displayTracks.map((item, idx) => {
          const isEmpty = !item._id;
          return (
            <TrackItem key={idx}>
              <Rank>{idx + 1}</Rank>

              {isEmpty ? (
                <>
                  <EmptyAlbumBox />
                  <TrackInfo>
                    <EmptyTrackTitle />
                    <EmptyTrackArtist />
                  </TrackInfo>
                  {/* 플레이 버튼도 렌더링 안 함 */}
                  <div style={{ width: "44px" }} /> {/* 빈 공간만 유지 */}                  
                </>
              ) : (
                <ClickableArea onClick={() => goToMusicDetail(item)}>
                  <AlbumImage
                    src={`http://localhost:5000/uploads/images/${item.coverImage}`}
                    alt={item.title}
                  />
                  <TrackInfo>
                    <TrackTitle>{item.title}</TrackTitle>
                    <TrackArtist>{item.artist}</TrackArtist>
                  </TrackInfo>
                </ClickableArea>
              )}
                  <PlayButton
                    onClick={() => {
                      setCurrentTrack(item);
                      setIsPlaying(true);
                    }}
                  >
                    <PlayIcon src="/icons/play_button.svg" alt="Play" />
                  </PlayButton>
            </TrackItem>
          );
        })}
      </TrackList>
    </SectionContainer>
  );
};


const SectionContainer = styled.div`
  margin: 0 auto;
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: white;
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

const TrackTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ClickableArea = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  cursor: pointer;

  &:hover ${TrackTitle} {
    text-decoration: underline;
  }
`;

const AlbumImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 6px;
  margin: 0 8px;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
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
  margin-right: 20px;
`;

// 빈 데이터용 회색 박스 스타일 (이미지 자리)
const EmptyAlbumBox = styled.div`
  width: 48px;
  height: 48px;
  background-color: #e5e7eb;
  border-radius: 6px;
  margin: 0 8px;
`;

// 빈 데이터용 회색 텍스트 자리 (제목)
const EmptyTrackTitle = styled.div`
  width: 120px;
  height: 16px;
  background-color: #e5e7eb;
  margin-bottom: 4px;
  border-radius: 4px;
`;

// 빈 데이터용 회색 텍스트 자리 (아티스트)
const EmptyTrackArtist = styled.div`
  width: 80px;
  height: 12px;
  background-color: #e5e7eb;
  border-radius: 4px;
`;

export default Section2;
