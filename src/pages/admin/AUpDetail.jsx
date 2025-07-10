// src/pages/admin/AUpDetail.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 임시 업로드 데이터 예시 (실제로는 백엔드 API에서 받아오도록 변경)
const dummyUploads = [
  {
    id: 1,
    uploadedAt: "2025-06-15T10:00:00Z",
    title: "노래1",
    artist: "가수1",
    price: 5000,
    imageUrl: "https://placehold.co/80x80?text=앨범1",
  },
  {
    id: 2,
    uploadedAt: "2025-06-02T12:30:00Z",
    title: "노래2",
    artist: "가수2",
    price: 3000,
    imageUrl: "https://placehold.co/80x80?text=앨범2",
  },
  {
    id: 3,
    uploadedAt: "2025-05-01T09:15:00Z",
    title: "노래3",
    artist: "가수3",
    price: 4000,
    imageUrl: "https://placehold.co/80x80?text=앨범3",
  },
];

function AUpDetail() {
  const [uploads, setUploads] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    // 최근 30일 이내 업로드 필터링
    const now = new Date();
    const cutoffDate = new Date(now);
    cutoffDate.setDate(now.getDate() - 30);

    const filtered = dummyUploads.filter((item) => {
      const uploadedDate = new Date(item.uploadedAt);
      return uploadedDate >= cutoffDate;
    });

    setUploads(filtered);
  }, []);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(uploads.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
      setSelectAll(false);
    } else {
      const newSelected = [...selectedIds, id];
      setSelectedIds(newSelected);
      if (newSelected.length === uploads.length) {
        setSelectAll(true);
      }
    }
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }
    if (!window.confirm(`${selectedIds.length}개 항목을 삭제하시겠습니까?`)) {
      return;
    }
    setUploads(uploads.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    setSelectAll(false);
  };

  return (
    <Container>
      <HeaderRow>
        <CheckboxWrapper>
          <input type="checkbox" checked={selectAll} onChange={toggleSelectAll} />
        </CheckboxWrapper>
        <HeaderText>노래 제목</HeaderText>
        <HeaderText>아티스트</HeaderText>
        <HeaderText>가격</HeaderText>
        <DeleteButton onClick={handleDelete}>선택삭제</DeleteButton>
      </HeaderRow>
      <Divider />
      <List>
        {uploads.length === 0 && <NoData>최근 30일 이내 업로드된 파일이 없습니다.</NoData>}
        {uploads.map((item) => (
          <ListItem key={item.id}>
            <CheckboxWrapper>
              <input
                type="checkbox"
                checked={selectedIds.includes(item.id)}
                onChange={() => toggleSelectOne(item.id)}
              />
            </CheckboxWrapper>
            <AlbumImage src={item.imageUrl} alt={`${item.title} 앨범 이미지`} />
            <TextColumn>
              <Title>{item.title}</Title>
              <Artist>{item.artist}</Artist>
            </TextColumn>
            <Price>{item.price.toLocaleString()}원</Price>
            <EditButton title="수정">
              <EditIcon width={20} height={20} />
            </EditButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default AUpDetail;

// 스타일
const Container = styled.div`
  max-width: 900px;
  margin: 40px auto;
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 0.1);
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  padding: 8px 0;
`;

const CheckboxWrapper = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
`;

const HeaderText = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
`;

const DeleteButton = styled.button`
  background-color: #ff2c68;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #e0265b;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 0 0 8px 0;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f2f2f2;
`;

const AlbumImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
`;

const TextColumn = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
`;

const Artist = styled.div`
  font-size: 14px;
  color: #666;
`;

const Price = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;

  svg {
    fill: #ff2c68;
    transition: fill 0.3s;
  }

  &:hover svg {
    fill: #e0265b;
  }
`;

const NoData = styled.div`
  text-align: center;
  color: #999;
  padding: 40px 0;
  font-size: 16px;
`;
