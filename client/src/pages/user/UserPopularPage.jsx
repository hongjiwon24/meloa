// src/pages/user/UserPopularPage.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from '../../components/user/Header';
import BottomNav from '../../components/user/BottomNav';

function UserPopularPage() {
  const [tracks, setTracks] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/tracks")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const sorted = [...data.tracks].sort((a, b) => b.likes - a.likes);
          setTracks(sorted);
        }
      });
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setCurrentTime(timeStr);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <Header></Header>
    <Container>
      <TopRow>
        <Title>인기차트</Title>
        <Time>{currentTime}</Time>
      </TopRow>

      <List>
        {tracks.length > 0 ? (
          tracks.map((item, index) => (
            <ListItem
              key={item._id}
              onClick={() => navigate(`/tracks/${item._id}`, { state: item })}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") navigate(`/tracks/${item._id}`, { state: item });
              }}
            >
              <Rank>{index + 1}</Rank>
              <Thumbnail
                src={`http://localhost:5000/uploads/images/${item.coverImage}`}
                alt={`${item.title} 앨범 이미지`}
              />
              <Info>
                <SongTitle>{item.title}</SongTitle>
                <Artist>{item.artist} • {item.likes} ❤️</Artist>
              </Info>
            </ListItem>
          ))
        ) : (
          [...Array(3)].map((_, idx) => (
            <ListItem key={"empty-" + idx} aria-hidden="true">
              <Rank />
              <EmptyThumbnail />
              <Info>
                <EmptyText />
                <EmptyText small />
              </Info>
            </ListItem>
          ))
        )}
      </List>
    </Container>
    <BottomNav></BottomNav>
    </>
  );
}

export default UserPopularPage;

const Container = styled.div`
  padding: 16px;
  max-width: 550px;
  margin: 0 auto;
  background-color: white;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
`;

const Time = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const List = styled.div`
  border-top: 1px solid #e5e7eb;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }

  &[aria-hidden="true"] {
    cursor: default;
    pointer-events: none;

    &:hover {
      background-color: transparent;
    }
  }
`;

const Rank = styled.span`
  width: 24px;
  font-size: 14px;
  text-align: center;
  color: #6b7280;
`;

const Thumbnail = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
  margin: 0 12px;
`;

const EmptyThumbnail = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 12px;
  border-radius: 6px;
  border: 2px dashed #e5e7eb;
  background-color: #f9fafb;
`;

const Info = styled.div`
  flex: 1;
  overflow: hidden;
`;

const SongTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Artist = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 2px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EmptyText = styled.div`
  height: ${(props) => (props.small ? "12px" : "16px")};
  width: ${(props) => (props.small ? "80px" : "140px")};
  margin: 4px 0;
  background-color: #e5e7eb;
  border-radius: 4px;
`;
