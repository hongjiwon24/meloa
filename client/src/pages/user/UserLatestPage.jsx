// \client\src\pages\user\UserLatestPage.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from '../../components/user/Header';
import BottomNav from '../../components/user/BottomNav';
import { usePlayer } from "../../context/Player"; // 플레이바 추가

const LatestP = () => {
  const navigate = useNavigate();
  const { setCurrentTrack, setIsPlaying } = usePlayer();
  const [musicData, setMusicData] = useState([]);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const fetchLatestMusic = async () => {
      try {
        const res = await fetch("/api/tracks");
        const data = await res.json();

        if (data.success) {
          setMusicData(data.tracks);
        } else {
          console.error("서버 응답 실패:", data.message);
        }
      } catch (err) {
        console.error("최신 음악 데이터를 불러오는 데 실패했습니다:", err);
      }
    };

    fetchLatestMusic();
  }, []);

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

  // ✅ 플레이바 관련: 재생 버튼 클릭 시 현재 트랙 설정 및 재생 상태 ON
  const handlePlayClick = (e, item) => {
    e.stopPropagation(); // 상세페이지 이동 방지

    setCurrentTrack({
      id: item._id,
      title: item.title,
      artist: item.artist,
      image: `http://localhost:5000/uploads/images/${item.coverImage}`,
    }); // ✅ 플레이바에 표시될 현재 트랙 정보 설정

    setIsPlaying(true); // ✅ 플레이바 재생 상태 ON
  };

  return (
    <>
    <Header></Header>
    <Container>
      <TopRow>
        <Title>최신음악</Title>
        <Time>{currentTime}</Time>
      </TopRow>

      <List>
        {musicData.length > 0 ? (
          musicData.map((item) => (
            <ListItem key={item._id}>
              <Link
                to={`/tracks/${item._id}`}
                style={{ flex: 1, display: "flex", textDecoration: "none", color: "inherit" }}
              >
                <Thumbnail
                  src={`http://localhost:5000/uploads/images/${item.coverImage}`}
                  alt={`${item.title} 앨범 이미지`}
                />
                <Info>
                  <SongTitle>{item.title}</SongTitle>
                  <Artist>{item.artist}</Artist>
                </Info>
              </Link>

              <PlayButton onClick={(e) => handlePlayClick(e, item)}>
                <PlayIcon src="/icons/play_button.svg" alt="play" />
              </PlayButton>
            </ListItem>

          ))
        ) : (
          [...Array(3)].map((_, idx) => (
            <ListItem key={"empty-" + idx} aria-hidden="true">
              <EmptyThumbnail />
              <Info>
                <EmptyText />
                <EmptyText $small key={`text2-${idx}`} />
              </Info>
            </ListItem>
          ))
        )}
      </List>
    </Container>
    <BottomNav></BottomNav>
    </>
  );
};

// 스타일 컴포넌트 정의
const Container = styled.div`
  padding: 16px;
  max-width: 550px;
  margin: 0 auto;
  background-color: white;
`;

const TopRow = styled.div`
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
  position: relative;    /* PlayButton 절대 위치 기준 */
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }

  &[aria-hidden="true"] {
    cursor: default;
    pointer-events: none;

    &:hover {
      background-color: transparent;
    }
  }
`;

const Thumbnail = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
  margin: 0 12px;
`;

const EmptyThumbnail = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 12px;
  border-radius: 6px;
  border: 2px dashed #e5e7eb;
  background-color: #f9fafb;
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

const EmptyText = styled.div`
  height: ${(props) => (props.small ? "12px" : "16px")};
  width: ${(props) => (props.small ? "80px" : "140px")};
  margin: 4px 0;
  background-color: #e5e7eb;
  border-radius: 4px;
`;
// 플레이바
const PlayButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  bottom: 13px;
  right: 10px;
  width: 40px;
  height: 40px;
  z-index: 2;
`;

const PlayIcon = styled.img`
  width: 65%;
  height: 65%;
  object-fit: contain;
`;


export default LatestP;
