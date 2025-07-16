//D:\my\my-music-app\client\src\pages\user\UserPopularPage.jsx
//레이아웃 합치기 전 코드
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PopularPage() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetch('/api/tracks')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const sorted = [...data.tracks].sort((a, b) => b.likes - a.likes);
          setTracks(sorted);
        }
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🔥 인기차트</h1>
      <ol>
        {tracks.map(track => (
          <li key={track._id}>
            <Link to={`/tracks/${track._id}`}>
              {track.title} - {track.artist} ({track.likes} ❤️)
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default PopularPage;
