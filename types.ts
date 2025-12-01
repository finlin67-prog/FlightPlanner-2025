export interface City {
  name: string;
  function: string;
  coords: [number, number]; // [lat, lon]
  region: 'NA' | 'EU' | 'APAC' | 'MENA';
}

export interface Route {
  from: string;
  to: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  miles: number;
  stops: number;
}

export interface Question {
  id: number;
  category: string;
  question: string;
  description: string;
  options: { label: string; value: number }[];
}

export interface UserProfile {
  industry: string;
  companySize: string;
  companyType: string;
  role?: string;
  revenue?: string;
  teamSize?: number;
  goals?: string[];
  email?: string;
}

export interface BookingRequest {
  mode: 'manual' | 'quick' | 'deep';
  from?: string;
  to?: string;
  purpose?: string;
}

export interface AssessmentResult {
  responses: Record<number, number>; // questionId -> score
  completedAt: string;
  score: number;
}

export interface TechTool {
  category: string;
  name: string;
  optimization: number; // 1-10
}

export interface AppState {
  profile: UserProfile | null;
  booking: BookingRequest | null;
  assessment: AssessmentResult | null;
  techStack: TechTool[];
  completedScenarios: string[];
  combinedScore: number;
  planeLevel: string;
  flightMiles: number;
}

export interface Scenario {
  id: string;
  title: string;
  industry: string;
  from: string;
  to: string;
  challenge: string;
  complexity: number;
  timeline: string;
  investment: string;
}