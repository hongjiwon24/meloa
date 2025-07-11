//레이아웃 합치기 전 코드
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TrackDetailPage() {
  const { id } = useParams();
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // 에러 상태 추가

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/tracks/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setTrack(data.track);
        } else {
          setError(data.message || '서버에서 음원을 찾을 수 없습니다.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, [id]);

  // 좋아요 상태를 저장하는 상태 변수
  const handleLike = async () => {
    try {
      const res = await fetch(`/api/tracks/${id}/like`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setTrack(prev => ({ ...prev, likes: data.likes }));
      }
    } catch (err) {
      console.error('찜하기 실패:', err);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>❌ 오류: {error}</p>;
  if (!track) return <p>❌ 음원을 찾을 수 없습니다.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{track.title} - {track.artist}</h2>
      <img src={`/uploads/images/${track.coverImage}`} alt="커버" width={200} /><br />
      <audio controls src={`/uploads/audio/${track.filename}`}></audio>
      <p><strong>가사:</strong></p>
      <pre>{track.lyrics}</pre>
      <p>💰 가격: {track.price.toLocaleString()}원</p>
      <p>📅 등록일: {new Date(track.createdAt).toLocaleString()}</p>

      <button onClick={handleLike}>💖 찜하기 ({track.likes})</button>
    </div>
  );
}

export default TrackDetailPage;
