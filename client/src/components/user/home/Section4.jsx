// 최종본(07-17, 15:46)
// src/components/home/Section4.jsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 예시 플레이리스트 데이터
const playlistItems = [
  {
    id: 1,
    image: "/images/001.png",
    link: "/playlist/1",
  },
  {
    id: 2,
    image: "/images/002.png",
    link: "/playlist/2",
  },
  {
    id: 3,
    image: "/images/003.png",
    link: "/playlist/3",
  },
  {
    id: 4,
    image: "/images/004.png",
    link: "/playlist/4",
  },
  {
    id: 5,
    image: "/images/005.png",
    link: "/playlist/5",
  },
];

const Section4 = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  return (
    <Container>
      <Header>
        <Title>플레이리스트</Title>
        <MoreButton
          onClick={() => navigate("/list")}
          aria-label="플레이리스트 더보기"
        >
          &gt;
        </MoreButton>
      </Header>

      <SlideContainer ref={scrollRef}>
        {playlistItems.map((item) => (
          <SlideItem
            key={item.id}
            onClick={() => navigate(item.link)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate(item.link);
            }}
          >
            <SlideImage src={item.image} alt={`Playlist ${item.id}`} />
          </SlideItem>
        ))}
      </SlideContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  padding: 10px 20px;
  margin-bottom: 10px;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 18px;
  color: #1a202c;
`;

const MoreButton = styled.button`
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 4px;

  &:hover {
    color: #1a202c;
  }
`;

const SlideContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SlideItem = styled.div`
  flex-shrink: 0;
  width: 140px;
  height: 140px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:focus {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export default Section4;
