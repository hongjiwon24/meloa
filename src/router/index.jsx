// src/router/index.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/common/ProtectedRoute";
import { AuthProvider } from "../contexts/AuthContext";

// 유저 페이지 & 컴포넌트 import
import UserLayout from "../components/user/UserLayout";
import Home from "../pages/user/HomeP";
import LoginP from "../pages/user/LoginP";
import SignupP from "../pages/user/SignupP";
import Mypage from "../pages/user/Mypage";
import Like from "../pages/user/LikeP";
import Latest from "../pages/user/LatestP";
import Best from "../pages/user/BestP";
import CartP from "../pages/user/CartP";

// 관리자 페이지 & 컴포넌트 import
import AdminLogin from "../pages/admin/admin"; // 파일명이 admin.jsx 라고 가정
import AdminLayout from "../components/admin/AdminLayout";
import AHome from "../pages/admin/AHome";
import AAdmin from "../pages/admin/AAdmin";
import AMusicDetailP from "../pages/admin/AMusicDetailP";
import AUp from "../pages/admin/AUp";
import AUpDetail from "../pages/admin/AUpDetail";
import List from "../pages/user/List";


function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 유저 영역: 공개 접근 가능 */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginP />} />
            <Route path="/signup" element={<SignupP />} />
            <Route path="/cart" element={<CartP />} />
            <Route path="/like" element={<Like />} />
            <Route path="/latest" element={<Latest />} />
            <Route path="/best" element={<Best />} />
            <Route path="/list" element={<List />} />

            {/* 로그인한 유저만 접근 가능 */}
            <Route
              path="/mypage"
              element={
                <ProtectedRoute allowedRoles={["user"]}>
                  <Mypage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* 관리자 로그인 페이지 (레이아웃 없음) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 관리자 영역: 관리자 로그인한 사람만 접근 가능 */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AHome />} />
            <Route path="info" element={<AAdmin />} />
            <Route path="music-detail/:id" element={<AMusicDetailP />} />
            <Route path="upload" element={<AUp />} />
            <Route path="upload-list" element={<AUpDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Router;
