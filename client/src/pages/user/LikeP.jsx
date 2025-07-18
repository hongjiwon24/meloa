import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { usePlayer } from "../../context/Player";
import { useNavigate } from "react-router-dom";
import Header from "../../components/user/Header";
import BottomNav from "../../components/user/BottomNav";

const HEADER_HEIGHT = 60;
const BOTTOM_HEIGHT = 60;

const LikeP = () => {
  const navigate = useNavigate();
  const { setCurrentTrack, setIsPlaying } = usePlayer();
  const [isPlaying] = useState(false);
  const [likedTracks, setLikedTracks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState(null);

  useEffect(() => {
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
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <Content>
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
                <AlbumImg
                  src={item.albumImage}
                  alt={item.title}
                  onClick={() => navigate(`/music-detail/${item.id}`)}
                />
                <TextGroup>
                  <TrackTitle>{item.title}</TrackTitle>
                  <Artist>{item.artist}</Artist>
                </TextGroup>
                <PlayButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentTrack(item);
                    setIsPlaying(true);
                  }}
                >
                  <PlayIcon src="/icons/play_button.svg" alt="Play" />
                </PlayButton>
              </Item>
            ))}
          </List>
        )}
      </Content>

      <BottomWrapper>
        <BottomNav />
      </BottomWrapper>

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

export default LikeP;

const Container = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  max-width: 550px;
  margin: 0 auto;
  background-color: white;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 550px;
  z-index: 100;
`;

const BottomWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 550px;
  z-index: 100;
`;

const Content = styled.div`
  padding: ${HEADER_HEIGHT + 16}px 16px ${BOTTOM_HEIGHT + 16}px;
  overflow-y: auto;
  height: 100%;
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
  padding: 8px 0;
`;

const LikeButton = styled.button`
  font-size: 20px;
  background: none;
  border: none;
  color: #ff2c68;
  cursor: pointer;
  margin-left: 4px;
`;

const AlbumImg = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  margin: 0 8px;
  cursor: pointer;
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
  margin-right: 8px;
`;

const PlayIcon = styled.img`
  width: 24px;
  height: 24px;
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
