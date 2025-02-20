export interface TextInputProps {
  selectedLang: string;
  text: string;
  setText: (text: string) => void;
  onSend: (text: string) => void;
  onSelectLang: (language: string) => void;
}

export interface MessageProps {
  isUser: boolean;
  text?: string;
  translatedText?: string;
  detectedLanguage?: string;
}

export interface Languages {
  en: "English";
  es: "Spanish";
  pt: "Portuguese";
  ru: "Russian";
  tr: "Turkish";
  fr: "French";
}
