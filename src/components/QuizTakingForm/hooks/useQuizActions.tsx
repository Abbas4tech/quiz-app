"use client";
import { useCallback, useState } from "react";

import { useQuiz } from "../context/QuizContext";

interface useQuizActionsReturns {
  selectAnswer: (_answer: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (_index: number) => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
  submitDialogOpen: boolean;
  onConfirmSubmit: () => void;
  onCancelSubmit: () => void;
}

export function useQuizActions(): useQuizActionsReturns {
  const { dispatch, state, quiz } = useQuiz();
  const questions = quiz.questions || [];
  const totalQuestions = questions.length;
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);

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
    const answeredCount = Object.keys(state.answers).length;

    // Open dialog instead of window.confirm
    if (answeredCount < totalQuestions) {
      setSubmitDialogOpen(true);
      return;
    }

    // If all answered, submit directly
    dispatch({ type: "SUBMIT_QUIZ" });
  }, [dispatch, state.answers, totalQuestions]);

  const handleConfirmSubmit = useCallback(() => {
    setSubmitDialogOpen(false);
    dispatch({ type: "SUBMIT_QUIZ" });
  }, [dispatch]);

  const handleCancelSubmit = useCallback(() => {
    setSubmitDialogOpen(false);
  }, []);

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
    submitDialogOpen,
    onConfirmSubmit: handleConfirmSubmit,
    onCancelSubmit: handleCancelSubmit,
  };
}
