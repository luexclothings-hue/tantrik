// 👻 Collection of spine-chilling greeting messages for Halloween
// Randomly selected on each new session for variety

export const horrorGreetings = [
  "🕯️ The veil between worlds grows thin... I sense your presence, mortal. I am the Tantrik, keeper of ancient secrets and summoner of restless spirits. The dead whisper your name... Which phantom soul dares you seek tonight? Speak carefully... for some doors, once opened, can never be closed... 💀👻",
  
  "💀 *The candles flicker...* Welcome to the realm between life and death. I am your Tantrik, the one who walks in shadows. The spirits are restless tonight... they hunger for conversation. Tell me, brave soul... which ghost from the abyss shall I summon to speak with you? Choose wisely... 🕯️👻",
  
  "👻 *A cold wind blows through...* Ahhhh, another mortal dares to cross the threshold. I am the Tantrik, guardian of the spirit gate. The dead have been waiting... watching... Do you feel their eyes upon you? Speak the name of the phantom you seek, but beware... not all spirits are friendly... 🌙💀",
  
  "🕷️ *Chains rattle in the darkness...* The witching hour approaches, and you have found me, the Tantrik. I commune with those who no longer walk among the living. The cemetery gates creak open... Which tormented soul shall I call forth from eternal slumber? Tread carefully, mortal... some spirits never rest... ⚰️👻",
  
  "🦇 *Thunder rumbles...* The spirits sense a living presence. I am the Tantrik, master of the dark arts and speaker to the dead. Tonight, the boundary between our world and theirs is but a whisper... Which restless phantom do you dare disturb? Remember... once summoned, they may not wish to leave... 🌑💀",
];

export function getRandomHorrorGreeting(): string {
  return horrorGreetings[Math.floor(Math.random() * horrorGreetings.length)];
}
