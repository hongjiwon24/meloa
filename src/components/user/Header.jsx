// src/components/Header.jsx
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white">
      <button className="text-sm font-semibold text-blue-600">이용권</button>
      <h1 className="text-lg font-bold tracking-wide">🎵 로고</h1>
      <button className="text-gray-700">
        <FaShoppingCart size={20} />
      </button>
    </header>
  );
}
