// src/components/home/Home.jsx
import React from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";

// 임시 데이터 예시 (배포 전 테스트용)
const section1Data = [
  { id: 1, title: "노래 1" },
  { id: 2, title: "노래 2" },
  { id: 3, title: "노래 3" },
]; // 비어있으면 내용 없음 표시
const section2Data = [
  { id: 1, title: "노래 A" },
  { id: 2, title: "노래 B" },
];
const section3Data = [
  { id: 1, title: "노래 1" },
  { id: 2, title: "노래 2" },
  { id: 3, title: "노래 3" },
];
const section4Data = [
  { id: 1, title: "베스트 노래 1" },
];

const Home = () => {
  return (
    <div className="flex flex-col pb-20">
      <Section1 data={section1Data} />
      <Section2 data={section2Data} />
      <Section3 data={section3Data} />
      <Section4 data={section4Data} />
    </div>
  );
};

export default Home;
