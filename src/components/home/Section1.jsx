import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import axios from "axios"; // ⚠️ 백엔드 연결 시 주석 해제

const GAP_PX = 16;

const Section1 = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [musicData, setMusicData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ 백엔드 연결 시 여기를 주석 해제하면 됨
    /*
    const fetchMusicData = async () => {
      try {
        const res = await axios.get("/api/music/latest");
        setMusicData(res.data); // 서버에서 최신 음악 리스트 가져오기
      } catch (err) {
        console.error("음악 데이터를 불러오는 데 실패했습니다:", err);
      }
    };
    fetchMusicData();
    */

    // ✅ 임시 데이터 1개만 넣기
    setMusicData([
      {
        id: 1,
        title: "임시 음악 제목",
        artist: "임시 가수",
        image: "https://placehold.co/300x300",
      },
    ]);
  }, []);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const onScroll = () => {
      const slide = scrollEl.firstChild;
      if (!slide) return;
      const slideWidth = slide.getBoundingClientRect().width + GAP_PX;
      const index = Math.round(scrollEl.scrollLeft / slideWidth);
      setActiveIndex(Math.max(0, Math.min(index, musicData.length - 1)));
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, [musicData]);

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
        {musicData.length > 0 ? (
          musicData.map((item, idx) => (
            <SlideItem
              key={`${item.id}-${idx}`}
              onClick={() => navigate(`/playlist/${item.id}`, { state: item })}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") navigate(`/playlist/${item.id}`, { state: item });
              }}
            >
              <SlideImage src={item.image} alt={`${item.title} 앨범 이미지`} />
            </SlideItem>
          ))
        ) : (
          // ✅ 데이터 없을 때 빈 카드 보여주기
          <SlideItem>
            <EmptyBox />
          </SlideItem>
        )}
      </Slider>

      <IndicatorWrapper>
        {musicData.length > 0 &&
          musicData.map((_, idx) => (
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
  cursor: pointer;
`;

const EmptyBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px dashed #e5e7eb;
  border-radius: 12px;
  background-color: #f9fafb;
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
