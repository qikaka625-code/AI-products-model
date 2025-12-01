export interface GenerationPreset {
  id: string;
  label: string;
  category: 'Standing' | 'Sitting' | 'Side' | 'Close-up' | 'Creative';
  prompt: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

// Window augmentation for AI Studio key selection
// We augment the global AIStudio interface to ensure methods exist without colliding with existing definitions
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}