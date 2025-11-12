"""
Base SpiritAgent: minimal OpenAI wrapper with chat + streaming
"""

import logging
from typing import List, Dict, Optional, Generator, Any
from openai import OpenAI, OpenAIError

logger = logging.getLogger("tantrik-ai.spirit")


class SpiritAgent:
    """Base agent for all spirit personalities."""

    def __init__(
        self,
        name: str,
        system_prompt: str,
        primary_api_key: str,
        fallback_api_key: Optional[str] = None,
        model: str = "gpt-4o-mini",
        temperature: float = 0.9,
        max_tokens: int = 500
    ):
        self.name = name
        self.system_prompt = system_prompt
        self.model = model
        self.temperature = temperature
        self.max_tokens = max_tokens

        # Initialize OpenAI clients
        self.primary_client = OpenAI(
            api_key=primary_api_key,
            timeout=30.0,
            max_retries=2
        )
        self.fallback_client = OpenAI(
            api_key=fallback_api_key,
            timeout=30.0,
            max_retries=2
        ) if fallback_api_key else None

        logger.info(f"🪬 {self.name} initialized with {self.model}")

    def _build_messages(self, messages: List[Dict[str, str]]) -> List[Dict[str, str]]:
        """Prepend system prompt to user messages."""
        return [{"role": "system", "content": self.system_prompt}] + messages

    def chat(self, messages: List[Dict[str, str]], use_fallback: bool = False) -> Dict[str, Any]:
        """Synchronous chat completion with fallback support."""
        client = self.fallback_client if (use_fallback and self.fallback_client) else self.primary_client
        api_used = "fallback" if (use_fallback and self.fallback_client) else "primary"

        try:
            response = client.chat.completions.create(
                model=self.model,
                messages=self._build_messages(messages),
                temperature=self.temperature,
                max_tokens=self.max_tokens
            )

            content = response.choices[0].message.content or ""
            tokens = response.usage.total_tokens if response.usage else 0

            logger.info(f"✅ {self.name} ({api_used}): {tokens} tokens")

            return {
                "content": content,
                "model": self.model,
                "tokens_used": tokens,
                "api_used": api_used,
                "success": True
            }

        except OpenAIError as e:
            logger.error(f"❌ {self.name} ({api_used}): {str(e)}")

            # Try fallback if available
            if not use_fallback and self.fallback_client:
                logger.info(f"🔄 {self.name} trying fallback...")
                return self.chat(messages, use_fallback=True)

            return {
                "content": "*The spirit flickers and fades into darkness...*",
                "model": self.model,
                "tokens_used": 0,
                "api_used": api_used,
                "success": False,
                "error": str(e)
            }

        except Exception as e:
            logger.error(f"❌ {self.name} unexpected error: {str(e)}")
            return {
                "content": "*The spirit cannot manifest at this time...*",
                "model": self.model,
                "tokens_used": 0,
                "api_used": api_used,
                "success": False,
                "error": str(e)
            }

    def stream_chat(self, messages: List[Dict[str, str]], use_fallback: bool = False) -> Generator[str, None, None]:
        """Streaming chat completion with fallback support."""
        client = self.fallback_client if (use_fallback and self.fallback_client) else self.primary_client
        api_used = "fallback" if (use_fallback and self.fallback_client) else "primary"

        try:
            stream = client.chat.completions.create(
                model=self.model,
                messages=self._build_messages(messages),
                temperature=self.temperature,
                max_tokens=self.max_tokens,
                stream=True
            )

            logger.info(f"🌊 {self.name} streaming ({api_used})")

            for chunk in stream:
                if chunk.choices and chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content

        except OpenAIError as e:
            logger.error(f"❌ {self.name} stream failed ({api_used}): {str(e)}")

            # Try fallback if available
            if not use_fallback and self.fallback_client:
                logger.info(f"🔄 {self.name} trying fallback stream...")
                yield from self.stream_chat(messages, use_fallback=True)
            else:
                yield "*The spirit's voice fades into the void...*"

        except Exception as e:
            logger.error(f"❌ {self.name} stream error: {str(e)}")
            yield "*The connection to the spirit realm has been severed...*"
