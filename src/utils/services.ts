export const translateLanguage = async (
  srcLng: string,
  targetLng: string,
  text: string
) => {
  try {
    const translator = await self?.ai?.translator?.create({
      sourceLanguage: srcLng,
      targetLanguage: targetLng,
    });
    const translatedText = await translator?.translate(text);
    if (!translatedText) throw new Error("Couldn't translate. Try again");
    return translatedText;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred."
    );
  }
};

export const detectLanguage = async (text: string) => {
  try {
    const languageDetectorCapabilities =
      await self?.ai?.languageDetector?.capabilities();
    const canDetect = languageDetectorCapabilities?.capabilities;
    let detector;
    if (canDetect === "no") {
      return;
    }
    if (canDetect === "readily") {
      detector = await self?.ai?.languageDetector?.create();
    } else {
      detector = await self?.ai?.languageDetector?.create({
        monitor(m: any) {
          m.addEventListener("downloadprogress", (e: ProgressEvent) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
          });
        },
      });
      await detector?.ready;
    }

    const results = await detector?.detect(text);

    if (results?.length > 0) {
      const topResult = results[0];
      return topResult?.detectedLanguage;
    } else {
      throw new Error("No language detected.");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred."
    );
  }
};
