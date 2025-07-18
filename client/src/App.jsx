//\client\src\App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from "./context/Player";
import PlayerBar from './components/user/PlayerBar';
import styled from "styled-components";
// 관리자모드
// import HomePage from './pages/HomePage';
import AdminRoute from './components/AdminRoute';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminMainPage from './pages/AdminMainPage';
import AdminUploadPage from './pages/AdminUploadPage';
import AdminFileListPage from './pages/AdminFileListPage';
import AAdmin from './pages/AAdmin';
// import UserPage from './pages/UserPage';
// 사용자모드
import HomePage from './pages/user/HomePage';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import PassP from './pages/user/PassP';
import CartP from "./pages/user/CartP";
import PayP from "./pages/user/PayP";
import MyPage from './pages/user/MyPage';
import PrivateRoute from './components/PrivateRoute';
import List from './pages/user/List';
import ListDetailPage from './pages/user/ListDetailPage';
import LikeP from './pages/user/LikeP';
import UserLatestPage from './pages/user/UserLatestPage';
import TrackDetailPage from './pages/user/UserTrackDetailPage';
import PopularPage from './pages/user/UserPopularPage';


function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <AppContainer>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pass" element={<PassP />} />
            <Route path="/cart" element={<CartP />} />
            <Route path="/pay" element={<PayP />} />
            <Route path="/like" element={<LikeP />} />
            <Route
              path="/mypage"
              element={
                <PrivateRoute>
                  <MyPage />
                </PrivateRoute>
              }
            />
            <Route path="/list" element={<List />} />
            <Route path="/playlist/:id" element={<ListDetailPage />} />
            <Route path="/user/detail/:id" element={<ListDetailPage />} />
            <Route path="/tracks" element={<UserLatestPage />} />
            <Route path="/tracks/:id" element={<TrackDetailPage />} />
            <Route path="/tracks/popular" element={<PopularPage />} />

            
            {/* 관리자 홈페이지 */}
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminMainPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/upload"
              element={
                <AdminRoute>
                  <AdminUploadPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/files"
              element={
                <AdminRoute>
                  <AdminFileListPage />
                </AdminRoute>
              }
            />     
            <Route
              path="/admin-info"
              element={
                <AdminRoute>
                  <AAdmin />
                </AdminRoute>
              }
            />                
          </Routes>
          <PlayerBar></PlayerBar>
        </AppContainer>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;

const AppContainer = styled.div`
  padding-bottom: 73px; 
`