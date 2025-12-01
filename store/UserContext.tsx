import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppState, UserProfile, AssessmentResult, TechTool, BookingRequest } from '../types';
import { PLANE_LEVELS } from '../data/staticData';

const INITIAL_STATE: AppState = {
  profile: null,
  booking: null,
  assessment: null,
  techStack: [],
  completedScenarios: [],
  combinedScore: 0,
  planeLevel: 'Grounded',
  flightMiles: 0
};

interface UserContextType extends AppState {
  setProfile: (profile: UserProfile) => void;
  setBooking: (booking: BookingRequest) => void;
  submitAssessment: (responses: Record<number, number>) => void;
  updateTechStack: (tools: TechTool[]) => void;
  resetData: () => void;
  isReady: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('flightPlannerProfile');
    if (stored) {
      try {
        setState(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored profile", e);
      }
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem('flightPlannerProfile', JSON.stringify(state));
    }
  }, [state, isReady]);

  const calculateScore = (responses: Record<number, number>, tech: TechTool[]) => {
    const assessmentValues = Object.values(responses);
    const assessmentAvg = assessmentValues.length > 0 
      ? assessmentValues.reduce((a, b) => a + b, 0) / 10 // Assuming 10 questions
      : 0;

    const techValues = tech.map(t => t.optimization * 10);
    const techAvg = techValues.length > 0
      ? techValues.reduce((a, b) => a + b, 0) / techValues.length
      : 0;

    // Weighted: 60% assessment, 40% tech (if tech exists, else 100% assessment)
    const combined = tech.length > 0 
      ? (assessmentAvg * 0.6) + (techAvg * 0.4)
      : assessmentAvg;

    return Math.round(combined);
  };

  const calculateLevel = (score: number) => {
    const level = PLANE_LEVELS.find(l => score <= l.max) || PLANE_LEVELS[PLANE_LEVELS.length - 1];
    return level.name;
  };

  const calculateMiles = (score: number, techStackCompleted: boolean) => {
    let miles = score * 100;
    if (state.assessment) miles += 500;
    if (techStackCompleted) miles += 300;
    return miles;
  };

  const setProfile = (profile: UserProfile) => {
    setState(prev => ({ ...prev, profile }));
  };

  const setBooking = (booking: BookingRequest) => {
    setState(prev => ({ ...prev, booking }));
  };

  const submitAssessment = (responses: Record<number, number>) => {
    const score = calculateScore(responses, state.techStack);
    const level = calculateLevel(score);
    const miles = calculateMiles(score, state.techStack.length > 0);

    const result: AssessmentResult = {
      responses,
      completedAt: new Date().toISOString(),
      score
    };

    setState(prev => ({
      ...prev,
      assessment: result,
      combinedScore: score,
      planeLevel: level,
      flightMiles: miles
    }));
  };

  const updateTechStack = (tools: TechTool[]) => {
    const currentResponses = state.assessment?.responses || {};
    const score = calculateScore(currentResponses, tools);
    const level = calculateLevel(score);
    const miles = calculateMiles(score, true);

    setState(prev => ({
      ...prev,
      techStack: tools,
      combinedScore: score,
      planeLevel: level,
      flightMiles: miles
    }));
  };

  const resetData = () => {
    setState(INITIAL_STATE);
    localStorage.removeItem('flightPlannerProfile');
  };

  return (
    <UserContext.Provider value={{ ...state, setProfile, setBooking, submitAssessment, updateTechStack, resetData, isReady }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};