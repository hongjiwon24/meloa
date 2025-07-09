// src/pages/user/HomeP.jsx
import React from "react";
import Header from "../../components/user/Header";
import BottomNav from "../../components/user/BottomNav";
import PlayerBar from "../../components/user/PlayerBar";
import Home from "../../components/home/Home"; // 기존 MusicSection 대신 Home으로 교체

const HomeP = () => {
  return (
    <div >
      <Home />
      <PlayerBar />
      <BottomNav />
    </div>
  );
};

export default HomeP;
