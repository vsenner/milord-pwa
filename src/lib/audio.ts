export type SoundType = "hooves" | "coins" | "bell" | "sword" | "death" | "crowd" | "ambient";

class AudioManager {
  private ambientAudio: HTMLAudioElement | null = null;
  private currentSpeechAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  public isUnlocked: boolean = false;

  public init() {
    if (typeof window === "undefined") return;
    this.isUnlocked = true;
    this.startAmbient();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopSpeaking();
      if (this.ambientAudio) {
        this.ambientAudio.pause();
      }
    } else {
      this.startAmbient();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public startAmbient() {
    if (this.isMuted || typeof window === "undefined") return;
    if (!this.ambientAudio) {
      this.ambientAudio = new Audio("/audio/sfx/ambient.mp3");
      this.ambientAudio.loop = true;
      this.ambientAudio.volume = 0.2;
    }
    this.ambientAudio.play().catch(() => {});
  }

  public stopSpeaking() {
    if (this.currentSpeechAudio) {
      this.currentSpeechAudio.pause();
      this.currentSpeechAudio.currentTime = 0;
      this.currentSpeechAudio = null;
    }
  }

  public playFile(url: string, onEnd?: () => void) {
    if (this.isMuted || typeof window === "undefined") {
      onEnd?.();
      return;
    }
    this.stopSpeaking();
    const audio = new Audio(url);
    this.currentSpeechAudio = audio;
    audio.onended = () => {
      if (this.currentSpeechAudio === audio) {
        this.currentSpeechAudio = null;
      }
      onEnd?.();
    };
    audio.onerror = () => {
      if (this.currentSpeechAudio === audio) {
        this.currentSpeechAudio = null;
      }
      onEnd?.();
    };
    audio.play().catch(() => {
      onEnd?.();
    });
  }

  public playSfx(type: SoundType, onEnd?: () => void) {
    if (this.isMuted || typeof window === "undefined") {
      onEnd?.();
      return;
    }
    const audio = new Audio(`/audio/sfx/${type}.mp3`);
    audio.volume = type === "hooves" ? 0.7 : 0.6;
    audio.onended = () => onEnd?.();
    audio.onerror = () => onEnd?.();
    audio.play().catch(() => onEnd?.());
  }
}

export const soundFx = new AudioManager();
