// src/components/admin/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AHeader from "./AHeader";
import ABottomNav from "./ABottomNav";
import { PlayerProvider } from "../user/Player"; // ✅ 추가

export default function AdminLayout() {
  return (
    <PlayerProvider> {/* ✅ 여기 감싸줌 */}
      <div className="font-sans bg-gray-100 min-h-screen flex flex-col">
        <AHeader />
        <main className="flex-grow">
          <Outlet />
        </main>
        <ABottomNav />
      </div>
    </PlayerProvider>
  );
}