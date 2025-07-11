import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const playlists = [
  {
    title: '청량한 남돌 플레이리스트',
    editor: '멜로아 에디터',
    description: '시원하고 청량한 보이스의 남돌만 모았다!',
    image: 'https://placehold.co/160x160?text=남돌1',
  },
  {
    title: '여름 감성 R&B 모음',
    editor: '에디터 지원님',
    description: '한여름 밤과 잘 어울리는 부드러운 감성 보컬',
    image: 'https://placehold.co/160x160?text=R&B',
  },
  {
    title: '상큼한 걸그룹 셀렉션',
    editor: '멜로아 큐레이터 해지님',
    description: '상큼발랄한 에너지로 무더위를 날려요!',
    image: 'https://placehold.co/160x160?text=걸그룹',
  },
  {
    title: '여름 드라이브 전용 플레이리스트',
    editor: '큐레이터 한별님',
    description: '고속도로에 어울리는 시원한 팝과 락',
    image: 'https://placehold.co/160x160?text=Drive',
  },
  {
    title: '해변에서 듣는 Chill 음악',
    editor: '멜로아',
    description: '잔잔하고 편안한 여름 휴양지 BGM',
    image: 'https://placehold.co/160x160?text=Chill',
  },
];

const Section3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * 380,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const newIndex = Math.round(scrollLeft / 380);
        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
        }
      }
    };

    const refCurrent = scrollRef.current;
    if (refCurrent) {
      refCurrent.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentIndex]);

  return (
    <Container>
      <Title>{playlists[currentIndex].title}</Title>

      <Slider ref={scrollRef}>
        {playlists.map((item, idx) => (
          <Card key={idx}>

            <Image src={item.image} alt={item.title} />
            <TextBox>
              <TitleText>{item.title}</TitleText>
              <EditorText>{item.editor}</EditorText>
              <DescriptionText>{item.description}</DescriptionText>
            </TextBox>
          </Card>
        ))}
      </Slider>

      <DotsContainer>
        {playlists.map((_, idx) => (
          <DotButton
            key={idx}
            className={idx === currentIndex ? 'active' : ''}
            onClick={() => scrollToIndex(idx)}
            aria-label={`슬라이드 ${idx + 1}`}
          />
        ))}
      </DotsContainer>
    </Container>
  );
};

// 컨테이너
const Container = styled.div`
  width: 100%;
  max-width: 550px;
  margin: 0 auto;
  padding: 16px;
  background-color: white;
`;

// 플레이리스트 제목
const Title = styled.h2`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 16px;
  color: #1a202c;
`;

// 슬라이더 박스
const Slider = styled.div`
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

// 카드 한 개
const Card = styled.div`
  scroll-snap-align: center;
  flex-shrink: 0;
  position: relative;
  width: 85vw;
  max-width: 360px;
  min-width: 280px;
  margin: 0 8px;
  padding: 16px;
  background-color: #404040;
  border-radius: 8px;
  color: white;

  display: flex;
  align-items: center;
`;


// 점 (dot) 하나
const Dot = styled.span`
  width: 6px;
  height: 6px;
  background: white;
  border-radius: 50%;
  display: block;

  @media (max-width: 479px) {
    width: 4px;
    height: 4px;
  }

  @media (max-width: 360px) {
    width: 3px;
    height: 3px;
  }
`;


// 이미지
const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;

  @media (min-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

// 텍스트 영역
const TextBox = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`;

// 타이틀 텍스트 (플레이리스트 이름)
const TitleText = styled.p`
  font-weight: 700;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 480px) {
    font-size: 18px;
  }
`;

// 에디터 텍스트
const EditorText = styled.p`
  font-size: 12px;
  color: #d1d5db;
  margin-top: 4px;

  @media (min-width: 480px) {
    font-size: 14px;
  }
`;

// 설명 텍스트
const DescriptionText = styled.p`
  font-size: 12px;
  color: #e5e7eb;
  margin-top: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 480px) {
    font-size: 14px;
  }
`;

// 점 네비게이션 컨테이너
const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

// 점 네비게이션 버튼
const DotButton = styled.button`
  width: 10px;
  height: 10px;
  background: #a0aec0;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &.active {
    background: #404040;
  }

  @media (max-width: 479px) {
    width: 8px;
    height: 8px;
  }
`;
export default Section3;
