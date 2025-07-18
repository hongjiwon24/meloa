import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ✅ useNavigate 추가
import styled from 'styled-components';
import AdminBottomNav from '../components/admin/AdminBottomNav';
import { FaPlus } from 'react-icons/fa';

function AdminUploadPage() {
  const navigate = useNavigate(); // ✅ 선언
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setCoverImage(file);
  };

  const handleUpload = async () => {
    if (!audioFile || !coverImage) {
      alert('⚠️ 파일을 모두 선택하세요.'); // 선택한 파일이 없을 경우, 알림창으로 표시
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
        alert('✅ 업로드가 완료되었습니다.\n리스트에서 확인하세요.'); // ✅ 알림창
        navigate('/admin/files'); // ✅ 페이지 이동
      } else {
        alert('❌ 실패: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('🚨 서버 오류');
    }
  };

  return (
    <>
      <UploadHeader>
        <LogoLink to="/admin">Meloa</LogoLink>
        <CenteredTitle>음원 업로드</CenteredTitle>
        <UploadBtn onClick={handleUpload}>업로드</UploadBtn>
      </UploadHeader>
      <Wrapper>
        <Section>
          {/* <Label>이미지 업로드</Label> */}
          <ImagePreviewWrapper>
            {coverImage ? (
              <PreviewImage src={URL.createObjectURL(coverImage)} alt="미리보기" />
            ) : (
              <UploadButton htmlFor="image-upload">
                <FaPlus size={24} />
              </UploadButton>
            )}
            <HiddenInput
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </ImagePreviewWrapper>
        </Section>
        <Divider />
        <Section>
          <Label>노래 제목</Label>
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="" />
        </Section>

        <Section>
          <Label>아티스트</Label>
          <Input name="artist" value={formData.artist} onChange={handleChange} placeholder="" />
        </Section>

        <Section>
          <Label>가사</Label>
          <Textarea name="lyrics" rows="4" value={formData.lyrics} onChange={handleChange} placeholder="" />
        </Section>

        <Section>
          <Label>가격 (원)</Label>
          <NumInput name="price" type="number" value={formData.price} onChange={handleChange} placeholder="" />
        </Section>

        <Section>
          <Label>음원 첨부파일</Label>
          <FileUploadWrapper>
            <FileName>{audioFile?.name || '파일을 선택해주세요'}</FileName>
            <FileSelectButton htmlFor="audio-upload">파일 선택</FileSelectButton>
            <Hidden
              id="audio-upload"
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files[0])}
            />
          </FileUploadWrapper>
        </Section>
      </Wrapper>
      <AdminBottomNav />
    </>
  );
}

export default AdminUploadPage;

// ---------------- styled-components ----------------

const Wrapper = styled.div`
  padding: 2rem;
`;

// 상단 박스(타이틀h2 + 업로드 버튼)
const UploadHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background-color: white;
  gap: 10px;
`;
const LogoLink = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.05em;
  color: #FF2C68;
  text-decoration: none;
`;
const CenteredTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;
const UploadBtn = styled.button`
  padding: 8px 16px;
  font-size: 12px;
  background-color: #ff2b77;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #e02458;
  }
`;
// section시작
const ImagePreviewWrapper = styled.div`
  width: 180px;
  height: 180px;
  background-color: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;
// 이미지 업로드 버튼
const UploadButton = styled.label`
  cursor: pointer;
  color: #fff;
`;
const HiddenInput = styled.input`
  display: none;
`;
const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
// 구분선 추가
const Divider = styled.div`
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.8rem;
`;
// section 공통 스타일링
const Section = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: calc(100% - 2rem);
  padding: 12px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;
const NumInput = styled.input`
  width: calc(100% - 2rem);
  padding: 12px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;

  /* 🔽 스핀 버튼 제거 (크로스 브라우저) */
  /* Chrome, Safari, Edge */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;
const Textarea = styled.textarea`
  width: calc(100% - 2rem);
  padding: 12px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: none;

`;

// 음원 첨부파일 
const FileUploadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  position: relative;
  max-height: 50px;
  max-width: 530px;
  box-sizing: border-box;
`;

const FileName = styled.span`
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #555;
  flex: 1;
`;

const FileSelectButton = styled.label`
  background-color: #eee;
  padding: 13px 10px;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 0.95rem;
  height: 100%;

  &:hover {
    background-color: #ddd;
  }
`;

const Hidden = styled.input`
  display: none;
`;

const Message = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: #333;
`;
