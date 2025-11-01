"use client";

import React from "react";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useQuizData } from "../hooks/useQuizData";
import { useQuizActions } from "../hooks/useQuizActions";

export default function QuizNavigation(): React.JSX.Element {
  const {
    isFirstQuestion,
    isLastQuestion,
    isAllQuestionsAnswered,
    totalQuestions,
  } = useQuizData();
  const { nextQuestion, previousQuestion, submitQuiz } = useQuizActions();

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {totalQuestions > 1 && (
        <Button
          onClick={previousQuestion}
          variant="outline"
          disabled={isFirstQuestion}
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
      )}

      {isLastQuestion ? (
        <Button
          onClick={submitQuiz}
          disabled={!isAllQuestionsAnswered}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Submit Quiz
        </Button>
      ) : (
        <Button onClick={nextQuestion} className="flex-1">
          Next Question
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
