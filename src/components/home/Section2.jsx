import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../components/user/Player";
import styled from "styled-components";
import axios from "axios";

const Section2 = () => {
  const navigate = useNavigate();
  const { setCurrentTrack } = usePlayer();

  // 임시 데이터 1개 (백엔드 연동 전 테스트용)
  const tempData = [
    {
      id: 1,
      title: "임시 노래 제목",
      artist: "임시 아티스트",
      image: "https://placehold.co/48x48",
    },
  ];

  // 실제 데이터 상태
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    // 백엔드 연동 시 이 부분 주석 해제 후 사용
    /*
    const fetchTopTracks = async () => {
      try {
        const response = await axios.get("/api/top-tracks");
        if (response.data && response.data.length) {
          setTopTracks(response.data);
        } else {
          // 데이터 없으면 빈 배열 세팅
          setTopTracks([]);
        }
      } catch (error) {
        console.error("인기 트랙 데이터를 불러오는데 실패했습니다:", error);
        // 오류 시 빈 배열 세팅
        setTopTracks([]);
      }
    };
    fetchTopTracks();
    */

    // 현재는 임시 데이터 1개만 세팅
    setTopTracks(tempData);
  }, []);

  // 인기 차트 3개 보여주기 위해 부족하면 빈 객체로 채움
  const displayTracks = [...topTracks];
  while (displayTracks.length < 3) {
    displayTracks.push({});
  }

  const goToBestPage = () => {
    navigate("/best");
  };

  const goToMusicDetail = (track) => {
    if (!track.id) return; // 빈 데이터 클릭 무시
    navigate("/music-detail", { state: track });
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
          const isEmpty = !item.id;
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
                </>
              ) : (
                <ClickableArea onClick={() => goToMusicDetail(item)}>
                  <AlbumImage src={item.image} alt={item.title} />
                  <TrackInfo>
                    <TrackTitle>{item.title}</TrackTitle>
                    <TrackArtist>{item.artist}</TrackArtist>
                  </TrackInfo>
                </ClickableArea>
              )}

              <PlayButton onClick={() => !isEmpty && setCurrentTrack(item)}>
                <PlayIcon src="/img/icons/play.svg" alt="Play" />
              </PlayButton>
            </TrackItem>
          );
        })}
      </TrackList>
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  padding: 16px;
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
