// Configuration for color analysis rules
export interface SeasonConfig {
  description: string;
  topColors: string[];
  characteristics: string[];
}

export interface ColorAnalysisConfig {
  seasons: Record<string, SeasonConfig>;
  rules: {
    skinTone: Record<string, Record<string, number>>;
    hairColor: Record<string, Record<string, number>>;
    eyeColor: Record<string, Record<string, number>>;
    stylePreference: Record<string, Record<string, number>>;
  };
}

export const colorAnalysisConfig: ColorAnalysisConfig = {
  seasons: {
    Spring: {
      description: 'You have warm, bright characteristics that shine in clear, vibrant colors. Your natural coloring has a fresh, youthful quality.',
      topColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
      characteristics: ['warm', 'bright', 'clear', 'fresh']
    },
    Summer: {
      description: 'You have cool, soft characteristics that look best in muted, gentle colors. Your natural coloring has an elegant, refined quality.',
      topColors: ['#B8A9C9', '#87CEEB', '#F0E68C', '#DDA0DD', '#98FB98'],
      characteristics: ['cool', 'soft', 'muted', 'elegant']
    },
    Autumn: {
      description: 'You have warm, rich characteristics that glow in deep, earthy colors. Your natural coloring has a sophisticated, grounded quality.',
      topColors: ['#CD853F', '#A0522D', '#8B4513', '#DAA520', '#B22222'],
      characteristics: ['warm', 'rich', 'deep', 'earthy']
    },
    Winter: {
      description: 'You have cool, dramatic characteristics that shine in bold, clear colors. Your natural coloring has a striking, confident quality.',
      topColors: ['#000080', '#DC143C', '#4B0082', '#008B8B', '#2F4F4F'],
      characteristics: ['cool', 'dramatic', 'bold', 'striking']
    }
  },
  rules: {
    skinTone: {
      'Very fair with pink undertones': { Summer: 2, Winter: 1 },
      'Fair with neutral undertones': { Spring: 1, Summer: 1 },
      'Medium with warm undertones': { Spring: 2, Autumn: 2 },
      'Medium with cool undertones': { Summer: 2, Winter: 2 },
      'Deep with warm undertones': { Autumn: 2, Winter: 1 },
      'Deep with cool undertones': { Autumn: 1, Winter: 2 }
    },
    hairColor: {
      'Platinum blonde': { Summer: 2, Winter: 1 },
      'Golden blonde': { Spring: 2, Summer: 1 },
      'Light brown': { Spring: 1, Summer: 1 },
      'Medium brown': { Autumn: 1, Winter: 1 },
      'Dark brown': { Autumn: 1, Winter: 2 },
      'Black': { Winter: 3 },
      'Red/Auburn': { Autumn: 3, Spring: 1 },
      'Gray/Silver': { Summer: 1, Winter: 1 }
    },
    eyeColor: {
      'Blue': { Spring: 1, Summer: 2, Winter: 1 },
      'Green': { Spring: 2, Summer: 1 },
      'Brown': { Autumn: 2, Winter: 1 },
      'Hazel': { Spring: 1, Autumn: 2 },
      'Gray': { Summer: 2, Winter: 1 },
      'Amber': { Autumn: 3 }
    },
    stylePreference: {
      'Classic and timeless': { Summer: 1, Winter: 1 },
      'Modern and trendy': { Winter: 2, Spring: 1 },
      'Bohemian and relaxed': { Autumn: 2, Spring: 1 },
      'Professional and polished': { Winter: 2, Summer: 1 },
      'Edgy and bold': { Winter: 3 },
      'Romantic and feminine': { Spring: 2, Summer: 1 }
    }
  }
};