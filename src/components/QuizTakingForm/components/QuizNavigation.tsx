"use client";

import React from "react";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { SubmitQuizDialog } from ".";
import { useQuizActions } from "../hooks/useQuizActions";
import { useQuizData } from "../hooks/useQuizData";

export default function QuizNavigation(): React.JSX.Element {
  const { isFirstQuestion, isLastQuestion, totalQuestions, answeredCount } =
    useQuizData();
  const {
    nextQuestion,
    previousQuestion,
    submitQuiz,
    submitDialogOpen,
    onConfirmSubmit,
    onCancelSubmit,
  } = useQuizActions();

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={previousQuestion}
          variant="outline"
          disabled={isFirstQuestion}
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={submitQuiz}
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

      {/* Submit Dialog */}
      <SubmitQuizDialog
        open={submitDialogOpen}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
        onConfirm={onConfirmSubmit}
        onCancel={onCancelSubmit}
      />
    </>
  );
}
