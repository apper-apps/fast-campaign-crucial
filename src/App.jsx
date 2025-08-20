import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import CandidateProfile from "@/components/pages/CandidateProfile";
import PostPlanner from "@/components/pages/PostPlanner";
import WhatsAppGenerator from "@/components/pages/WhatsAppGenerator";
import VoiceGenerator from "@/components/pages/VoiceGenerator";
import PressRelease from "@/components/pages/PressRelease";
import SpeechWriter from "@/components/pages/SpeechWriter";
import SloganGenerator from "@/components/pages/SloganGenerator";
import AudioScripts from "@/components/pages/AudioScripts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<CandidateProfile />} />
            <Route path="post-planner" element={<PostPlanner />} />
            <Route path="whatsapp" element={<WhatsAppGenerator />} />
            <Route path="voice" element={<VoiceGenerator />} />
            <Route path="press" element={<PressRelease />} />
            <Route path="speech" element={<SpeechWriter />} />
            <Route path="slogans" element={<SloganGenerator />} />
            <Route path="audio" element={<AudioScripts />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;