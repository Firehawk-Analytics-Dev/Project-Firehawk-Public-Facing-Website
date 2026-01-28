const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI('AIzaSyBi5RRp2iJErr6kCkQ1z1KIGmnPu4AlMMI');

async function run() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("test");
    process.stdout.write("SUCCESS\n");
  } catch (e) {
    process.stdout.write("ERROR: " + e.message + "\n");
  }
}
run().then(() => process.exit(0)).catch(e => { process.stdout.write(e.message); process.exit(1); });
