import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import { LandingPage } from "./pages/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
