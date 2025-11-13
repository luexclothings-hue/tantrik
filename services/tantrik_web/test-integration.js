// Quick integration test script
// Run with: node test-integration.js

const API_BASE = process.env.API_URL || "http://localhost:8080";

async function testHealth() {
  console.log("🧪 Testing /health endpoint...");
  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    console.log("✅ Health check passed:", data);
    return true;
  } catch (error) {
    console.error("❌ Health check failed:", error.message);
    return false;
  }
}

async function testSpirits() {
  console.log("\n🧪 Testing /spirits endpoint...");
  try {
    const response = await fetch(`${API_BASE}/spirits`);
    const data = await response.json();
    console.log("✅ Spirits list:", data.spirits);
    return true;
  } catch (error) {
    console.error("❌ Spirits list failed:", error.message);
    return false;
  }
}

async function testChat() {
  console.log("\n🧪 Testing /chat endpoint...");
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        spirit_id: "dracula",
        messages: [{ role: "user", content: "Hello!" }],
      }),
    });
    const data = await response.json();
    console.log("✅ Chat response:", {
      spirit: data.spirit_name,
      response: data.response?.substring(0, 100) + "...",
      tokens: data.tokens_used,
    });
    return true;
  } catch (error) {
    console.error("❌ Chat test failed:", error.message);
    return false;
  }
}

async function testStream() {
  console.log("\n🧪 Testing /stream endpoint...");
  try {
    const response = await fetch(`${API_BASE}/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        spirit_id: "dracula",
        messages: [{ role: "user", content: "Who are you?" }],
      }),
    });

    if (!response.ok || !response.body) {
      throw new Error(`Stream failed: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let chunks = 0;

    console.log("📡 Streaming response:");
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      const lines = text.split("\n");

      for (const line of lines) {
        if (line.startsWith("data:")) {
          const data = line.slice(5).trim();
          if (data && data !== "[DONE]") {
            process.stdout.write(data);
            chunks++;
          }
        }
      }
    }

    console.log(`\n✅ Stream test passed (${chunks} chunks received)`);
    return true;
  } catch (error) {
    console.error("❌ Stream test failed:", error.message);
    return false;
  }
}

async function runTests() {
  console.log("🎃 Tantrik AI Integration Tests");
  console.log(`Testing backend at: ${API_BASE}\n`);
  console.log("=" .repeat(50));

  const results = {
    health: await testHealth(),
    spirits: await testSpirits(),
    chat: await testChat(),
    stream: await testStream(),
  };

  console.log("\n" + "=".repeat(50));
  console.log("\n📊 Test Results:");
  console.log(`  Health Check: ${results.health ? "✅ PASS" : "❌ FAIL"}`);
  console.log(`  Spirits List: ${results.spirits ? "✅ PASS" : "❌ FAIL"}`);
  console.log(`  Chat API:     ${results.chat ? "✅ PASS" : "❌ FAIL"}`);
  console.log(`  Stream API:   ${results.stream ? "✅ PASS" : "❌ FAIL"}`);

  const allPassed = Object.values(results).every((r) => r);
  console.log(
    `\n${allPassed ? "✅ All tests passed!" : "❌ Some tests failed"}`
  );

  process.exit(allPassed ? 0 : 1);
}

runTests();
