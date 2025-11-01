"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
} from "react";
import { UseFormReturn } from "react-hook-form";

import { QuizForm } from "@/schemas/quiz";
import { Question } from "@/model/Quiz";

type QuestionBuilderAction =
  | { type: "SET_QUESTION_TEXT"; payload: string }
  | { type: "SET_OPTION"; payload: { index: number; value: string } }
  | { type: "ADD_OPTION" }
  | { type: "REMOVE_OPTION"; payload: number }
  | { type: "SET_CORRECT_ANSWER"; payload: string }
  | { type: "RESET_BUILDER" };

interface QuizBuilderContextValue {
  state: Question;
  dispatch: React.Dispatch<QuestionBuilderAction>;
  form: UseFormReturn<QuizForm>;
  mode: "create" | "edit";
  quizId?: string;
}

const QuizBuilderContext = createContext<QuizBuilderContextValue | undefined>(
  undefined
);

function questionBuilderReducer(
  state: Question,
  action: QuestionBuilderAction
): Question {
  switch (action.type) {
    case "SET_QUESTION_TEXT":
      return {
        ...state,
        questionText: action.payload,
      };

    case "SET_OPTION":
      return {
        ...state,
        options: state.options.map((opt, idx) =>
          idx === action.payload.index ? action.payload.value : opt
        ),
      };

    case "ADD_OPTION":
      return {
        ...state,
        options: [...state.options, ""],
      };

    case "REMOVE_OPTION":
      const newOptions = state.options.filter(
        (_, idx) => idx !== action.payload
      );
      // Reset correct answer if it was the removed option
      const removedOption = state.options[action.payload];
      return {
        ...state,
        options: newOptions,
        correctAnswer:
          state.correctAnswer === removedOption ? "" : state.correctAnswer,
      };

    case "SET_CORRECT_ANSWER":
      return {
        ...state,
        correctAnswer: action.payload,
      };

    case "RESET_BUILDER":
      return {
        questionText: "",
        options: ["", ""],
        correctAnswer: "",
      };

    default:
      return state;
  }
}

interface QuizBuilderProviderProps {
  form: UseFormReturn<QuizForm>;
  mode: "create" | "edit";
  quizId?: string;
  children: ReactNode;
}

export function QuizBuilderProvider({
  form,
  mode,
  quizId,
  children,
}: QuizBuilderProviderProps): React.JSX.Element {
  const [state, dispatch] = useReducer(questionBuilderReducer, {
    questionText: "",
    options: ["", ""],
    correctAnswer: "",
  });

  const value = useMemo(
    () => ({ state, dispatch, form, mode, quizId }),
    [state, form, mode, quizId]
  );

  return (
    <QuizBuilderContext.Provider value={value}>
      {children}
    </QuizBuilderContext.Provider>
  );
}

export function useQuizBuilder(): QuizBuilderContextValue {
  const context = useContext(QuizBuilderContext);
  if (!context) {
    throw new Error("useQuizBuilder must be used within a QuizBuilderProvider");
  }
  return context;
}
