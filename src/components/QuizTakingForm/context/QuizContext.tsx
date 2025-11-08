"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
} from "react";

import { PlainQuiz } from "@/actions/quiz";

interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, string>;
  showResults: boolean;
  submitDialogOpen: boolean;
}

type QuizAction =
  | { type: "SELECT_ANSWER"; payload: { index: number; answer: string } }
  | { type: "NEXT_QUESTION" }
  | { type: "PREVIOUS_QUESTION" }
  | { type: "GO_TO_QUESTION"; payload: number }
  | { type: "SUBMIT_QUIZ" }
  | { type: "RESET_QUIZ" }
  | { type: "SUBMIT_DIALOG_OPEN" }
  | { type: "SUBMIT_DIALOG_CLOSE" };

interface QuizContextValue {
  state: QuizState;
  quiz: PlainQuiz;
  dispatch: React.Dispatch<QuizAction>;
}

const QuizContext = createContext<QuizContextValue | undefined>(undefined);

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "SELECT_ANSWER":
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.index]: action.payload.answer,
        },
      };

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };

    case "PREVIOUS_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
      };

    case "GO_TO_QUESTION":
      return {
        ...state,
        currentQuestionIndex: action.payload,
      };

    case "SUBMIT_QUIZ":
      return {
        ...state,
        showResults: true,
      };

    case "RESET_QUIZ":
      return {
        currentQuestionIndex: 0,
        answers: {},
        showResults: false,
        submitDialogOpen: false,
      };

    case "SUBMIT_DIALOG_OPEN":
      return {
        ...state,
        submitDialogOpen: true,
      };

    case "SUBMIT_DIALOG_CLOSE":
      return {
        ...state,
        submitDialogOpen: false,
      };

    default:
      return state;
  }
}

interface QuizProviderProps {
  quiz: PlainQuiz;
  children: ReactNode;
}

export function QuizProvider({
  quiz,
  children,
}: QuizProviderProps): React.JSX.Element {
  const [state, dispatch] = useReducer(quizReducer, {
    currentQuestionIndex: 0,
    answers: {},
    showResults: false,
    submitDialogOpen: false,
  });

  const value = useMemo(() => ({ state, quiz, dispatch }), [state, quiz]);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz(): QuizContextValue {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
