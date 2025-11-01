"use client";

import React from "react";

import { PlainQuiz } from "@/actions/quiz";

import { useQuizData } from "../hooks/useQuizData";
import {
  QuizResults,
  QuizProgress,
  QuestionNavigator,
  QuizNavigation,
  QuestionCard,
} from ".";
import { QuizProvider } from "../context/QuizContext";

function QuizContent(): React.JSX.Element {
  const { showResults } = useQuizData();

  if (showResults) {
    return <QuizResults />;
  }

  return (
    <div className="space-y-6">
      <QuizProgress />
      <QuestionCard />
      <QuizNavigation />
      <QuestionNavigator />
    </div>
  );
}

export function QuizTakingForm({
  quiz,
}: {
  quiz: PlainQuiz;
}): React.JSX.Element {
  return (
    <QuizProvider quiz={quiz}>
      <QuizContent />
    </QuizProvider>
  );
}
