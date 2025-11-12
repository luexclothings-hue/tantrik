from .spirit_agent import SpiritAgent
from prompts.reaper_prompt import REAPER_SYSTEM_PROMPT

class ReaperAgent(SpiritAgent):
    def __init__(self, primary_api_key: str, fallback_api_key: str = None):
        super().__init__(
            name="The Grim Reaper",
            system_prompt=REAPER_SYSTEM_PROMPT,
            primary_api_key=primary_api_key,
            fallback_api_key=fallback_api_key,
            model="gpt-4o-mini",
            temperature=0.7,
            max_tokens=500
        )
