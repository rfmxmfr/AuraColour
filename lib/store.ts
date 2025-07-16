import { atom } from "jotai";

export interface UserState {
  id?: string;
  email?: string;
  name?: string;
  isAuthenticated: boolean;
}

export interface ColorAnalysisResult {
  season?: string;
  confidence?: number;
  undertone?: string;
  recommended_colors?: string[];
  ticket_number?: string;
  ticket_id?: string;
}

export interface QuestionnaireState {
  skinTone?: string;
  hairColor?: string;
  eyeColor?: string;
  stylePreference?: string;
  photoUrls?: string[];
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
export const colorAnalysisAtom = atom<ColorAnalysisResult | null>(null);
export const questionnaireAtom = atom<QuestionnaireState>({ completed: false });
export const uiAtom = atom<UIState>({ isMenuOpen: false, isDarkMode: false, activeStep: 0 });
export const serviceAtom = atom<ServiceState>({});

// Derived atoms
export const isQuestionnaireCompletedAtom = atom((get) => get(questionnaireAtom).completed);
export const hasAnalysisResultsAtom = atom((get) => get(colorAnalysisAtom) !== null);