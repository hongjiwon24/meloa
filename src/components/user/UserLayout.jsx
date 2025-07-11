// src/components/user/UserLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";       // 유저 전용 헤더
import BottomNav from "./BottomNav"; // 유저 전용 바텀 네비게이션
import PlayerBar from "./PlayerBar";
import { PlayerProvider } from "./Player";

export default function UserLayout() {
  return (
    <PlayerProvider>
      <div className="font-sans bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <PlayerBar />
        <BottomNav />
      </div>
    </PlayerProvider>
  );
}
