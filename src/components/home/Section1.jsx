// src/components/home/Section1.jsx

import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 이미지 목록 (추후 API로 교체 가능)
const images = [
  "https://placehold.co/600x600?text=Music+1",
  "https://placehold.co/600x600?text=Music+2",
  "https://placehold.co/600x600?text=Music+3",
  "https://placehold.co/600x600?text=Music+4",
  "https://placehold.co/600x600?text=Music+5",
  "https://placehold.co/600x600?text=Music+6",
];



// ✅ 컴포넌트 정의
const Section1 = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  // 스크롤 시 인디케이터 업데이트
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const onScroll = () => {
      const slide = scrollEl.firstChild;
      if (!slide) return;
      const slideWidth = slide.getBoundingClientRect().width + GAP_PX;
      const index = Math.round(scrollEl.scrollLeft / slideWidth);
      setActiveIndex(Math.max(0, Math.min(index, images.length - 1)));
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, []);

  // 인디케이터 클릭 시 이동
  const scrollToIndex = (idx) => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const slide = scrollEl.firstChild;
    if (!slide) return;

    const slideWidth = slide.getBoundingClientRect().width + GAP_PX;
    const containerWidth = scrollEl.clientWidth;

    let targetScroll = slideWidth * idx - (containerWidth - slideWidth) / 2;
    const maxScroll = scrollEl.scrollWidth - containerWidth;
    if (targetScroll > maxScroll) targetScroll = maxScroll;
    if (targetScroll < 0) targetScroll = 0;

    scrollEl.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  };

  // 최신 페이지로 이동
  const handleNavigation = () => {
    navigate("/latest");
  };

  return (
    <Container>
      <HeaderRow>
        <TitleButton onClick={handleNavigation}>최신 음악</TitleButton>
        <MoreButton onClick={handleNavigation} aria-label="Go to latest music page">
          &gt;
        </MoreButton>
      </HeaderRow>

      <Slider ref={scrollRef}>
        {images.map((src, idx) => (
          <SlideItem key={idx}>
            <SlideImage src={src} alt={`Music ${idx + 1}`} />
          </SlideItem>
        ))}
      </Slider>

      <IndicatorWrapper>
        {images.map((_, idx) => (
          <Dot
            key={idx}
            $active={activeIndex === idx}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </IndicatorWrapper>
    </Container>
  );
};
const GAP_PX = 16;

// ✅ styled-components
const Container = styled.div`
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
  margin-bottom: 16px;
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
  font-size: 18px;
  color: #6b7280;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  &:hover {
    color: #1f2937;
  }
`;

const Slider = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: ${GAP_PX}px;
  scroll-behavior: smooth;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SlideItem = styled.div`
  flex-shrink: 0;
  scroll-snap-align: center;
  min-width: 40%;
  max-width: 40%;
  padding-bottom: 40%;
  position: relative;
`;

const SlideImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

const IndicatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;
`;

const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.$active ? "#2563EB" : "#D1D5DB")};
  transform: ${(props) => (props.$active ? "scale(1.25)" : "scale(1)")};
  transition: all 0.3s;

  &:hover {
    background-color: #9ca3af;
  }
`;

export default Section1;
