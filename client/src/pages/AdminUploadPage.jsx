import { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminBottomNav from '../components/admin/AdminBottomNav';


function AdminUploadPage() {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    lyrics: '',
    price: '',
  });
  const [audioFile, setAudioFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpload = async () => {
    if (!audioFile || !coverImage) {
      setMessage('⚠️ 파일을 모두 선택하세요.');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));
    data.append('audio', audioFile);
    data.append('coverImage', coverImage);

    try {
      const res = await fetch('/api/tracks/upload', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      if (result.success) {
        setMessage('✅ 업로드 성공');
      } else {
        setMessage('❌ 실패: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      setMessage('🚨 서버 오류');
    }
  };

  return (
    <>
      <AdminHeader></AdminHeader>
      <div style={{ padding: '2rem' }}>
        <h2>🎵 음원 업로드</h2>
        <input name="title" placeholder="노래 제목" onChange={handleChange} /><br />
        <input name="artist" placeholder="아티스트" onChange={handleChange} /><br />
        <textarea name="lyrics" placeholder="가사" rows="4" onChange={handleChange} /><br />
        <input name="price" type="number" placeholder="가격 (원)" onChange={handleChange} /><br />
        <p>미디어 파일을 업로드하세요.</p>
        <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} /><br />
        <p>이미지를 업로드하세요.</p>
        <input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} /><br />
        <button onClick={handleUpload}>업로드</button>
        <p>{message}</p>
        
      </div>
      <AdminBottomNav></AdminBottomNav>
    </>
  );
}

export default AdminUploadPage;
