import { useEffect, useRef } from 'react';
import { getSoundManager } from '@/lib/soundManager';

export const useSounds = () => {
  const soundManagerRef = useRef<ReturnType<typeof getSoundManager> | null>(null);

  useEffect(() => {
    soundManagerRef.current = getSoundManager();
  }, []);

  return {
    playSound: (soundKey: string, volume?: number, loop?: boolean) => {
      soundManagerRef.current?.play(soundKey, volume, loop);
    },
    stopSound: (soundKey: string) => {
      soundManagerRef.current?.stop(soundKey);
    },
    playBackgroundAmbience: () => {
      soundManagerRef.current?.playBackgroundAmbience();
    },
    stopBackgroundAmbience: () => {
      soundManagerRef.current?.stopBackgroundAmbience();
    },
    playSpiritAmbience: (spiritId: string) => {
      soundManagerRef.current?.playSpiritAmbience(spiritId);
    },
    stopSpiritAmbience: () => {
      soundManagerRef.current?.stopSpiritAmbience();
    },
    fadeOut: (soundKey: string, duration?: number) => {
      soundManagerRef.current?.fadeOut(soundKey, duration);
    },
    fadeIn: (soundKey: string, targetVolume?: number, duration?: number) => {
      soundManagerRef.current?.fadeIn(soundKey, targetVolume, duration);
    },
    playRandomSpook: () => {
      soundManagerRef.current?.playRandomSpook();
    },
    playSpiritSelect: (spiritId: string) => {
      soundManagerRef.current?.playSpiritSelect(spiritId);
    },
  };
};
