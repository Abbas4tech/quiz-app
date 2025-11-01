"use client";
import { useMemo } from "react";

import { Question } from "@/model/Quiz";

import { useQuiz } from "../context/QuizContext";

interface useQuizDataReturns {
  currentQuestionIndex: number;
  answers: Record<number, string>;
  showResults: boolean;
  totalQuestions: number;
  answeredCount: number;
  progress: number;
  correctAnswersCount: number;
  score: number;
  currentQuestion: Question;
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
  isAllQuestionsAnswered: boolean;
}

export function useQuizData(): useQuizDataReturns {
  const { state, quiz } = useQuiz();
  const questions = useMemo(() => quiz.questions || [], [quiz.questions]);

  const quizMetrics = useMemo(() => {
    const totalQuestions = questions.length;
    const answeredCount = Object.keys(state.answers).length;
    const progress = ((state.currentQuestionIndex + 1) / totalQuestions) * 100;

    const correctAnswersCount = Object.entries(state.answers).filter(
      ([index, answer]) => answer === questions[parseInt(index)].correctAnswer
    ).length;

    const score =
      totalQuestions > 0
        ? Math.round((correctAnswersCount / totalQuestions) * 100)
        : 0;

    const isAllQuestionsAnswered = answeredCount === totalQuestions;

    return {
      totalQuestions,
      answeredCount,
      progress,
      correctAnswersCount,
      score,
      currentQuestion: questions[state.currentQuestionIndex],
      isLastQuestion: state.currentQuestionIndex === totalQuestions - 1,
      isFirstQuestion: state.currentQuestionIndex === 0,
      isAllQuestionsAnswered,
    };
  }, [state, questions]);

  return {
    ...quizMetrics,
    currentQuestionIndex: state.currentQuestionIndex,
    answers: state.answers,
    showResults: state.showResults,
  };
}
