import { languages } from "../utils/helpers";
import { Languages, MessageProps } from "../utils/types";

export default function Message({
  text,
  isUser,
  translatedText,
  detectedLanguage,
}: MessageProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div>
        <p
          className={`p-3 rounded-lg max-w-sm shadow-md ${
            isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {text || translatedText}
        </p>
        {detectedLanguage && (
          <p className="text-xs text-gray-500 text-center">
            {languages[detectedLanguage as keyof Languages]}
          </p>
        )}
      </div>
    </div>
  );
}
