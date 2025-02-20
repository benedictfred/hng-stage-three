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
    <div className="p-4 border-t flex max-sm:flex-col items-center gap-3 max-sm:space-y-2">
      <div className="flex items-center max-sm:w-full max-sm:justify-start gap-2">
        <label htmlFor="language" className="font-medium text-[#B3B3B3]">
          🌍 Translate to:
        </label>
        <select
          id="language"
          className="p-2 border rounded-lg focus:outline-none bg-secondary text-secondary-text"
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

      <div className="flex items-center md:flex-1 max-sm:w-full">
        <textarea
          className="flex-1 p-3 bg-[#181818] text-white border border-gray-600 rounded-lg focus:outline-none resize-none"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          className="ml-2 p-3 bg-primary-green text-white rounded-lg outline-none"
          onClick={() => onSend(text)}
        >
          <IoSend size={24} />
        </button>
      </div>
    </div>
  );
}
