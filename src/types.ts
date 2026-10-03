export type CategoryId = 'love' | 'sorry' | 'dates' | 'fun' | 'heartfelt' | 'custom';

export type ThemeId = 'rose' | 'lavender' | 'peach' | 'midnight' | 'mint' | 'sunset';

export interface QuestionPreset {
  id: string;
  category: CategoryId;
  question: string;
  subtitle?: string;
  emoji: string;
  yesText: string;
  noText: string;
  pleadingPhrases: string[];
  celebrationTitle: string;
  celebrationSubtitle: string;
  askGif: string;
  celebrateGif: string;
  theme: ThemeId;
}

export interface AppCustomConfig {
  question: string;
  recipientName?: string;
  yesText: string;
  noText: string;
  celebrationTitle: string;
  celebrationSubtitle: string;
  theme: ThemeId;
  askGif?: string;
  celebrateGif?: string;
}
