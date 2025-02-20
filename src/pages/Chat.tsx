import { useState } from "react";
import Message from "../components/Message";
import TextInput from "../components/TextInput";
import { Languages, MessageProps } from "../utils/types";
import { detectLanguage, translateLanguage } from "../utils/services";
import { languages } from "../utils/helpers";

export default function Chat() {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [text, setText] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleSend = async (text: string) => {
    try {
      setErrMsg("");

      if (!text.trim()) {
        throw new Error("Message cannot be empty.");
      }

      const detectedLanguage = await detectLanguage(text);

      if (!selectedLanguage) {
        throw new Error("Please select a target language.");
      }

      if (selectedLanguage === detectedLanguage) {
        throw new Error(
          `The detected language is already ${
            languages[detectedLanguage as keyof Languages]
          }. Please choose a different target language.`
        );
      }

      setMessages((prev) => [
        ...prev,
        { text, isUser: true, detectedLanguage },
      ]);

      const translation = await translateLanguage(
        detectedLanguage,
        selectedLanguage,
        text
      );

      if (!translation) {
        throw new Error("Translation failed. Please try again.");
      }

      setMessages((prev) => [
        ...prev,
        { isUser: false, translatedText: translation },
      ]);
      setText("");
    } catch (error) {
      setErrMsg(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 content-end">
        {messages.map((msg, index) => (
          <Message
            key={index}
            text={msg.text}
            translatedText={msg.translatedText}
            isUser={msg.isUser}
            detectedLanguage={msg.detectedLanguage}
          />
        ))}
        {errMsg && (
          <div className="text-red-500 text-sm text-right">{errMsg}</div>
        )}
      </div>
      <TextInput
        text={text}
        setText={setText}
        onSend={handleSend}
        selectedLang={selectedLanguage}
        onSelectLang={setSelectedLanguage}
      />
    </div>
  );
}
