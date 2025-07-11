//D:\my\my-music-app\client\src\App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// 관리자모드
// import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminMainPage from './pages/AdminMainPage';
import AdminUploadPage from './pages/AdminUploadPage';
import AdminFileListPage from './pages/AdminFileListPage';
import UserLatestPage from './pages/user/UserLatestPage';
import TrackDetailPage from './pages/user/UserTrackDetailPage';
import PopularPage from './pages/user/UserPopularPage';
// import UserPage from './pages/UserPage';
// 사용자모드
import HomePage from './pages/user/HomePage';
// 로그인, 회원가입 페이지 연결
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import MyPage from './pages/user/MyPage';
import PrivateRoute from './components/PrivateRoute';
import List from './pages/user/List';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/mypage"
          element={
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          }
        />
        <Route path="/list" element={<List />} />
        
        {/* 관리자 홈페이지 */}
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminMainPage />} />
        <Route path="/admin/upload" element={<AdminUploadPage />} />
        <Route path="/admin/files" element={<AdminFileListPage />} />
        {/* <Route path="/user" element={<UserPage />} /> */}
        <Route path="/tracks" element={<UserLatestPage />} />
        <Route path="/tracks/:id" element={<TrackDetailPage />} />
        <Route path="/tracks/popular" element={<PopularPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
