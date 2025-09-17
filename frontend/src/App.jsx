import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ContractDetailPage from "./pages/ContractDetailPage";
import UploadPage from "./pages/UploadPage";
import QueryPage from "./pages/QueryPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/contracts/:id" element={<PrivateRoute><ContractDetailPage /></PrivateRoute>} />
        <Route path="/upload" element={<PrivateRoute><UploadPage /></PrivateRoute>} />
        <Route path="/query" element={<PrivateRoute><QueryPage /></PrivateRoute>} />
      </Routes>
    </AuthProvider>
  );
}
