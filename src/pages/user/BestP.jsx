// src/pages/user/BestP.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../components/user/Player"

const chartData = [
  { rank: 1, title: "첫 번째 노래", artist: "가수1", image: "https://placehold.co/60x60" },
  { rank: 2, title: "두 번째 노래", artist: "가수2", image: "https://placehold.co/60x60" },
  { rank: 3, title: "세 번째 노래", artist: "가수3", image: "https://placehold.co/60x60" },
  { rank: 4, title: "네 번째 노래", artist: "가수4", image: "https://placehold.co/60x60" },
  { rank: 5, title: "다섯 번째 노래", artist: "가수5", image: "https://placehold.co/60x60" },
  { rank: 6, title: "여섯 번째 노래", artist: "가수6", image: "https://placehold.co/60x60" },
  { rank: 7, title: "일곱 번째 노래", artist: "가수7", image: "https://placehold.co/60x60" },
  { rank: 8, title: "여덟 번째 노래", artist: "가수8", image: "https://placehold.co/60x60" },
  { rank: 9, title: "아홉 번째 노래", artist: "가수9", image: "https://placehold.co/60x60" },
  { rank: 10, title: "열 번째 노래", artist: "가수10", image: "https://placehold.co/60x60" },
  { rank: 11, title: "열한 번째 노래", artist: "가수11", image: "https://placehold.co/60x60" },
  { rank: 12, title: "열두 번째 노래", artist: "가수12", image: "https://placehold.co/60x60" },
  { rank: 13, title: "열세 번째 노래", artist: "가수13", image: "https://placehold.co/60x60" },
  { rank: 14, title: "열네 번째 노래", artist: "가수14", image: "https://placehold.co/60x60" },
  { rank: 15, title: "열다섯 번째 노래", artist: "가수15", image: "https://placehold.co/60x60" },
  { rank: 16, title: "열여섯 번째 노래", artist: "가수16", image: "https://placehold.co/60x60" },
  { rank: 17, title: "열일곱 번째 노래", artist: "가수17", image: "https://placehold.co/60x60" },
  { rank: 18, title: "열여덟 번째 노래", artist: "가수18", image: "https://placehold.co/60x60" },
  { rank: 19, title: "열아홉 번째 노래", artist: "가수19", image: "https://placehold.co/60x60" },
  { rank: 20, title: "스무 번째 노래", artist: "가수20", image: "https://placehold.co/60x60" },
];

const BestP = () => {

  const { setCurrentTrack } = usePlayer();
  const navigate = useNavigate();

  // 실시간 시간 상태
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // 현재 시간을 시:분 형태로 업데이트
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setCurrentTime(timeStr);
    };

    updateTime(); // 초기 실행
    const intervalId = setInterval(updateTime, 60000); // 1분마다 업데이트

    return () => clearInterval(intervalId); // 클린업
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      {/* 인기차트 제목 + 시간 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">인기차트</h1>
        <span className="text-sm text-gray-500 select-none">{currentTime}</span>
      </div>

      {/* 리스트 */}
      <div className="space-y-4">
        {chartData.map((item) => (
          <div
            key={item.rank}
            className="flex items-center p-3 rounded-lg shadow-sm bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => navigate(`/playlist/${item.rank}`)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter") navigate(`/playlist/${item.rank}`);
            }}
          >
            <span className="w-8 text-center font-bold text-gray-600">{item.rank}</span>

            <img
              src={item.image}
              alt={`${item.title} 앨범 이미지`}
              className="w-16 h-16 object-cover rounded-md mx-4 flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold truncate text-gray-900">{item.title}</p>
              <p className="text-sm text-gray-500 truncate">{item.artist}</p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentTrack(item); // ✅ 클릭된 곡을 현재 재생 곡으로 설정
              }}
            >
              <img src="/img/icons/play.svg" alt="Play" className="w-7 h-7" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestP;
