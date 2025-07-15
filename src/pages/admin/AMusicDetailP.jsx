import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

export default function AUpDetail() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    // 실제 API 호출 부분
    // axios.get("/api/admin/uploads").then((res) => setUploads(res.data));

    // 임시 더미 데이터
    setUploads([
      {
        id: 1,
        title: "업로드된 음악 1",
        artist: "아티스트 A",
        image: "https://placehold.co/80x80",
      },
      {
        id: 2,
        title: "업로드된 음악 2",
        artist: "아티스트 B",
        image: "https://placehold.co/80x80",
      },
    ]);
  }, []);

  return (
    <Container>
      <Title>업로드 목록</Title>
      <List>
        {uploads.map((item) => (
          <ListItem key={item.id}>
            <ImageWrapper>
              {/* SVG 컴포넌트 대신 이미지 태그로 대체 */}
              <img
                src="/src/components/public/icons/share.svg"
                alt="share icon"
                width={24}
                height={24}
              />
            </ImageWrapper>
            <Info>
              <MusicTitle>{item.title}</MusicTitle>
              <Artist>{item.artist}</Artist>
            </Info>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

// 스타일
const Container = styled.div`
  padding: 16px;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const ImageWrapper = styled.div`
  margin-right: 12px;
`;

const MusicTitle = styled.div`
  font-weight: 700;
`;

const Artist = styled.div`
  font-size: 14px;
  color: #666;
`;

