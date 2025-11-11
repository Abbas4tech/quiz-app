"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

import { Question, QuizForm } from "@/schemas/quiz";

interface EditingQuestion {
  index: number | null;
  question: Question | null;
  isEditing: boolean;
}

interface QuizBuilderState {
  questionText: string;
  options: string[];
  correctAnswer: string;
  editingQuestion: EditingQuestion;
}

type QuizBuilderAction =
  | { type: "SET_QUESTION_TEXT"; payload: string }
  | { type: "SET_OPTION"; payload: { index: number; value: string } }
  | { type: "ADD_OPTION" }
  | { type: "REMOVE_OPTION"; payload: number }
  | { type: "SET_CORRECT_ANSWER"; payload: string }
  | { type: "RESET_BUILDER" }
  | {
      type: "START_EDITING";
      payload: { index: number; question: Question };
    }
  | { type: "UPDATE_EDITING_QUESTION_TEXT"; payload: string }
  | {
      type: "UPDATE_EDITING_OPTION";
      payload: { index: number; value: string };
    }
  | { type: "ADD_EDITING_OPTION" }
  | { type: "REMOVE_EDITING_OPTION"; payload: number }
  | { type: "UPDATE_EDITING_CORRECT_ANSWER"; payload: string }
  | { type: "SAVE_EDITING" }
  | { type: "STOP_EDITING" };

interface QuizBuilderContextType {
  state: QuizBuilderState;
  dispatch: React.Dispatch<QuizBuilderAction>;
  form: UseFormReturn<QuizForm>;
  mode: "create" | "edit";
  quizId?: string;
}

const QuizBuilderContext = createContext<QuizBuilderContextType | undefined>(
  undefined
);

const initialState: QuizBuilderState = {
  questionText: "",
  options: ["", ""],
  correctAnswer: "",
  editingQuestion: {
    index: null,
    question: null,
    isEditing: false,
  },
};

function quizBuilderReducer(
  state: QuizBuilderState,
  action: QuizBuilderAction
): QuizBuilderState {
  switch (action.type) {
    // Add Question Mode
    case "SET_QUESTION_TEXT":
      return { ...state, questionText: action.payload };

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
        options:
          state.options.length < 6 ? [...state.options, ""] : state.options,
      };

    case "REMOVE_OPTION":
      return {
        ...state,
        options:
          state.options.length > 2
            ? state.options.filter((_, idx) => idx !== action.payload)
            : state.options,
      };

    case "SET_CORRECT_ANSWER":
      return { ...state, correctAnswer: action.payload };

    case "RESET_BUILDER":
      return {
        ...state,
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      };

    // Edit Question Mode
    case "START_EDITING":
      return {
        ...state,
        editingQuestion: {
          index: action.payload.index,
          question: { ...action.payload.question },
          isEditing: true,
        },
      };

    case "UPDATE_EDITING_QUESTION_TEXT":
      return {
        ...state,
        editingQuestion: {
          ...state.editingQuestion,
          question: state.editingQuestion.question
            ? {
                ...state.editingQuestion.question,
                questionText: action.payload,
              }
            : null,
        },
      };

    case "UPDATE_EDITING_OPTION":
      return {
        ...state,
        editingQuestion: {
          ...state.editingQuestion,
          question: state.editingQuestion.question
            ? {
                ...state.editingQuestion.question,
                options: state.editingQuestion.question.options.map(
                  (opt, idx) =>
                    idx === action.payload.index ? action.payload.value : opt
                ),
              }
            : null,
        },
      };

    case "ADD_EDITING_OPTION":
      return {
        ...state,
        editingQuestion: {
          ...state.editingQuestion,
          question:
            state.editingQuestion.question &&
            state.editingQuestion.question.options.length < 6
              ? {
                  ...state.editingQuestion.question,
                  options: [...state.editingQuestion.question.options, ""],
                }
              : state.editingQuestion.question,
        },
      };

    case "REMOVE_EDITING_OPTION":
      return {
        ...state,
        editingQuestion: {
          ...state.editingQuestion,
          question:
            state.editingQuestion.question &&
            state.editingQuestion.question.options.length > 2
              ? {
                  ...state.editingQuestion.question,
                  options: state.editingQuestion.question.options.filter(
                    (_, idx) => idx !== action.payload
                  ),
                  correctAnswer:
                    state.editingQuestion.question.options[action.payload] ===
                    state.editingQuestion.question.correctAnswer
                      ? state.editingQuestion.question.options.filter(
                          (_, idx) => idx !== action.payload
                        )[0] || ""
                      : state.editingQuestion.question.correctAnswer,
                }
              : state.editingQuestion.question,
        },
      };

    case "UPDATE_EDITING_CORRECT_ANSWER":
      return {
        ...state,
        editingQuestion: {
          ...state.editingQuestion,
          question: state.editingQuestion.question
            ? {
                ...state.editingQuestion.question,
                correctAnswer: action.payload,
              }
            : null,
        },
      };

    case "SAVE_EDITING":
    case "STOP_EDITING":
      return {
        ...state,
        editingQuestion: {
          index: null,
          question: null,
          isEditing: false,
        },
      };

    default:
      return state;
  }
}

interface QuizBuilderProviderProps {
  children: ReactNode;
  form: UseFormReturn<QuizForm>;
  mode: "create" | "edit";
  quizId?: string;
}

export function QuizBuilderProvider({
  children,
  form,
  mode,
  quizId,
}: QuizBuilderProviderProps): React.JSX.Element {
  const [state, dispatch] = useReducer(quizBuilderReducer, initialState);

  return (
    <QuizBuilderContext.Provider
      value={{ state, dispatch, form, mode, quizId }}
    >
      {children}
    </QuizBuilderContext.Provider>
  );
}

export function useQuizBuilder(): QuizBuilderContextType {
  const context = useContext(QuizBuilderContext);
  if (!context) {
    throw new Error("useQuizBuilder must be used within QuizBuilderProvider");
  }
  return context;
}
