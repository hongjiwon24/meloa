import React, { useState } from "react";
import styled from "styled-components";
import Header from '../../components/user/Header';
import BottomNav from '../../components/user/BottomNav';

const playlists = [
  {
    title: "청량한 남돌 플레이리스트",
    editor: "멜로아 에디터",
    image: "/images/001.png",
  },
  {
    title: "여름 감성 R&B 모음",
    editor: "에디터 지원님",
    image: "/images/002.png",
  },
  {
    title: "상큼한 걸그룹 셀렉션",
    editor: "멜로아 큐레이터 해지님",
    image: "/images/003.png",
  },
  {
    title: "여름 드라이브 전용 플레이리스트",
    editor: "큐레이터 한별님",
    image: "/images/004.png",
  },
  {
    title: "해변에서 듣는 Chill 음악",
    editor: "멜로아",
    image: "/images/005.png",
  },
  {
    title: "달콤한 밤 감성 발라드",
    editor: "멜로아 에디터 민지",
    image: "/images/006.png",
  },
  {
    title: "아침 출근길 에너지 UP",
    editor: "에디터 지원님",
    image: "/images/007.png",
  },
  {
    title: "신나는 운동용 플레이리스트",
    editor: "큐레이터 해지님",
    image: "/images/008.png",
  },
  {
    title: "감성적인 재즈 모음",
    editor: "멜로아 에디터 한별",
    image: "/images/009.png",
  },
  {
    title: "힙합 최신곡 모음",
    editor: "큐레이터 민지",
    image: "/images/001.png",
  },
  {
    title: "편안한 카페 음악",
    editor: "에디터 지원",
    image: "/images/002.png",
  },
  {
    title: "영화 OST 베스트",
    editor: "큐레이터 해지",
    image: "/images/003.png",
  },
];

const List = () => {
  const [sortType, setSortType] = useState("latest");

  return (
    <>
    <Header></Header>
    <Container>

      <TopBar>
        <SectionTitle>테마</SectionTitle>
        <SortButtons>
          <SortButton
            $active={sortType === "latest"}
            onClick={() => setSortType("latest")}
            aria-label="최신순 보기"
          >
            최신순
          </SortButton>
          <SortButton
            $active={sortType === "popular"}
            onClick={() => setSortType("popular")}
            aria-label="인기순 보기"
          >
            인기순
          </SortButton>
        </SortButtons>
      </TopBar>

      <GridContainer>
        {playlists.map((item, idx) => (
          <Card key={idx}>
            <Thumbnail src={item.image} alt={item.title} />
            <Title>{item.title}</Title>
            <Editor>{item.editor}</Editor>
          </Card>
        ))}
      </GridContainer>
    </Container>
    <BottomNav></BottomNav>
    </>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
  background: white;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 20px;

  @media (max-width: 360px) {
    font-size: 16px;
  }
`;

const SortButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const SortButton = styled.button`
  font-size: 16px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? "700" : "400")};
  color: #404040;

  &:hover {
    font-weight: 700;
  }

  @media (max-width: 360px) {
    font-size: 14px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const Card = styled.div`
  cursor: pointer;
  overflow: hidden;
  background-color: #fefefe;
  padding-bottom: 12px;
  text-align: left;
`;

const Thumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1; /* 항상 정사각형 유지 */
  min-width: 360px;
  max-width: 600px;
  object-fit: cover;
  display: block;
  border-bottom: 1px solid #ddd;

  @media (max-width: 600px) {
    min-width: 100%;
    max-width: 100%;
  }
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 16px;
  margin: 5px 5px 4px 1px;
  color: #1a202c;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 360px) {
    font-size: 14px;
  }
`;

const Editor = styled.p`
  font-size: 14px;
  color: #718096;
  margin: 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 360px) {
    font-size: 12px;
  }
`;

export default List;
