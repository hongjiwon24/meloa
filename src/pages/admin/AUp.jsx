// src/pages/admin/AUp.jsx
import React, { useState } from "react";
import styled from "styled-components";
// import axios from "axios"; // 백엔드 연동 시 주석 해제

export default function AUp() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [price, setPrice] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !artist || !lyrics || !price || !audioFile) {
      setMessage("모든 필드를 입력해주세요.");
      return;
    }

    setLoading(true);
    setMessage("");

    // 임시: 입력 데이터 객체 (백엔드로 보낼 데이터 예시)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("lyrics", lyrics);
    formData.append("price", price);
    formData.append("audio", audioFile);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      // 백엔드 API 호출 예시 (주석 처리)
      /*
      const response = await axios.post("/api/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        setMessage("업로드 성공!");
        // 초기화
        setTitle("");
        setArtist("");
        setLyrics("");
        setPrice("");
        setAudioFile(null);
        setImageFile(null);
      } else {
        setMessage("업로드 실패: " + response.data.message);
      }
      */

      // 임시: 성공 메시지 표시 (백엔드 없을 때)
      setTimeout(() => {
        setMessage("임시: 업로드 성공!");
        setTitle("");
        setArtist("");
        setLyrics("");
        setPrice("");
        setAudioFile(null);
        setImageFile(null);
        setLoading(false);
      }, 1000);

    } catch (error) {
      setLoading(false);
      setMessage("서버 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <ImageUploadLabel htmlFor="image-upload">
          <ImageUploadBox>
            {imageFile ? (
              <PreviewImage src={URL.createObjectURL(imageFile)} alt="미리보기" />
            ) : (
              <Circle>
                <PlusIcon>+</PlusIcon>
              </Circle>
            )}
          </ImageUploadBox>
          <UploadText>이미지 가져오기</UploadText>
        </ImageUploadLabel>
        <HiddenFileInput
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        <Label>노래 제목</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="노래 제목을 입력하세요"
          required
        />

        <Label>아티스트</Label>
        <Input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="아티스트명을 입력하세요"
          required
        />

        <Label>가사</Label>
        <TextArea
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="가사를 입력하세요"
          rows={4}
          required
        />

        <Label>가격</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="가격을 입력하세요"
          min="0"
          required
        />

        <Label>음원 첨부파일</Label>
        <FileInput
          type="file"
          accept="audio/*"
          onChange={handleAudioChange}
          required
        />

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "업로드 중..." : "업로드"}
        </SubmitButton>

        {message && <Message>{message}</Message>}
      </Form>
    </Container>
  );
}

// 스타일
const Container = styled.div`
  max-width: 480px;
  margin: 40px auto;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ImageUploadLabel = styled.label`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageUploadBox = styled.div`
  width: 50vw;
  max-width: 240px;
  aspect-ratio: 1 / 1;
  border: 2px dashed #ccc;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  overflow: hidden;
  position: relative;
`;

const Circle = styled.div`
  width: 70px;
  height: 70px;
  background: #ff2c68;
  border-radius: 50%;
  color: white;
  font-size: 48px;
  line-height: 70px;
  text-align: center;
  user-select: none;
`;

const PlusIcon = styled.span`
  display: inline-block;
  font-weight: 900;
`;

const UploadText = styled.span`
  font-size: 14px;
  color: #999;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const FileInput = styled.input`
  padding: 8px 0;
`;

const SubmitButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #ff2c68;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  color: #ff2c68;
  font-weight: 600;
  text-align: center;
  margin-top: 8px;
`;
