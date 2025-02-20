import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const apiKeys = [
  import.meta.env.VITE_TRANSLATOR_API_KEY,
  import.meta.env.VITE_LANGUAGE_DETECTOR_API_KEY,
  import.meta.env.VITE_SUMMARIZER_API_KEY,
];

apiKeys.forEach((key) => {
  if (key) {
    const metaTag = document.createElement("meta");
    metaTag.httpEquiv = "origin-trial";
    metaTag.content = key;
    document.head.appendChild(metaTag);
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
