import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios"; // ✅ 백엔드 연동 시 사용
import { dummyPlaylistDetails } from "../../../src/data/dummyData"; // ✅ 임시 데이터
import Header from '../../components/user/Header';
import BottomNav from '../../components/user/BottomNav';

export default function DetailP() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);

  // 좋아요, 애니메이션, 모달 상태
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const playlistId = parseInt(id);

    // 🔁 1. 백엔드 연동 방식
    /*
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/playlist/${playlistId}`); // ⚙️ 실제 API 경로로 교체
        setDetail(res.data);
      } catch (err) {
        console.error("플레이리스트 상세 불러오기 실패:", err);
      }
    };
    fetchData();
    */

    // ✅ 2. 임시 데이터 (개발 중 UI 확인용)
    const found = dummyPlaylistDetails.find((item) => item.id === playlistId);
    setDetail(found || null);
  }, [id]);

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // 클립보드 복사 함수 (모달 내에서 사용)
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  if (!detail) return <Container>데이터를 불러오는 중입니다...</Container>;

  return (
    <>
      <Header></Header>
      <Container>
        <HeaderStyle>
          <Title>{detail.title}</Title>
          <SubTitle>올린이: {detail.artist}</SubTitle>
          <Description>{detail.description}</Description>

          <ActionButtons>
            <StyledIcon onClick={handleLikeClick} $liked={isLiked} $animate={isAnimating}>
              ♥
            </StyledIcon>
            <StyledIcon onClick={() => setIsModalOpen(true)}>↗</StyledIcon>
          </ActionButtons>
        </HeaderStyle>

        <PlayAllButton onClick={() => alert("전체 곡 재생 (기능 구현 필요)")}>
          ▶ 30곡 전곡 듣기
        </PlayAllButton>

        <TrackList>
          {detail.tracks.map((track, idx) => (
            <TrackItem key={idx}>
              <TrackAlbum>
                <AlbumImage src={track.albumImage || "/default-album.png"} alt="앨범 이미지" />
              </TrackAlbum>
              <TrackInfo>
                <TrackTitle>{track.title}</TrackTitle>
                <TrackArtist>{track.artist}</TrackArtist>
              </TrackInfo>
              <PlayBtn onClick={() => alert(`${track.title} 재생 (기능 구현 필요)`)}>
                ▶
              </PlayBtn>
            </TrackItem>
          ))}
        </TrackList>

        <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
      </Container>

      {isModalOpen && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>페이지 공유하기</ModalTitle>
            <UrlBox>
              <UrlText type="text" readOnly value={window.location.href} />
              <CopyButton onClick={handleCopy}>📋</CopyButton>
            </UrlBox>
            {copied && <CopiedText>✅ 복사 완료!</CopiedText>}
            <CloseButton onClick={() => setIsModalOpen(false)}>✕</CloseButton>
          </ModalBox>
        </ModalOverlay>
      )}
      <BottomNav></BottomNav>
    </>
  );
}


// styled components
const Container = styled.div`
 max-width: 480px;
  margin: 0 auto;
  background-color: #FAFAFA;
  color: black;
  min-height: 100vh;
  font-family: "Noto Sans KR", sans-serif;
`;

// 아이콘 그룹 (좋아요, 공유하기)
const IconRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const StyledIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  font-size: 28px;
//   border: 1px solid ${({ $liked }) => ($liked ? "transparent" : "#c0c0c0")};
  background: ${({ $liked }) => ($liked ? "#FFE4EC" : "#f3f4f6")};
  color: ${({ $liked }) => ($liked ? "#FF2C68" : "#a3a8ae")};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.4s ease;
  animation: ${({ $animate }) => ($animate ? "pop 0.3s ease" : "none")};

  @keyframes pop {
    0% { transform: scale(1); }
    30% { transform: scale(1.2); }
    70% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;
const HeaderStyle = styled.div`
  text-align: center;
  padding: 40px 20px 30px 20px;
  background-color: #4F5253;
`;

const Title = styled.h1`
  font-size: 28px; /* 1.8rem ≈ 28.8px → 28px로 조정 */
  font-weight: 700;
  margin-bottom: 8px;
  color: white;
`;

const SubTitle = styled.p`
  font-size: 14px; /* 0.9rem ≈ 14.4px → 14px로 조정 */
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 14px; /* 0.85rem ≈ 13.6px → 14px로 통일 */
  line-height: 20px; /* 1.4 * 14px */
  margin: 16px 0 24px 0;
  color: rgba(255, 255, 255, 0.9);
  opacity: 0.9;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const HeartButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 19px; /* 1.2rem ≈ 19.2px → 19px */
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const ShareButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 19px; /* 1.2rem ≈ 19.2px → 19px */
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const PlayAllButton = styled.button`
  background-color: #ff3b69;
  color: white;
  font-weight: 700;
  font-size: 18px; /* 1.1rem ≈ 17.6px → 18px */
  border: none;
  border-radius: 5px;
  padding: 16px 0;
  width: calc(100% - 40px);
  margin: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 4px 15px rgba(255, 59, 105, 0.3);

  &:hover {
    background-color: #ff6b94;
    transform: translateY(-1px);
  }
`;

const TrackList = styled.div`
  padding: 0 20px;
`;

const TrackItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #ccc;  /* 연한 회색 실선 구분선 */
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.05); /* 약간 회색 배경으로 hover 효과 */
    transform: translateY(-2px);
  }
`;

const TrackAlbum = styled.div`
  margin-right: 12px;
`;

const AlbumImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  object-fit: cover;
`;

const TrackInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TrackTitle = styled.span`
  font-size: 16px; /* 1rem = 16px */
  font-weight: 600;
  color: #000000;
  margin-bottom: 4px;
`;

const TrackArtist = styled.span`
  font-size: 14px; /* 0.85rem ≈ 13.6px → 14px */
  color: rgba(255, 255, 255, 0.7);
`;

const PlayBtn = styled.button`
  background: transparent;
  border: none;
  color: #000;
  font-weight: 700;
  font-size: 22px; /* 1.4rem ≈ 22.4px → 22px */
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 50%;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.2);
  }
`;

const BackButton = styled.button`
  margin: 30px 20px 20px 20px;
  width: calc(100% - 40px);
  padding: 14px 0;
  font-weight: 600;
  font-size: 16px; /* 1rem = 16px */
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: white;
    background: rgba(0, 0, 0, 0.5);
    transform: translateY(-1px);
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 24px 30px;
  border-radius: 12px;
  max-width: 320px;
  width: 90%;
  box-shadow: 0 6px 15px rgba(0,0,0,0.3);
  position: relative;
`;

const ModalTitle = styled.h3`
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 18px;
  color: #333;
  text-align: center;
`;

const UrlBox = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 6px;
  padding: 8px 12px;
  margin-bottom: 10px;
`;

const UrlText = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #666;
  outline: none;
  user-select: all;
`;

const CopyButton = styled.button`
  background: #ff3b69;
  border: none;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background: #ff6b94;
  }
`;

const CopiedText = styled.div`
  text-align: center;
  color: #4caf50;
  font-size: 14px;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 14px;
  background: transparent;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #ff3b69;
  }
`;
