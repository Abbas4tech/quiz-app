"use client";
import { useCallback } from "react";

import { useQuiz } from "../context/QuizContext";

interface useQuizActionsReturns {
  selectAnswer: (_answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (_index: number) => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
}

export function useQuizActions(): useQuizActionsReturns {
  const { dispatch, state } = useQuiz();

  const selectAnswer = useCallback(
    (answer: string) => {
      dispatch({
        type: "SELECT_ANSWER",
        payload: { index: state.currentQuestionIndex, answer },
      });
    },
    [dispatch, state.currentQuestionIndex]
  );

  const nextQuestion = useCallback(() => {
    dispatch({ type: "NEXT_QUESTION" });
  }, [dispatch]);

  const previousQuestion = useCallback(() => {
    dispatch({ type: "PREVIOUS_QUESTION" });
  }, [dispatch]);

  const goToQuestion = useCallback(
    (index: number) => {
      dispatch({ type: "GO_TO_QUESTION", payload: index });
    },
    [dispatch]
  );

  const submitQuiz = useCallback(() => {
    dispatch({ type: "SUBMIT_QUIZ" });
  }, [dispatch]);

  const resetQuiz = useCallback(() => {
    dispatch({ type: "RESET_QUIZ" });
  }, [dispatch]);

  return {
    selectAnswer,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    submitQuiz,
    resetQuiz,
  };
}
