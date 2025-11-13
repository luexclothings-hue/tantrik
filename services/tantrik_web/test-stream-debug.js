// Debug streaming to see exact chunks
const API_BASE = "http://localhost:8080";

async function testStream() {
  console.log("🧪 Testing stream chunks...\n");
  
  const response = await fetch(`${API_BASE}/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({
      spirit_id: "dracula",
      messages: [{ role: "user", content: "Hey" }],
    }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let chunkCount = 0;
  let fullText = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data:")) continue;

      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;

      chunkCount++;
      fullText += payload;
      
      // Show first 10 chunks
      if (chunkCount <= 10) {
        console.log(`Chunk ${chunkCount}: "${payload}"`);
      }
    }
  }

  console.log(`\n📊 Total chunks: ${chunkCount}`);
  console.log(`📝 Full text (first 200 chars):\n${fullText.substring(0, 200)}`);
  console.log(`\n🔍 Has spaces: ${fullText.includes(" ")}`);
}

testStream().catch(console.error);
