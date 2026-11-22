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
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  public playFile(
    url: string,
    onEnd?: () => void,
    fallbackText?: string,
    characterId?: string,
    lang?: "ru" | "en"
  ) {
    if (this.isMuted || typeof window === "undefined") {
      onEnd?.();
      return;
    }
    this.stopSpeaking();

    const audio = new Audio(url);
    this.currentSpeechAudio = audio;

    let hasEnded = false;
    const endHandler = () => {
      if (!hasEnded) {
        hasEnded = true;
        if (this.currentSpeechAudio === audio) {
          this.currentSpeechAudio = null;
        }
        onEnd?.();
      }
    };

    audio.onended = endHandler;
    audio.onerror = () => {
      // Audio file not pre-baked: immediately fallback to browser SpeechSynthesis with role modulation!
      if (fallbackText) {
        this.speakFallback(fallbackText, characterId || "herald", lang || "ru", endHandler);
      } else {
        endHandler();
      }
    };

    audio.play().catch(() => {
      if (fallbackText) {
        this.speakFallback(fallbackText, characterId || "herald", lang || "ru", endHandler);
      } else {
        endHandler();
      }
    });
  }

  private speakFallback(text: string, characterId: string, lang: "ru" | "en", onEnd?: () => void) {
    if (this.isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) {
      onEnd?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "ru" ? "ru-RU" : "en-US";

      // Modulate character speech rate & pitch
      if (characterId === "general") {
        utterance.pitch = 0.75;
        utterance.rate = 0.95;
      } else if (characterId === "treasurer") {
        utterance.pitch = 0.85;
        utterance.rate = 0.95;
      } else if (characterId === "jester") {
        utterance.pitch = 1.35;
        utterance.rate = 1.15;
      } else if (characterId === "bishop") {
        utterance.pitch = 1.05;
        utterance.rate = 0.88;
      } else if (characterId === "peasant") {
        utterance.pitch = 1.1;
        utterance.rate = 1.0;
      }

      const voices = window.speechSynthesis.getVoices();
      const targetVoices = voices.filter((v) => v.lang.replace("_", "-").startsWith(lang));
      if (targetVoices.length > 0) {
        if (characterId === "peasant") {
          const female = targetVoices.find(
            (v) =>
              v.name.toLowerCase().includes("female") ||
              v.name.toLowerCase().includes("svetlana") ||
              v.name.toLowerCase().includes("anna")
          );
          utterance.voice = female || targetVoices[0];
        } else {
          const male = targetVoices.find(
            (v) =>
              v.name.toLowerCase().includes("male") ||
              v.name.toLowerCase().includes("dmitry") ||
              v.name.toLowerCase().includes("david")
          );
          utterance.voice = male || targetVoices[0];
        }
      }

      utterance.onend = () => onEnd?.();
      utterance.onerror = () => onEnd?.();

      window.speechSynthesis.speak(utterance);
    } catch {
      onEnd?.();
    }
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
