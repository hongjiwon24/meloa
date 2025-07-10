import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/user/HomeP";
import LatestP from "../pages/user/LatestP";
import BestP from "../pages/user/BestP";
import Header from "../components/user/Header";
import BottomNav from "../components/user/BottomNav";
import PlayerBar from "../components/user/PlayerBar";
import { PlayerProvider } from "../components/user/Player";
import List from "../pages/user/List";
import MusicDetailP from "../pages/user/MusicDetailP";
import LikeP from "../pages/user/LikeP";
import LoginP from "../pages/user/LoginP";
import Mypage from "../pages/user/Mypage";
import SignupP from "../pages/user/SignupP";
import CartP from "../pages/user/CartP";
import PayP from "../pages/user/PayP";

function Router() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <div className="font-sans bg-white min-h-screen flex flex-col">
          {/* 상단 헤더 */}
          <Header />

          {/* 라우터 영역 */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/CartP" element={<CartP />} />
              <Route path="/pay" element={<PayP />} />
              <Route path="/latest" element={<LatestP />} />
              <Route path="/best" element={<BestP />} />
              <Route path="/list" element={<List />} />
              <Route path="/music-detail" element={<MusicDetailP />} />
              <Route path="/playlist/:id" element={<MusicDetailP />} />
              <Route path="/like" element={<LikeP />} />
              <Route path="/login" element={<LoginP />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/signup" element={<SignupP />} />
            </Routes>
          </main>

          {/* 하단 플레이어 및 네비게이션 */}
          <PlayerBar />
          <BottomNav />
        </div>
      </PlayerProvider>
    </BrowserRouter>
  );
}

export default Router;
