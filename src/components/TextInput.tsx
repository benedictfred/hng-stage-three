import { IoSend } from "react-icons/io5";
import { TextInputProps } from "../utils/types";
import { languages } from "../utils/helpers";

export default function TextInput({
  onSend,
  selectedLang,
  onSelectLang,
  text,
  setText,
}: TextInputProps) {
  return (
    <div className="p-4 bg-white border-t flex items-center gap-3">
      <div className="flex items-center gap-2">
        <label htmlFor="language" className="font-medium text-gray-700">
          🌍 Translate to:
        </label>
        <select
          id="language"
          className="p-2 border rounded-lg focus:outline-none bg-gray-100 text-gray-700"
          value={selectedLang}
          onChange={(e) => onSelectLang(e.target.value)}
        >
          <option value="" disabled>
            Select language
          </option>
          {Object.entries(languages).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Text Input */}
      <textarea
        className="flex-1 p-3 border rounded-lg focus:outline-none resize-none bg-gray-50"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      {/* Send Button */}
      <button
        className="ml-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => onSend(text)}
      >
        <IoSend size={24} />
      </button>
    </div>
  );
}
