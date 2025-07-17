import { useState } from 'react';
import styled from 'styled-components';
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
      <AdminHeader />
      <Container>
        <Title>음원 업로드</Title>

        <Input name="title" placeholder="노래 제목" onChange={handleChange} />
        <Input name="artist" placeholder="아티스트" onChange={handleChange} />
        <TextArea name="lyrics" placeholder="가사" rows="4" onChange={handleChange} />
        <Input name="price" type="number" placeholder="가격 (원)" onChange={handleChange} />

        <Label>오디오 파일</Label>
        <Input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} />

        <Label>커버 이미지</Label>
        <Input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} />

        <UploadButton onClick={handleUpload}>업로드</UploadButton>

        {message && <Message>{message}</Message>}
      </Container>
      <AdminBottomNav />
    </>
  );
}

export default AdminUploadPage;

// =======================
// styled-components
// =======================

const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.p`
  margin-top: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 90%;
  padding: 0.7rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  width: 90%;
  padding: 0.7rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
`;

const UploadButton = styled.button`
  background-color: #4e73df;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #2e59d9;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  color: #555;
  font-weight: bold;
`;

