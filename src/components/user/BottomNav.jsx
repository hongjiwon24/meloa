// src/components/BottomNav.jsx
import { FaHome, FaHeart, FaUser, FaChartLine, FaClock } from "react-icons/fa";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow z-50">
      <ul className="flex justify-around py-2 text-xs text-gray-700">
        <li className="flex flex-col items-center">
          <FaChartLine size={20} />
          <span>인기차트</span>
        </li>
        <li className="flex flex-col items-center">
          <FaClock size={20} />
          <span>최신음악</span>
        </li>
        <li className="flex flex-col items-center">
          <FaHome size={20} />
          <span>홈</span>
        </li>
        <li className="flex flex-col items-center">
          <FaHeart size={20} />
          <span>좋아요</span>
        </li>
        <li className="flex flex-col items-center">
          <FaUser size={20} />
          <span>마이페이지</span>
        </li>
      </ul>
    </nav>
  );
}
