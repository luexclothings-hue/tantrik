"""
🎃 Test Script for Tantrik AI Service
"""

import requests
import json

BASE_URL = "http://localhost:8080"

def test_health():
    print("🏥 Testing health endpoint...")
    r = requests.get(f"{BASE_URL}/health")
    print("Status:", r.status_code)
    print(json.dumps(r.json(), indent=2))
    print()

def test_spirits_list():
    print("👻 Testing spirits list...")
    r = requests.get(f"{BASE_URL}/spirits")
    print("Status:", r.status_code)
    print(json.dumps(r.json(), indent=2))
    print()

def test_chat(spirit_id, message):
    print(f"💬 Testing chat with {spirit_id}")
    r = requests.post(
        f"{BASE_URL}/chat",
        json={
            "spirit_id": spirit_id,
            "messages": [{"role": "user", "content": message}]
        }
    )
    print("Status:", r.status_code)
    if r.status_code == 200:
        data = r.json()
        print(f"{data['spirit_name']}: {data['response']}")
        print("Tokens used:", data.get("tokens_used"))
    else:
        print("Error:", r.text)
    print()

def main():
    test_health()
    test_spirits_list()
    test_chat("dracula", "Are you really a vampire?")
    test_chat("reaper", "When will I die?")
    test_chat("bloody_mary", "Are you Bloody Mary?")
    print("Done")

if __name__ == "__main__":
    main()
