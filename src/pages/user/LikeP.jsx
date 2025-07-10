// src/pages/user/LikeP.jsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { usePlayer } from "../../components/user/Player";
// import axios from "axios"; // ✅ 나중에 백엔드 연동 시 주석 해제

const LikeP = () => {
  const { setCurrentTrack } = usePlayer();

  const [likedTracks, setLikedTracks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState(null);

  useEffect(() => {
    // ✅ 백엔드 연동 시 이 부분 주석 해제
    /*
    const fetchLikedTracks = async () => {
      try {
        const res = await axios.get("/api/music/liked");
        setLikedTracks(res.data);
      } catch (err) {
        console.error("좋아요 데이터를 불러오는 데 실패했습니다:", err);
      }
    };
    fetchLikedTracks();
    */

    // ✅ 임시 데이터 1개만 사용
    setLikedTracks([
      {
        id: 1,
        title: "임시 음악 제목",
        artist: "임시 아티스트",
        albumImage: "https://placehold.co/80x80",
      },
    ]);
  }, []);

  const handleUnlike = (id) => {
    setSelectedTrackId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setLikedTracks((prev) => prev.filter((item) => item.id !== selectedTrackId));
    setShowConfirm(false);
    setSelectedTrackId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setSelectedTrackId(null);
  };

  return (
    <Container>
      {/* 상단 탭 UI */}
      <TabHeader>
        <Tab>곡</Tab>
        <Tab>앨범</Tab>
        <Tab>아티스트</Tab>
        <Tab>플레이리스트</Tab>
      </TabHeader>

      {likedTracks.length === 0 ? (
        <EmptyMessage>좋아요한 곡이 없습니다.</EmptyMessage>
      ) : (
        <List>
          {likedTracks.map((item) => (
            <Item key={item.id}>
              <LikeButton onClick={() => handleUnlike(item.id)}>♥</LikeButton>
              <AlbumImg src={item.albumImage} alt={item.title} />
              <TextGroup>
                <TrackTitle>{item.title}</TrackTitle>
                <Artist>{item.artist}</Artist>
              </TextGroup>
              <PlayButton onClick={() => setCurrentTrack(item)}>▶</PlayButton>
            </Item>
          ))}
        </List>
      )}

      {showConfirm && (
        <ModalOverlay>
          <ModalBox>
            <p>음원의 좋아요를 삭제하겠습니까?</p>
            <ModalActions>
              <ModalButton onClick={cancelDelete}>취소</ModalButton>
              <ModalButton $danger onClick={confirmDelete}>삭제</ModalButton>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
  max-width: 550px;
  margin: 0 auto;
  background-color: white;
`;

const TabHeader = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 16px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
`;

const Tab = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
`;

const LikeButton = styled.button`
  font-size: 18px;
  background: none;
  border: none;
  color: #ff2c68;
  cursor: pointer;
  margin-left: 5%;
`;

const AlbumImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  margin-left: 2%;
  margin-right: 2%;
`;

const TextGroup = styled.div`
  flex: 1;
`;

const TrackTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const Artist = styled.div`
  font-size: 12px;
  color: #666;
`;

const PlayButton = styled.button`
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 5%;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #999;
  padding: 32px 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 80%;
  max-width: 320px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const ModalButton = styled.button`
  flex: 1;
  margin: 0 4px;
  padding: 10px 0;
  border: none;
  border-radius: 8px;
  background-color: ${(props) => (props.$danger ? "#FF2C68" : "#ccc")};
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

export default LikeP;
