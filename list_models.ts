const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
  try {
    // Correct method might be listModels on the genAI instance or similar
    // Let's try a different approach since listModels might not be exactly that in the SDK
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("test");
    console.log("SUCCESS: gemini-1.5-flash works");
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log("FAILED: gemini-1.5-flash error:", (e as any).message);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("test");
    console.log("SUCCESS: gemini-pro works");
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log("FAILED: gemini-pro error:", (e as any).message);
  }
}
run();
