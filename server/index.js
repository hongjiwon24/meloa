//D:\my\my-music-app\server\index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB 연결 완료'))
.catch(err => console.error('❌ MongoDB 연결 실패:', err));

// ✅ 모델 불러오기
const Track = require('./models/Track');

// ✅ 미들웨어 설정
app.use(cors());
app.use(express.json());

// 서버가 이미지, 오디오 파일에 접근할 수 있도록 설정
app.use('/uploads/audio', express.static('uploads/audio'));
app.use('/uploads/images', express.static('uploads/images'));

// ✅ Multer 파일 저장 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // MIME 타입으로 구분
    if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/images');
    } else if (file.mimetype.startsWith('audio/')) {
      cb(null, 'uploads/audio');
    } else {
      cb(new Error('지원하지 않는 파일 형식'), false);
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const uniqueName = Date.now() + '-' + base + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// 음원 + 커버 이미지 동시 업로드 받기
app.post('/api/tracks/upload', upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, artist, lyrics, price } = req.body;
    const audioFile = req.files['audio']?.[0];
    const imageFile = req.files['coverImage']?.[0];

    if (!audioFile || !imageFile) {
      return res.status(400).json({ success: false, message: '음원 또는 이미지 누락' });
    }

    // DB에 저장할 때 경로도 반영
    const newTrack = new Track({
      title,
      artist,
      lyrics,
      price,
      filename: audioFile.filename,       // audio
      coverImage: imageFile.filename      // image
    });

    await newTrack.save();
    res.status(200).json({ success: true, message: '업로드 성공', track: newTrack });
  } catch (err) {
    console.error('업로드 실패:', err);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});

// ✅ 라우터

// 기본 루트
app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await Track.find().sort({ createdAt: -1 }); // 최신순
    res.status(200).json({ success: true, tracks });
  } catch (err) {
    console.error('목록 조회 오류:', err);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});
// 음원 상세 정보 조회
app.get('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ success: false, message: '해당 음원을 찾을 수 없습니다.' });
    }
    res.json({ success: true, track });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});

// 관리자 로그인
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    return res.status(200).json({ success: true, message: '인증 성공' });
  } else {
    return res.status(401).json({ success: false, message: '인증 실패' });
  }
});



// 서버 실행
app.listen(PORT, () => {
  console.log(`✅ 서버 실행됨: http://localhost:${PORT}`);
});

// 업로드 파일 삭제
app.delete('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ success: false, message: '음원을 찾을 수 없습니다.' });
    }

    const filePath = path.join(__dirname, 'uploads', track.filename);
    try {
      await fs.promises.unlink(filePath);
      console.log('파일 삭제됨:', track.filename);
    } catch (fileErr) {
      console.warn('파일 삭제 실패:', fileErr);
    }

    await Track.deleteOne({ _id: req.params.id });

    res.status(200).json({ success: true, message: '삭제 성공' });
  } catch (err) {
    console.error('삭제 오류:', err); // ← 여기에 실제 에러 로그 나옴
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});

// 찜하기 (좋아요) 증가 API
app.post('/api/tracks/:id/like', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ success: false, message: '음원을 찾을 수 없습니다.' });
    }

    track.likes += 1;
    await track.save();

    res.json({ success: true, likes: track.likes });
  } catch (err) {
    console.error('찜하기 오류:', err);
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});

// 회원가입
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

