import { CustomError } from "./types";

export const translateLanguage = async (
  srcLng: string,
  targetLng: string,
  text: string
) => {
  try {
    const translator = await self.ai.translator.create({
      sourceLanguage: srcLng,
      targetLanguage: targetLng,
    });
    const translatedText = await translator.translate(text);
    if (!translatedText) throw new Error("Couldn't translate. Try again");
    return translatedText;
  } catch (err) {
    const customError = err as CustomError;
    throw new Error(customError.message);
  }
};

export const detectLanguage = async (text: string) => {
  try {
    const languageDetectorCapabilities =
      await self.ai.languageDetector.capabilities();
    const canDetect = languageDetectorCapabilities.capabilities;
    let detector;
    if (canDetect === "no") {
      return;
    }
    if (canDetect === "readily") {
      detector = await self.ai.languageDetector.create();
    } else {
      detector = await self.ai.languageDetector.create({
        monitor(m) {
          m.addEventListener("downloadprogress", (e: ProgressEvent) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
          });
        },
      });
      await detector.ready;
    }

    const results = await detector.detect(text);

    if (results.length > 0) {
      const topResult = results[0];
      return topResult.detectedLanguage;
    } else {
      throw new Error("No language detected.");
    }
  } catch (err) {
    const customError = err as CustomError;
    throw new Error(customError.message);
  }
};
