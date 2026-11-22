export interface VoiceCharacterConfig {
  pitch: number;
  rate: number;
  volume: number;
}

export const CHARACTER_VOICE_CONFIGS: Record<string, VoiceCharacterConfig> = {
  herald: { pitch: 1.15, rate: 1.05, volume: 1.0 },   // Loud, crisp royal courier
  treasurer: { pitch: 0.85, rate: 0.95, volume: 0.9 }, // Sly, low-pitch bean counter
  general: { pitch: 0.75, rate: 0.92, volume: 1.0 },   // Deep, harsh commander
  bishop: { pitch: 1.05, rate: 0.88, volume: 0.95 },  // Slow, pious ecclesiastical tone
  peasant: { pitch: 0.95, rate: 1.0, volume: 0.85 },   // Humble, hurried rustic
  jester: { pitch: 1.35, rate: 1.12, volume: 1.0 },    // Squeaky, mischievous trickster
  merchant: { pitch: 1.0, rate: 1.02, volume: 0.95 },  // Smooth, persuasive trader
};
