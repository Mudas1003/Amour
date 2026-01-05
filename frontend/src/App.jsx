// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home.jsx";
import ProfileFlow from "./profileFlow.jsx";  // <-- Use the combined flow manager
import ProfilePreview from "./preview.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Whole profile 1–4 wizard handled here */}
      <Route path="/profile" element={<ProfileFlow />} />

      {/* Optional direct preview route */}
      <Route path="/preview" element={<ProfilePreview />} />
    </Routes>
  );
}
