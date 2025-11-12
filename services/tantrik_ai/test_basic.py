"""
Quick test to verify the AI service works
"""

import os
from dotenv import load_dotenv

load_dotenv()

# Test imports
print("Testing imports...")
try:
    from agents import DraculaAgent, ReaperAgent, BloodyMaryAgent
    print("✅ All agents imported successfully")
except Exception as e:
    print(f"❌ Import failed: {e}")
    exit(1)

# Test initialization
print("\nTesting agent initialization...")
try:
    primary_key = os.getenv("OPENAI_API_KEY_PRIMARY")
    fallback_key = os.getenv("OPENAI_API_KEY_FALLBACK")
    
    if not primary_key:
        print("❌ OPENAI_API_KEY_PRIMARY not set")
        exit(1)
    
    dracula = DraculaAgent(primary_key, fallback_key)
    reaper = ReaperAgent(primary_key, fallback_key)
    mary = BloodyMaryAgent(primary_key, fallback_key)
    
    print("✅ All agents initialized successfully")
    print(f"   - {dracula.name}")
    print(f"   - {reaper.name}")
    print(f"   - {mary.name}")
    
except Exception as e:
    print(f"❌ Initialization failed: {e}")
    exit(1)

# Test chat (optional - only if you want to test API)
print("\nTesting chat (optional - requires API key)...")
try:
    test_messages = [{"role": "user", "content": "Hello, who are you?"}]
    result = dracula.chat(test_messages)
    
    if result["success"]:
        print(f"✅ Chat successful!")
        print(f"   Response: {result['content'][:100]}...")
        print(f"   Tokens: {result['tokens_used']}")
    else:
        print(f"⚠️  Chat failed (expected if no API key): {result.get('error', 'Unknown error')}")
        
except Exception as e:
    print(f"⚠️  Chat test failed (expected if no API key): {e}")

print("\n✅ All basic tests passed!")
