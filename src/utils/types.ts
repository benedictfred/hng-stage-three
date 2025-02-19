export interface TextInputProps {
  onSend: (text: string) => void;
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

export interface CustomError {
  message: string;
}
