import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { usePlayer } from "../../components/user/Player";

export default function MusicDetail() {
  const { id } = useParams();
  const { setCurrentTrack } = usePlayer();

  const [music, setMusic] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // 백엔드 연동시 이 주석 풀기
    useEffect(() => {
    // axios 호출 주석 처리
    // const fetchMusic = async () => {
    //   try {
    //     const res = await axios.get(`/api/music/${id}`);
    //     setMusic(res.data);
    //   } catch (err) {
    //     console.error("음악 데이터를 불러오는 데 실패했습니다:", err);
    //   }
    // };
    // fetchMusic();

    // 임시 데이터
    setMusic({
        title: "우주산책",
        artist: "먼지",
        price: 700,
        lyrics: "오늘은 어떤 행성을 가볼까 나와 함께 우주 산책을 하자",
        image: "https://placehold.co/130x130",
    });
    }, [id]);



  // 좋아요 애니메이션
  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // URL 복사
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch (err) {
      alert("복사 실패!");
    }
  };

  if (!music) return <Container>로딩 중...</Container>;

  return (
    <>
      <Container>
        <AlbumSection>
          <AlbumImage src={music.image} alt={music.title} />
          <InfoWrapper>
            <TitleWrapper>
                <Title>
                    <span>{music.title}&nbsp;&nbsp;&nbsp;</span>
                </Title>
            </TitleWrapper>
            <Artist>{music.artist}</Artist>
            <Price>{typeof music.price === 'number' ? music.price.toLocaleString() + "원" : "가격 미정"}</Price>
          </InfoWrapper>
        <IconRow>
          <StyledIcon $liked={isLiked} $animate={isAnimating} onClick={handleLikeClick}>♥</StyledIcon>
          <StyledIcon onClick={() => setIsModalOpen(true)}>⤴</StyledIcon>
        </IconRow>
          {/* <PlayButton onClick={() => setCurrentTrack({ title: music.title, artist: music.artist })}>
            ▶
          </PlayButton> */}
        </AlbumSection>

        <ButtonGroup>
          <ActionButton>장바구니</ActionButton>
          <PurchaseButton>바로구매</PurchaseButton>
        </ButtonGroup>
        <PlayButton>▶곡재생</PlayButton>

      </Container>

      {/* <Hr /> */}

      <Container>
        <Description>
          <Lyrics>가사</Lyrics>
          <LyricsText>{music.lyrics}</LyricsText>
        </Description>
      </Container>

      {isModalOpen && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>페이지 공유하기</ModalTitle>
            <UrlBox>
              <UrlText>{window.location.href}</UrlText>
              <CopyButton onClick={handleCopy}>📋</CopyButton>
            </UrlBox>
            {copied && <CopiedText>✅ 복사 완료!</CopiedText>}
            <CloseButton onClick={() => setIsModalOpen(false)}>✕</CloseButton>
          </ModalBox>
        </ModalOverlay>
      )}
    </>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 16px;
  font-family: 'sans-serif';
`;

const AlbumSection = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AlbumImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  flex-shrink: 0;
`;

// info 그룹
const InfoWrapper = styled.div`
  flex: 1;
//   margin-top: 10px;
  margin-left: 16px;
  min-width: 0;
  max-width: 167px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: bold;
  margin: 0;
`;

const Artist = styled.p`
  font-size: 14px;
  color: #6c6c6c;
  margin: 4px 0 0;
`;

const Price = styled.p`
  font-size: 16px;
  margin-top: 8px;
`;

// 재생 버튼
// const PlayButton = styled.button`
//   width: 34px;
//   height: 34px;
// //   border: 1px solid #1D1D1D;
// color: white;
//   border-radius: 50%;
//   background: #6c6c6c;
//   font-size: 16px;
// //   margin-top: 10px;
//   margin-left: auto;
//   cursor: pointer;

//   @media (max-width: 400px) {
//     // margin-top: 12px;
//   }
// `;
const PlayButton = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 13px 0;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  background: #f3f4f6;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
`;

// 버튼 그룹 (장바구니, 바로구매)
const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

// 장바구니
const ActionButton = styled.button`
  flex: 1;
  padding: 13px 0;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  background: #f3f4f6;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
`;

// 바로구매
const PurchaseButton = styled.button`
  flex: 1;
  padding: 10px 0;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  background: #FF2C68;
  color: white;
  font-weight: 600;
  cursor: pointer;
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

// 가사 그룹
const Description = styled.div`
  font-size: 12px;
  color: #6b7280;
  white-space: pre-line;
  line-height: 1.6;
`;

const Lyrics = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 10px;
`;

const LyricsText = styled.div`
  font-size: 14px;
  color: rgb(94, 94, 94);
  line-height: 1.7;
  white-space: pre-line;
  width: 85%;
`;

// 줄
const Hr = styled.hr`
  width: 100%;
  margin: 10px 0;
  border: none;
  border-top: 1px solid #ccc;
`;

// 공유하기 모달창
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;


const ModalBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

const UrlBox = styled.div`
  background: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  white-space: nowrap;
  max-width: 100%;
`;

const UrlText = styled.span`
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CopyButton = styled.button`
  background: #e5e7eb;
  border: none;
  padding: 6px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
`;

const CopiedText = styled.p`
  font-size: 13px;
  text-align: center;
  color: #4ade80;
  margin-top: 8px;
`;