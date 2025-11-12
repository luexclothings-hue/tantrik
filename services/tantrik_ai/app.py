"""
🎃 TANTRIK AI SERVICE 🎃
Flask API for three spirit agents with streaming support (SSE)
"""

import os
import logging
from typing import Dict

from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
from dotenv import load_dotenv

# load .env if present
load_dotenv()

from agents import DraculaAgent, ReaperAgent, BloodyMaryAgent

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("tantrik-ai")

app = Flask(__name__)
CORS(app)

PRIMARY_API_KEY = os.getenv("OPENAI_API_KEY_PRIMARY")
FALLBACK_API_KEY = os.getenv("OPENAI_API_KEY_FALLBACK")

if not PRIMARY_API_KEY:
    logger.error("OPENAI_API_KEY_PRIMARY not set in env")
    raise RuntimeError("OPENAI_API_KEY_PRIMARY is required")

# Initialize agents
try:
    SPIRITS: Dict[str, object] = {
        "dracula": DraculaAgent(PRIMARY_API_KEY, FALLBACK_API_KEY),
        "reaper": ReaperAgent(PRIMARY_API_KEY, FALLBACK_API_KEY),
        "bloody_mary": BloodyMaryAgent(PRIMARY_API_KEY, FALLBACK_API_KEY),
    }
    logger.info("Spirit agents initialized")
except Exception as e:
    logger.exception("Failed to initialize spirit agents")
    raise

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "alive",
        "service": "Tantrik AI",
        "spirits": list(SPIRITS.keys())
    }), 200

@app.route("/spirits", methods=["GET"])
def spirits():
    # Basic metadata for frontend
    return jsonify({
        "spirits": [
            {"id": "dracula", "name": "Count Dracula", "emoji": "🧛"},
            {"id": "reaper", "name": "The Grim Reaper", "emoji": "💀"},
            {"id": "bloody_mary", "name": "Bloody Mary", "emoji": "👻"},
        ]
    }), 200

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "No JSON body provided"}), 400

    spirit_id = data.get("spirit_id")
    messages = data.get("messages")

    if not spirit_id:
        return jsonify({"error": "spirit_id is required"}), 400
    if spirit_id not in SPIRITS:
        return jsonify({"error": "unknown spirit", "available": list(SPIRITS.keys())}), 400
    if not messages or not isinstance(messages, list):
        return jsonify({"error": "messages must be a non-empty list"}), 400

    spirit = SPIRITS[spirit_id]
    try:
        result = spirit.chat(messages)
        return jsonify({
            "spirit_id": spirit_id,
            "spirit_name": spirit.name,
            "response": result.get("content"),
            "model": result.get("model"),
            "tokens_used": result.get("tokens_used"),
            "api_used": result.get("api_used"),
            "success": result.get("success", False)
        }), 200
    except Exception as e:
        logger.exception("chat endpoint failed")
        return jsonify({"error": "internal server error", "message": str(e)}), 500

@app.route("/stream", methods=["POST"])
def stream():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "No JSON body provided"}), 400

    spirit_id = data.get("spirit_id")
    messages = data.get("messages")

    if not spirit_id or spirit_id not in SPIRITS:
        return jsonify({"error": "invalid spirit_id"}), 400
    if not messages or not isinstance(messages, list):
        return jsonify({"error": "messages must be a non-empty list"}), 400

    spirit = SPIRITS[spirit_id]

    def generate():
        try:
            for chunk in spirit.stream_chat(messages):
                # Ensure chunk is string and not None
                if chunk is None:
                    continue
                yield f"data: {chunk}\n\n"
            yield "data: [DONE]\n\n"
        except Exception:
            logger.exception("streaming failed")
            yield "data: *The spirit's voice has faded...*\n\n"
            yield "data: [DONE]\n\n"

    headers = {
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no"
    }

    return Response(stream_with_context(generate()), mimetype="text/event-stream", headers=headers)

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "endpoint not found"}), 404

@app.errorhandler(500)
def internal(e):
    return jsonify({"error": "internal server error"}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8080))
    debug = os.getenv("FLASK_DEBUG", "0") == "1"
    logger.info("Starting Tantrik AI service")
    app.run(host="0.0.0.0", port=port, debug=debug)
