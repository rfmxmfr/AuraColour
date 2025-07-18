import { atom } from "jotai";

export interface UserState {
  id?: string;
  email?: string;
  name?: string;
  isAuthenticated: boolean;
}

export interface AnalysisResult {
  // Common fields
  ticket_number?: string;
  ticket_id?: string;
  
  // Color Analysis fields
  season?: string;
  confidence?: number;
  undertone?: string;
  recommended_colors?: string[];
  description?: string;
  topColors?: string[];
  
  // Virtual Wardrobe fields
  dominant_style?: string;
  color_palette?: string[];
  versatility_score?: number;
  organization_level?: number;
  gap_analysis?: string[];
  recommended_additions?: string[];
  
  // Personal Shopping fields
  style_profile?: string;
  color_preferences?: string[];
  recommended_brands?: string[];
  statement_pieces?: string[];
  versatile_basics?: string[];
  shopping_priority_score?: number;
  
  // Style Evolution fields
  current_style_assessment?: string;
  transformation_potential?: number;
  recommended_direction?: string;
  key_pieces_to_acquire?: string[];
  items_to_phase_out?: string[];
  confidence_boosters?: string[];
}

export interface QuestionnaireState {
  serviceType?: string;
  skinTone?: string;
  hairColor?: string;
  eyeColor?: string;
  stylePreference?: string;
  photoUrls?: string[];
  allAnswers?: { [key: string]: any };
  completed: boolean;
}

export interface UIState {
  isMenuOpen: boolean;
  isDarkMode: boolean;
  activeStep: number;
}

export interface ServiceState {
  selectedService?: string;
  price?: number;
}

export const userAtom = atom<UserState>({ isAuthenticated: false });
export const analysisResultAtom = atom<AnalysisResult | null>(null);
export const questionnaireAtom = atom<QuestionnaireState>({ completed: false });
export const uiAtom = atom<UIState>({ isMenuOpen: false, isDarkMode: false, activeStep: 0 });
export const serviceAtom = atom<ServiceState>({ });

// Derived atoms
export const isQuestionnaireCompletedAtom = atom((get) => get(questionnaireAtom).completed);
export const hasAnalysisResultsAtom = atom((get) => get(analysisResultAtom) !== null);