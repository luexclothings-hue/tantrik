from .spirit_agent import SpiritAgent
from prompts.bloody_mary_prompt import BLOODY_MARY_SYSTEM_PROMPT

class BloodyMaryAgent(SpiritAgent):
    def __init__(self, primary_api_key: str, fallback_api_key: str = None):
        super().__init__(
            name="Bloody Mary",
            system_prompt=BLOODY_MARY_SYSTEM_PROMPT,
            primary_api_key=primary_api_key,
            fallback_api_key=fallback_api_key,
            model="gpt-4o-mini",
            temperature=1.0,
            max_tokens=500
        )
