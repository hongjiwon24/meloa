import { useEffect, useState } from 'react';
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
    const confirm = window.confirm('정말 삭제하시겠습니까?');
    if (!confirm) return;

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
      <AdminHeader></AdminHeader>
      <div style={{ padding: '2rem' }}>
        <h2>📂 관리자 전용 업로드 목록</h2>
        {message && <p>{message}</p>}
        {tracks.length === 0 ? (
          <p>업로드된 음원이 없습니다.</p>
        ) : (
          <ul>
            {tracks.map((track) => (
              <li key={track._id} style={{ marginBottom: '1rem' }}>
                <strong>{track.title}</strong>
                <a href={`/uploads/${track.filename}`} download style={{ marginLeft: '1rem' }}>
                  ⬇️ 다운로드
                </a>
                <button onClick={() => handleDelete(track._id)} style={{ marginLeft: '1rem', color: 'red' }}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <AdminBottomNav></AdminBottomNav>
    </>
  );
}

export default AdminFileListPage;
