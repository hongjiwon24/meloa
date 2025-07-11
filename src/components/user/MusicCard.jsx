// src/components/MusicCard.jsx
export default function MusicCard({ img, name, artist }) {
  return (
    <div className="w-36 shrink-0 mr-3">
      <img
        src={img}
        alt={name}
        className="w-full h-36 object-cover rounded-md"
      />
      <div className="mt-1 text-sm font-semibold truncate">{name}</div>
      <div className="text-xs text-gray-500 truncate">{artist}</div>
    </div>
  );
}
