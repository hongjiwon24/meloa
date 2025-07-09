import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const playlistItems = [
  {
    id: 1,
    image: 'https://placehold.co/600x400?text=List1',
    link: '/playlist/1',
  },
  {
    id: 2,
    image: 'https://placehold.co/600x400?text=List2',
    link: '/playlist/2',
  },
  {
    id: 3,
    image: 'https://placehold.co/600x400?text=List3',
    link: '/playlist/3',
  },
  {
    id: 4,
    image: 'https://placehold.co/600x400?text=List4',
    link: '/playlist/4',
  },
  {
    id: 5,
    image: 'https://placehold.co/600x400?text=List5',
    link: '/playlist/5',
  },
  {
    id: 6,
    image: 'https://placehold.co/600x400?text=List6',
    link: '/playlist/6',
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
          onClick={() => navigate('/playlist')}
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
          >
            <SlideImage
              src={item.image}
              alt={`Playlist ${item.id}`}
            />
          </SlideItem>
        ))}
      </SlideContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 24px 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

const MoreButton = styled.button`
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  user-select: none;

  &:hover {
    color: #4b5563;
  }
`;

const SlideContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SlideItem = styled.div`
  flex-shrink: 0;
  width: 40%;
  max-width: 280px;
  scroll-snap-align: center;
  padding: 0 8px;
  cursor: pointer;
`;

const SlideImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 15px;
`;
export default Section4;
