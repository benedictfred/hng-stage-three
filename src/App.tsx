import { useState } from "react";
import Message from "./components/Message";
import TextInput from "./components/TextInput";
import { MessageProps } from "./utils/types";
import { detectLanguage, translateLanguage } from "./utils/services";

export default function App() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const handleSend = async (text: string) => {
    try {
      const detectedLanguage = await detectLanguage(text);
      setMessages((prev) => [
        ...prev,
        { text, isUser: true, detectedLanguage },
      ]);
      const translation = await translateLanguage(detectedLanguage, "es", text);
      if (translation)
        setMessages((prev) => [
          ...prev,
          { isUser: false, translatedText: translation },
        ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
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
      </div>
      <TextInput onSend={handleSend} />
    </div>
  );
}
