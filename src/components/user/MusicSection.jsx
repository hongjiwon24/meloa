export default function MusicSection({ title, musicList, showMore }) {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {musicList.map((music, index) => (
          <li key={index}>{music.title}</li>
        ))}
      </ul>
      {showMore && <button>더 보기</button>}
    </section>
  );
}