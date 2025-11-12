#!/bin/bash
# Simple API test script

BASE_URL="http://localhost:8080"

echo "🧪 Testing Tantrik AI Service"
echo "================================"

# Test 1: Health check
echo -e "\n1️⃣ Testing /health endpoint..."
curl -s "$BASE_URL/health" | python -m json.tool

# Test 2: List spirits
echo -e "\n\n2️⃣ Testing /spirits endpoint..."
curl -s "$BASE_URL/spirits" | python -m json.tool

# Test 3: Chat with Dracula
echo -e "\n\n3️⃣ Testing /chat endpoint (Dracula)..."
curl -s -X POST "$BASE_URL/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "spirit_id": "dracula",
    "messages": [
      {"role": "user", "content": "Who are you?"}
    ]
  }' | python -m json.tool

echo -e "\n\n✅ Tests complete!"
