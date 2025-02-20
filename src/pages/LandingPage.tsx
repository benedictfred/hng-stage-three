import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();

  const handleNavigateToChat = () => {
    navigate("/chat", { replace: false });
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#121212] text-white">
      <h1 className="text-4xl font-bold mb-4">Translate Effortlessly</h1>
      <p className="text-gray-400 mb-6">
        Detect, translate, and summarize text in real time.
      </p>
      <button
        className="px-6 py-3 bg-primary-green font-semibold rounded-lg hover:bg-[#1ED760] transition cursor-pointer"
        onClick={handleNavigateToChat}
      >
        Get Started
      </button>
    </div>
  );
}
