// Halloween Sound Manager
// Psychologically appealing horror sounds for maximum spookiness

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private isMuted: boolean = true; // DEFAULT TO MUTED - browser requirement
  private backgroundSound: HTMLAudioElement | null = null;
  private currentSpiritAmbience: HTMLAudioElement | null = null;
  private currentSpiritId: string | null = null;

  private hasInteracted: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // ALWAYS START MUTED - Clear any old localStorage values
      // This ensures sound is OFF by default every time
      localStorage.setItem('tantrik_sound_muted', 'true');
      this.isMuted = true;
      
      console.log('🔇 Sound Manager initialized - MUTED by default');
      
      // Listen for first user interaction to enable audio context
      const enableAudio = () => {
        this.hasInteracted = true;
        console.log('👆 User interaction detected - audio context enabled');
        document.removeEventListener('click', enableAudio);
        document.removeEventListener('keydown', enableAudio);
        document.removeEventListener('touchstart', enableAudio);
      };
      document.addEventListener('click', enableAudio);
      document.addEventListener('keydown', enableAudio);
      document.addEventListener('touchstart', enableAudio);
    }
  }

  // Preload all sounds
  preloadSounds() {
    const soundFiles = {
      // Background ambience
      'bg-ambience': '/sounds/dark-ambience.mp3',
      
      // UI Sounds - Enhanced for better Halloween experience
      'greeting-entrance': '/sounds/ghost-whisper.mp3',
      'card-hover': '/sounds/creepy-hover.mp3',
      'spirit-select': '/sounds/summoning-bell.mp3',
      'message-send': '/sounds/whisper-send.mp3',
      'message-receive': '/sounds/ghost-breath.mp3',
      
      // Spirit-specific sounds
      'dracula-select': '/sounds/vampire-laugh.mp3',
      'dracula-ambience': '/sounds/castle-wind.mp3',
      'reaper-select': '/sounds/death-bell.mp3',
      'reaper-ambience': '/sounds/graveyard-ambience.mp3',
      'bloody-mary-select': '/sounds/mirror-crack.mp3',
      'bloody-mary-ambience': '/sounds/haunted-whispers.mp3',
      'bloody_mary-ambience': '/sounds/haunted-whispers.mp3', // Alternative naming
      
      // Loading/Summoning
      'summoning-ritual': '/sounds/ritual-chant.mp3',
      'portal-open': '/sounds/portal-whoosh.mp3',
      
      // Button clicks
      'button-click': '/sounds/bone-click.mp3',
      'toggle-sound': '/sounds/witch-cackle.mp3',
    };

    Object.entries(soundFiles).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      
      // Make loops seamless for ambient sounds
      if (key.includes('ambience') || key === 'summoning-ritual') {
        audio.loop = true;
      }
      
      this.sounds.set(key, audio);
    });
  }

  // Play a sound effect
  play(soundKey: string, volume: number = 0.5, loop: boolean = false) {
    if (this.isMuted || !this.hasInteracted) return;

    const sound = this.sounds.get(soundKey);
    if (sound) {
      // Always reset for one-shot sounds to allow replaying
      sound.pause();
      sound.currentTime = 0;
      sound.volume = volume;
      sound.loop = loop;
      
      sound.play().catch(err => console.log('Sound play failed:', err));
    }
  }

  // Stop a sound
  stop(soundKey: string) {
    const sound = this.sounds.get(soundKey);
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  }

  // Play background ambience
  playBackgroundAmbience() {
    if (this.isMuted || !this.hasInteracted) return;
    
    // Don't restart if already playing
    if (this.backgroundSound && !this.backgroundSound.paused) return;
    
    this.stopBackgroundAmbience();
    const sound = this.sounds.get('bg-ambience');
    if (sound) {
      sound.volume = 0.15; // Lower volume for background
      sound.loop = true;
      sound.play().catch(err => console.log('Background sound failed:', err));
      this.backgroundSound = sound;
    }
  }

  // Stop background ambience
  stopBackgroundAmbience() {
    if (this.backgroundSound) {
      this.backgroundSound.pause();
      this.backgroundSound.currentTime = 0;
      this.backgroundSound = null;
    }
  }

  // Play spirit-specific ambience
  playSpiritAmbience(spiritId: string) {
    console.log(`🎵 Attempting to play ${spiritId} ambience...`);
    console.log(`   - isMuted: ${this.isMuted}`);
    console.log(`   - hasInteracted: ${this.hasInteracted}`);
    
    if (this.isMuted) {
      console.log('❌ Cannot play - sound is MUTED. Click the sound toggle to enable!');
      return;
    }
    
    if (!this.hasInteracted) {
      console.log('❌ Cannot play - no user interaction yet');
      return;
    }

    // Stop any currently playing spirit ambience first
    this.stopSpiritAmbience();
    
    // Store the current spirit ID
    this.currentSpiritId = spiritId;
    
    const sound = this.sounds.get(`${spiritId}-ambience`);
    if (sound) {
      console.log(`✅ Playing ${spiritId} ambience!`);
      sound.volume = 0.25; // Lower volume
      sound.loop = true;
      sound.currentTime = 0; // Reset to start
      sound.play()
        .then(() => console.log(`🎶 ${spiritId} ambience started successfully`))
        .catch(err => console.error(`❌ Spirit ambience failed:`, err));
      this.currentSpiritAmbience = sound;
    } else {
      console.error(`❌ Sound file not found: ${spiritId}-ambience`);
    }
  }

  // Stop spirit ambience
  stopSpiritAmbience() {
    if (this.currentSpiritAmbience) {
      this.currentSpiritAmbience.pause();
      this.currentSpiritAmbience.currentTime = 0;
      this.currentSpiritAmbience = null;
    }
    this.currentSpiritId = null;
  }

  // Toggle mute
  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    
    console.log(`🔊 Sound toggled: ${this.isMuted ? 'MUTED 🔇' : 'UNMUTED 🔊'}`);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('tantrik_sound_muted', String(this.isMuted));
    }

    if (this.isMuted) {
      console.log('🔇 Stopping all sounds...');
      this.stopBackgroundAmbience();
      this.stopSpiritAmbience();
    } else {
      // Mark as interacted when unmuting
      this.hasInteracted = true;
      console.log('🔊 Sound ENABLED! Playing sounds...');
      
      // Play toggle sound
      this.play('toggle-sound', 0.4);
      
      // Restart spirit ambience if we were on a spirit page
      if (this.currentSpiritId) {
        console.log(`🎭 Restarting spirit ambience for: ${this.currentSpiritId}`);
        this.playSpiritAmbience(this.currentSpiritId);
      } else {
        console.log('🏠 Starting background ambience');
        // Otherwise restart background ambience
        this.playBackgroundAmbience();
      }
    }

    return this.isMuted;
  }

  // Get mute status
  getMuted(): boolean {
    return this.isMuted;
  }

  // Fade out a sound
  fadeOut(soundKey: string, duration: number = 1000) {
    const sound = this.sounds.get(soundKey);
    if (!sound) return;

    const startVolume = sound.volume;
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = startVolume / steps;

    let currentStep = 0;
    const fadeInterval = setInterval(() => {
      currentStep++;
      sound.volume = Math.max(0, startVolume - (volumeStep * currentStep));

      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        sound.pause();
        sound.currentTime = 0;
      }
    }, stepTime);
  }

  // Fade in a sound
  fadeIn(soundKey: string, targetVolume: number = 0.5, duration: number = 1000) {
    if (this.isMuted) return;

    const sound = this.sounds.get(soundKey);
    if (!sound) return;

    sound.volume = 0;
    sound.play().catch(err => console.log('Fade in failed:', err));

    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;

    let currentStep = 0;
    const fadeInterval = setInterval(() => {
      currentStep++;
      sound.volume = Math.min(targetVolume, volumeStep * currentStep);

      if (currentStep >= steps) {
        clearInterval(fadeInterval);
      }
    }, stepTime);
  }

  // Play random ambient spooky sound for extra atmosphere
  playRandomSpook() {
    if (this.isMuted || !this.hasInteracted) return;
    
    const spookySounds = ['ghost-whisper', 'ghost-breath', 'creepy-hover'];
    const randomSound = spookySounds[Math.floor(Math.random() * spookySounds.length)];
    this.play(randomSound, 0.2);
  }

  // Play spirit selection sound
  playSpiritSelect(spiritId: string) {
    if (this.isMuted || !this.hasInteracted) return;
    
    const selectSound = `${spiritId}-select`;
    this.play(selectSound, 0.4);
  }
}

// Singleton instance
let soundManager: SoundManager | null = null;

export const getSoundManager = (): SoundManager => {
  if (!soundManager && typeof window !== 'undefined') {
    soundManager = new SoundManager();
    soundManager.preloadSounds();
  }
  return soundManager!;
};

export default SoundManager;
