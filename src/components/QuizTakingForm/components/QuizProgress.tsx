"use client";

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { useQuizData } from "../hooks/useQuizData";

export default function QuizProgress(): React.JSX.Element {
  const {
    currentQuestionIndex,
    totalQuestions,
    answeredCount,
    progress,
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
    </div>
  );
}
