import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { TextInputProps } from "../utils/types";

export default function TextInput({ onSend }: TextInputProps) {
  const [text, setText] = useState("");

  return (
    <div className="p-4 bg-white border-t flex items-center">
      <textarea
        className="flex-1 p-2 border rounded-lg focus:outline-none resize-none"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button
        className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
        onClick={() => {
          if (text.trim()) onSend(text);
          setText("");
        }}
      >
        <IoSend size={30} />
      </button>
    </div>
  );
}
