from .spirit_agent import SpiritAgent
from prompts.dracula_prompt import DRACULA_SYSTEM_PROMPT

class DraculaAgent(SpiritAgent):
    def __init__(self, primary_api_key: str, fallback_api_key: str = None):
        super().__init__(
            name="Count Dracula",
            system_prompt=DRACULA_SYSTEM_PROMPT,
            primary_api_key=primary_api_key,
            fallback_api_key=fallback_api_key,
            model="gpt-4o-mini",
            temperature=0.9,
            max_tokens=500
        )
