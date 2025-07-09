// src/router/index.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/user/HomeP";
import LatestP from "../pages/user/LatestP";
import BestP from "../pages/user/BestP";
import Header from "../components/user/Header";
import BottomNav from "../components/user/BottomNav";
import PlayerBar from "../components/user/PlayerBar";
import { PlayerProvider } from "../components/user/Player";

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
              <Route path="/latest" element={<LatestP />} />
              <Route path="/best" element={<BestP />} />
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
