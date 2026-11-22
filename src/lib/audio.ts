import { CHARACTER_VOICE_CONFIGS } from "./engine/voiceConfigs";

export type SoundType =
  | "hooves"
  | "coins"
  | "bell"
  | "sword"
  | "death"
  | "crowd"
  | "horns"
  | "ambient";

class AudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientTimer: NodeJS.Timeout | null = null;
  public isUnlocked: boolean = false;

  public init() {
    if (typeof window === "undefined") return;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx && !this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    this.isUnlocked = true;
    this.startAmbient();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopSpeaking();
      if (this.ambientTimer) {
        clearInterval(this.ambientTimer);
        this.ambientTimer = null;
      }
    } else {
      this.startAmbient();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public stopSpeaking() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }

  public startAmbient() {
    if (this.isMuted || this.ambientTimer || typeof window === "undefined" || !this.ctx) return;
    this.playAmbientDrone();
    this.ambientTimer = setInterval(() => {
      if (!this.isMuted) this.playAmbientDrone();
    }, 12000);
  }

  public speak(
    text: string,
    characterId: string,
    lang: "ru" | "en",
    onEnd?: () => void
  ) {
    if (this.isMuted || typeof window === "undefined" || !("speechSynthesis" in window)) {
      onEnd?.();
      return;
    }

    try {
      this.stopSpeaking();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "ru" ? "ru-RU" : "en-US";

      const cfg = CHARACTER_VOICE_CONFIGS[characterId] || { pitch: 1.0, rate: 1.0, volume: 1.0 };
      utterance.pitch = cfg.pitch;
      utterance.rate = cfg.rate;
      utterance.volume = cfg.volume;

      const voices = window.speechSynthesis.getVoices();
      const targetVoices = voices.filter((v) => v.lang.replace("_", "-").startsWith(lang));
      
      if (targetVoices.length > 0) {
        if (characterId === "general" || characterId === "treasurer") {
          const maleVoice = targetVoices.find(
            (v) =>
              v.name.toLowerCase().includes("male") ||
              v.name.toLowerCase().includes("dmitry") ||
              v.name.toLowerCase().includes("david")
          );
          utterance.voice = maleVoice || targetVoices[0];
        } else {
          utterance.voice = targetVoices[0];
        }
      }

      let isFinished = false;
      const finish = () => {
        if (!isFinished) {
          isFinished = true;
          onEnd?.();
        }
      };

      utterance.onend = finish;
      utterance.onerror = finish;

      window.speechSynthesis.speak(utterance);
    } catch {
      onEnd?.();
    }
  }

  public play(type: SoundType) {
    if (this.isMuted || typeof window === "undefined") return;
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    try {
      const now = this.ctx.currentTime;
      switch (type) {
        case "coins":
          this.playCoins(now);
          break;
        case "hooves":
          this.playHooves(now);
          break;
        case "bell":
          this.playBell(now);
          break;
        case "sword":
          this.playSword(now);
          break;
        case "death":
          this.playDeath(now);
          break;
        case "crowd":
          this.playCrowd(now);
          break;
        case "horns":
          this.playHorns(now);
          break;
        case "ambient":
          this.playAmbientDrone();
          break;
      }
    } catch {
      // autoplay lock guard
    }
  }

  private playAmbientDrone() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [110, 164.81, 220].forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 8);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now);
      osc.stop(now + 8.1);
    });
  }

  private playCoins(now: number) {
    if (!this.ctx) return;
    [1200, 1600, 2200, 2600].forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      gain.gain.setValueAtTime(0.15, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.18);
    });
  }

  private playHooves(now: number) {
    if (!this.ctx) return;
    [0, 0.1, 0.22, 0.32, 0.44].forEach((timeOffset) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(160, now + timeOffset);
      osc.frequency.exponentialRampToValueAtTime(50, now + timeOffset + 0.06);
      gain.gain.setValueAtTime(0.22, now + timeOffset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + 0.07);
    });
  }

  private playHorns(now: number) {
    if (!this.ctx) return;
    [329.63, 440, 554.37].forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.62);
    });
  }

  private playCrowd(now: number) {
    if (!this.ctx) return;
    [180, 220, 260].forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now);
      osc.stop(now + 1.25);
    });
  }

  private playBell(now: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, now);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 1.45);
  }

  private playSword(now: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(1100, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.22);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  private playDeath(now: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 2.0);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 2.15);
  }
}

export const soundFx = new AudioManager();
