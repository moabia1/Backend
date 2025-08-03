const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) { 
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `
      you are an expert in generating captions for image
      you generate single caption for the image
      your caption will be short and concise.
      you use hashtag and emojis in the caption.
      `
    }
  });
  return response.text;
}

module.exports = generateCaption