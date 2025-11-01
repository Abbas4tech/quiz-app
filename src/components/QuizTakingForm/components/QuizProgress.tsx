"use client";

import React from "react";
import { CheckCircle2, Info, AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useQuizData } from "../hooks/useQuizData";

export default function QuizProgress(): React.JSX.Element {
  const {
    currentQuestionIndex,
    totalQuestions,
    answeredCount,
    progress,
    isLastQuestion,
    isAllQuestionsAnswered,
  } = useQuizData();

  const unansweredCount = totalQuestions - answeredCount;
  const completionPercentage = Math.round(
    (answeredCount / totalQuestions) * 100
  );

  return (
    <div className="space-y-3">
      <Card>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <Badge variant="outline" className="font-normal">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </Badge>
              <Badge variant={isAllQuestionsAnswered ? "default" : "secondary"}>
                {answeredCount}/{totalQuestions} Answered
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />

            {/* Completion percentage indicator */}
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Progress: {completionPercentage}% complete</span>
              {unansweredCount > 0 && (
                <span className="text-amber-600 font-medium">
                  {unansweredCount} question{unansweredCount !== 1 ? "s" : ""}{" "}
                  remaining
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conditional alerts based on progress */}
      {isLastQuestion && !isAllQuestionsAnswered && (
        <Alert className="border-amber-200 bg-amber-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Almost there!</strong> You&lsquo;ve answered {answeredCount}{" "}
            out of {totalQuestions} questions. Please complete all questions to
            submit the quiz.
          </AlertDescription>
        </Alert>
      )}

      {isLastQuestion && isAllQuestionsAnswered && (
        <Alert className="animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="h-4 w-4 text-inherit" />
          <AlertDescription className="text-green-800">
            <strong>Excellent!</strong> All {totalQuestions} questions answered.
            You&lsquo;re ready to submit your quiz!
          </AlertDescription>
        </Alert>
      )}

      {!isLastQuestion &&
        answeredCount > 0 &&
        answeredCount < totalQuestions && (
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-blue-800 ml-2">
              Keep going! You&lsquo;ve completed {completionPercentage}% of the
              quiz.
            </AlertDescription>
          </Alert>
        )}
    </div>
  );
}
