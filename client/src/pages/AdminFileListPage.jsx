// D:\my\my-music-app\client\src\pages\AdminFileListPage.jsx

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdminHeader from '../components/admin/AdminHeader';
import AdminBottomNav from '../components/admin/AdminBottomNav';

function AdminFileListPage() {
  const [tracks, setTracks] = useState([]);
  const [message, setMessage] = useState('');

  const fetchTracks = async () => {
    try {
      const res = await fetch('/api/tracks');
      const data = await res.json();
      if (data.success) {
        setTracks(data.tracks);
      }
    } catch (err) {
      console.error('목록 로딩 실패:', err);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/tracks/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMessage('🗑️ 삭제 완료');
        fetchTracks(); // 목록 갱신
      } else {
        setMessage('❌ 삭제 실패: ' + data.message);
      }
    } catch (err) {
      console.error('삭제 중 오류:', err);
      setMessage('🚨 서버 오류');
    }
  };

  return (
    <>
      <AdminHeader />
      <Container>
        <Title>관리자 전용 업로드 목록</Title>
        {message && <Message>{message}</Message>}
        {tracks.length === 0 ? (
          <EmptyText>업로드된 음원이 없습니다.</EmptyText>
        ) : (
          <TrackList>
            {tracks.map((track) => (
              <TrackItem key={track._id}>
                <TrackTitle>{track.title}</TrackTitle>
                <TrackLink href={`/uploads/${track.filename}`} download>
                  다운로드
                </TrackLink>
                <DeleteButton onClick={() => handleDelete(track._id)}>
                  삭제
                </DeleteButton>
              </TrackItem>

            ))}
          </TrackList>
        )}
      </Container>
      <AdminBottomNav />
    </>
  );
}

export default AdminFileListPage;

// =====================
// styled-components
// =====================

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #343a40;
`;

const Message = styled.p`
  margin-bottom: 1rem;
  font-weight: 500;
  text-align: center;
  color: ${props => (props.error ? '#e74a3b' : 'green')};
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  color: #6c757d;
  text-align: center;
`;

const TrackList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TrackItem = styled.li`
  background-color: #e7e7eb;;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const TrackTitle = styled.span`
  flex: 1;
  font-weight: 600;
  font-size: 1.1rem;
  color: #343a40;
`;

const TrackLink = styled.a`
  text-decoration: none;
  margin: 0 10px;
  background-color: #646dff;
  padding: 6px 4px;
  border-radius: 7px;
  color: white;

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff2c2c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;
