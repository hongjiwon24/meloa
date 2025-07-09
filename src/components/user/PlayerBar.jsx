// src/components/PlayerBar.jsx
import { FaStepBackward, FaPlay, FaStepForward, FaTimes } from "react-icons/fa";

export default function PlayerBar() {
  return (
    <div className="fixed bottom-14 left-0 right-0 px-4 py-2 bg-gray-100 border-t flex items-center justify-between z-40">
      <div className="flex flex-col">
        <span className="text-sm font-medium">달빛의 노래</span>
        <span className="text-xs text-gray-500">루나에코</span>
      </div>
      <div className="flex items-center space-x-3 text-gray-700">
        <FaStepBackward />
        <FaPlay />
        <FaStepForward />
        <FaTimes />
      </div>
    </div>
  );
}
